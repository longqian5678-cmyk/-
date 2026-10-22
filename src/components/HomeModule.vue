<template>
  <div class="columns">
    <div class="column is-9">
      <section class="hero">
        <div class="hero-body cve-partnership-hero-body">
          <div class="container cve-partnership-container">
            <div class="columns">
              <div class="column is-two-thirds cve-partnership-left-column">
                <h3 class="cve-hidden">CVE partnership</h3>
                <p class="subtitle cve-subtitle has-text-centered">
                  The CVE Program partners with community members worldwide to grow CVE content and expand its usage. Click below to learn more
                  about the role of <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryCNA">CVE Numbering Authorities (CNAs)
                  </router-link> and <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRoot">Roots</router-link>.
                </p>
                <div class="buttons is-centered">
                  <router-link to="/PartnerInformation/Partner" class="button cve-button cve-button-base-color">Learn More</router-link>
                  <router-link to="/PartnerInformation/Partner#HowToBecomeAPartner" class="button cve-button cve-button-accent-warm">
                    Become a Partner
                  </router-link>
                </div>
              </div>
              <div class="column cve-partnership-right-column">
                <figure class="image">
                  <img src="@/assets/images/cvePartnershipGraphic.svg"
                    class="cve-partnership-img"
                    alt="CVE Partnership Graphic"/>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="hero">
        <div class="hero-body cve-task-tiles-hero-body">
            <div class="columns is-1 cve-task-tiles-container">
              <div class="column p-1 is-flex is-flex-direction-column cve-task-access-tile">
                <TopicBox title="Access" icon="fa-regular fa-arrow-alt-circle-right">
                  <ul class="tile-body cve-task-tile-list">
                    <li class="cve-task-tile-list-item"><router-link to="/PartnerInformation/ListofPartners">List of Partners</router-link></li>
                    <li class="cve-task-tile-list-item"><router-link to="/ResourcesSupport/AllResources/CNARules">CNA Rules</router-link></li>
                    <li class="cve-task-tile-list-item"><router-link to="/About/Process#CVERecordLifecycle">CVE Record Lifecycle</router-link></li>
                    <li class="cve-task-tile-list-item">
                      <span class="icon-text">
                        <a href="https://github.com/CVEProject">CVEProject on GitHub for Development
                        <span class="icon is-size-7 cve-icon-xxs">
                          <p id="cveGithub" class="is-hidden">external site</p>
                          <font-awesome-icon icon="external-link-alt" aria-labelledby="cveGithub" aria-hidden="false" >
                          </font-awesome-icon>
                        </span>
                        </a>
                      </span>
                    </li>
                    <li class="cve-task-tile-list-item"><router-link to="/CVERecord/UserGuide">CVE Record User Guide</router-link></li>
                  </ul>
                </TopicBox>
              </div>
              <div class="column p-1 is-flex is-flex-direction-column cve-task-learn-tile">
                <TopicBox title="Learn" icon="fa-brands fa-leanpub">
                  <ul class="tile-body cve-task-tile-list">
                    <li class="cve-task-tile-list-item"><router-link to="/About/Overview">About CVE</router-link></li>
                    <li class="cve-task-tile-list-item"><router-link to="/About/Process">Process</router-link></li>
                    <li class="cve-task-tile-list-item"><router-link to="/ProgramOrganization/Structure">Program Organization</router-link></li>
                    <li class="cve-task-tile-list-item"><router-link to="/About/RelatedEfforts">Related Efforts</router-link></li>
                    <li class="cve-task-tile-list-item"><router-link to="/ResourcesSupport/Glossary">Terminology</router-link></li>
                    <li class="cve-task-tile-list-item"><router-link :to="`/AllResources/CveServices`">CVE Services for CNAs</router-link></li>
                  </ul>
                </TopicBox>
              </div>
              <div class="column p-1 is-flex is-flex-direction-column cve-task-report-tile">
                <TopicBox title="Report/Request" icon="fa-regular fa-clipboard" titleSize="is-5">
                  <ul class="tile-body cve-task-tile-list">
                    <li class="cve-task-tile-list-item">
                      <router-link to="/ReportRequest/ReportRequestForNonCNAs">Report vulnerability/Request CVE ID</router-link>
                    </li>
                    <li class="cve-task-tile-list-item">
                      <router-link to="/ReportRequest/ReportRequestForNonCNAs">Request CVE Record be published/updated</router-link>
                    </li>
                    <li class="cve-task-tile-list-item">
                      <span class="icon-text">
                        <a href="https://cveform.mitre.org/" target="_blank">Report the use of a reserved CVE ID
                        <span class="icon is-size-7 cve-icon-xxs">
                          <p id="usedCVEID" class="is-hidden">external site</p>
                          <font-awesome-icon icon="external-link-alt" aria-labelledby="usedCVEID" aria-hidden="false" >
                          </font-awesome-icon>
                        </span>
                        </a>
                      </span>
                    </li>
                  </ul>
                </TopicBox>
              </div>
            </div>
        </div>
      </section>
      <section class="hero">
        <div class="hero-body cve-persona-tiles-hero-body">
          <div class="container">
            <h3 class="title is-4 cve-task-tile-group-header">
              Access Resources Based on Role
            </h3>
            <div class="columns is-gapless">
              <div class="column is-flex is-flex-direction-column">
                <div class="box is-radiusless p-0 is-flex-grow-1 cve-persona-tile-container">
                  <router-link to="/ResourcesSupport/Resources#CVENumberingAuthorities">
                    <div class="cve-persona-tile-content">
                      <span class="icon is-large is-block cve-persona-icon"><font-awesome-icon class="fas fa-3x" icon="handshake" /></span>
                      <p class="title is-6 has-text-centered">CVE Numbering Authority (CNA)</p>
                    </div>
                </router-link>
                </div>
              </div>
              <div class="column is-flex is-flex-direction-column">
                <div class="box is-radiusless p-0 is-flex-grow-1 cve-persona-tile-container">
                  <router-link to="/ResourcesSupport/Resources#CVEWorkingGroups">
                    <div class="cve-persona-tile-content">
                      <span class="icon is-large is-block cve-persona-icon"><font-awesome-icon class="fas fa-3x" icon="users-cog" /></span>
                      <p class="title is-6 has-text-centered">Working Group</p>
                    </div>
                  </router-link>
                </div>
              </div>
              <div class="column is-flex is-flex-direction-column">
                <div class="box is-radiusless p-0 is-flex-grow-1 cve-persona-tile-container">
                  <router-link to="/ResourcesSupport/Resources#CVEIDRequestersVulnerabilityResearchers">
                    <div class="cve-persona-tile-content">
                      <span class="icon is-large is-block cve-persona-icon"><font-awesome-icon class="fas fa-3x" icon="laptop-code" /></span>
                      <p class="title is-6 has-text-centered">Vulnerability Researcher</p>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <HomePageSidebarModule/>
  </div>
