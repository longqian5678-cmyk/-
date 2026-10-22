<template>
  <div class="columns">
    <div class="column is-2 is-hidden-touch"></div>
    <div class="column is-full-mobile is-full-tablet is-7-desktop">
      <main id="cve-main-page-content">
        <div class="content">
          <nav class="level mb-0">
            <div class="level-left">
              <div class="level-item">
                <h1 class="title">{{publishedRecord.id}}</h1>
              </div>
              <div class="level-item">
                <span class="tag is-info is-light is-normal has-text-weight-bold
                  cve-state-tag">{{publishedRecord.state}}
                </span>
              </div>
              <div class="level-item">
                <SadpTag :hasSadp="publishedRecord.hasSadp"
                  :anchor="sadpContainerAnchor"/>
              </div>
            </div>
            <div class="level-right ml-1">
              <div class="level-item">
                <span class="icon-text">
                  <a id="cve-view-json"
                    :href="`${cveServicesBaseUrl}/api/cve/${publishedRecord.id}`"
                    target="_blank">
                    <span class="icon" aria-hidden="true">
                      <font-awesome-icon icon="file-code"/>
                    </span>
                    View JSON
                  </a>
                </span>
              </div>
              <div class="level-item is-hidden-mobile">
                |
              </div>
              <div class="level-item">
                <span class="icon-text">
                  <router-link to="/CVERecord/UserGuide">
                    <span class="icon" aria-hidden="true">
                      <font-awesome-icon icon="book"/>
                    </span>
                    User Guide
                  </router-link>
                </span>
              </div>
            </div>
          </nav>
          <hr/>
          <nav class="level mb-0 is-mobile">
            <div class="level-left">
            </div>
            <div class="level-right ml-1">
              <div class="level-item">
                <div id="cve-accordion-expand-collapse-all-btn" class="buttons mb-0 is-align-content-flex-end">
                  <button id="expand-collpse-all-btn" @click="toggleAccordion" class="button is-small cve-button"
                  >
                    {{ cveRecordStore.accordionState.collapseAll ? 'Collapse' : 'Expand' }} all
                  </button>
                </div>
              </div>
            </div>
          </nav>
          <div class="mt-2">
            <div :id="onPageMenu[cveRecordHeading].anchorId">
              <h2 class="title">{{cveRecordHeading}}</h2>
              <AdpVulnerabilityEnrichment
                v-if="publishedRecord.hasCna && !cnaViolation"
                :datePublished="publishedRecord.datePublished"
                :containerObject="publishedRecord.cna"
                :orgId="`cna-${publishedRecord.cna.orgId}`"
                :id="onPageMenu[cveRecordHeading].items['CNA'].anchorId">
                <h1 class="mb-1 has-text-white">
                  {{ onPageMenu[cveRecordHeading].items['CNA'].label }}
                </h1>
              </AdpVulnerabilityEnrichment>
              <AdpVulnerabilityEnrichment v-if="publishedRecord.hasCveProgram"
                :containerObject="publishedRecord.cveProgram"
                :orgId="`cve-program-${publishedRecord.cveProgram.orgId}`"
                :id="onPageMenu[cveRecordHeading].items['CVE Program'].anchorId">
                <h1 class="mb-1 has-text-white cve-capitalize-first-letter">
                  {{onPageMenu[cveRecordHeading].items['CVE Program'].label}}
                </h1>
              </AdpVulnerabilityEnrichment>
              <AdpVulnerabilityEnrichment
                v-if="cnaViolation"
                :datePublished="publishedRecord.datePublished"
                :containerObject="publishedRecord.cna"
                :orgId="`cna-${publishedRecord.cna.orgId}`"
                :id="onPageMenu[cveRecordHeading].items['CNA'].anchorId">
                <h1 class="mb-1 has-text-white">
                  {{ onPageMenu[cveRecordHeading].items['CNA'].label }}
                </h1>
              </AdpVulnerabilityEnrichment>
            </div>
            <div v-if="publishedRecord.hasAdp"
              :id="onPageMenu[adpRecordHeading].anchorId" class="mt-6">
              <h2 class="title mb-0">{{adpRecordHeading}}</h2>
              <div class="cve-learn-more mb-5">
                <router-link to="/ProgramOrganization/ADPs" class="cve-learn-more-link">Learn more</router-link>
              </div>
              <div class="cve-adp-container"
                v-for="adpContainer in publishedRecord.adp"
                :key="adpContainer.shortName">
                <AdpVulnerabilityEnrichment
                  :containerObject="adpContainer"
                  :orgId="`adp-${adpContainer.orgId}`"
                  :id="onPageMenu[adpRecordHeading].items[adpContainer.shortName].anchorId">
                  <h1 class="mb-1 has-text-white cve-capitalize-first-letter">
                    {{onPageMenu[adpRecordHeading].items[adpContainer.shortName].label}}
                  </h1>
                </AdpVulnerabilityEnrichment>
              </div>
            </div>
            <template v-if="publishedRecord.hasSadp">
              <div class="mt-6"
                :id="onPageMenu[sadpRecordHeading].anchorId" >
                <h2 class="title mb-0">{{sadpRecordHeading}}</h2>
                <div class="cve-learn-more mb-5">
                  <!-- Same link as ADPs? change anchor? -->
                    <router-link to="/ProgramOrganization/ADPs" class="cve-learn-more-link">Learn more</router-link>
                </div>
              </div>
              <div class="cve-sadp-container">
                <AdpVulnerabilityEnrichment
                  :containerObject="publishedRecord.sadp"
                  :orgId="`sadp-${publishedRecord.sadp.orgId}`"
                  :id="sadpContainerAnchor">
                  <h1 class="mb-1 has-text-white cve-capitalize-first-letter">
                    {{onPageMenu[sadpRecordHeading].items[publishedRecord.sadp.shortName].label}}
                  </h1>
                </AdpVulnerabilityEnrichment>
              </div>
            </template>
          </div>
        </div>
      </main>
    </div>
    <div class="column is-3 is-hidden-touch cve-sticky-nav">
      <OnPageSidebar :nav="cveRecordStore.onPageMenuItems"/>
    </div>
  </div>
