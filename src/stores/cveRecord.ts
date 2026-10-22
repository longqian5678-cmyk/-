import { defineStore } from 'pinia';
import _ from 'lodash';


export const usecveRecordStore = defineStore('cveRecord', {
  state: () => {
    return {
      cveId: '',
      cveIdRegex: /^CVE-\d{4}-\d{4,7}$/i,
      idData: {},
      isArecord: false,
      isIdOrRecordFound: false,
      isSearching: false,
      isRejected: false,
      isReserved: false,
      isPublished: false,
      recordData: {},
      serverError: false,
      showHelpText: false,
      showJsonRecord: false,
      hasAdpInfo: false,
      emptyProductStatus: {},
      accordionState: {
        collapseAll: true,
      },
      onPageMenuItems: {
        submenu: {}
      },
      orgIdAndLongNameMap: {},
    }
  },
  actions: {
    getReferences(references: Array<any>) {
      const value = references;
      const filteredReferences: Array<object> = [];

      if (this.hasData(value)) {
        const regex = /^x_refsource/;

        value.forEach((reference: {tags: Array<string>, hostname: string, name: string, url: string }) => {

          const filteredTags: Array<string> = [];

          if (reference?.tags) {
            reference.tags.forEach((tag: string) => {
              if (!regex.test(tag)) filteredTags.push(tag);
            });
          }
          const newReference: {tags: Array<string>, hostname: string, name: string, url: string } = _.cloneDeep(reference);
          newReference.tags = filteredTags;
          if (newReference?.name && newReference.name.length > 0) newReference.hostname = (new URL(newReference.url)).hostname.replace('www.', '');
          filteredReferences.push(newReference);
        });
      }

      return filteredReferences;
    },
    hasData(value: Array<object>) {
      if (typeof value !== 'undefined' && value.length > 0) {
        return true;
      }

      return false;
    },
    isValidCveId(cveId: string) {
      return this.cveIdRegex.test(cveId);
    },
  }
});


// The "error message" store handles the error message(s) displayed to the user
// just below the search input field.  A store is used because error messages
// triggered by the user's CVE ID input occur in both the CVERecord module and
// the cveRecordSearch module.  It's also used for messages returned by the
// search in cveListSearch.

type ErrorMessageState = {
  errorMessage: string[]
  showErrorMessage: boolean
}

export const useErrorMessageStore = defineStore('errorMessage', {
  state: (): ErrorMessageState => ({
    errorMessage: [],
    showErrorMessage: false,
  }),
  getters: {
    isErrorMessage: (state) => state.errorMessage.length > 0,
    lineCount: (state) => state.errorMessage.length,
  },
  actions: {
    cveIdFormatMessage() {
      const formatMessage = 'Required CVE ID format: CVE-YYYY-NNNN';
      this.setErrorMessage(formatMessage);
    },
    pushErrorMessage(message: string) {
      if (message.length) {
        this.errorMessage.push(message);
        this.showErrorMessage = true;
      }
    },
    setErrorMessage(message: string) {
      if (message.length) {
        this.errorMessage = [message];
        this.showErrorMessage = true;
      } else {
        this.errorMessage = [];
        this.showErrorMessage = false;
      }
    },
  }
});
