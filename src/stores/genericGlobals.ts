import { defineStore } from 'pinia';

const cveServicesBaseUrl = import.meta.env.VITE_CVE_SERVICES_BASE_URL;

const cveBaseUrl = import.meta.env.VITE_API_BASE_URL;

const cveServicesTestBaseUrl = cveBaseUrl?.toLowerCase().includes('dev.')
  ? 'https://cveawg-dev.mitre.org' : 'https://cveawg-test.mitre.org';

export const useGenericGlobalsStore = defineStore('genericGlobals', {
  state: () => {
    const cveServicesBaseUrlFromEnv = `https://${cveServicesBaseUrl}`;
    const storedUseSearch = sessionStorage.getItem('useSearch');
    const storedCurrentServicesUrl = sessionStorage.getItem('currentServicesUrl');
    return {
      isProductionWebsite: import.meta.env.VITE_WEBSITE_ENVIRONMENT === 'prd',
      useSearch: storedUseSearch ? JSON.parse(storedUseSearch) : true,
      currentServicesUrl: storedCurrentServicesUrl ? JSON.parse(storedCurrentServicesUrl)
                          : cveServicesBaseUrlFromEnv,
      cveServicesBaseUrl: cveServicesBaseUrlFromEnv,
      cveServiceTestBaseUrl: cveServicesTestBaseUrl,
      legacyCveWebsiteLink: 'https://cve.mitre.org/cve/search_cve_list.html'
    };
  },
  actions: {
    setUseSearch(value: boolean) {
      this.useSearch = value;
      sessionStorage.setItem('useSearch', JSON.stringify(value));
    },
    setCurrentServicesUrl(value: boolean) {
      this.currentServicesUrl = value;
      sessionStorage.setItem('currentServicesUrl', JSON.stringify(value));
    }
  },
});
