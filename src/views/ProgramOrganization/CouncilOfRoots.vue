<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 :id="mainId" class="title">
              {{mainLabel}}
            </h1>
            <p>
              Within the CVE Program,
              <a href="/ResourcesSupport/Glossary?activeTerm=glossaryCVEID">
                CVE ID
              </a>
              assignment and
              <a href="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">
                CVE Record
              </a>
              publishing take place within a hierarchy. The “Council of Roots”
              is the group of Top-Level Roots (TL-Roots) and Roots responsible
              for operational governance and administration of these
              hierarchies.
            </p>
            <p>
              Each TL-Root and Root grows and oversees a specific hierarchy as
              noted on the
              <a href="/ProgramOrganization/Structure">
                Structure
              </a>
              page, while
              <a href="/ResourcesSupport/Glossary?activeTerm=glossaryCNA">
                CVE Numbering Authorities (CNAs)
              </a>
              within those hierarchies perform operational tasks such as
              assigning CVE IDs and publishing CVE Records.
            </p>
            <h2 :id="responsibilitiesId" class="title">
              {{responsibilitiesLabel}}
            </h2>
            <p>
              TL-Roots and Roots share certain responsibilities, but there are
              key differences between the two roles.
            </p>
            <h3>Shared Responsibilities</h3>
              <ul>
                <li>
                  Operate within a defined scope
                </li>
                <li>
                  Oversee CVE-related operations within their hierarchy
                </li>
                <li>
                  Grow their hierarchy by recruiting and onboarding new CNAs
                  that report directly to them
                </li>
                <li>
                  Ensure effective CVE ID assignment and CVE Record publishing by
                  subordinate organizations
                </li>
                <li>
                  Ensure
                  <a href="/ResourcesSupport/AllResources/CNARules">
                    CNA Operational Rules
                  </a>
                  and
                  <a href="/ResourcesSupport/Resources#General">
                    CVE Program Policies
                  </a>
                  are followed
                </li>
                <li>
                  Participate in Council of Roots and other CVE coordination
                  activities
                </li>
              </ul>
            <h3>Key Differences</h3>
            <BoxPair :titles="diffBoxTitles">
              <template #box1>
                <!-- TL-Roots -->
                <ul>
                  <li>
                    Reports to the
                    <a href="/ProgramOrganization/Board">
                      CVE Board
                    </a>
                  </li>
                  <li>
                    Recruits, onboards, and manages Roots and/or CNAs
                  </li>
                  <li>
                    <i>Must</i> designate a
                    <a href="/ResourcesSupport/Glossary#glossaryCNALR">
                      CNA of Last Resort (CNA-LR)
                    </a>
                  </li>
                  <li>
                    Resolves
                    <a href="/Resources/General/Policies/CVE-Record-Dispute-Policy.pdf">
                      disputes
                    </a>
                    within their hierarchy
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Roots -->
                <ul>
                  <li>
                    Reports to a TL-Root or another Root
                  </li>
                  <li>
                    Recruits, onboards, and manages CNAs
                  </li>
                  <li>
                    <i>May</i> designate a CNA-LR
                  </li>
                  <li>
                    Addresses disputes and escalates to the TL-Root when needed
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="rootsId" class="title">
              {{rootsLabel}}
            </h2>
            <p>
              Scope of coverage is described next to their organization name.
              Some Roots may also operate a CNA, and as only CNAs may assign CVE
              IDs and publish CVE Records in the CVE Program, that
              organization's CNA may have a separate CNA-specific scope that may
              be different from their Root scope.
            </p>
            <ul>
              <li>
                <p>
                  <a href="/PartnerInformation/ListofPartners/partner/CISA">
                    CISA Top-Level Root
                  </a>
                  - Vulnerabilities that are (1) reported to
                  or observed by CISA and (2) affect critical infrastructure,
                  U.S. civilian government, industrial control systems, or
                  medical devices, and (3) are not covered by another CNA's
                  scope.
                </p>
                <ul>
                  <li>
                    <a href="/PartnerInformation/ListofPartners/partner/CERTVDE">
                      CERT@VDE Root
                    </a>
                    - Organizations that are cooperative partners of CERT@VDE.
                  </li>
                  <li>
                    <a href="/PartnerInformation/ListofPartners/partner/icscert">
                    CISA ICS Root
                    </a>
                    - Vulnerabilities that are (1) reported to or observed by
                    CISA, (2) affect industrial control systems or medical
                    devices, and (3) are not covered by another CNA's scope.
                  </li>
                </ul>
              </li>
              <li>
                <p>
                  <a href="/PartnerInformation/ListofPartners/partner/mitre">
                    MITRE Top-Level Root
                  </a>
                  - Vulnerabilities, and Open-Source software product
                  vulnerabilities, not already covered by a CNA listed on the
                  CVE website.
                </p>
                <ul>
                  <li>
                    <a href="/PartnerInformation/ListofPartners/partner/ENISA">
                      ENISA Root
                    </a>
                    - European Union (EU) member states/EU authorities, EU
                    CSIRTs network members, and cooperative partners under
                    ENISA's mandate as well as other CNAs who choose ENISA as
                    their Root.
                  </li>
                  <li>
                    <a href="/PartnerInformation/ListofPartners/partner/Google">
                      Google Root
                    </a>
                    - Alphabet organizations.
                  </li>
                  <li>
                    <a href="/PartnerInformation/ListofPartners/partner/INCIBE">
                      INCIBE Root
                    </a>
                    - Spain organizations.
                  </li>
                  <li>
                    <a href="/PartnerInformation/ListofPartners/partner/jpcert">
                      JPCERT/CC Root
                    </a>
                      - Japan organizations.
                  </li>
                  <li>
                    <a href="/PartnerInformation/ListofPartners/partner/redhat">
                      Red Hat Root
                    </a>
                      - The Red Hat Root's scope includes the open source
                      community. Any open-source organizations that prefer Red
                      Hat as their Root; organizations are free to choose
                      another Root if it suits them better.
                  </li>
                  <li>
                    <a href="/PartnerInformation/ListofPartners/partner/THA-PSIRT">
                      Thales Group Root
                    </a>
                      - Products and technologies of subsidiaries of Thales
                      Group.
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              View details of these Root hierarchies on the
              <a href="/ProgramOrganization/Structure">
                Structure
              </a>
              page.
            </p>
            <h2 :id="partnerId" class="title">
              {{partnerLabel}}
            </h2>
            <p>
              Start the process by visiting the
              <a href="/PartnerInformation/Partner">
                Partner
              </a>
              page for an overview and prerequisites.
            </p>
          </div> <!-- end content -->
        </main>
      </div>
      <div class="column is-3 is-hidden-touch">
        <NavigationSidebar :nav="cvenavs['Program Organization']" />
      </div>
    </div>
  </div>
</template>

<script setup>
import BoxPair from '@/components/BoxPair.vue';
import NavigationSidebar from '@/components/NavigationSidebar.vue';

const props = defineProps({
  cvenavs: {
    type: Object,
    required: true
  }
});

const cor = props.cvenavs['Program Organization']['submenu']['Council of Roots'];

const mainId = cor.id;

const mainLabel = cor.label;

const responsibilitiesId = cor.items.Responsibilities.anchorId;

const responsibilitiesLabel = cor.items.Responsibilities.label;

const diffBoxTitles = ['TL-Roots', 'Roots'];

const rootsId = cor.items.Roots.anchorId;

const rootsLabel = cor.items.Roots.label;

const partnerId = cor.items.Partner.anchorId;

const partnerLabel = cor.items.Partner.label;

</script>
