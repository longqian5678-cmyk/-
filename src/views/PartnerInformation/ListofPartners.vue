<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width">
        <main id="cve-main-page-content" role="main">
          <h1 :id="partnersId" class="title">List of Partners</h1>
          <div class="content">
            <p>
              Contact and other information for Top-Level Roots, Roots, CNAs,
              and CNA-LRs are below. Select the partner's name to view its
              information.
            </p>
            <AccordionContent header="Request a CVE ID / Update a CVE Record"
              v-model:expanded="expanded['report']">
              <div class="block" id="report">
                <ol class="ml-4">
                  <li class="pb-1">
                    To request a CVE ID from a CNA or CNA-LR, follow the
                    <router-link
                      to="/ReportRequest/ReportRequestForNonCNAs#RequestCVEID">
                      Request a CVE ID
                    </router-link>
                    instructions.
                  </li>
                  <li class="pb-1">
                    To request an update to a CVE Record by a CNA, follow the
                    <router-link
                      to="/ReportRequest/ReportRequestForNonCNAs#UpdateCVERecord">
                      Update a CVE Record
                    </router-link>
                    instructions.
                  </li>
                </ol>
                <p>
                  View the <router-link to="/About/Process">
                    CVE Process
                  </router-link>
                  page to learn about the CVE Record Lifecycle.
                </p>
              </div>
            </AccordionContent>
            <AccordionContent header="Program Roles / Organization Types"
              v-model:expanded="expanded['roles']">
              <div class="block">
                <p class="subtitle">Program Roles</p>
                <ul>
                  <li class="pb-2" v-for="cnaRoles in partners.roles"
                    :key="cnaRoles.term">
                    <span class="has-text-weight-bold">{{cnaRoles.term}}: </span>
                    <span v-html="cnaRoles.definition"/>
                  </li>
                </ul>
                <p class="subtitle">Organization Types</p>
                <ul>
                  <li class="pb-2" v-for="org in partners.orgType"
                    :key="org.id">
                    <span class="has-text-weight-bold">{{org.term}}: </span>
                    <span v-html="org.definition"/>
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </div><!-- end content -->
          <h2 class="title">Search</h2>
          <div class="field has-addons is-grouped-right">
            <div class="control is-expanded has-icons-right">
              <input v-model="searchTerms"
                class="input cve-search-input"
                type="text"
                placeholder="Enter search terms">
            </div>
            <div class="field is-grouped is-grouped-right pl-4">
              <button class="button is-light control ml-2"
                @click="resetSearch"
                v-if="searchTerms.length > 0"
                aria-label="Clear search">
                  <span class="icon is-small is-left">
                    <font-awesome-icon icon="times"
                      aria-hidden="true" />
                  </span>
              </button>
            </div>
          </div> <!-- end search field groups -->
          <div class="cve-accordion mt-1">
            <button href="/SiteSearch" @click="toggleSearchTips"
              class="button cve-button-outline cve-base-light-gray-borders-bg">
              <span class="is-size-7 has-text-weight-bold">Search Tips</span>
              <span class="icon cve-icon-xxs">
                <font-awesome-icon :icon="expanded.searchTips ? 'minus' : 'plus'"
                  aria-hidden="true"/>
              </span>
            </button>
            <div class="message pt-1 pr-3 pb-1 pl-3"
              :class="{'is-hidden': !expanded.searchTips}" id="report">
              <p>
                Search for a CNA partner by <b>name</b>, <b>scope</b>
                keyword(s), <b>program role</b>, <b>organization type</b>,
                or <b>country</b>.
                <br/> For example: “Top-Level Root”, “Root”, or
                “CNA-LR”, finds partners by their Program Role.
              </p>
            </div>
          </div>
          <hr/>
          <div class="mt-3">
            <p v-if="!searchTerms.length" class="has-text-weight-bold">
              {{CNAData.length}} partners
            </p>
            <p v-else>
              {{CNAsList.length}} result{{CNAsList.length > 1 ? 's': ''}}
            </p>
          </div>
          <div class="field is-grouped is-grouped-right"
            v-show="!emptySearchResults">
            <label class="label">Show:</label>
            <div class="control">
              <div class="select">
                <select v-model="showPartnersCount"
                  aria-label="select how many partners to show">
                  <option v-for="interval in intervals" :key="interval">
                    {{interval}}
                  </option>
                  <option>All</option>
                </select>
              </div>
            </div>
          </div>
          <div class="table-container" v-show="!emptySearchResults">
            <b-table
              class="cna-table is-striped"
              icon-pack="fas"
              :data="CNAsList"
              :paginated="isPaginated"
              :per-page="perPage"
              v-model:current-page="currentPage"
              :pagination-simple="isPaginationSimple"
              :pagination-position="paginationPosition"
              :pagination-rounded="isPaginationRounded"
              aria-next-label="Next page"
              aria-previous-label="Previous page"
              aria-page-label="Page"
              aria-current-label="Current page"
              :page-input="hasInput"
              :striped="true">
              <b-table-column
                  field="organizationName"
                  label="Partner"
                  width="25%"
                  v-slot="{row}">
                <router-link tabindex="0"
                  :to="'/PartnerInformation/ListofPartners/partner/' + row.shortName">
                    {{row.organizationName}}
                </router-link>
              </b-table-column>
              <b-table-column
                  field="scope"
                  label="Scope"
                  width="30%"
                  v-slot="{row}">
                <span v-html="row.scope"></span>
              </b-table-column>
              <b-table-column
                  field="role"
                  label="Program Role"
                  width="15%"
                  v-slot="{row}">
                {{ row.CNA.roles.map(r => r.role).sort().join(', ') }}
              </b-table-column>
              <b-table-column
                  field="type"
                  label="Organization Type"
                  width="15%"
                  v-slot="{row}">
                {{ [...row.CNA.type].sort().join(', ') }}
              </b-table-column>
              <b-table-column
                  field="country"
                  label="Country*"
                  width="15%"
                  v-slot="{row}">
                {{row.country === 'n/a'
                  ? 'No country affiliation' : row.country}}
              </b-table-column>
            </b-table>
            <p class="mb-2 cve-help-text">* Self-identified by CNA</p>
          </div>
          <p class="has-text-centered is-size-5"
            v-show="searchTerms.length && emptySearchResults">
            No results found for
            <span class="has-text-weight-bold">{{searchTerms}}</span>
          </p>
        </main>
      </div>
      <div class="column is-3 is-hidden-touch">
        <NavigationSidebar :nav="cvenavs['Partner Information']" />
      </div>
    </div>
  </div>
