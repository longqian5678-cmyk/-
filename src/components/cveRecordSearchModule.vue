<template>
  <div class="mt-1">
    <div v-if="!cveGenericGlobalsStore.isProductionWebsite" role="alert"
      class="notification is-warning is-light">
      <div class="is-flex is-align-items-flex-start mt-1" style="max-width: 820px; column-gap: 1rem;">
        <div class="pl-3">
          <p id="alertIconVariousFormts" class="is-hidden">alert</p>
          <font-awesome-icon size="1x"  icon="exclamation-triangle" role="alert"
            aria-labelledby="alertIconVariousFormts" aria-hidden="false" />
        </div>
        <div v-if="searchTypeBoolean" class="is-flex-grow-5">
          <p class="is-size-7">
            <span class="has-text-weight-bold">CNAs</span> – to view your <span class="has-text-weight-bold">test data</span>
            (your draft records) select “<span class="has-text-weight-bold">Find a Test CVE Record/ID (Legacy)</span>” in the drop-down menu and
            provide a CVE ID to find a specific CVE Record.
            <br>
            <span class="has-text-weight-bold">NOTE for Production Data Search:</span>
            The following characters are <span class="has-text-weight-bold">NOT</span>
            allowed in search terms:
            <span class="is-family-monospace is-size-6">{{ invalidSearchCharacters }}</span>
            <br>
            The wildcard characters (*?) are now supported, which allows searching
            for patterns instead of only exact matches.
          </p>
        </div>
        <div v-else class="is-flex-grow-5">
          <p class="is-size-6">
            You are searching CVE records in the <span class="has-text-weight-bold">TEST</span>
            database.  Enter <span class="has-text-weight-bold">only ONE</span>
            CVE ID.
          </p>
        </div>
      </div>
    </div>
    <div class="field has-addons mt-1">
      <p class="control">
        <span v-if="!cveGenericGlobalsStore.isProductionWebsite"
          class="select cve-search-selector">
          <select v-model="searchType">
            <option>{{ searchOptionLabel }}</option>
            <option>{{ legacyOptionLabel }}</option>
          </select>
        </span>
      </p>
      <p class="control is-expanded">
        <input v-if="searchTypeBoolean" v-model.trim="queryString"
          @input="onInputChange" @keyup.enter="validate" type="text" class="input cve-id-input is-expanded"
          placeholder="Enter keywords (e.g.: CVE ID, sql injection, etc.)" />
        <input v-else v-model.trim="cveId" @input="onInputChange" @keyup.enter="validate"
          type="text" class="input cve-id-input" placeholder="Enter CVE ID (CVE-YYYY-NNNN)" />
      </p>
      <p class="control">
        <button @click="validate" class="button cve-button cve-button-accent-warm"
          :class="{ 'is-loading': cveListSearchStore.isSearching, 'disabled': cveListSearchStore.isSearchButtonDisabled }"
          :aria-disabled="cveListSearchStore.isSearchButtonDisabled"
          :disabled="cveListSearchStore.isSearchButtonDisabled">
          {{ searchTypeBoolean ? 'Search' : 'Find'}}
        </button>
      </p>
    </div>
    <div class="notification is-warning is-light" role="alert" v-if="errorMessageStore.showErrorMessage">
      <div class="is-flex is-align-content-flex-start">
        <p id="alertIcon" class="is-hidden">alert</p>
        <font-awesome-icon style="flex: 0 0 40px; margin-top:3px" size="lg" icon="exclamation-triangle" role="alert"
          aria-labelledby="alertIcon" aria-hidden="false" />
          <ul class="pl-4" style="list-style: square">
            <li v-for="errorMsg in errorMessageStore.errorMessage"
              :key="errorMsg" class="cve-help-text" v-html="errorMsg"></li>
          </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCveListSearchStore } from '@/stores/cveListSearch';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useErrorMessageStore } from '@/stores/cveRecord';
import { useGenericGlobalsStore } from '@/stores/genericGlobals';

const cveIdRegex = /^CVE\p{Pd}(?<year>\d{4})\p{Pd}(?<id>\d{4,})$/iu;

// This is the current maximum supported length of the "suffix" portion of
// the CVE ID.  The schema defines a suffix length up to 19, but code in
// other modules only supports what's defined here.

const maxCveIdSuffix = 7;

let cveListSearchStore = useCveListSearchStore();
const errorMessageStore = useErrorMessageStore();

const route = useRoute();
const router = useRouter();