</template>

<script>
import AdpVulnerabilityEnrichment from '@/components/AdpVulnerabilityEnrichment.vue';
import OnPageSidebar from '@/components/OnPageSidebar.vue';
import SadpTag from '@/components/SadpTag.vue';
import { CveObject } from '@/models/cveObject';
import { usecveRecordStore } from '@/stores/cveRecord.ts';
import { usePartnerStore } from '@/stores/partners';

export default {
  name: 'PublishedRecord',
  components: {
    AdpVulnerabilityEnrichment,
    OnPageSidebar,
    SadpTag
  },
  data() {
    return {
      cveRecordHeading: 'Required CVE Record Information',
      adpRecordHeading: 'Authorized Data Publishers',
      sadpRecordHeading: 'Supplier Authorized Data Publisher',
      isMessageExpanded: false,
      isHelpTestShown: false,
      originalRecordData: usecveRecordStore().recordData || {},
      cnaViolation: false,
      cveServicesBaseUrl: this.GenericGlobalsStore.currentServicesUrl,
      cveRecordStore: usecveRecordStore(),
      partnerStore: usePartnerStore(),
      onPageMenu: {},
      publishedRecord: {}
    };
  },
  computed: {
    sadpContainerAnchor() {

      if (!this.publishedRecord.hasSadp)
        return '';

      return this.onPageMenu[this.sadpRecordHeading]
        .items[this.publishedRecord.sadp.shortName].anchorId;
    }
  },
  methods: {
    toggleAccordion() {
      const newPanelState = !this.cveRecordStore.accordionState.collapseAll;
      Object.keys(this.cveRecordStore.accordionState).forEach( (panelName) => {
        this.cveRecordStore.accordionState[panelName] = newPanelState;
      });
    },
    onPageMenuData() {

      const onPageMenu = {};

      const urlPath = `CVERecord?id=${this.publishedRecord.id}`;

      onPageMenu[this.cveRecordHeading] = {
        id: '100.0.0',
        anchorId: 'cna-cve-program-containers',
        label: this.cveRecordHeading,
        path: urlPath,
        items: {}
      };

      const cna = this.publishedRecord.cna;
      const ownerName = this.publishedRecord.ownerName;

      const cnaName = this.partnerStore.getOrganizationName(cna.shortName,
                                                            cna.orgId,
                                                            ownerName);

      onPageMenu[this.cveRecordHeading].items['CNA'] = {
        label: `CNA: ${cnaName}`,
        anchorId: `cna-${cna.orgId}`
      };

      if (this.publishedRecord.hasCveProgram) {

        onPageMenu[this.cveRecordHeading].items['CVE Program'] = {
          label: 'CVE Program',
          anchorId: 'cve-program'
        };
      }

      if (this.publishedRecord.hasAdp) {

        onPageMenu[this.adpRecordHeading] = {
          id: '100.0.1',
          anchorId: 'cve-adp-containers',
          label: this.adpRecordHeading,
          path: urlPath,
          items: {}
        };

        this.publishedRecord.adp.forEach((adp) => {

          const adpName = this.partnerStore.getOrganizationName(adp.shortName,
                                                                adp.orgId);

          const item = {
            label: adpName,
            anchorId: `adp-${adp.orgId}`
          };

          onPageMenu[this.adpRecordHeading].items[adp.shortName] = item;
        });
      }

      if (this.publishedRecord.hasSadp) {

        onPageMenu[this.sadpRecordHeading] = {
          id: '100.0.2',
          anchorId: 'cve-sadp-container',
          label: this.sadpRecordHeading,
          path: urlPath,
          items: {}
        };

        const sadp = this.publishedRecord.sadp;

        const sadpName = this.partnerStore.getOrganizationName(sadp.shortName,
                                                               sadp.orgId);

        onPageMenu[this.sadpRecordHeading].items[sadp.shortName] = {
          label: sadpName,
          anchorId: `sadp-${sadp.orgId}`
        };
      }

      this.cveRecordStore.onPageMenuItems.submenu = onPageMenu;

      this.onPageMenu = onPageMenu;
    },
    setupAccordionStateOnPageMenu() {

      this.cveRecordStore.accordionState[`cna-${this.publishedRecord.cna.orgId}`] = true;

      if (this.publishedRecord.hasCveProgram)
        this.cveRecordStore.accordionState[`cve-program-${this.publishedRecord.cveProgram.orgId}`] = true;

      this.publishedRecord.adp.forEach((adp) => {
        this.cveRecordStore.accordionState[`adp-${adp.orgId}`] = false;
      });

      if (this.publishedRecord.hasSadp)
        this.cveRecordStore.accordionState[`sadp-${this.publishedRecord.sadp.orgId}`] = false;
    },
    initializeFields() {
      this.publishedRecord = new CveObject(this.cveRecordStore.idData);
      this.publishedRecord.apply(this.originalRecordData);
      this.onPageMenuData();
      this.cnaViolation = this.isViolatingCna();

    },
    isViolatingCna() {

      // If a CVE Program container exists for this CVE record, and one of
      // the references' URLs ends with the following, then the CVE is
      // considered "in violation" and the CNA will be displayed differently
      // to indicate this violation.

      const targetUrl = '/preserving-vulnerability-level-identification';

      const isViolating = this.publishedRecord.cveProgram?.references.some((ref) => {

        return ref.url.toLowerCase().endsWith(targetUrl);
      })

      return !!isViolating;
    },
    handleCnaViolation() {

      // For a CVE record violation, both the subtitle on the on-page menu and
      // the accordion section heading for the CNA are changed to indicate the
      // violation.  The CNA accordion section is initially collapsed, which is
      // also a difference from a "conforming" CVE record.

      const cnaLabelRegex = /^CNA:\s+(?<cnaName>.*)$/i;
      const onPageMenuItems = this.onPageMenu[this.cveRecordHeading].items;
      const cnaItem = onPageMenuItems['CNA'];
      const newMenuItems = {};
      const violationText = 'CNA (incomplete; multiple vulnerabilities)';

      for (const [key, item] of Object.entries(onPageMenuItems)) {

        if (key !== 'CNA') {
            newMenuItems[key] = item;
        }
      }

      cnaItem.label = cnaItem.label.replace(cnaLabelRegex,
                                            `${violationText}: $<cnaName>`);

      newMenuItems['CNA'] = cnaItem;

      this.cveRecordStore.accordionState[cnaItem.anchorId] = false;
    }
  },
  beforeMount() {

    this.initializeFields();
    this.setupAccordionStateOnPageMenu();

    if (this.isViolatingCna())
      this.handleCnaViolation();
  }
};

</script>

<style scoped lang="scss">

@use 'cveRecord' as *;

.columns {
  margin-top: 0rem !important;
}

.columns:not(:last-child) {
    margin-bottom: 0.5rem !important;
}

.cve-state-tag {
  background-color: $theme-color-blue-warm-20 !important;
  color: $theme-color-base-darkest !important;
}

// fix and override Bulma icon with link alignment
.icon {
  display: inline-table;
  text-align: center;
}

.cve-sticky-nav {
  position: sticky;
  display: inline-block;
  vertical-align: top;
  max-height: 50vh;
  overflow-y: auto;
  top: 0;
  bottom: 0;
  padding-top: 50px;
}
</style>
