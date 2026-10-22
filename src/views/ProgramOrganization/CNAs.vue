<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 :id="cvenavs['Program Organization']['submenu']['CVE Numbering Authorities']" class="title">
              {{cvenavs['Program Organization']['submenu']['CVE Numbering Authorities']['label']}}
            </h1>
            <p>
              CNAs are vendor, researcher, open source, CERT, hosted service, bug bounty provider, and consortium organizations authorized by the
              CVE Program to assign
              <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryCVEID">CVE IDs</router-link>
              to vulnerabilities and publish
              <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CVE Records</router-link>
              within their own specific scopes of coverage.
            </p>
            <p>
              CNAs <router-link to="/PartnerInformation/Partner#CNA">join the program</router-link> from a variety of
              business sectors; there are minimal requirements, and there is no monetary fee or contract to sign.
              View the list of <router-link to="/PartnerInformation/ListofPartners">CNA partners</router-link>.
            </p>
            <h2 :id="cvenavs['Program Organization']['submenu']['CVE Numbering Authorities']['items']['CNA Program Growth']['anchorId']"
              class="title">
              {{cvenavs['Program Organization']['submenu']['CVE Numbering Authorities']['items']['CNA Program Growth']['label']}}
            </h2>
            <p>
              Currently, there are
              <router-link to="/PartnerInformation/ListofPartners">{{parseInt(cnaCount) + parseInt(cnalrCount)}} CNAs</router-link>
              ({{cnaCount}} CNAs and {{cnalrCount}} CNA-LRs) from
              <router-link to="#map">{{usePartnerStoreInstance.countriesCount}} countries</router-link>
               and {{ usePartnerStoreInstance.countries['No country affiliation'] }} no country affiliation participating in the CVE Program.
            </p>
            <h3 class="title mt-5" id="map">CNA Partners By Country</h3>
            <partner-map></partner-map>
            <div class="columns" style="text-align: left; font-style">
              <div class="column" v-for="chunk in chunkedCountries" :key="chunk.index">
                <ul v-for="[country, count ] in chunk" :key="country.index" class="mt-2 mb-2">
                  <li @click="selectCountry(country)" class="cve-country-list" :class="{'cve-selected-country': selectedCountry == country}" style="list-style-type: none;">
                  {{country}}: {{count}}
                  </li>
                </ul>
              </div>
            </div>
          </div> <!-- end content -->
        </main>
      </div>
      <div class="column is-3 is-hidden-touch">
        <NavigationSidebar :nav="cvenavs['Program Organization']" />
      </div>
    </div>
  </div>
</template>

<script>
import NavigationSidebar from '@/components/NavigationSidebar.vue';
import PartnerMap from '@/views/ProgramOrganization/PartnerMap.vue'
import { usePartnerStore } from '@/stores/partners';

export default {
  name: 'CNAs',
  components: {
    NavigationSidebar,
    PartnerMap
  },
  props: {
    cvenavs: {
      type: Object,
      required: true,
    },
  },
  computed: {
    usePartnerStoreInstance() {
      return usePartnerStore().partnerCounts;
    },
    chunkedCountries() {
      let countries = [];
      const CHUNK_SIZE = 4; const chuckedList = []; let chunk = 0; let i; let j; let k;

      countries = this.sortJson(usePartnerStore().partnerCounts.countries);
      chunk = countries.length / CHUNK_SIZE;
      for (i = 0, k = 0, j = countries.length; i < j; i += chunk, k += 1) {
        chuckedList[k] = countries.slice(i, i + chunk);
      }

      return chuckedList;
    },
    cnaCount() {
      return usePartnerStore().partnerCounts.role['CNA'];
    },
    cnalrCount() {
      return usePartnerStore().partnerCounts.role['CNA-LR'];
    },
    selectedCountry() {
      return usePartnerStore().selectedPartnerCountry;
    },
  },
  methods: {
    sortJson(orignalJson) {
      return Object.entries(orignalJson).sort((a, b) => a[0].localeCompare(b[0]));
    },
    selectCountry(country) {
      usePartnerStore().selectedCountryInternalChange = false;
      usePartnerStore().selectedPartnerCountry = country;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.content {
    margin-left: unset !important;
    margin-right: unset !important;
}

.cve-country-list:hover {
  background-color: #97d4ea5e;
  cursor: pointer;
}

.cve-selected-country {
  background-color: $theme-color-accent-cool-light !important;
}

</style>
