<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 :id="resources()['id']" class="title">
              {{resources()['label']}}</h1>
              <p>
                CVE Program resources for specific program roles, automation for CNAs, program events,
                and other information categories are included below.
              </p>
            <h2 :id="anchorId('General')"
              class="title">
              {{sectionLabel('General')}}
            </h2>
            <BoxPair :titles="['Program Documents', 'Video & Ideas Repository']">
              <template #box1>
                <!-- Documents -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <span class="has-text-weight-bold">Rules &amp; Policies:</span>
                  </li>
                    <ul>
                      <li>
                        <router-link to="/ResourcesSupport/AllResources/CNARules" target="_blank">
                          CVE Numbering Authority (CNA) Rules
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/Resources/General/Policies/CVE-Record-Dispute-Policy.pdf" target="_blank">
                          CVE Record Dispute Policy (PDF, 0.3MB)
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/Resources/General/End-of-Life-EOL-Assignment-Process.pdf" target="_blank">
                          End-of-Life (EOL) Assignment Process (PDF, 0.3MB)
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/Resources/General/Policies/RBP-CVE-IDs-Policy.pdf" target="_blank">
                          Reserved but Public (RBP) Policy (PDF, 0.4MB)
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/Resources/General/Policies/Inactive-CNA-Policy.pdf" target="_blank">
                          Inactive CNAs Policy (PDF, 0.4MB)
                        </router-link>
                      </li>
                    </ul>
                   <li>
                    <span class="has-text-weight-bold">Documents:</span>
                   </li>
                   <ul>
                      <li>
                        <router-link to="/CVERecord/UserGuide">
                        CVE Record User Guide
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/ResourcesSupport/AllResources/ProfessionalCodeOfConduct">
                        CVE Program Professional Code of Conduct
                        </router-link>
                      </li>
                    </ul>
                </ul>
              </template>
              <template #box2>
                <!-- Video & Ideas Repository -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                      <li>
                        <a target='_blank' href="https://youtu.be/W4T2n_2m7WA?si=sRxC1wLEbZ81AeCb">
                          CVE Lightning Talk Video
                        </a>
                        <br/>
                        <span class="cve-help-text">
                          Provides a high-level overview of the CVE Program, including an introduction
                          to CVE Records and how and why to become a CNA
                        </span>
                      </li>
                      <li>
                        <a href="https://github.com/CVEProject/Ideas" target="_blank">
                          CVE Program Ideas Repository on GitHub.com
                        </a>
                        <br/>
                        <span class="cve-help-text">
                          The CVE Program welcomes innovative ideas and new
                          feature requests from the community
                        </span>
                      </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('CVE List')"
              class="title">
              {{sectionLabel('CVE List')}}
            </h2>
            <BoxPair :titles="['Search/Downloads', 'Data Feeds']">
              <template #box1>
                <!-- Search/Downloads -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                   <li>
                    <span class="has-text-weight-bold">Search:</span>
                  </li>
                    <ul>
                      <li>
                        <router-link to="/">
                          Search CVE List
                        </router-link> by CVE ID(s), keyword(s), etc.
                      </li>
                      <li>
                        <router-link to="/ResourcesSupport/FAQs#pc_cve_list_basics-search_cve">
                          Search Tips
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/CVERecord/UserGuide">
                          CVE Record User Guide
                        </router-link>
                      </li>
                    </ul>
                  <li>
                    <span class="has-text-weight-bold">Downloads:</span>
                  </li>
                    <ul>
                      <li>
                        <router-link to="/Downloads">
                          CVE List Downloads
                        </router-link>
                      </li>
                    </ul>
                </ul>
              </template>
              <template #box2>
                <!-- Data Feeds -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                    <li>
                    <span class="has-text-weight-bold">Feed of newly published CVE Records:</span>
                  </li>
                    <ul>
                      <li>
                        <a href="https://x.com/CVEnew" target="_blank">
                          @CVEnew on X
                        </a>
                      </li>
                      <li>
                        <a href='https://github.com/CVEProject/cvelistV5' target='_blank'>
                          CVE List downloads (updated hourly)
                        </a>
                        cvelistV5 repository on GitHub
                      </li>
                    </ul>
                  <li>
                    <span class="has-text-weight-bold">External Feeds of CVE List content:</span>
                  </li>
                    <ul>
                      <li>
                        <a href="https://cassandra.cerias.purdue.edu/CVE_changes/"
                          target="_blank">
                          CVE Change Logs
                        </a>
                        free tool from CERIAS/Purdue University that
                        provides daily and monthly changes to CVE Records
                      </li>
                    </ul>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('CVE Numbering Authorities (CNAs)')"
              class="title">
              {{sectionLabel('CVE Numbering Authorities (CNAs)')}}
            </h2>
            <BoxPair :titles="['Rules & Policies', 'Reserve IDs/Publish Records']">
              <template #box1>
                <!-- Rules & Policies -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <router-link to="/ResourcesSupport/AllResources/CNARules" target="_blank">
                      CVE Numbering Authority (CNA) Rules
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Resources/General/Policies/CVE-Record-Dispute-Policy.pdf" target="_blank">
                      CVE Record Dispute Policy (PDF, 0.3MB)
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Resources/General/End-of-Life-EOL-Assignment-Process.pdf" target="_blank">
                      End-of-Life (EOL) Assignment Process (PDF, 0.3MB)
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Resources/General/Policies/RBP-CVE-IDs-Policy.pdf" target="_blank">
                      Reserved but Public (RBP) Policy (PDF, 0.4MB)
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Resources/General/Policies/Inactive-CNA-Policy.pdf" target="_blank">
                      Inactive CNAs Policy (PDF, 0.4MB)
                    </router-link>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- ID Reservation/Record Publishing -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <router-link to="/ReportRequest/ReserveIDsPublishRecordsForCNAs">
                      Self-Service Automation
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Resources/Roles/Cnas/CPEinCVERecordsGuide.pdf" target="_blank">
                      Quick Start Guide for CPE Applicability Statements in the CVE Record Format (PDF, 3.1MB)
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/ResourcesSupport/FAQs#pc_cna-retrieve_reserve_cve_ids_list">
                      How to Retrieve a List of Your Organization’s RESERVED CVE IDs
                    </router-link>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <BoxPair :titles="['Best Practices', 'Additional Resources']">
              <template #box1>
                <!-- Best Practices -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <router-link to="/Resources/Roles/Cnas/CVE-Record-Management-Guidelines.pdf" target="_blank">
                      CVE Record Management Guidelines (PDF, 0.9MB)
                    </router-link>
                    <br/>
                    <span class="cve-help-text">
                      Protecting the integrity of CVE Records is important.
                      This document provides best practices for CNAs when
                      modifying CVE Records
                    </span>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Additional Resources -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <router-link to="/Resources/Roles/Cnas/FrontierAiResearcherCNAsPilot.pdf" target="_blank">
                      Frontier AI Researcher CVE Numbering Authorities (CNAs) Pilot
                    </router-link>
                  </li>
                  <li>
                    <a href="https://cwe.mitre.org/documents/cwe_usage/guidance.html" target="_blank">
                      CVE → CWE “Root Cause Mapping” Guidance
                    </a>
                  </li>
                  <li>
                    <router-link to="/Media/News/Blogs">
                      Blogs for CNAs
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Media/News/Podcasts">
                      Podcasts for CNAs
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/PartnerInformation/ListofPartners">
                      List of all CNA Partners
                    </router-link>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <BoxPair :titles="['Become a CNA', 'Orientation Videos']">
              <template #box1>
                <!-- Become a CNA -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <router-link to="/ProgramOrganization/CNAs">
                      Overview
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/PartnerInformation/Partner">
                    Business Benefits
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/PartnerInformation/Partner">
                      Requirements
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/PartnerInformation/Partner">
                      How to Join
                    </router-link>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Orientation Videos -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <a target='_blank' href="https://youtu.be/W4T2n_2m7WA?si=sRxC1wLEbZ81AeCb">
                      CVE Lightning Talk Video
                    </a>
                    <br/>
                    <span class="cve-help-text">
                      Provides a high-level overview of the CVE Program, what a CVE Record is and how it enables two or
                      more people or tools to refer to a vulnerability and know they are talking about the same thing,
                      and an introduction to how and why to become a CNA partner
                    </span>
                  </li>
                  <li>
                    <router-link to="/Media/News/item/podcast/2026/09/22/CVE-Numbering-Authority-CNA-Scopes">
                      CNA Scopes (Podcast)
                    </router-link>
                    <br/>
                    <span class="cve-help-text">
                      How to write a CNA scope, how the type of organization (vendor, open source, etc.)
                      influences what’s included in a scope, ensuring the scope aligns to the <i>CNA Operational Rules</i>,
                      avoiding scope overlaps, EOL products, how scopes might evolve over time, and more
                    </span>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('CVE Services')"
              class="title">
              {{sectionLabel('CVE Services')}}
            </h2>
            <BoxPair :titles="['CVE Services for CNAs', 'CVE Services Videos']">
              <template #box1>
                <!-- CVE Services for CNAs -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <span class="has-text-weight-bold">Basics:</span>
                  </li>
                    <ul>
                      <li>
                        <router-link to="/AllResources/CveServices">
                          Overview &amp; Status
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/AllResources/CveServices#current-status">
                          Known Issues
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/AllResources/CveServices#obtaining-credentials">
                          How to Obtain Credentials
                        </router-link>
                      </li>
                    </ul>
                  <li>
                    <span class="has-text-weight-bold">Using CVE Services:</span>
                  </li>
                    <ul>
                      <li>
                        <router-link to="/AllResources/CveServices#cve-record-workflow">
                          Workflow Tutorial
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/AllResources/CveServices#using-cve-services-clients">
                          CVE Services Clients
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/Resources/Roles/Cnas/UsingVulnogramCVEServices.pdf" target="_blank">
                          Vulnogram User Guide (PDF, 4.0MB)
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/AllResources/CveServices#build-your-own-client">
                          Build Your Own Client
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/AllResources/CveServices#communitydevelopedtoolsresources">
                          Community-Developed Tools and Resources for CVE Services
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/AllResources/CveServices#TestEnvironment">
                          Test Environment
                        </router-link>
                      </li>
                    </ul>
                  <li>
                    <span class="has-text-weight-bold">Additional Resources:</span>
                  </li>
                    <ul>
                      <li>
                        <router-link to="/Downloads#current-format">
                          CVE Records Bulk Downloads
                        </router-link>
                      </li>
                    </ul>
                </ul>
              </template>
              <template #box2>
                <!-- CVE Services Videos -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <span class="has-text-weight-bold">Introduction:</span>
                  </li>
                    <ul>
                      <li>
                        <a href="https://youtu.be/K2OoRpDhzss" target="_blank">Introduction to CVE Services</a>
                      </li>
                      <li>
                        <a href="https://youtu.be/Hu5KZ6X1WS4" target="_blank">CVE Services Overview</a>
                      </li>
                      <li>
                        <a href="https://youtu.be/KSNvidMTKNA" target="_blank">Obtaining Account Credentials</a>
                      </li>
                      <li>
                        <a href="https://youtu.be/k6eRdnzgk9E" target="_blank">CVE Record Workflow Overview</a>
                      </li>
                    </ul>
                  <li>
                    <span class="has-text-weight-bold">CVE Record Format:</span>
                  </li>
                    <ul>
                      <li>
                        <a href="https://youtu.be/YWZECqzRI7M" target="_blank">Introduction/Tips/Q&amp;A</a>
                      </li>
                      <li>
                        <a href="https://youtu.be/ok_ZMTCVmhw" target="_blank">Guidance</a>
                      </li>
                      <li>
                        <a href="https://youtu.be/dcEJ2t2jwhE" target="_blank">Experiences</a>
                      </li>
                    </ul>
                  <li>
                    <span class="has-text-weight-bold">Clients:</span>
                  </li>
                    <ul>
                      <li>
                        <a href="https://youtu.be/o3V-fmQpC0o" target="_blank">Vulnogram Demo #1</a>
                      </li>
                      <li>
                        <a href="https://youtu.be/6LF98w8xtQ8" target="_blank">Vulnogram Demo #2</a>
                      </li>
                      <li>
                        <a href="https://youtu.be/kqeM4noRnsg" target="_blank">cveClient Demo</a>
                      </li>
                      <li>
                        <a href="https://youtu.be/qOCd4S8JMa0" target="_blank">cvelib Demo</a>
                      </li>
                    </ul>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('CVEIDRequestersVulnerabilityResearchers')"
              class="title">
              {{sectionLabel('CVEIDRequestersVulnerabilityResearchers')}}
            </h2>
            <BoxPair :titles="['Program Documents', 'Additional Resources']">
              <template #box1>
                <!-- Documents -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <router-link to="/Resources/General/Key-Details-Phrasing.pdf" target="_blank">
                      Key Details Phrasing (PDF, 0.3MB)
                    </router-link>
                    <br/>
                    <span class="cve-help-text">
                      How to write a description for a CVE Record
                    </span>
                  </li>
                  <li>
                    <router-link to="/Resources/General/End-of-Life-EOL-Assignment-Process.pdf" target="_blank">
                      End-of-Life (EOL) Assignment Process (PDF, 0.3MB)
                    </router-link>
                    <br/>
                    <span class="cve-help-text">
                      Establishes the policy for the EOL CVE assignment
                      process
                    </span>
                  </li>
                  <li>
                    <router-link to="/Resources/General/Policies/CVE-Record-Dispute-Policy.pdf" target="_blank">
                      CVE Record Dispute Policy (PDF, 0.3MB)
                    </router-link>
                    <br/>
                    <span class="cve-help-text">
                      CVE Program policy and procedure for disputing a CVE Record
                    </span>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Additional Resources -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <router-link to="/CVERecord/UserGuide">
                      CVE Record Use Guide
                    </router-link>
                    <br/>
                    <span class="cve-help-text">
                      Details about selected fields shown on the CVE
                      Record Detail page
                    </span>
                  </li>
                  <li>
                    <router-link to="/Media/News/item/podcast/2022/05/03/Researchers-and-PSIRTs-Working-Well">
                      Researchers and PSIRTs Working Well Together (Podcast)
                    </router-link>
                    <br/>
                    <span class="cve-help-text">
                      What to expect when reporting vulnerabilities to a
                      Product Security Incident Response Team (PSIRT),
                      how to get the best outcome, supported versus EOL
                      products, CNA scopes, timing of patch versus
                      publication of CVE Record, and more
                    </span>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('CVE Working Groups')"
              class="title">
              {{sectionLabel('CVE Working Groups')}}
            </h2>
            <BoxPair :titles="['Charters', 'Additional WG Resources']">
              <template #box1>
                <!-- Charters -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <a href="https://github.com/CVEProject/automation-working-group/blob/master/AWG_Charter.md" target="_blank">
                      Automation Working Group (AWG) Charter
                    </a>
                  </li>
                  <li>
                    <router-link to="/Resources/Roles/WorkingGroups/COOP/COOP-Charter.pdf" target="_blank">
                      CNA Organization of Peers (COOP) Charter (PDF, 0.1MB)
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Resources/Roles/WorkingGroups/CVEAIWG/CVEAIWG-Charter.pdf" target="_blank">
                      CVE Artificial Intelligence Working Group (CVEAI WG) Charter (PDF, 0.1MB)
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Resources/Roles/WorkingGroups/OCWG/OCWG-Charter.pdf" target="_blank">
                      Outreach and Communications Working Group (OCWG) Charter (PDF, 0.1MB)
                    </router-link>
                  </li>
                  <li>
                    <a href="https://github.com/CVEProject/quality-workgroup/blob/main/README.md" target="_blank">
                      Quality Working Group (QWG) Charter
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/CVEProject/researcher-working-group/blob/main/rwg-charter.md" target="_blank">
                      Researcher Working Group (RWG) Charter
                    </a>
                  </li>
                  <li>
                    <router-link to="/Resources/Roles/WorkingGroups/SPWG/SPWG-Charter.pdf" target="_blank">
                      Strategic Planning Working Group (SPWG) Charter (PDF, 0.2MB)
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Resources/Roles/WorkingGroups/VCEWG/VCEWG-Charter.pdf" target="_blank">
                      Vulnerability Conference and Events Working Group (VCEWG) Charter (PDF, 0.2MB)
                    </router-link>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Additional WG Resources -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <router-link to="/Media/News/item/podcast/2021/09/07/CVE-Working-Groups-What-They">
                      CVE Working Groups, What They Are and How They Improve CVE (Podcast)
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/ProgramOrganization/WorkingGroups">
                      How to Join a Working Group
                    </router-link>
                  </li>
                  <li>
                    <router-link to="/Resources/Roles/WorkingGroups/CVE-Working-Group-Operations-Handbook-v1-0.pdf" target="_blank">
                      CVE WG Operations Handbook (PDF, 0.1MB)
                    </router-link>
                  </li>
                  <li>
                    <span class="has-text-weight-bold">
                      Repositories &amp; Projects:
                    </span>
                  </li>
                  <ul>
                    <li>
                      <router-link to="/ProgramOrganization/WorkingGroups#AutomationWorkingGroupAWG">
                        AWG
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/ProgramOrganization/WorkingGroups#CVEConsumerWorkingGroupCWG">
                        CWG
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/ProgramOrganization/WorkingGroups#OutreachandCommunicationsWorkingGroupOCWG">
                        OCWG
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/ProgramOrganization/WorkingGroups#QualityWorkingGroupQWG">
                        QWG
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/ProgramOrganization/WorkingGroups#ResearcherWorkingGroupRWG">
                        RWG
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/ProgramOrganization/WorkingGroups#StrategicPlanningWorkingGroupSPWG">
                        SPWG
                      </router-link>
                    </li>
                    <li>
                      <router-link to="/ProgramOrganization/WorkingGroups#TacticalWorkingGroupTWG">
                        TWG
                      </router-link>
                    </li>
                  </ul>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Workshops VulnCon')"
              class="title">
              {{sectionLabel('Workshops VulnCon')}}
            </h2>
            <BoxPair :titles="['Workshops', 'VulnCon']">
              <template #box1>
                <!-- Workshops -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                   <li>
                    <span class="has-text-weight-bold">Videos:</span>
                  </li>
                    <ul>
                      <li>
                        <a href="https://youtu.be/fV_X57aD188" target="_blank">
                          “CVE and AI Vulnerability Discovery” Virtual Conference (1 Video)
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/playlist?list=PLWfD9RQVdJ6dT8VZntG-DsK7c34rNNMMv" target="_blank">
                          CVE Program Technical Workshop 2025 (12 Videos)
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/playlist?list=PLWfD9RQVdJ6c4D_PAvO9hgtQSDTD2epOo" target="_blank">
                          CVE Program CNA Workshop 2024 (15 Videos)
                        </a>
                      </li>
                      <li>
                        <a href="https://t.co/d3itxu9ffB" target="_blank">
                          CNA Rules Version 4.0 Q&amp;A Webinar (1 Video)
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/playlist?list=PLWfD9RQVdJ6cWmIHqUIiJ_A5i1DrtG0wI" target="_blank">
                          CVE Program Workshop Fall 2023 (7 Videos)
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/playlist?list=PLWfD9RQVdJ6etGbopVxE5Nb-8TzjY5cl9" target="_blank">
                          CVE Services Workshop Fall 2022 (10 Videos)
                        </a>
                      </li>
                    </ul>
                  <li>
                    <span class="has-text-weight-bold">Artifacts:</span>
                  </li>
                    <ul>
                      <li>
                        <router-link to="/Resources/General/CVE-Technical-Workshop-Meeting-Notes-2025.pdf" target="_blank">
                          CVE Program Technical Workshop 2025 &ndash; Meeting Notes (PDF, 0.3MB)
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/Resources/General/CVE-CNA-Workshop-Meeting-Notes-2024.pdf" target="_blank">
                          CVE Program CNA Workshop 2024 &ndash; Meeting Notes (PDF, 0.2MB)
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/Resources/General/CVE-CNA-Workshop-Session-Summaries-2024.pdf" target="_blank">
                          CVE Program CNA Workshop 2024 &ndash; Session Summaries (PDF, 0.1MB)
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/Resources/General/CVE-Workshop-Presentations-Fall-2023.pdf" target="_blank">
                          CVE Program Workshop Presentations Fall 2023 (PDF, 2.5MB)
                        </router-link>
                      </li>
                    </ul>
                </ul>
              </template>
              <template #box2>
                <!-- VulnCon -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <span class="has-text-weight-bold">Videos:</span>
                  </li>
                    <ul>
                      <li>
                        <a href="https://www.youtube.com/watch?v=bBunxDmWb0A&list=PLWfD9RQVdJ6cKuu4Gr1uglJv_E5zfWh9R" target="_blank">
                          CVE/FIRST VulnCon 2026 (50 Videos)
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/watch?v=TH1tGO15K24&list=PLWfD9RQVdJ6cm3kSvz-Sk87CawSzn5Ep0" target="_blank">
                          CVE/FIRST VulnCon 2025 (89 Videos)
                        </a>
                      </li>
                      <li>
                        <a href="https://www.youtube.com/playlist?list=PLWfD9RQVdJ6db44oVABnI_JhIFEumoQnZ" target="_blank">
                          CVE/FIRST VulnCon 2024 (44 Videos)
                        </a>
                      </li>
                    </ul>
                </ul>
              </template>
            </BoxPair>
             <h2 :id="anchorId('CVE Logo')"
              class="title">
              {{sectionLabel('CVE Logo')}}
            </h2>
            <BoxPair :titles="['Logo', 'Logo Guidelines']">
              <template #box1>
                <!-- Logo -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                      <li>
                        <router-link to="/Resources/Media/LogoGuidelines/cveLogo.png" target="_blank">
                          CVE Logo (PNG, 19KB)
                        </router-link>
                      </li>
                      <li>
                        <router-link to="/Resources/Media/LogoGuidelines/cveLogo.svg" target="_blank">
                          CVE Logo (SVG, 2KB)
                        </router-link>
                      </li>
                </ul>
              </template>
              <template #box2>
                <!-- Logo Guidelines -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                      <li>
                        <router-link to="/Resources/Media/LogoGuidelines/CVE-Logo-Usage-Guidelines.pdf" target="_blank">
                          CVE Logo Usage Guidelines (PDF, 0.1MB)
                        </router-link>
                      </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Archive')"
              class="title">
              {{sectionLabel('Archive')}}
            </h2>
            <BoxPair :titles="['Program Documents', 'Legacy Website']">
              <template #box1>
                <!-- Program Documents -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <router-link to="/Resources/Media/Cve25YearsAnniversaryReport.pdf" target="_blank">
                      CVE 25th Anniversary Report
                    </router-link>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Legacy Website -->
                <ul class="mt-0 tile-body cve-task-tile-list">
                  <li>
                    <a href="/Resources/Media/Archives/OldWebsite/index.html" target="_blank">
                      Archived (9/2021) cve.mitre.org website
                    </a>
                  </li>
                </ul>
              </template>
            </BoxPair>
          </div>
        </main>
        </div>
      <div class="column is-3 is-hidden-touch">
        <NavigationSidebar :nav="cvenavs['Resources & Support']" />
      </div>
    </div>
  </div>
</template>

<script setup>

import BoxPair from '@/components/BoxPair.vue';
import NavigationSidebar from '@/components/NavigationSidebar.vue';
import TopicBox from '@/components/TopicBox.vue';

const props = defineProps({
  cvenavs: {
    type: Object,
    required: true
  }
});

function anchorId(sectionName) {
  return resources()['items'][sectionName]['anchorId'];
}

function resources() {
  return props.cvenavs['Resources & Support']['submenu']['Resources'];
}

function sectionLabel(sectionName) {
    return resources()['items'][sectionName]['label'];
}

</script>