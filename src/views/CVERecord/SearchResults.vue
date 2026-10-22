<template>
  <div id="cve-secondary-page-main-container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width">
        <main id="cve-main-page-content" role="main">
          <div>
            <div v-if="cveListSearchStore.showHelpText && cveListSearchStore.totalSearchResultCount < 1">
              <!-- cveListSearchStore.totalSearchResultCount < 1 so when there are results this doesn't flash while user is typing keyword -->
              <p class="has-text-centered">
                Please use the help text below the search box above to fix your keyword(s).
              </p>
            </div>
            <div v-else>
              <div v-if="cveListSearchStore.isSearching"
                class="cve-loading-message has-text-centered"
              >
                <span class="icon-text">
                  <span class="icon">
                    <span class="loader is-loading" />
                  </span>
                  <span>Please wait. Loading...</span>
                </span>
              </div>
              <div v-else>
                <div v-if="cveListSearchStore.isSearchServerError">
                  <ServiceUnavailable></ServiceUnavailable>
                </div>
                <div v-else>
                  <div v-if="!genericGlobalsStore.isProductionWebsite"
                    class="notification is-warning is-light" role="alert">
                    <div class="is-flex is-justify-content-center">
                      <p id="alertIconCveRecordsRequestErrored" class="is-hidden">alert</p>
                      <font-awesome-icon style="flex: 0 0 40px;" size="1x"  icon="triangle-exclamation" role="alert"
                        aria-labelledby="alertIconCveRecordsRequestErrored" aria-hidden="false" />
                      <p>You are accessing <span class="has-text-weight-bold">Production</span> data from {{ resultUrl }}</p>
                    </div>
                  </div>
                  <h2 class="title">Search Results</h2>
                  <div class="mb-3" v-if="hasRecordData || hasIdData">
                    <h3 class="title is-size-5 mb-2"> CVE {{ getRecordOrIdLabel }} Found</h3>
                    <p class="cve-help-text">
                      <span v-if="hasRecordData">View the CVE {{ getRecordOrIdLabel }} below.</span>
                      <span v-if="hasIdData">
                        The <router-link to="/ResourcesSupport/Glossary#glossaryCVEID">CVE ID</router-link> below has no corresponding
                        <router-link to="/ResourcesSupport/Glossary#glossaryRecord">CVE Record</router-link>.
                      </span>
                      If you are searching for this CVE ID in other CVE Records, view the <span class="has-text-weight-bold">Other Results</span> section below.
                    </p>
                    <div class="columns cve-columns is-variable is-1-desktop is-0-mobile mt-0 mr-2 mb-4 ml-2">
                      <div class="column cve-column">
                        <div class="columns cve-columns">
                          <div class="column cve-column">
                            <router-link v-if="hasRecordData"
                              :to="cveRecordRoute(cveListSearchStore.recordData.cveId)">
                              {{ cveListSearchStore.recordData.cveId }}
                            </router-link>
                            <router-link v-if="hasIdData"
                              :to="cveRecordRoute(cveListSearchStore.idData.cve_id)">
                              {{ cveListSearchStore.idData.cve_id}}
                            </router-link>
                          </div>
                          <div class="column cve-column">
                            <p v-if="hasRecordData">
                              <span>CNA: </span>
                              {{ partnerStore.getOrganizationName(cveListSearchStore.recordData.cna,
                                                                  cveListSearchStore.recordData.cnaOrgId) }}
                            </p>
                            <p v-if="hasIdData && cveListSearchStore?.idData?.state === 'REJECTED' && cveListSearchStore?.idData?.owning_cna">
                              <span>Assigner: </span>
                              <span>{{ cveListSearchStore.idData.owning_cna }}</span>
                            </p>
                          </div>
                        </div>
                        <div class="columns cve-columns">
                          <div class="column cve-column" v-if="hasRecordData">
                            <div v-for="(description, index) in cveListSearchStore.recordData.descriptions" :key="description.key" class="mb-0">
                              <p v-if="!description.showMore" class="mb-0">
                                {{ description.firstChunk }}<span v-if="!description.showMore && description.secondChunk.length > 0">...</span>
                              </p>
                              <p v-else class="mb-0">{{ description.firstChunk.concat(` ${description.secondChunk}`) }}</p>
                              <button v-if="description.secondChunk.length > 0"
                                @click="cveListSearchStore.handleShowMoreChange(undefined, index)"
                                class="button is-ghost cve-is-borderless p-0"
                              >
                                <span v-if="!description.showMore">Show more</span>
                                <span v-else>Show less</span>
                              </button>
                            </div>
                          </div>
                          <div class="column cve-column" v-if="hasIdData">
                            <p v-if="cveListSearchStore.idData.state === 'REJECTED'">
                              This CVE ID was unused by the <router-link to="/ProgramOrganization/CNAs">CNA</router-link>
                            </p>
                            <p v-if="cveListSearchStore.idData.state === 'RESERVED'">
                              This ID has been reserved by a <router-link to="/ProgramOrganization/CNAs">CNA</router-link> and its corresponding record
                              will be updated by the assigning CNA once details are available. Learn more about the
                              <router-link to="/ResourcesSupport/FAQs#pc_cve_records-reserved_signify_in_cve_record">Reserved state</router-link>.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="cve-search-results-container" v-if="cveListSearchStore.totalSearchResultCount > 0">
                    <div v-if="hasIdData || hasRecordData">
                      <h3 class="title is-size-5 mb-2">Other Results</h3>
                      <p class="cve-help-text">
                        Includes all record(s) that reference this CVE ID.
                      </p>
                    </div>
                    <div class="mt-4 mb-2">
                      <p>
                        <span>Showing </span>
                        <span>
                          <span v-if="parseInt(cveListSearchStore.pagination.toCount) === 1" class="has-text-weight-bold">1</span>
                          <span v-else class="has-text-weight-bold">
                            <span class="has-text-weight-bold">
                              {{ cveListSearchStore.pagination.fromCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                            </span>
                            <span v-if="typeof cveListSearchStore.pagination.toCount !== 'undefined'" class="has-text-weight-bold">
                              -
                              {{ cveListSearchStore.pagination.toCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                            </span>
                          </span>
                        </span>
                        <span> of </span>
                        <span class="has-text-weight-bold">
                          {{ cveListSearchStore.totalSearchResultCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
                        </span>
                        <span> result{{ cveListSearchStore.totalSearchResultCount == 1 ? '' : 's' }} for </span>
                        <span class="has-text-weight-bold">{{ cveListSearchStore.query }}</span>
                      </p>
                    </div>
                    <div class="field is-grouped is-grouped-right pb-3 cve-filter-container" style="">
                      <label class="label">Show:</label>
                      <div class="control">
                        <div class="select">
                          <select v-model="cveListSearchStore.pagination.numberPerPage"
                            aria-label="Select how many search results to show">
                            <option v-for="num in cveListSearchStore.pagination.numberPerPageOptions" :key="`page-${num}`" :value="num">
                              {{ num }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <label for="sort" class="label">Sort by:</label>
                      <div class="control">
                        <div class="select">
                          <select name="partner" v-model="cveListSearchStore.pagination.sortBy"
                            aria-label="Select a sort option">
                            <option v-for="sort in cveListSearchStore.pagination.sortByOptions" :key="sort.key"
                              :value="sort">
                              {{ sort.label }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div v-if="cveListSearchStore.totalSearchResultCount > 0">
                      <div class="columns cve-columns" v-for="(result, resultIndex) in cveListSearchStore.searchResults" :key="result.index">
                          <div class="column cve-column">
                            <div class="column cve-column" :class="{'cve-top-border': resultIndex !== 0}">
                            </div>
                            <div class="columns cve-columns">
                              <div class="column cve-column">
                                <router-link :to="cveRecordRoute(result.cveId)" target="_blank">{{ result.cveId }}</router-link>
                              </div>
                              <div class="column cve-column">
                                <p>
                                  <span>CNA: </span>
                                  {{ partnerStore.getOrganizationName(result.cna, result.cnaOrgId) }}
                                </p>
                              </div>
                              <div class="column cve-column">
                                <SadpTag :has-sadp="result.hasSadp"/>
                              </div>
                            </div>
                            <div class="columns cve-columns">
                              <div class="column cve-column">
                                <div v-for="(description, descriptionIndex) in result.descriptions" :key="description.key">
                                  <p v-if="!description.showMore">
                                    {{ description.firstChunk }}<span v-if="!description.showMore && description.secondChunk.length > 0">...</span>
                                  </p>
                                  <p v-else>{{ description.firstChunk.concat(` ${description.secondChunk}`) }}</p>
                                  <button v-if="description.secondChunk.length > 0"
                                    @click="cveListSearchStore.handleShowMoreChange(resultIndex, descriptionIndex)"
                                    class="button is-ghost cve-is-borderless p-0"
                                  >
                                    <span v-if="!description.showMore">Show more</span>
                                    <span v-else>Show less</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                    <div class="has-text-right">
                      <button
                        @click="backToTop"
                        class="button is-ghost cve-is-borderless p-0"
                      >
                        Back to top of page
                      </button>
                    </div>
                    <nav class="pagination is-centered pt-2 cve-pagination" role="navigation" aria-label="pagination">
                      <button @click=cveListSearchStore.handlePreviousPageChange
                        :disabled="cveListSearchStore.pagination.currentPage <= 1 ? true : false"
                        :aria-disabled="cveListSearchStore.pagination.currentPage <= 1 ? true : false"
                        class="pagination-previous button cve-button cve-button-outline"
                      >
                        Previous
                      </button>
                      <button @click=cveListSearchStore.handleNextPageChange
                        :disabled="cveListSearchStore.pagination.currentPage < cveListSearchStore.pagination.totalPages ? false : true"
                        :aria-disabled="cveListSearchStore.pagination.currentPage < cveListSearchStore.pagination.totalPages ? false : true"
                        class="pagination-next button cve-button cve-button-outline"
                      >
                        Next
                      </button>
                      <ul class="pagination-list">
                        <li>
                          <button @click=cveListSearchStore.handlePreviousWindowChange
                            :disabled="cveListSearchStore.pagination.startWindow > cveListSearchStore.pagination.firstPage ? false : true"
                            :aria-disabled="cveListSearchStore.pagination.startWindow > cveListSearchStore.pagination.firstPage? false : true"
                            class="pagination-next button cve-button cve-button-outline mt-1"
                          >
                            <span class="icon">
                              <p id="previousWindowIcon" class="is-hidden">previous page window button</p>
                              <font-awesome-icon icon="angles-left" aria-labelledby="previousWindowIcon" aria-hidden="false"/>
                            </span>
                          </button>
                        </li>
                        <li v-for="page in cveListSearchStore.pagination.currentPageWindow" :key="page.key">
                          <button
                            @click="cveListSearchStore.handlePageChange(page)"
                            :class="{'is-current': page === cveListSearchStore.pagination.currentPage}"
                            class="pagination-link button cve-button cve-button-outline" :aria-label="`Go to page ${cveListSearchStore.pagination.currentPage}`">
                            {{ page }}
                          </button>
                        </li>
                        <li>
                          <button @click=cveListSearchStore.handleNextWindowChange
                            :disabled="cveListSearchStore.pagination.endWindow < cveListSearchStore.pagination.totalPages ? false : true"
                            :aria-disabled="cveListSearchStore.pagination.endWindow < cveListSearchStore.pagination.totalPages ? false : true"
                            class="pagination-next button cve-button cve-button-outline"
                          >
                            <span class="icon">
                              <p id="nextWindowIcon" class="is-hidden">next page window button</p>
                              <font-awesome-icon icon="angles-right" aria-labelledby="nextWindowIcon" aria-hidden="false"/>
                            </span>
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div v-else-if="cveListSearchStore.totalSearchResultCount === 0 && cveListSearchStore.query.length === 0" class="has-text-centered">
                    <p>Please provide your search keywords and select the "Search" button.</p>
                  </div>
                  <div v-else>
                    <p class="has-text-weight-bold">No search results found for: <span class="is-italic">{{ cveListSearchStore.query }}</span></p>
                    <p>Please try your search again using different keyword(s) or access the
                      <router-link to="/ResourcesSupport/FAQs#pc_cve_list_basics-search_cve">search tips</router-link>.
                    </p>
                  </div>
                  <p class="has-text-centered mt-4">
                    <a href="https://forms.office.com/g/qmmTaYnr5y" target="_blank">
                      Provide feedback on the new search capability
                      <span class="icon cve-icon-xxs">
                        <p id="externalSurveyLink" class="is-hidden">
                          Survey opens in a new tab or window depending on browser settings
                        </p>
                        <font-awesome-icon icon="external-link-alt" aria-labelledby="extenalSurveyLink" aria-hidden="false" class="ml-1"/>
                      </span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCveListSearchStore } from '@/stores/cveListSearch';
import { useGenericGlobalsStore } from '@/stores/genericGlobals';
import { usePartnerStore } from '@/stores/partners';
import { computed, createApp, ref, watch } from 'vue';
import { useHead } from '@unhead/vue';
import { useRouter } from 'vue-router';
import ServiceUnavailable from '@/components/ServiceUnavailable.vue'
import SadpTag from '@/components/SadpTag.vue';

const cveListSearchStore = useCveListSearchStore();
const genericGlobalsStore = useGenericGlobalsStore();
const partnerStore = usePartnerStore();
const router = useRouter();
const app = createApp({});
const resultUrl = ref(genericGlobalsStore.cveServicesBaseUrl);

app.component('ServiceUnavailable', ServiceUnavailable);
app.component('SadpTag', SadpTag);

// Keeping track of the current settings for the results per page and
// sort option prevents the watches from doing searches just because the
// cveListSearchStore is reset (which triggers a watch).  We really only
// want one of these watches triggered if the user actually changes the
// value.

let currNumPerPage = ref(cveListSearchStore.pagination.numberPerPage);
let currSortByLabel = ref(cveListSearchStore.pagination.sortBy.label);

if (genericGlobalsStore.isProductionWebsite) {

  // Don't let search engines index this page - the results are user-specific,
  // and don't help with CVE's search engine optimization.  This only applies
  // to the production website because other test websites are totally blocked
  // from being indexed.

  useHead({
    meta: [
      {name: 'robots', content: 'noindex'},
      {name: 'description', content: 'CVE search result'}
    ],
  });
}

watch(()=>cveListSearchStore.pagination.numberPerPage, ()=>{
  if (!cveListSearchStore.isSearching
    && cveListSearchStore.pagination.numberPerPage !== currNumPerPage.value) {
      currNumPerPage.value = cveListSearchStore.pagination.numberPerPage;
      cveListSearchStore.handleNumberPerPageChange();
    }
}, { deep: true });

watch(()=>cveListSearchStore.pagination.sortBy, ()=>{
  if (!cveListSearchStore.isSearching
    && cveListSearchStore.pagination.sortBy.label !== currSortByLabel.value) {
      currSortByLabel.value = cveListSearchStore.pagination.sortBy.label;
      cveListSearchStore.sortResults();
    }
}, { deep: true });

function backToTop() {
  router.push({
    name: 'SearchResults',
    query: {query: cveListSearchStore.query},
    replace: true
  });
}

function cveRecordRoute(cveId) {
  const recordRoute = `/CVERecord?id=${cveId}`;

  return recordRoute
}

let getRecordOrIdLabel = computed(() => {
  if (cveListSearchStore?.isArecord){
    return 'Record';
  } else if (Object.keys(cveListSearchStore.idData).length > 0) {
    return 'ID';
  } else {
    return '';
  }
});

let hasRecordData = computed(() => {
  return Object.keys(cveListSearchStore.recordData).length > 0;
});

let hasIdData = computed(() => {
  return Object.keys(cveListSearchStore.idData).length > 0;
});
</script>

<style scoped lang="scss">

button.pagination-link.is-current {
  background-color: $theme-color-primary-darker !important;
  color: white;
}

.cve-columns {
  margin: 0.5rem !important
}

.cve-column {
  padding: 0px !important;
}

.cve-top-border {
  background-color: #e5e5e5;
  border: none;
  display: block;
  height: 1px;
}

.cve-filter-container {
  border-bottom: 2px solid #e5e5e5;
}

.cve-pagination {
  border-top: 2px solid #e5e5e5;
}
</style>
