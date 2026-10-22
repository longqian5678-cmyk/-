<template>
  <div id="cve-secondary-page-main-container">
    <div v-if="cveRecordStore.isSearching">
      <div class="columns">
        <div class="column is-2 is-hidden-touch"></div>
        <div class="column is-full-mobile is-full-tablet is-7-desktop">
          <main id="cve-main-page-content">
            <div class="content">
              <div class="cve-loading-message has-text-centered">
                <span class="icon-text">
                  <span class="icon">
                    <span class="loader is-loading"/>
                  </span>
                  <span>Please wait. Loading...</span>
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="cveRecordStore.isIdOrRecordFound">
        <div v-if="!genericGlobalsStore.isProductionWebsite" class="notification is-warning is-light" role="alert">
          <div class="is-flex" style="justify-content: center;">
            <p id="alertIconCveRecordsRequestErrored" class="is-hidden">alert</p>
            <font-awesome-icon style="flex: 0 0 40px;" size="1x"  icon="triangle-exclamation" role="img"
              aria-labelledby="alertIconCveRecordsRequestErrored" aria-hidden="false" />
            <p>You are accessing <span class="has-text-weight-bold">{{ usingProd }}</span> data from {{ resultUrl }}</p>
          </div>
        </div>
        <PublishedRecord v-if="cveRecordStore.isPublished"/>
        <RejectedRecordOrId v-if="cveRecordStore.isRejected"/>
        <ReservedId v-if="cveRecordStore.isReserved"/>
      </div>
      <div v-else class="columns">
        <div class="column is-2 is-hidden-touch"></div>
        <div class="column is-full-mobile is-full-tablet is-7-desktop">
          <main id="cve-main-page-content">
            <div class="content">
              <div>
                <p v-if="cveRecordStore.showHelpText" class="has-text-centered">
                  Please use the search box above to find a CVE record by ID.
                </p>
                <div v-else-if="cveRecordStore.serverError">
                  <ServiceUnavailable></ServiceUnavailable>
                </div>
                <div v-else-if="!cveRecordStore.isIdOrRecordFound" class="has-text-centered">
                  <div class="notification is-warning is-light" role="alert">
                    <div v-if="websiteEnv !== 'prd'" class="is-flex" style="justify-content: center;">
                      <p id="alertIconCveRecordsRequestErrored" class="is-hidden">alert</p>
                      <font-awesome-icon style="flex: 0 0 40px;" size="1x"  icon="triangle-exclamation" role="img"
                        aria-labelledby="alertIconCveRecordsRequestErrored" aria-hidden="false" />
                      <p>You are accessing <span class="has-text-weight-bold">{{ usingProd }}</span> data from {{ resultUrl }}</p>
                    </div>
                  </div>
                  <h1 class="title is-3 is-4 mb-2">{{cveRecordStore.cveId}} not found.</h1>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref, computed, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'

import axios from 'axios'
import {useHead} from '@unhead/vue';

import PublishedRecord from './PublishedRecord.vue';
import RejectedRecordOrId from './RejectedRecordOrId.vue';
import ReservedId from './ReservedId.vue';
import ServiceUnavailable from '@/components/ServiceUnavailable.vue'

import {usecveRecordStore, useErrorMessageStore} from '@/stores/cveRecord'
import {useGenericGlobalsStore} from '@/stores/genericGlobals'

const route = useRoute();
const router = useRouter();

const cveRecordStore = usecveRecordStore();
const errorMessageStore = useErrorMessageStore();
const genericGlobalsStore = useGenericGlobalsStore();

const cveId = ref(cveRecordStore.cveId || '');
const getIdStatusCode = ref(undefined);
const isResultFromProd = ref(false);
const resultUrl = ref(genericGlobalsStore.useSearch
    ? genericGlobalsStore.cveServicesBaseUrl
    : genericGlobalsStore.cveServiceTestBaseUrl);

const websiteEnv = import.meta.env.VITE_WEBSITE_ENVIRONMENT;

const usingProd = computed(() => (isResultFromProd.value ? 'Production'
  : 'Test'));

async function lookupCveRecord(currentCveId) {

  // This function performs the lookup of the CVE record.  For a published
  // record, both the record and the ID data are fetched.

  resetStates();

  cveRecordStore.cveId = currentCveId;
  cveId.value = currentCveId;

  initializeLookup();

  try {

    await getRecordData(currentCveId);

  } catch (error) {

    if (!isClientError(error)) {

      resetStateFlags();
      handleServerError();
    }

  } finally {

    if (!cveRecordStore.serverError && !cveRecordStore.isReserved
        && !cveRecordStore.isRejected)
      await getIdData(currentCveId);
  }
}

async function getRecordData(currentCveId) {

  // Queries the CVE database for the record associated with the given
  // CVE ID.

  const getRecordUrl = `${genericGlobalsStore.currentServicesUrl}`
  + `/api/cve/${currentCveId}`;

  isResultFromProd.value = genericGlobalsStore.useSearch;
  resultUrl.value = genericGlobalsStore.currentServicesUrl;

  resetStateFlags();

  const {data} = await axios.get(getRecordUrl);

  if (!data || typeof data !== 'object') {

    handleServerError();

    return;
  }

  if (data.error) {

    if (data.error === 'CVE_RECORD_DNE') {

      cveRecordStore.isIdOrRecordFound = false;
      cveRecordStore.isArecord = true;

      return;
    }

    handleServerError();

    return;
  }

  cveRecordStore.isArecord = true;
  cveRecordStore.recordData = data;

  switch(data.cveMetadata.state) {

    case 'PUBLISHED':
      cveRecordStore.isPublished = true;
      break;

    case 'RESERVED':
      cveRecordStore.isReserved = true;
      break;

    case 'REJECTED':
      cveRecordStore.isRejected = true;
      break;
  }

  // For published records, hold off on marking the record found until
  // after we've also retrieved the ID record.  Both record and ID data
  // are needed for a published record to determine if the owner of the
  // CVE record is the same as the assigner.

  if (!cveRecordStore.isPublished) {

    handleIsIdOrRecordFound(true)
  }
}

