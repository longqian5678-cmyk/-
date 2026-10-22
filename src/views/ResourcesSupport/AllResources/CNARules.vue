<template>
  <div id="cve-tertiary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-3 is-hidden-touch">
        <TableOfContentsSidebar :nav="cvePageNavs" />
      </div>
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <h1 class="title">CVE Numbering Authority (CNA) Operational Rules</h1>
          <div role="alert" class="notification is-warning is-light">
            <div class="is-flex">
              <p id="alertIconCnaRules" class="is-hidden">alert</p>
              <font-awesome-icon style="flex: 0 0 40px;" size="1x"  icon="exclamation-triangle" role="alert"
                aria-labelledby="alertIconCnaRules" aria-hidden="false" />
              <div>
                <p>
                  “CNA Operational Rules Version 4.2.0” was approved by the
                  <a href='/ProgramOrganization/Board'>CVE Board</a>
                  on August 20, 2026, and is effective as of August 25, 2026. A
                  <router-link to="/ResourcesSupport/AllResources/CNARules#section_6-1_changes_version_4_2_0">
                    detailed report
                  </router-link>
                  is available that lists all changes between Version 4.1.0 and Version 4.2.0. View the report
                  <router-link to="/ResourcesSupport/AllResources/CNARules#section_6-1_changes_version_4_2_0">
                    here
                  </router-link>.
                </p>
              </div>
            </div>
          </div>
          <div id="cve-versionInformation">
            <p class="has-text-weight-bold">
              Document Version: <span>{{ versionNum }}</span>
            </p>
            <p class="has-text-weight-bold">
              CVE Board Approval: <span>{{ versionApprovalDate }}</span>
            </p>
            <p class="has-text-weight-bold">
              Effective Date: <span>{{ versionDate }}</span>
            </p>
            <p>
              <router-link to="/Resources/Roles/Cnas/CNA_Rules_v4.2.0.pdf" target="_blank">
                View as PDF (0.2MB)
              </router-link>
            </p>
          </div>
          <hr />
          <!-- Top level section -->
          <div class="content">
            <ol class="ml-0">
              <li v-for="(section, index) of cnaRulesSections" :key="index">
                <h2 class="title" :id="section.sectionId">
                  <a :href="`#${section.sectionId}`">
                    {{ section.sectionTitle }}
                  </a>
                </h2>
                <p
                  v-for="(para, paraIdx) of section.sectionParagraphs"
                  v-html="para"
                  :key="paraIdx"
                ></p>
                <!-- Sub section -->
                <ol class="ml-0">
                  <li v-for="(subSection, subIdx) of section.subSections" :key="subIdx">
                    <h3 class="title" :id="subSection.subSectionId">
                      <a :href="`#${subSection.subSectionId}`">
                        {{ subSection.subSectionTitle }}
                      </a>
                    </h3>
                    <p
                      v-for="(para, subParaIdx) of subSection.subSectionParagraphs"
                      v-html="para"
                      :key="subParaIdx"
                    ></p>
                  </li>
                </ol>
                <!-- end page sub section -->
              </li>
            </ol>
            <!-- end page section -->
            <ul class="ml-0 cve-list-no-bullet">
              <li v-for="(section, index) of cnaRulesAppendices" :key="index">
                <h2 class="title" :id="section.sectionId">
                  {{ section.sectionTitle }}
                </h2>
                <p
                  v-for="(para, paraIdx) of section.sectionParagraphs"
                  v-html="para"
                  :key="paraIdx"
                ></p>
                <!-- Sub section -->
                <ul class="ml-0 cve-list-no-bullet">
                  <li v-for="(subSection, subIdx) of section.subSections" :key="subIdx">
                    <h3 class="title" :id="subSection.subSectionId">
                      {{ subSection.subSectionTitle }}
                    </h3>
                    <p
                      v-for="(para, subParaIdx) of subSection.subSectionParagraphs"
                      v-html="para"
                      :key="subParaIdx"
                    ></p>
                    <ul class="ml-0 cve-list-no-bullet">
                      <!-- Sub Sub section -->
                      <li
                        v-for="(subSubSection, sub2Idx) of subSection.subSubSections"
                        :key="sub2Idx"
                      >
                        <h4 class="title" :id="subSubSection.subSubSectionId">
                          {{ subSubSection.subSubSectionTitle }}
                        </h4>
                        <p
                          v-for="(para, sub2ParaIdx) of subSubSection.subSubSectionParagraphs"
                          v-html="para"
                          :key="sub2ParaIdx"
                        ></p>
                      </li>
                    </ul>
                    <!-- end apendices sub sub section -->
                  </li>
                </ul>
                <!-- end appendices sub section -->
              </li>
            </ul>
            <!-- end appendicessection -->
          </div>
        </main>
      </div>
    </div>
    <!-- end columns -->
  </div>
</template>

<script>
import TableOfContentsSidebar from "@/components/TableOfContentsSidebar.vue";
import cnaRulesData from "@/assets/data/cnaRules.json";

export default {
  name: "CNARules",
  components: {
    TableOfContentsSidebar,
  },
  data() {
    return {
      versionNum: cnaRulesData.versionNumber,
      versionApprovalDate: cnaRulesData.versionApprovalDate,
      versionDate: cnaRulesData.versionDate,
      cnaRulesSections: cnaRulesData.pageSections,
      cnaRulesAppendices: cnaRulesData.appendices,
      cvePageNavs: cnaRulesData,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ol {
  counter-reset: item;
}
ol li {
  display: block;
}

ol li p,
ul li p {
  margin-bottom: 16px;
}
ol li h2 a::before,
ol li h3 a::before {
  content: counters(item, ".");
  counter-increment: item;
  margin-right: 0.5rem;
  color: #005ea2;
}

:deep(.cve-acronym),
:deep(.cve-acronym-definition) {
  display: block;
}
</style>