const cveRecordRouteName = 'CVERecord';
const invalidSearchCharacters = ref('(){}[]\'`<>|;!~^+%');
const legacyOptionLabel = 'Find a Test CVE Record/ID (Legacy)';
const searchOptionLabel = 'Search CVE List (Production Data)';

let queryString = ref('');

let cveGenericGlobalsStore = useGenericGlobalsStore();
let searchType = ref('');
let cveId = ref('');

// this seems redundant, but it fixes an edge case. if a user searches for a
// particular field, then on the results page flips the toggle, THEN refreshes
// without searching, this will keep the correct helper text showing.
let searchTypeBoolean = computed(() => {
  return searchType.value === searchOptionLabel ? true : false;
});

// The watch is set up first and then the initialization of the searchType
// value so that the watch is triggered, which resets the state.  This only
// applies to non-production (e.g., dev, test) websites.

if (!cveGenericGlobalsStore.isProductionWebsite)
  watch(searchType, () => {

    resetStates();

    if (searchType.value == legacyOptionLabel && route.query?.id) {

      // For the legacy find, the route has a valid ID, which is inserted
      // in the input field.  Because it's a valid CVEID, the search button
      // is enabled.

      cveId.value = route.query.id;
      cveListSearchStore.isSearchButtonDisabled = false;
    }
  });

searchType.value = cveGenericGlobalsStore.useSearch ? searchOptionLabel
  : legacyOptionLabel;

watch(
  () => route.query,
  () => {
    if (searchTypeBoolean.value) {
      if (route.query?.query) {
          queryString.value = route.query.query.trim();
          validate();
      }
    } else if (route.query.id) {
      cveId.value = route.query.id;
      cveListSearchStore.isSearchButtonDisabled = false;
    }
  });

function resetStates() {
  const isSearch = searchTypeBoolean.value;
  const servicesUrl = isSearch ? cveGenericGlobalsStore.cveServicesBaseUrl
    : cveGenericGlobalsStore.cveServiceTestBaseUrl;
  cveGenericGlobalsStore.setUseSearch(isSearch);
  cveGenericGlobalsStore.setCurrentServicesUrl(servicesUrl);
  cveListSearchStore.searchType = isSearch;
  cveId.value = '';
  queryString.value = cveListSearchStore.query = '';
  errorMessageStore.$reset();
  cveListSearchStore.isSearchButtonDisabled = true;
}

function startSearch() {

  if (cveGenericGlobalsStore.useSearch) {
      cveListSearchStore.$reset();
      cveListSearchStore.query = queryString.value;
      if (route.name !== 'SearchResults' || !route.query?.query
          || (route.query.query !== cveListSearchStore.query)) {

        router.push({name: 'SearchResults',
                     query: {query: cveListSearchStore.query}});
      } else
        cveListSearchStore.search();
  } else if (route.name !== 'CVERecord' || !route.query?.id
             || (route.query.id !== cveId.value)) {

    // This is for the legacy find and is only applicable on the non-production
    // websites.  This push to the router will trigger a lookup for the CVE
    // record.

    router.push({name: cveRecordRouteName, query: {id: cveId.value}});
  } else {

    // Non-production website in legacy find, with the user possibly wanting
    // a reload with the same CVEID.  Probably the easiest option is to
    // reload the page; otherwise, without doing this there's no way to trigger
    // another lookup for the same CVEID.

    router.go(0);
  }
}

function validateQueryString() {

  const isSearch = searchTypeBoolean.value;
  const searchValue = isSearch ? queryString.value : cveId.value;

  cveListSearchStore.isSearchButtonDisabled = true;
  errorMessageStore.$reset();

  if (!searchValue)
    return !cveListSearchStore.isSearchButtonDisabled;

  const cveIdMatch = cveIdRegex.exec(searchValue);
  let cveIdValid = false;

  if (cveIdMatch) {
    // The search string is a CVE ID.  Re-assemble the components, making sure
    // "normal" dashes are used to separate the components.

    const year = cveIdMatch.groups.year;
    const id = cveIdMatch.groups.id;
    const normalizedCveId = `CVE-${year}-${id}`;

    if (id.length <= maxCveIdSuffix) {
      cveIdValid = true;
      if (isSearch)
        queryString.value = normalizedCveId;
      else
        cveId.value = normalizedCveId;
    } else {
      errorMessageStore.setErrorMessage(`Invalid CVE ID "${normalizedCveId}" - identifier out of range`);
    }
  }

  if (isSearch) {
    if (allValidCharacters(searchValue) && !errorMessageStore.isErrorMessage) {

      // The search can proceed with the provided string.
      cveListSearchStore.isSearchButtonDisabled = false;
    }
  } else if (cveIdValid) {

    // Legacy Find by CVE ID and it's in the correct format.
    cveListSearchStore.isSearchButtonDisabled = false;

  } else if (!errorMessageStore.isErrorMessage) {

    // Legacy Find by CVE ID but the query string is not a CVE ID.
    errorMessageStore.cveIdFormatMessage();
  }

  return !cveListSearchStore.isSearchButtonDisabled;
}

