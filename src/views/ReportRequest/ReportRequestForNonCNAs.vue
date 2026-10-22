<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <div id="intro" class="content">
              <h1 :id="nonCNAs()['id']" class="title">
                {{nonCNAs()['alternatePageName']}}
              </h1>
              <p>
                Anyone can request a <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryCVEID">CVE ID</router-link> for a vulnerability or
                request an update to an existing <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CVE Record</router-link>.
                Learn more on the <router-link to="/About/Process">Process</router-link> page.
              </p>
            </div>
            <div id="requestCveId" class="content">
              <h2 :id="anchorId('Request a CVE ID')" class="title">
                {{sectionLabel('Request a CVE ID')}}
              </h2>
              <p>
                Other contributors (not a <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CNA</router-link>)
                follow the instructions below.
              </p>
              <div class="otherContributors">
                <div class="timeline">
                  <div class="timeline-item">
                    <div class="timeline-marker">1</div>
                    <div class="timeline-content">
                      <h4 class="title">Find the CVE Numbering Authority (CNA)</h4>
                      <p>
                        Find the CNA partner whose scope includes the product affected by the vulnerability on the
                        <router-link to="/PartnerInformation/ListofPartners">List of Partners</router-link> page or in the search box below.
                      </p>
                      <b-field>
                        <b-autocomplete
                            v-model="name"
                            placeholder="Enter CNA Name"
                            :keep-first="keepFirst"
                            :open-on-focus="openOnFocus"
                            :data="filteredDataObj"
                            field="organizationName"
                            @select="(option: CNA) => redirectToCNAPage(option)"
                            :clearable="clearable"
                            size="is-small"
                        >
                        <template #empty>No results found</template>
                        </b-autocomplete>
                      </b-field>
                      <div class="cve-accordion">
                        <button @click="showTip = !showTip" class="button is-ghost pt-0 pb-0 pl-0">
                          Tips for finding correct CNA
                        </button>
                        <div class="pt-1 pr-3 pb-1 pl-3" :class="{'is-hidden': showTip}" id="tips">
                          <ul>
                            <li>
                              <a href="https://us-cert.cisa.gov/report" target="_blank">CISA ICS</a> allocates IDs to vulnerabilities in industrial
                              control systems and medical devices
                            </li>
                            <li>
                              If you are not sure which is the appropriate CNA, please check recently published CVE Records related to that product
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-marker">2</div>
                    <div class="timeline-content">
                      <h4 class="title">Review CNA’s Disclosure Policy &amp; Contact CNA</h4>
                      <p>First, review the CNA’s Disclosure Policy regarding reporting vulnerabilities, then contact the CNA using its specified
                        contact method to report the vulnerability and request a CVE ID.
                      </p>
                    </div>
                  </div>
                  <div class="timeline-item is-5">
                    <div class="timeline-marker">3</div>
                    <div class="timeline-content">
                      <h4 class="title">
                        If you are unable to determine the correct CNA, contact a CNA of Last Resort (CNA-LR), which will direct you to the
                        appropriate CNA:
                      </h4>
                      <p>
                        <a href="https://us-cert.cisa.gov/report" target="_blank">CISA ICS CNA-LR</a> for industrial control systems and medical
                        devices
                      </p>
                      <p>
                        <a href="https://cveform.mitre.org/" target="_blank">MITRE CNA-LR</a> for all vulnerabilities, and Open Source software
                        product vulnerabilities, not already covered by a CNA listed on this website
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="updateCveRecord">
              <h2 :id="anchorId('Update a CVE Record')" class="title">
                {{sectionLabel('Update a CVE Record')}}
              </h2>
              <p>
                Other contributors (not a <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CNA</router-link>)
                follow the instructions below.
              </p>
              <div class="timeline">
                <div class="timeline-item">
                  <div class="timeline-marker">1</div>
                  <div class="timeline-content">
                    <h4 class="title">Identify the CNA that Published the CVE Record</h4>
                    <p>
                      Identify the CNA that published the CVE Record by searching for the CVE Record on the CVE List at the top of the page.
                      If you do not know the CVE ID, you can
                      <span class="icon-text">
                        <a :href="legacyCveWebsiteLink" target="_blank">search for a CVE Record by keyword
                        <span class="icon cve-icon-xxs">
                          <p id="enewsletter" class="is-hidden">external site</p>
                          <font-awesome-icon icon="external-link-alt" aria-labelledby="enewsletter">
                          </font-awesome-icon>
                        </span>
                        </a>.
                      </span>
                    </p>
                    <p>
                      The responsible CNA is noted in the “Assigning CNA” field of the CVE Record.
                    </p>
                  </div>
                </div>
                <div class="timeline-item">
                  <div class="timeline-marker is-3">2</div>
                  <div class="timeline-content">
                    <h4 class="title">Contact the CNA</h4>
                    <p>
                      Contact that CNA from the <router-link to="/PartnerInformation/ListofPartners">List of Partners</router-link> page using their
                      specified contact method to request an update.
                    </p>
                    <p>
                      To locate the CNA’s specified contact method on the
                      <router-link to="/PartnerInformation/ListofPartners">List of Partners</router-link> page:
                    </p>
                    <ol>
                      <li>Click on the CNA’s name in the table to open its partner details page.</li>
                      <li>Scroll down on the details page to the “Steps to Report a Vulnerability” section.</li>
                      <li>Find the specified contact method under step 2, “Contact.”</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div class="column is-3 is-hidden-touch">
        <NavigationSidebar :nav="cvenavs['Right Menu']['Report/Request']" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {BField, BAutocomplete} from 'buefy';