</template>

<script setup>

import {BTable, BTableColumn} from "buefy";
import {computed, reactive, ref, watch} from 'vue';
import AccordionContent from '@/components/AccordionContent.vue';
import NavigationSidebar from '@/components/NavigationSidebar.vue';
import CNAData from '@/assets/data/CNAsList.json';
import GlossaryData from '@/assets/data/glossaryEntries.json';
import PartnerRolesOrgTypes from '@/assets/data/partnersRolesOrgTypes.json';
import {searchCnas} from '@/utils/cnaSearch';

const props = defineProps({
  cvenavs: {
    type: Object,
    required: true
  }
});

const CNAsList = ref(CNAData);

const currentPage = ref(1);

const defaultPageSize = 10;

const emptySearchResults = ref(false);

// This holds the expanded states of the accordions used on the page.

const expanded = reactive({report: false, roles: false, searchTips: false});

const hasInput = false;

const intervals = ref([]);

const isPaginationRounded = false;
const isPaginationSimple = false;
const paginationPosition = 'bottom';

const partners = PartnerRolesOrgTypes;

const partnersId = props.cvenavs['Partner Information']['submenu']['List of Partners']['id'];

// Don't show the pagination if there's only one page being displayed, which
// is the case when there are 10 results or less or all results are displayed.

const isPaginated = computed(() => CNAsList.value.length > 10
  && showPartnersCount.value !== 'All');

// Set how many CNA entries are displayed on a page.  'All' is always available
// if there are results.  If the user made another choice or no choice at all,
// some portion of the total results will be displayed.

const perPage = computed(() => showPartnersCount.value === 'All'
  ? CNAsList.value.length : showPartnersCount.value
  ? parseInt(showPartnersCount.value, 10) : defaultPageSize);

const searchTerms = ref('');

const showPartnersCount = ref('');

// Sort the raw CNA list alphabetically by organization name.  This is the
// order displayed without any search terms entered.

CNAData.sort((a, b) => {

    const orgName1 = a.organizationName;
    const orgName2 = b.organizationName;

    return orgName1.localeCompare(orgName2, 'en', {sensitivity: 'base'});
});

resetSearch();

getPartnerRolesDefinition();

watch(searchTerms, search);

function search() {

  // Initiate the search of the CNA data based on the user's input.

  if (!searchTerms.value.trim()) {

    resetSearch();

    return;
  }

  CNAsList.value = searchCnas(CNAData, searchTerms.value);

  emptySearchResults.value = CNAsList.value.length === 0;

  showIntervals();
}

function resetSearch() {

  // Reset parameters associated with the CNA search, which includes setting
  // the current page to 1, clearing the user's search string, and setting
  // the CNA list to its full content.

  currentPage.value = 1;

  searchTerms.value = '';
  CNAsList.value = CNAData;
  emptySearchResults.value = false;

  showIntervals();
}

function getPartnerRolesDefinition() {

  // The roles section in the "partnersRolesOrgTypes" file is empty initially.
  // This function populates the data with the following roles and gets the
  // definitions from the glossary.

  const cnaRoles = ['CVE Numbering Authority (CNA)',
                    'CVE Numbering Authority of Last Resort (CNA-LR)',
                    'Root',
                    'Top-Level Root (TL-Root)'];

  partners.roles = GlossaryData.filter(t => cnaRoles.includes(t.term));
}

function toggleSearchTips() {

  expanded.searchTips = !expanded.searchTips;
}

function showIntervals() {

  // Populates the list of options shown to the user for how many CNAs to
  // display per page.  The options are based on the number of CNAs found
  // in the current search.

  intervals.value = [];

  if (CNAsList.value.length <= 10) {

    // For ten results or less, they are displayed all on one page.

    showPartnersCount.value = 'All';
    return;
  }

  if (CNAsList.value.length > 10)
    intervals.value.push('10');

  if (CNAsList.value.length > 25)
    intervals.value.push('25');

  if (CNAsList.value.length > 50)
    intervals.value.push('50');

  if (CNAsList.value.length > 100)
    intervals.value.push('100');

  if (!intervals.value.includes(showPartnersCount.value))
    showPartnersCount.value = intervals.value.length ? intervals.value[0]
      : 'All';
}

</script>

<style scoped lang="scss">

:deep(.cna-table table) {
    width: 100%;
    table-layout: fixed;
}

:deep(.cna-table table) {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid;
}

:deep(.cna-table th:first-child),
:deep(.cna-table td:first-child) {
    border-right: 1px solid;
}

:deep(.cna-table thead th) {
    border-bottom: 1px solid;
}

</style>
