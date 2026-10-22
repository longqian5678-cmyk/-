<template>
<div>
  <main id="cve-main-page-content" role="main">
  <section class="hero" >
    <div class="hero-body">
    <div class="container cve-mission-container mt-1">
      <h1 class="title is-hidden">CVE</h1>
      <h2 class="title">
        CVE<sup id="cve-mission-trademark">&trade;</sup> Program Mission
      </h2>
      <div id="cve-mission-text" class="subtitle">
        Identify, define, and catalog publicly disclosed cybersecurity vulnerabilities.
        <button v-if="cveRecordsLoading" class="button is-loading cve-margin-top-neg7 cve-button-ghost"></button>
        <p class="subtile mt-2" v-if="!cveRecordsLoading && !cveRecordsRequestErrored">
          There are currently over <span class="has-text-weight-bold">{{cveRecordsTotal}}</span>
          CVE Records accessible via <router-link to="/Downloads">Download</router-link>
          or <span class="has-text-weight-bold">Keyword Search</span> above.
        </p>
      </div>
      <div class="notification is-warning is-light" role="alert" v-if="cveRecordsRequestErrored">
        <div class="is-flex" style="justify-content: center;">
          <p id="alertIconCveRecordsRequestErrored" class="is-hidden">alert</p>
          <font-awesome-icon style="flex: 0 0 40px;" size="1x"  icon="triangle-exclamation" role="img"
            aria-labelledby="alertIconCveRecordsRequestErrored" aria-hidden="false" />
          <p>
            Total count of CVE Records is currently unavailable. Please
            <span class="icon-text">
              <a href="https://cveform.mitre.org/" target="_blank">report the issue
                <span class="icon is-size-7 cve-icon-xxs">
                  <p id="extenalLinkReport" class="is-hidden">external site</p>
                  <font-awesome-icon icon="up-right-from-square" aria-labelledby="extenalLinkReport" aria-hidden="false" focusable="false"/>
                </span>
              </a>
            </span>
            and try again later. Sorry for the inconvenience.
          </p>
        </div>
      </div>
    </div>
    </div>
  </section>

  <div id="cve-homepage-columns-container" class="container">
    <HomeModule :cvenavs="cvenavs"/>
  </div>
  </main>

</div>
</template>

<script>
import HomeModule from '@/components/HomeModule.vue';
import axios from 'axios';

export default {
  components: {
    HomeModule
  },
  data() {
    return {
      cveRecordsTotal: 0,
      cveRecordsLoading: true,
      cveRecordsRequestErrored: false
    }
  },
  created() {
    this.getCVERecordsCount();
  },
  props: {
    cvenavs: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getCVERecordsCount() {
      const countUrl = this.GenericGlobalsStore.currentServicesUrl
        + '/api/cve_count?state=published';

      axios
        .get(countUrl)
        .then((res) => {

          // The API returns the record count as a Number value (not a string).

          let count = res.data.totalCount;

          // As of March 2025, we're reporting the CVE record count rounded
          // to the next lowest thousand, and reporting it as "over xxx"
          // thousand records (a la McDonald's), instead of the actual count.

          count = Math.floor(count / 1000) * 1000;
          this.cveRecordsTotal = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
         })
        .catch(() => {
          this.cveRecordsRequestErrored = true;
        })
        .finally(() => {
          this.cveRecordsLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">

.hero {
  background: white;
  border-bottom: 0.5px solid $theme-color-base-lighter;
}

.hero-body {
  padding: 1.5rem 1rem;
}
.container.cve-mission-container {
  background: white;
  text-align: center;
}

.cve-margin-top-neg7 {
  margin-top: -7px !important;
}

#cve-mission-trademark {
  font-size: 18px;
}
</style>