import NavigationSidebar from '@/components/NavigationSidebar.vue';
import data from '@/assets/data/CNAsList.json';
import {computed, ref} from 'vue';
import { useRouter } from 'vue-router';
import { useGenericGlobalsStore } from '@/stores/genericGlobals';

const keepFirst = ref(false);
const openOnFocus = ref(false);
const name = ref('');
const clearable = ref(false);
const showTip = ref(true);
const legacyCveWebsiteLink = useGenericGlobalsStore().legacyCveWebsiteLink;
const router = useRouter();

const props = defineProps({
  cvenavs: {
    type: Object,
    required: true
  }
});

const filteredDataObj = computed(() => sortCnaData());

interface CNA {
  organizationName: string;
  shortName: string;
}

function anchorId(sectionName: string) {
  return nonCNAs()['items'][sectionName]['anchorId'];
}

function nonCNAs() {
  return props.cvenavs['Right Menu']['Report/Request']['submenu']['Non-CNAs'];
}

function sectionLabel(sectionName: string) {
    return nonCNAs()['items'][sectionName]['label'];
}

function sortCnaData() {

  const normalizedName = name.value.toLowerCase();
  if (!normalizedName.length)
    return;

  let results = data.filter((option) => (
    option.organizationName.toLowerCase().indexOf(normalizedName) >= 0));

  function cmp(cna1: CNA, cna2: CNA) {

    // Sorts the list of organization names based on the characters
    // entered by the user in the search box.  For example, if the user
    // has entered "br", then "Brocade Communications" is listed before
    // "Jetbrains" because "br" is closest to the beginning of the
    // string in "Brocade Communications".

    const cna1NormalName = cna1.organizationName.toLowerCase();
    const cna2NormalName = cna2.organizationName.toLowerCase()
    const cna1Index = cna1NormalName.indexOf(normalizedName);
    const cna2Index = cna2NormalName.indexOf(normalizedName);

    return cna1Index < cna2Index ? -1 : cna1Index > cna2Index ? 1 :
      cna1NormalName.localeCompare(cna2NormalName);
    }

  // Limit the choices presented to the user to the first 10 organizations
  // in the list.

  return results.sort(cmp).slice(0, 10);
}

function redirectToCNAPage(partner: CNA) {

  router.push(`/PartnerInformation/ListofPartners/partner/${partner.shortName}`);
}

</script>
