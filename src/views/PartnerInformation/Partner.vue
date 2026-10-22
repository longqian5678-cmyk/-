<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 :id="partner()['id']" class="title">{{partner()['label']}}</h1>
            <p>
              The CVE Program actively partners with community members worldwide to help grow CVE content and expand its use. See below to learn more
              about the roles of organizations participating as <a href='/ResourcesSupport/Glossary?activeTerm=glossaryCNA'>CVE Numbering Authorities
              (CNAs)</a>, <a href='/ResourcesSupport/Glossary?activeTerm=glossaryRoot'>Roots</a>, and
              <a href='/ResourcesSupport/Glossary?activeTerm=glossaryTLRoot'> Top-Level Roots</a>.
            </p>

            <h2 :id="anchorId('HowToBecomeAPartner')"
            class="title">
              {{sectionLabel('HowToBecomeAPartner')}}
            </h2>
              <p>
                Access the
                <a href="https://cveform.mitre.org/" target="_blank">CVE Program Web Forms</a>
                using the “Become a Partner” button below.
              </p>
            <ul>
              <li>
                For any partner type, choose the “General Support” form to ask a question.
              </li>
              <li>
                To request to become a CNA, choose the “Register to Become a CNA” form.
              </li>
            </ul>
            <div class="buttons is-centered pt-4">
              <a id="cve-partner-button" href="https://cveform.mitre.org/" target="_blank" class="button cve-button">
                <span>Become a Partner</span>
                <span class="icon">
                  <font-awesome-icon icon="external-link-alt" aria-labelledby="extenalLinkBecomeAPartner"/>
                </span>
              </a>
            </div>
            <h2 :id="anchorId('CNA')" class="title">
              {{sectionLabel('CNA')}}
            </h2>
            <p>
              Organizations from around the world partner with the CVE Program as <a href='/ResourcesSupport/Glossary?activeTerm=glossaryCNA'>CVE
              Numbering Authorities (CNAs)</a> to assign CVE IDs and publish CVE Records for vulnerabilities within their distinct, agreed upon scope.
              Types of organizations include vendors, researchers, open source, CERTs, hosted services, bug bounty providers, and consortiums, but
              others are also welcome.
            </p>
            <TopicBox title="Benefits">
              <ul class="tile-body cve-task-tile-list">
                <li class="cve-task-tile-list-item">
                  Demonstrate mature vulnerability management practices and a commitment to cybersecurity to current and potential customers.
                </li>
                <li class="cve-task-tile-list-item">
                  Communicate value-added vulnerability information to your customer base.
                </li>
                <li class="cve-task-tile-list-item">
                  Control the CVE publication release process for vulnerabilities in your scope.
                </li>
                <li class="cve-task-tile-list-item">
                  Assign CVE IDs without having to share embargoed information with another CNA.
                </li>
                <li class="cve-task-tile-list-item">
                  Streamline vulnerability disclosure processes.
                </li>
              </ul>
            </TopicBox>
            <BoxPair :titles="['Cost', 'Requirements']">
              <template #box1>
                <!-- Cost -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    There is no monetary fee.
                  </li>
                  <li class="cve-task-tile-list-item">
                    CNAs volunteer their own time for their own benefit.
                  </li>
                  <li class="cve-task-tile-list-item">
                    There is no contract to sign.
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Requirements -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    Have a public vulnerability disclosure policy.
                  </li>
                  <li class="cve-task-tile-list-item">
                    Have a public source for new vulnerability disclosures.
                  </li>
                  <li class="cve-task-tile-list-item">
                    Agree to the <router-link to='/Legal/TermsOfUse'>CVE Program Terms of Use</router-link>.
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Root')" class="title">
              {{sectionLabel('Root')}}
            </h2>
            <p>
              Organizations wishing to partner with the CVE Program as a <router-link to='/ResourcesSupport/Glossary?activeTerm=glossaryRoot'>Root
              </router-link> or <router-link to='/ResourcesSupport/Glossary?activeTerm=glossaryTLRoot'>Top-Level Root</router-link> should
              <router-link to='/PartnerInformation/Partner#HowToBecomeAPartner'>contact</router-link> the CVE Program to learn more.
            </p>

            <h2 :id="anchorId('TopRoot')" class="title">
              {{sectionLabel('TopRoot')}}
            </h2>
            <p>
              Organizations wishing to partner with the CVE Program as a
              <router-link to='/ResourcesSupport/Glossary?activeTerm=glossaryTLRoot'>Top-Level Root</router-link> or
              <router-link to='/ResourcesSupport/Glossary?activeTerm=glossaryRoot'>Root</router-link> should
              <router-link to='/PartnerInformation/Partner#HowToBecomeAPartner'>contact</router-link> the CVE Program to learn more.
            </p>

            <h2 class="title"
              :id="anchorId('OnboardingProcess')">
              {{sectionLabel('OnboardingProcess')}}
            </h2>
            <div class="cve-round-edges-black-border cve-dark-purple-bg">
              <figure class="image cve-no-margin">
                <img src="@/assets/images/CNAOnboardingInfographic.png" alt="CNA onboarding infographic: contact, register, meet requirements,
                onboard, and join." />
              </figure>
            </div>

            <div class="timeline">
              <header class="timeline-header">
                <span class="tag is-medium">Start</span>
              </header>
              <div class="timeline-item">
                <div class="timeline-marker">1</div>
                <div class="timeline-content">
                  <h3 class="title">Contact</h3>
                  <p>Prospective partner <router-link to='/PartnerInformation/Partner#HowToBecomeAPartner'>contacts</router-link> the CVE Program.</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker is-3">2</div>
                <div class="timeline-content">
                  <h3 class="title">Register</h3>
                  <p>Prospective partner completes registration form.</p>
                  <p>Details collected on the form include basic organizational information such as name, country, business sector,
                  representative’s contact details, and communications preferences. Also collected are estimated annual number of CVE IDs needed,
                  expected scope of coverage, disclosure policy and security advisory links, and availability for a one-hour guidance and program
                  orientation meeting.</p>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker">3</div>
                <div class="timeline-content">
                  <h3 class="title">Meet Requirements</h3>
                  <p>Prospective partner meets requirements.</p>
                  <section class="cve-accordion">
                    <div class="message">
                      <div class="message-header">
                        <h4 class="title">Requirements</h4>
                        <button class="button cve-process-list-btn" @click="toggleAccordionItem('requirements')"
                          :aria-expanded="!accordion['requirements'] ? 'true' : 'false'"
                          aria-controls="requirements">
                          <span class="icon is-small">
                            <p id="requirements-alttext" class="is-hidden">
                              {{accordion['requirements'] ? 'collapse' : 'expand'}}
                            </p>
                            <font-awesome-icon :icon="accordion['requirements'] ? 'plus' : 'minus'"
                            aria-hidden="false" focusable="true" aria-labelledby="requirements-alttext"/>
                          </span>
                        </button>
                      </div>
                      <div class="message-body" :class="{'is-hidden': accordion['requirements']}" id="requirements">
                        <div class="block">
                          <ul>
                            <li>CNA
                              <ul>
                                <li>Have a public vulnerability disclosure policy.</li>
                                <li>Have a public source for new vulnerability disclosures.</li>
                                <li>Agree to the <router-link to='/Legal/TermsOfUse'>CVE Terms of Use</router-link>.</li>
                              </ul>
                            </li>
                            <li>Root
                              <ul>
                                <li>Be an active CNA and meet all CNA requirements.</li>
                                <li>Have organizational experience in the specific technical or geographical scope.</li>
                                <li>Ability to successfully manage one or more CNAs or other Roots.</li>
                                <li>Ability to participate in CVE Program and Root coordination activities.</li>
                              </ul>
                            </li>
                            <li>Top-Level Root
                              <ul>
                                <li>Be an active CNA or Root and meet all CNA or Root requirements.</li>
                                <li>Ability to maintain funding and resources to support scope. </li>
                              </ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div class="timeline-item is-5">
                <div class="timeline-marker">4</div>
                <div class="timeline-content">
                  <h3 class="title">Onboard</h3>
                  <p>Organization is onboarded.</p>
                  <section class="cve-accordion">
                    <div class="message">
                      <div class="message-header">
                        <h4 class="title">Onboarding</h4>
                        <button class="button cve-process-list-btn" @click="toggleAccordionItem('onboarding')"
                          :aria-expanded="!accordion['onboarding'] ? 'true' : 'false'"
                          aria-controls="onboarding">
                          <span class="icon is-small">
                            <p id="onboarding-alttext" class="is-hidden">
                              {{accordion['onboarding'] ? 'collapse' : 'expand'}}
                            </p>
                            <font-awesome-icon :icon="accordion['onboarding'] ? 'plus' : 'minus'"
                            aria-hidden="false" focusable="true" aria-labelledby="onboarding-alttext"/>
                          </span>
                        </button>
                      </div>
                      <div class="message-body" :class="{'is-hidden': accordion['onboarding']}" id="onboarding">
                        <div class="block">
                          <ul>
                            <li>CNA
                              <ul>
                                <li>View
                                <a href="https://youtu.be/W4T2n_2m7WA?si=sRxC1wLEbZ81AeCb" target="_blank">CVE Lightning Talk Video</a>.</li>
                                <li>Attend an introductory session.</li>
                                <li>Successfully complete practice examples.</li>
                              </ul>
                            </li>
                            <li>Root
                              <ul><li>Attend coordination sessions.</li></ul>
                            </li>
                            <li>Top-Level Root
                              <ul><li>Attend coordination sessions.</li></ul>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div class="timeline-item">
                <div class="timeline-marker">5</div>
                <div class="timeline-content">
                  <h3 class="title">Join</h3>
                  <p>
                    Organization is added to the <router-link to='/PartnerInformation/ListofPartners'>List of Partners</router-link> and announced as
                    a new CVE Program partner on the CVE website, in program newsletters, on partner mail lists, and on social media.
                  </p>
                </div>
              </div>
              <footer class="timeline-header">
                <span class="tag is-medium">End</span>
              </footer>
            </div>
          </div>
        </main>
      </div>

      <div class="column is-3 is-hidden-touch">
        <NavigationSidebar :nav="cvenavs['Partner Information']" />
      </div>
    </div>
  </div>
</template>

<script setup>

import BoxPair from '@/components/BoxPair.vue';
import NavigationSidebar from '@/components/NavigationSidebar.vue';
import TopicBox from '@/components/TopicBox.vue';
import {ref} from 'vue';

const accordion = ref({requirements: true, onboarding: true});

const props = defineProps({
  cvenavs: {
    type: Object,
    required: true
  }
});

function anchorId(sectionName) {
  return partner()['items'][sectionName]['anchorId'];
}

function partner() {
  return props.cvenavs['Partner Information']['submenu']['Partner'];
}

function sectionLabel(sectionName) {
    return partner()['items'][sectionName]['label'];
}

function toggleAccordionItem(key) {
  accordion.value[key] = !accordion.value[key];
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.button.cve-process-list-btn {
  border-color: white;
}

.button.cve-process-list-btn:focus {
  outline: none;
}

.button.cve-process-list-btn:hover {
  border: none;
}

#cve-partner-button {
  background-color: $theme-color-accent-warm;
  font-weight: bold;
  border-width: 1px;
  border-style: solid;
  color: #162e51;
  border-color: #162e51;
}
#cve-partner-button:hover{
  border-color: #b5b5b5;
  color: #363636;
}

</style>
