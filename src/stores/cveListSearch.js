import { defineStore } from 'pinia';
import { useErrorMessageStore } from './cveRecord';
import { useGenericGlobalsStore } from './genericGlobals';
import axios from 'axios';

// Users may search for a CVE ID by either specifying it with or without quotes.
// The regular expresssion object defined here will detect if a string is solely
// a CVE ID (quotes optional).  It's used to extract the CVE ID. This helps to
// yield consistent results independent of whether the user has enclosed the CVE
// ID in quotes.

const cveIdRegex = '(?<cveid>CVE-\\d{4}-\\d{4,7})';

const searchCveIdRegex = `^"?${cveIdRegex}"?\$`;

const searchCveIdRe = RegExp(searchCveIdRegex, 'i');

export const useCveListSearchStore = defineStore('cveListSearch ', {
  state: () => {
    return {
      cveId: '',
      from: 0,
      isArecord: undefined,
      isAnId: undefined,
      isSearchButtonDisabled: true,
      isIdOrRecordFound: true,
      isPublished: false,
      isReserved: false,
      isRejected: false,
      isSearching: false,
      isLookingUpRecord: false,
      isQueryingSearchService: false,
      isLookUpRecordServerError: false,
      isSearchServerError: false,
      query: '',
      idData: {},
      recordData: {},
      searchResults: [],
      searchType: true,
      serverError: false,
      showHelpText: false,
      size: 25,
      totalExecutingRequests: -1,
      totalSearchResultCount: 0,
      pagination: {
        startWindow: 1,
        endWindow: undefined,
        firstPage: 1,
        currentPage: 1,
        currentPageWindow: [],
        totalPages: undefined,
        maxPageWindow: 5,
        numberPerPage: 25,
        sortBy: {
          field: 'cveId',
          direction: 'desc',
          label: 'CVE ID (new to old)',
          selected: true
        },
        sortByOptions: [
          {
            field: 'cveId',
            direction: 'desc',
            label: 'CVE ID (new to old)',
            selected: true
          },
          {
            field: 'cveId',
            direction: 'asc',
            label: 'CVE ID (old to new)',
            selected: false
          }
        ],
        numberPerPageOptions: [25, 50, 100, 200],
        fromCount: undefined,
        toCount: undefined
      },
    }
  },
  actions: {
    cveIdSearchTerm() {

        // This method returns true if the search query is a CVE ID, optionally
        // surrounded by quotes.  If this is the case, the CVE ID is extracted,
        // normalized, and the query set to the quoted CVE ID.  By enclosing
        // the CVE ID in quotes, the search won't break it up into its parts
        // which is certainly not what the user expects.  This will make the
        // search quicker and provide better results for CVE ID only searches.

        const cveIdMatch = searchCveIdRe.exec(this.query);
        if (cveIdMatch) {
          this.cveId = cveIdMatch.groups.cveid.toUpperCase();
          this.query = `"${this.cveId}"`;
        }

        return cveIdMatch !== null;
    },
    decrement(field) {
      this[field] -= 1;
    },
    resetResults() {
      this.searchResults = [];
      this.totalSearchResultCount = 0;
    },
    async search() {
      this.isSearching = true;

      const isCveIdSearch = this.cveIdSearchTerm();

      try {

        // * query search service
        this.totalExecutingRequests = 1;

        await this.getSearchResults();

        if (isCveIdSearch) {

          // The user's query is one CVE ID.

          if (this.searchResults.length === 1
              && this.searchResults[0].cveId === this.cveId) {

            // The search returned only ONE result and it's the CVE record
            // associated with the CVE ID given as the search string.  Most
            // likely, the user just wants to see the CVE Record and not the
            // search results containing only the CVE link for the record
            // they're searching for (just to have to click on the CVE link to
            // get to the CVE Record).  In this case, change the route to
            // go directly to the CVE Record display.

            this.router.push({
              name: 'CVERecord',
              query: {id: this.cveId},
              replace: true
            });
          } else {

            this.totalExecutingRequests = 2;

            // lookup ID to get Record data
            await this.getRecordData();
          }
        }
      } catch (error) {
        // if record is not found, find potential reserved/rejected ID
        if (isCveIdSearch && Object.keys(this.recordData).length === 0) {
          await this.getIdData();
        } else
          throw new Error(`search() >> error with getSearchResults(), getRecordData(): ${error}`);
      } finally {
        this.isSearching = false;
        this.setUpInitialPagination();
      }
    },
    async getRecordData() {
      this.isLookingUpRecord = true;
      const getRecordUrl = `${useGenericGlobalsStore().currentServicesUrl}/api/cve/${this.cveId}`;

      try {
        const response = await axios.get(getRecordUrl);
        const cveRecordData = response?.data || {};
        this.isArecord = true;
        this.isIdOrRecordFound = true;

        // format description
        let descriptions = this.processDescriptionsField(cveRecordData);

        let recordDataSummary = {
          cveId: cveRecordData?.cveMetadata?.cveId || 'No ID provided',
          cna: cveRecordData?.containers?.cna?.providerMetadata?.shortName || 'No CNA provided',
          cnaOrgId: cveRecordData?.containers?.cna?.providerMetadata?.orgId || '',
          descriptions: descriptions,
          relevancyScore: 'not applicable'
        }
        this.recordData = recordDataSummary;

        if (cveRecordData?.cveMetadata.state === 'PUBLISHED') {
          this.isPublished = true;
        } else if (cveRecordData?.cveMetadata.state === 'REJECTED') {
          this.isRejected = true;
        }

      } catch (error) {
        this.isLookUpRecordServerError = true;

        this.isPublished = false;
        this.isReserved = false;
        this.isRejected = false;
        this.isIdOrRecordFound = false;
        this.isArecord = false;
        throw new Error('getRecordData >> throwing error');
      } finally {
        this.isLookingUpRecord = false;
        this.decrement('totalExecutingRequests');
      }
    },
    async getIdData() {
      const getIdUrl = `${useGenericGlobalsStore().currentServicesUrl}/api/cve-id/${this.cveId}`;
      try {
        const response = await axios.get(getIdUrl);
        const idData = response.data ?? {};
        this.isIdOrRecordFound = true;
        this.isAnId = true;
        if (response.status === 200 && response.data?.error === undefined) {
          this.idData = idData;
          if (idData.state === 'RESERVED') {
            this.isReserved = true;
            this.isArecord = false;
          } else if (idData.state === 'REJECTED') {
            this.isRejected = true;
            this.isArecord = false;
          }
        }

      } catch (error) {
        throw new Error('getIdData >> throwing error');
      }
    },
    async getSearchResults() {
      this.isQueryingSearchService = true;
      const searchUrl = 'https://dev.search.cve.org/webSearch';

      this.resetResults();

      try {
        const ems = useErrorMessageStore();
        let payLoad = this.createSearchPayload();
        const response = await axios.post(searchUrl, payLoad);

        if (!response.data) {

          // This shouldn't happen, but it has so it's possible.  This is
          // different from a successful search with no results - the service
          // returned nothing in the 'data' field.  Rather than ignore it,
          // indicate with a message that nothing was returned.  The problem may
          // be that the service can't handle something in the input string.

          ems.pushErrorMessage('No response data from search - check input');

        } else {

          const searchMetaData = response.data.searchMetadata;

          // Until the search service returns search and/or server errors as
          // 400 & 500 response codes, it'll return a message starting with
          // the following, and it really indicates that there is a problem
          // with the user's input (the placement of symbols in the search
          // term(s)).  We are going to present the user with a different
          // message for now.

          const serverErrorText = 'Server error. Please try again later';

          if (searchMetaData.searchStatus === 'ok') {
            this.totalSearchResultCount = response.data.resultsTotal;
            this.processSearchResults(response.data.data);
          } else if (searchMetaData.errors.length == 1
                     && searchMetaData.errors[0].message.startsWith(serverErrorText)) {

            const message = 'Search returned no results, possibly due to '
              + 'placement and/or use of symbols (punctuation) in your '
              + 'search terms.';

              ems.pushErrorMessage(message);
          } else {
            // There's likely something invalid in the search string.
            // Error message(s) and note(s) returned in the response will be
            // displayed to the user.
            //
            // We could reset the error message store here, because this is a
            // "new" search, but resetting may also mask an issue where the
            // search is inadvertently done multiple times (resulting in
            // duplicate error messages displayed).

            searchMetaData.errors.forEach(e => ems.pushErrorMessage(e.message));
            searchMetaData.notes.forEach(n => ems.pushErrorMessage(n));
          }
        }
      } catch (e) {
        this.isSearchServerError = true;
        if (e.code !== 'ERR_NETWORK')
          throw new Error(`getSearchResults >> : ${e}`);
      } finally {
        this.isQueryingSearchService = false;
        this.decrement('totalExecutingRequests');
      }
    },
    hasSadp(cveRecord) {

        return cveRecord.adp?.some((adp) => (adp.x_adpType === 'supplier'
              || adp.providerMetadata.shortName.endsWith('-SADP')));
    },
    processSearchResults(results){
      const parsedResults = [];

      if (results.length > 0) {
        results.forEach((result) => {
          parsedResults.push({
            cveId: result._id,
            cna: result?._source?.containers?.cna?.providerMetadata?.shortName || 'No CNA provided',
            cnaOrgId: result?._source?.containers?.cna?.providerMetadata?.orgId || '',
            descriptions: this.processDescriptionsField(result?._source),
            hasSadp: this.hasSadp(result._source.containers),
            relevancyScore: result?._score
          });
        });
      }

      this.searchResults = parsedResults;
    },
    processDescriptionsField(recordData){
      let descriptions = [];
      if (recordData.cveMetadata?.state === "PUBLISHED") {
        recordData.containers?.cna?.descriptions.forEach((description) => {
          if (this.isEnglishLanguage(description.lang))
            descriptions.push(this.processShowMoreShowLessDescription(description.value));
        });
      } else if (recordData.cveMetadata?.state === "REJECTED") {
        recordData.containers?.cna?.rejectedReasons.forEach((rejectedReason) => {
          if (this.isEnglishLanguage(rejectedReason.lang))
            descriptions.push(this.processShowMoreShowLessDescription(rejectedReason.value));
        });
      } else {
        // reserved/rejected ID w/o a CVE record does not have description, and
        // that logic is handled in corresponding Vue file
        descriptions.push('No description provided');
      }

      return descriptions;
    },
    processShowMoreShowLessDescription(description){
      let words = this.splitDescriptionsIntoWords(description);
      let processedDescription = {
        firstChunk: words.splice(0, 30).join(' '),
        secondChunk: words.join(' '),
        showMore: false,
      };

      return processedDescription;
      // if 1st or 2nd arr empty then don't display
    },
    splitDescriptionsIntoWords(str) {
      const value = str.trim()
      if(!value) return 0;
      return value.split(/\s+/);
    },
    setUpInitialPagination() {
      if (Object.keys(this.pagination.currentPageWindow).length === 0 && this.totalSearchResultCount > 0) {
        // sets up these values for the first search request and the rest is handled in SearchResults component
        this.pagination.totalPages = Math.ceil(this.totalSearchResultCount / this.pagination.numberPerPage);
        if (this.pagination.totalPages < this.pagination.maxPageWindow) {
          this.pagination.endWindow = this.pagination.maxPageWindow = this.pagination.totalPages;
        } else {
          this.pagination.endWindow = this.pagination.maxPageWindow;
        }

        this.pagination.currentPageWindow = this.calcRange(this.pagination.startWindow, this.pagination.endWindow);
        this.calcToAndFromCounts();
      }
    },
    async paginate() {
      try {
        this.calcToAndFromCounts();

        // search service starts at 0 while this app starts at 1
        this.from = (parseInt(this.pagination.currentPage) * parseInt(this.pagination.numberPerPage)) - parseInt(this.pagination.numberPerPage);
        if (parseInt(this.from) + parseInt(this.pagination.numberPerPage) > parseInt(this.totalSearchResultCount)) {
          this.size = parseInt(this.totalSearchResultCount) - parseInt(this.from);
        } else {
          this.size = parseInt(this.pagination.numberPerPage);
        }

        await this.search();
      } finally {
        this.router.push({
          name: 'SearchResults',
          query: {query: this.query},
          replace: true
        });
      }
    },
    calcRange(start, stop) {
      const startInt = parseInt(start);
      const stopInt = parseInt(stop);
      const step = 1;

      let newArr = Array.from({ length: (stopInt - startInt) / step + 1 }, (_, i) => startInt + i * step);
      return newArr
    },
    calcToAndFromCounts(){
      this.pagination.fromCount = (parseInt(this.pagination.currentPage) * parseInt(this.pagination.numberPerPage) - parseInt(this.pagination.numberPerPage)) + 1;
      if (this.totalSearchResultCount >= (this.pagination.numberPerPage * this.pagination.currentPage)){
        this.pagination.toCount = parseInt(this.pagination.currentPage) * parseInt(this.pagination.numberPerPage);
      } else if (this.pagination.fromCount === this.totalSearchResultCount) {
        this.pagination.toCount = undefined;
      } else {
        this.pagination.toCount = this.totalSearchResultCount;
      }
    },
    createSearchPayload() {
      let payLoad = {
        "query": this.query,
        "from": parseInt(this.from),
        "size": parseInt(this.size),
        "sort": {
          "property": this.pagination.sortBy.field,
          "order": this.pagination.sortBy.direction
        }
      }

      return payLoad;
    },
    getResults() {
      this.pagination.currentPage = 1;
      this.paginate();

      this.pagination.totalPages = Math.ceil(this.totalSearchResultCount / this.pagination.numberPerPage);
      if (this.pagination.totalPages < this.pagination.maxPageWindow) {
        this.pagination.endWindow = this.pagination.totalPages;
      } else {
        this.pagination.endWindow = this.pagination.maxPageWindow;
      }

      this.pagination.startWindow = 1;
      this.pagination.currentPageWindow = this.calcRange(this.pagination.startWindow, this.pagination.endWindow);
      this.calcToAndFromCounts();
    },
    sortResults() {
      this.getResults();
    },
    handleNumberPerPageChange() {
      this.getResults();
    },
    handlePageChange(pageNum) {
      this.pagination.currentPage = pageNum;
      this.paginate();
    },
    handlePreviousWindowChange() {
      const maxPageWindow = parseInt(this.pagination.maxPageWindow);
      const isPartialWindow = (parseInt(this.pagination.endWindow) % maxPageWindow) > 0;
      this.pagination.currentPage = parseInt(this.pagination.currentPage) - maxPageWindow;
      this.pagination.startWindow = parseInt(this.pagination.startWindow) - maxPageWindow;
      this.pagination.endWindow = isPartialWindow ? (this.pagination.startWindow + (maxPageWindow - 1)) : this.pagination.endWindow - maxPageWindow;
      this.pagination.currentPageWindow = this.calcRange(this.pagination.startWindow, this.pagination.endWindow);
      this.paginate();
    },
    handleNextWindowChange() {
      const maxPageWindow = parseInt(this.pagination.maxPageWindow);
      const totalPages = parseInt(this.pagination.totalPages);
      const endWindow = parseInt(this.pagination.endWindow);
      const isPartialWindow = (totalPages - (endWindow + maxPageWindow)) < 0;
      const currentPageExceedsMaxPage = (this.pagination.currentPage + maxPageWindow) > totalPages;
      const partialWindowSize =  totalPages % maxPageWindow;

      this.pagination.currentPage = isPartialWindow && currentPageExceedsMaxPage ? totalPages : this.pagination.currentPage + maxPageWindow;
      this.pagination.startWindow = parseInt(this.pagination.startWindow) + maxPageWindow;
      this.pagination.endWindow = isPartialWindow ? endWindow + partialWindowSize : endWindow + maxPageWindow;
      this.pagination.currentPageWindow = this.calcRange(this.pagination.startWindow, this.pagination.endWindow);
      this.paginate();
    },
    handlePreviousPageChange() {
      this.pagination.currentPage = parseInt(this.pagination.currentPage) - 1;

      if (this.pagination.currentPage >= 1) {
        if (this.pagination.currentPage % this.pagination.maxPageWindow === 0) {
          this.pagination.endWindow = parseInt(this.pagination.currentPage);
          this.pagination.startWindow = parseInt(this.pagination.endWindow) - (parseInt(this.pagination.maxPageWindow) - 1);
        }

        this.pagination.currentPageWindow = this.calcRange(this.pagination.startWindow, this.pagination.endWindow);
        this.paginate();
      }
    },
    handleNextPageChange() {
      this.pagination.currentPage = parseInt(this.pagination.currentPage) + 1;
      if ((this.pagination.currentPage > this.pagination.endWindow) && (this.pagination.currentPage <= this.pagination.totalPages)) {
        this.pagination.startWindow = this.pagination.currentPage;

        if (this.pagination.startWindow === this.pagination.totalPages) {
          this.pagination.endWindow = this.pagination.startWindow;
        } else if ((this.pagination.endWindow + this.pagination.maxPageWindow) < this.pagination.totalPages) {
          this.pagination.endWindow = parseInt(this.pagination.endWindow) + this.pagination.maxPageWindow;
        } else if ((this.pagination.endWindow + this.pagination.maxPageWindow) > this.pagination.totalPages) {
          this.pagination.endWindow = parseInt(this.pagination.endWindow) + (this.pagination.totalPages - this.pagination.startWindow);
        }

        this.pagination.currentPageWindow = this.calcRange(this.pagination.startWindow, this.pagination.endWindow);
      }

      this.paginate();
    },
    handleShowMoreChange(resultIndex, descriptionIndex) {
      if (typeof resultIndex === 'number') {
        let description =  this.searchResults[resultIndex].descriptions[descriptionIndex];
        description.showMore = !description.showMore;
      } else {
        let description =  this.recordData.descriptions[descriptionIndex];
        description.showMore = !description.showMore;
      }
    },
    isEnglishLanguage(lang) {
      const regex = /^(en)/;
      const isEnglishLanguage = regex.test(lang);

      return isEnglishLanguage;
    },
  }
});