function normalizeSearchString() {

  if (!searchTypeBoolean.value)
    return

  // Each search string is "normalized" by removing excess spaces (both at
  // the beginning and end of the string, as well as compressing multiple
  // spaces separating "words" to a single space).  Dashes (em-, en-) that
  // may have been pasted in from elsewhere (e.g., Word) are converted to
  // the minus (hyphen) character.

  let normalizedString = queryString.value.trim().replace(/\s+/g, ' ');

  normalizedString = normalizedString.replace(/\p{Pd}/g, '-');

  if (normalizedString !== queryString.value)
    queryString.value = normalizedString;
}

function onInputChange() {

  // This function is called when the search string changes.  The only purpose
  // is to clear the way for the search if there's a value (it's not empty),
  // it doesn't contain any characters not supported by the search,
  // and it's not the same as a "bad" value used in the previous search.
  // As long as this is the case, we enable the search, which will then check
  // the validity of the search string when initiated.

    const isSearch = searchTypeBoolean.value;
    const searchValue = isSearch ? queryString.value : cveId.value;

  if (!searchValue.length) {
    // This handles the case when the user clears the input field, by using the
    // delete button or selecting the input and cutting via the keyboard.  It
    // makes the state consistent with when the page starts with nothing in the
    // input field.

    resetSearch();
    errorMessageStore.$reset();
    cveListSearchStore.isSearchButtonDisabled = true;

  } else if (!allValidCharacters(searchValue)) {
    cveListSearchStore.isSearchButtonDisabled = true;
  }
  else if (cveListSearchStore.isSearchButtonDisabled) {
    errorMessageStore.$reset();
    cveListSearchStore.isSearchButtonDisabled = false;
  }
}

function validate() {
  // This function is called when initiating a search.  It's invoked as a result
  // of one of these user actions:
  //
  //    - pressing enter in the input field.
  //    - clicking the Search/Find button.
  //    - entering the search URL.
  //
  // Provided the search string is valid, the search is started.

  normalizeSearchString();

  if (validateQueryString()) {
    try {
      cveListSearchStore.isSearchButtonDisabled = true;
      startSearch();
    } finally {
      cveListSearchStore.isSearchButtonDisabled = false;
    }
  } else {
    // The query string is not valid and the route indicates that the URL
    // is most likely associated with a previous valid search.  The user
    // has initiated another search that is unrelated to the URL being
    // displayed (e.g., cve.org/CVERecord/SearchResults?query=CVE-2020-0001).
    // Rather than display a URL that is not associated with the
    // current search, reset it to the home route.

    resetSearch();
  }
}

function allValidCharacters(searchString) {

  // This function checks the given search string for the presence of
  // any characters that are not supported for the search operation.
  // True is returned if the string has no invalid characters, and false
  // otherwise.  The error message is also set to indicate the invalid
  // characters found in the string.

  const invalidCharacters = invalidSearchCharacters.value.split('');

  const found = invalidCharacters.filter(i => searchString.includes(i));

  if (found.length) {
    const message = 'search string contains the following invalid '
      + `character(s): ${found.join('')}`;

    errorMessageStore.setErrorMessage(message);
  }

  return found.length === 0;
}

function resetSearch() {

  // This function performs some reset tasks for the search that are
  // common.  This makes sure the URL is cleared of any search parameters.

  if (route.name != 'home' || route.query)
    router.push({name: 'home', query: {}});
}
</script>

<style scoped lang="scss">
@use 'initial-variables' as *;

.disabled {
  opacity: 0.7 !important;
  background-color: #3d4551 !important;
  color: white !important;
  border-color: #dbdbdb;
  box-shadow: none;
}

.notification {
  margin: 0 0 2px 0 !important;
  padding: 2px 10px 2px 10px !important;
}

@media screen and (min-width: $desktop) {
  .cve-id-input {
    width: 470px;
  }
}

</style>
