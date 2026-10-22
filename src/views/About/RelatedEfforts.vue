<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
             <h1 :id="relatedEfforts()['id']" class="title">
              {{relatedEfforts()['label']}}
             </h1>
             <h2 :id="anchorId('National Vulnerability Database (NVD)')"
              class="title">
               {{sectionLabel('National Vulnerability Database (NVD)')}}
              </h2>
               <p>
                 CVE and NVD are separate programs. The
                 <a href="https://nvd.nist.gov/" target="_blank">U.S. National Vulnerability Database (NVD)</a>
                 was launched by the
                 <a href="https://www.nist.gov/" target="_blank">National Institute of Standards and Technology (NIST)</a>
                 in 2005, while the
                 <router-link to='/ResourcesSupport/Glossary?activeTerm=glossaryCVEList'>CVE List</router-link>
                 was launched by
                 <router-link to="/ResourcesSupport/FAQs#pc_intro-MITRE_role_in_cve">The MITRE Corporation</router-link>
                 as a community effort in 1999. The CVE List feeds NVD, which historically has built upon the information included
                 in CVE Records to provide enhanced information for each record in its database. While separate, output from both
                 programs is available to the public and free to use.
               </p>
            <h2 :id="anchorId('Common Vulnerability Scoring System (CVSS)')"
              class="title">
              {{sectionLabel('Common Vulnerability Scoring System (CVSS)')}}
            </h2>
            <p>
              The
              <a href="https://www.first.org/cvss/" target="_blank">CVSS</a>
              standard operated by the
              <a href="https://www.first.org/" target="_blank">Forum of Incident Response and Security Teams (FIRST)</a>,
              which is a separate program from CVE, can be used to score the severity of software vulnerabilities identified by
              <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CVE Records</router-link>.
              The
              <router-link to="/AllResources/CveServices#CveRecordFormat">CVE Record Format</router-link>
              enables CNAs to include CVSS scores in their CVE Records when publishing them to the CVE List.
            </p>
            <p>
              CVSS provides “provides a way to capture the principal characteristics of a vulnerability and produce a numerical score
              reflecting its severity. The numerical score can then be translated into a qualitative representation (such as low, medium,
              high, and critical) to help organizations properly assess and prioritize their vulnerability management processes.”
            </p>
            <p>
              CVE Records are cited in the CVSS specification and documentation to identify individual vulnerabilities used as examples, but
              they are not required for using CVSS.
            </p>
            <h3 class="title">CVSS Calculator for CVE Records</h3>
            <p>
              Severity rating scoring for CVE Records is available through FIRST’s
              <a href="https://www.first.org/cvss/calculator/4.0" target="_blank">CVSS calculator</a>.
              Guidance for how to use the calculator is
              <a href="https://www.first.org/cvss/v4.0/user-guide" target="_blank">here</a>.
            </p>
            <h2 :id="anchorId('Known Exploited Vulnerabilities (KEV) Catalog')" class="title">
              {{sectionLabel('Known Exploited Vulnerabilities (KEV) Catalog')}}
            </h2>
            <p>
              Managed by the
              <a href="https://www.cisa.gov/about/divisions-offices/cybersecurity-division" target="_blank">
              Cybersecurity and Infrastructure Security Agency (CISA)
              </a>,
              the
              <a href="https://www.cisa.gov/known-exploited-vulnerabilities-catalog" target="_blank">
                Known Exploited Vulnerabilities (KEV) Catalog
              </a>
              is a database of security flaws in software applications and weaknesses that have been exposed and leveraged by attackers. Each
              vulnerability listed in KEV is identified by, and links to, a CVE Record.
            </p>
            <h2 :id="anchorId('Common Weakness Enumeration (CWE)')" class="title">
              {{sectionLabel('Common Weakness Enumeration (CWE)')}}
            </h2>
            <p>
              <a href="https://cwe.mitre.org/" target="_blank">CWE™</a>
              is a community-developed taxonomy of common software and hardware security weaknesses that serves as a common language,
              a measuring stick for security tools, and as a baseline for weakness identification, mitigation, and prevention efforts.
              Weaknesses in software and hardware may become exploitable vulnerabilities if not eliminated prior to software or hardware deployment.
            </p>
            <p>
              The CWE Program also has special interest groups (SIGs) and working groups (WGs) for community participation, such as the
              <a href="https://cwe.mitre.org/community/working_groups.html#ai_wg" target="_blank">
                Artificial Intelligence Working Group (AI WG)
              </a>,
              <a href="https://cwe.mitre.org/community/working_groups.html#xd_sig" target="_blank">
                Cross-Domain Special Interest Group (XD-SIG)
              </a>,
              and
              <a href="https://cwe.mitre.org/community/working_groups.html#hw_sig" target="_blank">
                Hardware CWE Special Interest Group (HW CWE SIG)
              </a>.
            </p>

            <h2 :id="anchorId('Common Attack Pattern Enumeration and Classification (CAPEC)')" class="title">
              {{sectionLabel('Common Attack Pattern Enumeration and Classification (CAPEC)')}}
            </h2>
            <p>
              <a href="https://capec.mitre.org/" target="_blank">CAPEC™</a>
              is a comprehensive dictionary and classification taxonomy of common attack patterns against software and hardware weaknesses.
              By understanding how weaknesses can be exploited, analysts, developers, testers, and educators are better positioned to identify
              and eliminate weaknesses prior to them becoming exploitable vulnerabilities.
            </p>
            <h2 :id="anchorId('ATT&CK')" class="title">
              {{sectionLabel('ATT&CK')}}
            </h2>
            <p>
              MITRE
              <a href="https://attack.mitre.org/" target="_blank">ATT&CK<sup>®</sup></a>
              is a globally accessible knowledge base of adversary tactics and techniques based on real-world observations. The ATT&CK
              knowledge base is used as a foundation for the development of specific threat models and methodologies in the private sector,
              in government, and in the cybersecurity product and service community.
            </p>
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
  return relatedEfforts()['items'][sectionName]['anchorId'];
}

function relatedEfforts() {
  return props.cvenavs['About']['submenu']['Related Efforts'];
}

function sectionLabel(sectionName) {
    return relatedEfforts()['items'][sectionName]['label'];
}

</script>
