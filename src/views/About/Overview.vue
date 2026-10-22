<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 :id="overview()['id']" class="title">
              {{overview()['label']}}
            </h1>
            <h2 :id="anchorId('About the CVE Program')" class="title">
              {{sectionLabel('About the CVE Program')}}
            </h2>
            <p>
              The mission of the CVE<sup>&trade;</sup> Program is to identify,
              define, and catalog publicly disclosed cybersecurity
              <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryVulnerability">vulnerabilities</router-link>.
              There is one
              <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CVE Record</router-link>
              for each vulnerability in the catalog. The vulnerabilities are discovered then assigned and published
              by organizations from around the world that have partnered with the CVE Program.
              <router-link to="/PartnerInformation/ListofPartners">Partners</router-link>
              publish CVE Records to communicate consistent descriptions of vulnerabilities. Information technology and cybersecurity
              professionals use CVE Records to ensure they are discussing the same issue, and to coordinate their efforts to prioritize
              and address the vulnerabilities.
            </p>
            <div class="cve-white-bg-gray-border-container">
              <h3 class="title mt-4">CVE Lightning Talk</h3>
              <figure class ="image is-16by9">  <!-- video -->
                <iframe class="has-ratio" width="560" height="315" src="https://www.youtube.com/embed/W4T2n_2m7WA?si=sOjmg4IfeHeBEgVp" frameborder="0" allowfullscreen>
                </iframe>
              </figure>
              <p>
                Provides a high-level overview of the CVE Program, what a CVE Record is and how
                it enables two or more people or tools to refer to a vulnerability and know they are talking about the
                same thing, and an introduction to how and why to become a CVE Numbering Authority (CNA) partner.
              </p>
            </div>
            <div class="cve-white-bg-gray-border-container">
              <h3 class="title mt-4">Podcast - The Value of Assigning CVEs</h3>
              <figure class ="image is-16by9">  <!-- podcast -->
                <iframe class="has-ratio" width="560" height="315" src="https://www.youtube.com/embed/aT6BjbZS22w" frameborder="0" allowfullscreen>
                </iframe>
              </figure>
              <p>
                 Learn how and why CVEs are assigned, the value of CVEs in vulnerability management, responsible coordination of
                 vulnerability disclosures, the importance of comprehensiveness in security advisories, and why there is no stigma
                 in a CVE. In addition, CVE Numbering Authority (CNA) scopes, disclosure policies, turnaround times, and more
                 are discussed in general, as are GitHub’s specific CNA processes and how it helps open source projects hosted
                 on GitHub with their CVEs and advisories.
              </p>
            </div>
            <div class="cve-white-bg-gray-border-container">
              <h3 class="title mt-4">Podcast - CVE Myths versus Facts</h3>
              <figure class ="image is-16by9">  <!-- podcast -->
                <iframe class="has-ratio" width="560" height="315" src="https://www.youtube.com/embed/OQB2w71JmLE" frameborder="0" allowfullscreen>
                </iframe>
              </figure>
              Learn the truth and facts about the following myths about the CVE Program:
              <ul>
                <li class="cve-list-no-bullet">Myth #1: The CVE Program is run entirely by the MITRE Corporation.</li>
                <li class="cve-list-no-bullet"> Myth #2: The CVE Program is controlled by software vendors.</li>
                <li class="cve-list-no-bullet">Myth #3: The CVE Program doesn’t cover enough types of vulnerabilities.</li>
                <li class="cve-list-no-bullet">Myth #4: The CVE Program is responsible for assigning vulnerability severity scores.</li>
              </ul>
            </div>
            <div class="cve-white-bg-gray-border-container">
              <h3 class="title mt-4">Podcast - Becoming A CNA Myths versus Facts</h3>
              <figure class ="image is-16by9">  <!-- podcast -->
                <iframe class="has-ratio" width="560" height="315" src="https://www.youtube.com/embed/0FENpUbBJcI" frameborder="0" allowfullscreen>
                </iframe>
              </figure>
              <p>
                Learn the myths and facts of partnering with the CVE Program as a CVE Numbering Authority (CNA):
              </p>
              <ul>
                <li class="cve-list-no-bullet">Myth #1: Only a specific category of software vendors can become CNAs.</li>
                <li class="cve-list-no-bullet">
                  Myth #2: Organizations cannot leverage their existing vulnerability management and disclosure processes when they become a CNA.
                </li>
                <li class="cve-list-no-bullet">Myth #3: The requirements for becoming a CNA are overwhelming and extensive.</li>
                <li class="cve-list-no-bullet">Myth #4: A fee is required to become a CNA.</li>
                <li class="cve-list-no-bullet">Myth #5: The CNA onboarding process is too complicated and time-consuming.</li>
                <li class="cve-list-no-bullet">Myth #6: Organizations cannot choose the Top-Level Root or Root they want to work with.</li>
              </ul>
            </div>
            <div class="cve-white-bg-gray-border-container">
              <h3 class="title mt-4">Podcast - CNA Onboarding Process Myths Versus Facts</h3>
              <figure class ="image is-16by9">  <!-- podcast -->
                <iframe class="has-ratio" width="560" height="315" src="https://www.youtube.com/embed/N22bsppsJSQ" frameborder="0" allowfullscreen>
                </iframe>
              </figure>
              <p>
                The following truths and facts about the CVE Numbering Authority (CNA) partner onboarding
                process are discussed: duration and complexity of the onboarding process; the fact that there is no fee to
                participate; ease of incorporating assigning CVE Identifiers (CVE IDs) and publishing CVE Records
                into an organization’s existing coordinated vulnerability disclosure (CVD) processes; availability of automated
                tools for CNAs; the CVE JSON Record formatand available guidance; role of Roots and Top-Level Roots and how they help CNAs;
                importance of CNAs determining their own scopes; disclosure policies; the community aspect of being a CNA and the
                availability of peer support; the value of CNAs participating in one or more CVE Working Groups, especially the
                CNA Organization of Peers (COOP); and more.
              </p>
            </div>
            <div class="cve-white-bg-gray-border-container">
              <h3 class="title mt-4">Podcast - The Council of Roots</h3>
              <figure class ="image is-16by9">  <!-- podcast -->
                <iframe class="has-ratio" width="560" height="315" src="https://www.youtube.com/embed/QIfU4mlPx_A" frameborder="0" allowfullscreen>
                </iframe>
              </figure>
              <p>
                Learn how
                CVE Numbering Authority (CNA)
                partners &mdash; ranging from large to small organizations, proprietary and open source products or projects, disparate business
                sectors, and different geographic locations &mdash; are overseen and supported within the CVE Program by “Top-Level Roots”
                and “Roots.” Topics include the roles and responsibilities of the two different types of Roots; how their work benefits the CNAs
                under their care; how they recruit new CNA partners, including suggestions for addressing upper management concerns if a CNA
                prospect organization is hesitant to partner as a CNA; how they work with and support their CNAs over time; how the
                “Council of Roots” works together to enhance and help improve the program overall; and much more. All current CVE Program
                Top-Level Roots and Roots are represented in this podcast.
              </p>
            </div>
          </div>
        </main>
      </div>
      <div class="column is-3 is-hidden-touch">
        <NavigationSidebar :nav="cvenavs['About']" />
      </div>
    </div>
  </div>
</template>

<script setup>

import NavigationSidebar from '@/components/NavigationSidebar.vue';

const props = defineProps({
  cvenavs: {
    type: Object,
    required: true
  }
});

function anchorId(sectionName) {
  return overview()['items'][sectionName]['anchorId'];
}

function overview() {
  return props.cvenavs['About']['submenu']['Overview'];
}

function sectionLabel(sectionName) {
    return overview()['items'][sectionName]['label'];
}

</script>