async function getIdData(currentCveId) {

  // Gets the ID data for the given CVE ID.

  cveRecordStore.serverError = false;
  cveRecordStore.isArecord = undefined;

  const getIdUrl = `/api/cve-id/${currentCveId}`;

  try {

    axios.defaults.baseURL = genericGlobalsStore.currentServicesUrl;

    const response = await axios.get(getIdUrl);
    const idData = response.data;

    getIdStatusCode.value = response.status;

    if (idData?.error !== undefined) {

      handleServerError();
      return;
    }

    cveRecordStore.idData = idData;

    if (idData.state === 'RESERVED') {

      cveRecordStore.isReserved = true;
      cveRecordStore.isArecord = false;

    } else if (idData.state === 'REJECTED') {

      cveRecordStore.isRejected = true;
      cveRecordStore.isArecord = false;
    }

    handleIsIdOrRecordFound(true);

  } catch (error) {

    if (!isClientError(error)) {

      handleServerError();
      return;
    }

    getIdStatusCode.value = getStatusCode(error) ?? 500;

    cveRecordStore.isArecord = false;

    handleIsIdOrRecordFound(false);
  }
}

function convertShortId(currentCveId) {

    // Probably due to the transition from cve.mitre.org to cve.org,
    // some Google search results include an "abbreviated" CVE ID in
    // the query (without the "CVE-" prefix).  It's easy to recognize
    // and add the prefix, and preferable to giving the user an error
    // message.  The given CVE ID must match the pattern exactly.

    const shortIdRegex = /^(?<year>\d{4})\p{Pd}(?<id>\d{4,})$/u;
    const shortIdMatch = shortIdRegex.exec(currentCveId);

    if (!shortIdMatch)
      return currentCveId;

    const year = shortIdMatch.groups.year;
    const id = shortIdMatch.groups.id;
    const fullCveId = `CVE-${year}-${id}`;

    return fullCveId;
}

function normalizeCveId(currentCveId) {

  // The given CVE ID is normalized by removing any leading/trailing
  // whitespace, capitalizing (the "CVE" prefix), and converting any
  // "legacy short id" to the current ID format.

  return convertShortId(String(currentCveId ?? '').trim().toUpperCase());
}

function resetStateFlags() {

  cveRecordStore.isPublished = false;
  cveRecordStore.isReserved = false;
  cveRecordStore.isRejected = false;
}

function resetStates() {

  cveRecordStore.$reset();
}

function setLoadingState(newState) {

  cveRecordStore.showHelpText = newState;
  cveRecordStore.isSearching = newState;
}

function getQueryId(value) {

  return Array.isArray(value) ? value[0] : value;
}

function handleServerError() {

  cveRecordStore.serverError = true;
  cveRecordStore.isArecord = undefined;
  setLoadingState(false);
}

function handleIsIdOrRecordFound(newState) {

  cveRecordStore.serverError = false;
  cveRecordStore.isIdOrRecordFound = newState;
  setLoadingState(false);
}

function initializeLookup() {

  cveRecordStore.isSearching = true;
  cveRecordStore.serverError = false;
  cveRecordStore.showHelpText = false;
}

function getStatusCode(error) {

  // Returns the response code if there's an error, and undefined otherwise.

  return axios.isAxiosError(error) ? error.response?.status : undefined;
}

function isClientError(error) {

  // Returns true if the response code is in the 400s, indicating a client
  // error.

  return axios.isAxiosError(error) && error.response?.status >= 400
    && error.response?.status < 500;
}

function validateCveId(currentCveId) {

  // Returns true if the given CVE ID is in the proper format, false
  // otherwise.

  if (!cveRecordStore.isValidCveId(currentCveId)) {

    errorMessageStore.cveIdFormatMessage();

    return false;
  }

  return true;
}

watch(() => getQueryId(route.query.id),
      async (rawId) => {

        // This watcher callback handles both the initial page load and any
        // changes in the route (new CVE IDs).

        const normalizedCveId = normalizeCveId(rawId);

        if (!normalizedCveId) {

          resetStates();
          cveRecordStore.showHelpText = true;

          return;
        }

        if (rawId !== normalizedCveId) {

          await router.replace({path: route.path,
                                query: {...route.query, id: normalizedCveId},
                                hash: route.hash});

          return;
        }

        cveId.value = normalizedCveId;

        if (!validateCveId(normalizedCveId)) {

          resetStates();
          cveRecordStore.showHelpText = true;

          return;
        }

        await lookupCveRecord(normalizedCveId);
      },
      {immediate: true}
);

useHead(() => ({
  title: cveId.value ? `CVE Record: ${cveId.value}` : 'CVE Record',
  meta: [
    {
      name: 'description',
      content: cveId.value ? `Vulnerability detail for ${cveId.value}`
        : 'CVE Record'
    }
  ]
}));

</script>