</template>

<script setup>

import HomePageSidebarModule from './HomePageSidebarModule.vue';
import TopicBox from '@/components/TopicBox.vue';

</script>

<style scoped lang="scss">

@use 'variables' as *;

.cve-hidden {
  display: none;
}

.cve-partnership-hero-body {
  border: 1px solid $theme-color-base-light;
  border-radius: 5px;
  background-color: white;
  padding: 1rem;
}

// column cve-partnership-right-column
.cve-partnership-right-column {
  text-align: center;
  padding: auto;
}

.cve-partnership-img {
  max-height: 200px;
  vertical-align: middle;
}

.hero-body.cve-persona-tiles-hero-body, .hero-body.cve-task-tiles-hero-body {
  padding-left: unset;
  padding-right: unset;
}

.cve-persona-tile-container {
  padding: unset;
  margin-bottom: unset;
}

.cve-persona-tile-container {
  border-style: solid;
  border-width: 1px;
  border-color: $theme-color-primary-darker;
  border-left-style: none;
}

.cve-persona-tile-container:first-child {
  border-left-style: solid;
}

.cve-persona-icon {
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 15px;
  color: $theme-color-primary-darker;
}

.cve-persona-tile-content {
  font-weight: bold;
  padding: 0.8rem;
}

.title:not(:last-child) {
  margin-bottom: 1rem;
}

.tile-body {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
}

.cve-task-access-tile {
  padding-left: 0;
}

.cve-task-report-tile {
  padding-right: 0px !important;
}

.cve-task-tile-list {
  padding: 0px 10px 20px 35px;
  text-align: left;
}

.cve-task-tile-list-item {
  list-style: square;
}

.icon {
  margin-bottom: unset;
}

.subtitle.cve-subtitle {
  margin-bottom: 1rem;
}

</style>
