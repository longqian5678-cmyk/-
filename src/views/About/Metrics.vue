<template>
  <div id="cve-secondary-page-main-container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 :id="metrics()['id']" class="title">{{metrics()['label']}}</h1>
            <p>Use the scroll bar to navigate the data tables. </p>
            <div class="cve-white-bg-gray-border-container pt-2">
              <h2 :id="anchorId('Published CVE Records')" class="title">
                {{sectionLabel('Published CVE Records')}}
              </h2>
              <p>
              Comparison of published
              <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CVE Records</router-link>
              by quarter for all years from 1999 to present.
              </p>
              <p class="cve-help-text">
                This metrics table reflects a point-in-time snapshot of published CVE Records taken after the end of each quarter.
                As the year progresses, prior quarters are recalculated to reflect any status changes (e.g., to remove rejected records),
                with a final reconciliation performed at year-end to ensure accurate annual totals.
                Previous years are not recalculated when a new year starts.
              </p>
              <div class="field is-grouped is-grouped-right">
                <label class="label">Sort by:</label>
                <div class="control">
                  <div class="select">
                    <select name="partner" v-model="publishedRecordsSortByYearSelectedOption" aria-label="select a sort by direction">
                      <option :value='"desc"'>Year (newest to oldest)</option>
                      <option :value='"asc"'>Year (oldest to newest)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="cve-scrollx-table-container">
                <table class="table is-striped is-hoverable cve-border-dark-blue">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th v-for="year in publishedCveRecords.years" :key="year">{{year}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="quarter in ['4', '3', '2', '1']" :key="`published-${quarter}`">
                      <th>Qtr{{quarter}}</th>
                      <td v-for="value in publishedCveRecords.quarters[quarter]" :key="value.key">{{value}}</td>
                    </tr>
                    <tr>
                      <th>TOTAL</th>
                      <td v-for="total in publishedCveRecords.total" :key="total.key">{{total}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="cve-white-bg-gray-border-container pt-2">
              <h2 :id="anchorId('Reserved CVE IDs')" class="title">
                {{sectionLabel('Reserved CVE IDs')}}
              </h2>
              <p>
                Comparison of Reserved <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryCVEID">CVE IDs</router-link> by year from
                1999 to present.
              </p>
              <p class="cve-help-text">
                A “Reserved” CVE ID is the initial state for a <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">
                CVE Record</router-link>; when the associated CVE ID is reserved by a
                <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryCNA">CVE Numbering Authority (CNA)</router-link>.
              </p>
              <div class="field is-grouped is-grouped-right">
                <label class="label">Sort by:</label>
                <div class="control">
                  <div class="select">
                    <select name="partner" v-model="reservedIdsSortByYearSelectedOption" aria-label="select a sort by direction">
                      <option :value='"desc"'>Year (newest to oldest)</option>
                      <option :value='"asc"'>Year (oldest to newest)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="cve-scrollx-table-container">
                <table class="table is-striped is-hoverable cve-border-dark-blue">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th v-for="year in reservedIds.years" :key="year">{{year}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Count</th>
                      <td v-for="count in reservedIds.counts['all']" :key="count.key">{{count}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <!-- <div class="cve-white-bg-gray-border-container pt-2">
              <h2 :id="cvenavs['About']['submenu']['Metrics']['items']['Reserved but Public (RBP) CVE IDs']['anchorId']"
                class="title">
                {{cvenavs['About']['submenu']['Metrics']['items']['Reserved but Public (RBP) CVE IDs']['label']}}
              </h2>
              <p>
                Comparison of <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRBP">Reserved but Public (RBP)</router-link> CVE IDs
                by quarter for all years from 2017 to present.
              </p>
              <p class="cve-help-text">
                An “RBP” is a <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryCVEID">CVE ID</router-link> in the Reserved state that
                is referenced in one or more public resources, but for which the details have not be published in a
                <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CVE Record</router-link>.
              </p>
              <div class="cve-scrollx-table-container">
                <table class="table is-striped is-hoverable cve-border-dark-blue">
                  <thead>
                    <th>Year</th>
                    <th>2021</th>
                    <th>2020</th>
                    <th>2019</th>
                    <th>2018</th>
                    <th>2017</th>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Qtr4</th>
                      <td>N/A</td>
                      <td>553</td>
                      <td>1,465</td>
                      <td>2,934</td>
                      <td>3,653</td>
                    </tr>
                    <tr>
                      <th>Qtr3</th>
                      <td>350</td>
                      <td>690</td>
                      <td>2,432</td>
                      <td>2,716</td>
                      <td>4,011</td>
                    </tr>
                    <tr>
                      <th>Qtr2</th>
                      <td>550</td>
                      <td>565</td>
                      <td>2,422</td>
                      <td>2,991</td>
                      <td>4,114</td>
                    </tr>
                    <tr>
                      <th>Qtr1</th>
                      <td>498</td>
                      <td>603</td>
                      <td>2,962</td>
                      <td>3,585</td>
                      <td>4,326</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> -->
            <div class="cve-white-bg-gray-border-container pt-2">
              <h2 :id="anchorId('CVE Record Publications by All CNAs Combined Versus CNA-LRs')"
                class="title">
                {{sectionLabel('CVE Record Publications by All CNAs Combined Versus CNA-LRs')}}
              </h2>
              <p>
                Comparison of
                <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CVE Records</router-link>
                published by all
                <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryCNA">CNAs</router-link>
                combined versus CVE Records published by the two
                <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryTLRoot">Top-Level Root</router-link>’s
                (<router-link to="/PartnerInformation/ListofPartners/partner/CISA">CISA</router-link><sup>*</sup> and
                <router-link to="/PartnerInformation/ListofPartners/partner/mitre">MITRE</router-link>)
                <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryCNALR">CNAs of Last Resort (CNA-LRs)</router-link>
                from 1999 to present.
              </p>
              <p class="cve-help-text">
                As more CNAs are onboarded, the percentage of records published by CNA-LRs will decrease.
                A smaller percentage for the CNA-LRs is an expected and net positive outcome as this signals that more CNAs are
                publishing their own CVE Records.
              </p>
              <div class="field is-grouped is-grouped-right">
                <label class="label">Sort by:</label>
                <div class="control">
                  <div class="select">
                    <select name="partner" v-model="recordPublicationsSortByYearSelectedOption" aria-label="select a sort by direction">
                      <option :value='"desc"'>Year (newest to oldest)</option>
                      <option :value='"asc"'>Year (oldest to newest)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="cve-scrollx-table-container">
                <table class="table is-striped is-hoverable cve-border-dark-blue">
                    <thead>
                      <tr>
                        <th>Year</th>
                        <th v-for="year in recordPublications.years" :key="year.key">{{year}}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>All CNAs</th>
                        <td v-for="percentage in recordPublications.countsByCnaType['All CNAs']" :key="percentage.key">{{percentage}}%</td>
                      </tr>
                      <tr>
                        <th>CNA-LRs</th>
                        <td v-for="percentage in recordPublications.countsByCnaType['CNA-LRs']" :key="percentage.key">{{percentage}}%</td>
                      </tr>
                  </tbody>
                </table>
                <p class="cve-help-text mt-3">*Note: CISA became a CNA-LR in calendar year 2020.</p>
              </div>
            </div>
            <div class="cve-white-bg-gray-border-container pt-2">
              <h2 :id="anchorId('CNA Partners Added by Year')" class="title">
                {{sectionLabel('CNA Partners Added by Year')}}
              </h2>
              <p>
                Comparison of
                <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryCNA">
                  CVE Numbering Authority (CNA)
                </router-link>
                partners added by year from 1999 to present.
              </p>
              <p class="cve-help-text">
                Currently, there are
                <router-link to="/PartnerInformation/ListofPartners">
                  {{parseInt(usePartnerStoreInstance.role.CNA) + parseInt(usePartnerStoreInstance.role['CNA-LR'])}} CNAs
                </router-link>
                ({{usePartnerStoreInstance.role.CNA}} CNAs and {{usePartnerStoreInstance.role['CNA-LR']}} CNA-LRs) from
                <router-link to="/ProgramOrganization/CNAs#CNAProgramGrowth">
                  {{usePartnerStoreInstance.countriesCount}} countries
                </router-link>
                and 1 no country affiliation participating in the CVE Program.
              </p>
              <p class="cve-help-text">
                <span class="is-italic">Note: Occasionally, CNAs become inactive due to corporate mergers or changes in business activities.
                In these cases, deactivated CNAs</span> are not removed <span class="is-italic">from the recruitment total CNAs added for a
                calendar year in the table below. Therefore, the totals by year columns if added together will not match the program’s grand
                total numbers above.</span>
              </p>
              <div class="field is-grouped is-grouped-right">
                <label class="label">Sort by:</label>
                <div class="control">
                  <div class="select">
                    <select name="partner" v-model="partnerAddedSortByYearSelectedOption" aria-label="select a sort by direction">
                      <option :value='"desc"'>Year (newest to oldest)</option>
                      <option :value='"asc"'>Year (oldest to newest)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="cve-scrollx-table-container">
                <table class="table is-striped is-hoverable cve-border-dark-blue">
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th v-for="year in cnasAddedByYear.years" :key="year">{{year}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="month in [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
                      'November', 'December']" :key="`added-${month}`">
                      <th>{{month}}</th>
                      <td v-for="value in cnasAddedByYear.months[month]" :key="value.key">{{value}}</td>
                    </tr>
                    <tr>
                      <th>TOTAL</th>
                      <td v-for="total in cnasAddedByYear.total" :key="total.key">{{total}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="cve-white-bg-gray-border-container pt-2">
              <h2 :id="anchorId('CNA Enrichment Recognition')" class="title">
                {{sectionLabel('CNA Enrichment Recognition')}}
              </h2>
              <div>
          <div role="alert" class="notification is-warning is-light">
            <div class="is-flex">
              <p id="alertIconCnaRules" class="is-hidden">alert</p>
              <font-awesome-icon style="flex: 0 0 40px;" size="1x"  icon="exclamation-triangle" role="alert"
                aria-labelledby="alertIconCnaRules" aria-hidden="false" />
              <div>
                <p>
                  UPDATE: As of June 2, 2025, the “CNA Enrichment Recognition List (ERL)” will be issued monthly based upon a data pull of the
                  previous six months. This is a change from the initial publication schedule of every two weeks with a data pull of the
                  previous 12 months. These changes are informed by a review of existing trends in data change, maintain a regular publication
                  cadence, and better align the ERL with the
                  <router-link to="/Resources/General/Policies/Inactive-CNA-Policy.pdf" target="_blank">Inactive CNA Policy</router-link>.
                </p>
                <p>
                  Future changes to the ERL qualification criteria and reporting may occur over time as the CVE Program continually aims to
                  recognize those
                  <router-link to="/ProgramOrganization/CNAs">CNAs</router-link>
                  taking on the work to increase the value of
                  <router-link to="/ResourcesSupport/Glossary?activeTerm=glossaryRecord">CVE Records</router-link>
                  for downstream consumers, and encourage others to do the same.
                </p>
              </div>
            </div>
          </div>
                <p>
                  Getting more precise and quality vulnerability information in the hands of defenders and downstream customers on a timelier basis
                  helps the cybersecurity community better address risks. Additional vulnerability-related information provides increased
                  transparency, enables vulnerability root cause understanding, and helps prioritize vulnerability and incident response. Information
                  standards and knowledge repositories like
                  <a href="https://www.first.org/cvss/" target="_blank">CVSS</a>,
                  <a href="https://cwe.mitre.org/" target="_blank">CWE</a>,
                  and others help provide a common language for this additional information.
                </p>
                <p>
                  In April 2024, the CVE Program
                  <router-link to="/Media/News/item/blog/2024/04/30/New-CVE-Record-Format-Enables-Additional-Data">
                    highlighted how its data format evolved
                  </router-link>
                  to better facilitate automation and data enrichment. This means that
                  <router-link to="/ProgramOrganization/CNAs">CNAs</router-link>,
                  as the authoritative source of vulnerability information within their scope, and &mdash; in the case of Supplier CNAs &mdash;
                  those with access to the most reliable source for accurate determinations, can easily provide data enrichment directly to a
                  CVE Record as opposed to waiting for a third-party to do so in a less timely and potentially less accurate manner. As such,
                  the CVE Program called on all CNAs to provide this enrichment to their CVE Records directly, and, in so doing, contribute more
                  substantially to the vulnerability management process. Many have answered that call.
                </p>
                <p>
                  In recognition of these CNAs, the CVE Program publishes this “CNA Enrichment Recognition List” once per month. Currently, any
                  CNA who has published a record in the past six months is placed on the list if they have been providing CVSS and CWE information
                  consistently in the recent past. In particular, the requirement is CVSS and CWE information in at least 98% of their records that
                  were published within two weeks of their most recently published record.
                </p>
                <p>
                  For more information about vulnerability information types like CVSS and CWE, see the
                  <router-link to="/CVERecord/UserGuide">CVE Record User Guide</router-link>.
                </p>
              </div>
              <h3 class="title">CNA Enrichment Recognition List</h3>
              <p class="cve-help-text"><span class="has-text-weight-bold">Last Updated: </span><time>October 5, 2026</time><br/>
              <span class="has-text-weight-bold">Total CNAs: </span>281</p>
              <div>
                <ul>
                  <li>Acer Inc.</li>
                  <li>Acronis International GmbH</li>
                  <li>Adobe Systems Incorporated</li>
                  <li>Advanced Micro Devices Inc.</li>
                  <li>Airbus</li>
                  <li>AlgoSec</li>
                  <li>Alibaba, Inc.</li>
                  <li>Altera</li>
                  <li>Altium</li>
                  <li>Amazon</li>
                  <li>AMI</li>
                  <li>Anthropic, PBC</li>
                  <li>ARC Informatique</li>
                  <li>Arista Networks, Inc.</li>
                  <li>Asea Brown Boveri Ltd.</li>
                  <li>ASR Microelectronics Co., Ltd.</li>
                  <li>ASUSTeK Computer Incorporation</li>
                  <li>ASUSTOR Inc.</li>
                  <li>Austin Hackers Anonymous</li>
                  <li>Autodesk</li>
                  <li>Automotive Security Research Group (ASRG)</li>
                  <li>BeyondTrust Inc.</li>
                  <li>Bitdefender</li>
                  <li>Bizerba SE & Co. KG</li>
                  <li>Black Duck Software, Inc.</li>
                  <li>Black Lantern Security</li>
                  <li>BlackBerry</li>
                  <li>Bombadil Systems LLC</li>
                  <li>Brocade Communications Systems LLC, a Broadcom Company</li>
                  <li>Bugcrowd Inc.</li>
                  <li>Bull SAS</li>
                  <li>CA Technologies</li>
                  <li>Caliptra Project</li>
                  <li>Canon EMEA</li>
                  <li>Canon Inc.</li>
                  <li>Canva</li>
                  <li>Cato Networks</li>
                  <li>Centreon</li>
                  <li>CERT.PL</li>
                  <li>CERT@VDE</li>
                  <li>Check Point Software Technologies Ltd.</li>
                  <li>Checkmarx</li>
                  <li>Checkmk GmbH</li>
                  <li>Cisco Systems, Inc.</li>
                  <li>Citrix Systems, Inc.</li>
                  <li>Cloudflare, Inc.</li>
                  <li>Computer Incident Response Center Luxembourg</li>
                  <li>Concrete CMS</li>
                  <li>ConnectWise LLC</li>
                  <li>Crestron Electronics, Inc.</li>
                  <li>Cribl, Inc.</li>
                  <li>CrowdStrike Holdings, Inc.</li>
                  <li>CyberDanube</li>
                  <li>Cybersecurity and Infrastructure Security Agency (CISA) U.S. Civilian Government</li>
                  <li>Dahua Technologies</li>
                  <li>Danfoss</li>
                  <li>Dassault Systèmes</li>
                  <li>Delinea, Inc.</li>
                  <li>Dell</li>
                  <li>Delta Electronics, Inc.</li>
                  <li>Digi International Inc.</li>
                  <li>Django Software Foundation</li>
                  <li>Docker Inc.</li>
                  <li>Document Foundation, The</li>
                  <li>dotCMS LLC</li>
                  <li>Eaton</li>
                  <li>Echo Software Ltd</li>
                  <li>ELAN Microelectronics Corp.</li>
                  <li>Elastic</li>
                  <li>EnterpriseDB Corporation</li>
                  <li>Environmental Systems Research Institute, Inc. (Esri)</li>
                  <li>Ericsson</li>
                  <li>Erlang Ecosystem Foundation</li>
                  <li>ESET, spol. s r.o.</li>
                  <li>EU Agency for Cybersecurity (ENISA)</li>
                  <li>Everpure, Inc.</li>
                  <li>Extreme Networks, Inc.</li>
                  <li>F5, Inc.</li>
                  <li>Fedora Project</li>
                  <li>Fermax Technologies SLU</li>
                  <li>Financial Security Institute (FSI)</li>
                  <li>Flexera Software LLC</li>
                  <li>Fluid Attacks</li>
                  <li>Forcepoint</li>
                  <li>Fortinet, Inc.</li>
                  <li>Fortra, LLC</li>
                  <li>Foxit Software Incorporated</li>
                  <li>FPT SOFTWARE CO., LTD</li>
                  <li>Fsas Technologies</li>
                  <li>Fujifilm Business Innovation Corp.</li>
                  <li>Gallagher Group Ltd.</li>
                  <li>Gen Digital Inc.</li>
                  <li>Genetec Inc.</li>
                  <li>GeoVision Inc.</li>
                  <li>GitHub (maintainer security advisories)</li>
                  <li>GitHub Inc, (Products Only)</li>
                  <li>GitLab Inc.</li>
                  <li>Glyph & Cog, LLC</li>
                  <li>GNU C Library</li>
                  <li>Google Cloud</li>
                  <li>Google LLC</li>
                  <li>Grafana Labs</li>
                  <li>Hackrate Kft.</li>
                  <li>HackRTU</li>
                  <li>Hanwha Vision Co., Ltd.</li>
                  <li>Harborist</li>
                  <li>HashiCorp Inc.</li>
                  <li>Haverford Systems, Inc.</li>
                  <li>HeroDevs</li>
                  <li>HiddenLayer, Inc.</li>
                  <li>Hitachi Energy</li>
                  <li>Hitachi Vantara</li>
                  <li>Hitachi, Ltd.</li>
                  <li>Honeywell International Inc.</li>
                  <li>HP Inc.</li>
                  <li>Huawei Technologies</li>
                  <li>HYPR Corp</li>
                  <li>IBM Corporation</li>
                  <li>ICS-CERT</li>
                  <li>Indian Computer Emergency Response Team (CERT-In)</li>
                  <li>Intel Corporation</li>
                  <li>Internet Systems Consortium (ISC)</li>
                  <li>IQSIGHT B.V.</li>
                  <li>Israel National Cyber Directorate</li>
                  <li>Ivanti</li>
                  <li>Jaspersoft</li>
                  <li>JetBrains s.r.o.</li>
                  <li>JFrog</li>
                  <li>Johnson Controls</li>
                  <li>JPCERT/CC</li>
                  <li>Juniper Networks, Inc.</li>
                  <li>Kong Inc.</li>
                  <li>KrCERT/CC</li>
                  <li>Kubernetes</li>
                  <li>Legion of the Bouncy Castle Inc.</li>
                  <li>Lenovo Group Ltd.</li>
                  <li>LG Electronics</li>
                  <li>Libreswan Project</li>
                  <li>linqi GmbH</li>
                  <li>Logitech</li>
                  <li>M-Files Corporation</li>
                  <li>Mandiant Inc.</li>
                  <li>Mattermost, Inc</li>
                  <li>Mautic</li>
                  <li>Medtronic</li>
                  <li>Microchip Technology</li>
                  <li>Microsoft Corporation</li>
                  <li>Milestone Systems A/S</li>
                  <li>Mitsubishi Electric Corporation</li>
                  <li>MongoDB</li>
                  <li>Moxa Inc.</li>
                  <li>N-able</li>
                  <li>National Cyber Security Centre Finland</li>
                  <li>National Instruments</li>
                  <li>NEC Corporation</li>
                  <li>Neo4j</li>
                  <li>NetApp, Inc.</li>
                  <li>NETGEAR</li>
                  <li>Netskope</li>
                  <li>Network Optix</li>
                  <li>Nintendo Co., Ltd.</li>
                  <li>NLnet Labs</li>
                  <li>Nozomi Networks Inc.</li>
                  <li>Nutanix</li>
                  <li>Nvidia Corporation</li>
                  <li>Octopus Deploy</li>
                  <li>Okta</li>
                  <li>OMICRON electronics</li>
                  <li>Omnissa, LLC</li>
                  <li>OMRON Corporation</li>
                  <li>Open-Xchange</li>
                  <li>openGauss Community</li>
                  <li>OpenHarmony</li>
                  <li>OpenJS Foundation</li>
                  <li>OpenText (formerly Micro Focus)</li>
                  <li>OpenVPN Inc.</li>
                  <li>OPPO</li>
                  <li>OTRS AG</li>
                  <li>Palo Alto Networks</li>
                  <li>Panasonic Holdings Corporation</li>
                  <li>Pandora FMS</li>
                  <li>PaperCut Software Pty Ltd</li>
                  <li>Patchstack</li>
                  <li>Payara</li>
                  <li>Pegasystems</li>
                  <li>Pentraze Cybersecurity</li>
                  <li>Perforce</li>
                  <li>PHP Group</li>
                  <li>Ping Identity Corporation</li>
                  <li>PostgreSQL</li>
                  <li>Postiz</li>
                  <li>Progress Software Corporation</li>
                  <li>Project Black</li>
                  <li>Protect AI</li>
                  <li>Proton AG</li>
                  <li>PTC Inc.</li>
                  <li>QNAP Systems, Inc.</li>
                  <li>Qt Group</li>
                  <li>Qualcomm, Inc.</li>
                  <li>Rapid7, Inc.</li>
                  <li>Real-Time Innovations, Inc.</li>
                  <li>Red Hat, Inc.</li>
                  <li>Robert Bosch GmbH</li>
                  <li>Roche Diagnostics</li>
                  <li>runZero, Inc.</li>
                  <li>SailPoint Technologies</li>
                  <li>Samsung TV & Appliance</li>
                  <li>SAP SE</li>
                  <li>SBA Research gGmbH</li>
                  <li>Schneider Electric SE</li>
                  <li>SCHUTZWERK GmbH</li>
                  <li>Seagate Technology</li>
                  <li>Seal Security</li>
                  <li>SEC Consult Vulnerability Lab</li>
                  <li>Secomea</li>
                  <li>Secur0</li>
                  <li>Securifera, Inc.</li>
                  <li>Securin</li>
                  <li>Security Risk Advisors</li>
                  <li>SICK AG</li>
                  <li>Siemens</li>
                  <li>Silicon Labs</li>
                  <li>Snowflake</li>
                  <li>Snyk</li>
                  <li>Softing</li>
                  <li>SolarWinds</li>
                  <li>Sonatype Inc.</li>
                  <li>Sophos</li>
                  <li>STAR Labs SG Pte. Ltd.</li>
                  <li>StrongDM</li>
                  <li>Super Micro Computer, Inc.</li>
                  <li>Synology Inc.</li>
                  <li>Talos</li>
                  <li>Tanium Inc.</li>
                  <li>TCS-CERT </li>
                  <li>TeamViewer Germany GmbH</li>
                  <li>Teltonika Networks</li>
                  <li>Temporal Technologies Inc.</li>
                  <li>Teradyne Robotics</li>
                  <li>Thales Group</li>
                  <li>The Browser Company of New York</li>
                  <li>The HDF Group</li>
                  <li>The illumos project</li>
                  <li>The Joomla! Project</li>
                  <li>The Missing Link Australia</li>
                  <li>The OpenNMS Group</li>
                  <li>The Rust Project</li>
                  <li>The Tcpdump Group</li>
                  <li>Thinkst Applied Research</li>
                  <li>Tigera</li>
                  <li>Toreon</li>
                  <li>TP-Link Systems Inc.</li>
                  <li>TR-CERT (Computer Emergency Response Team of the Republic of Turkey)</li>
                  <li>Trellix</li>
                  <li>Turan Security</li>
                  <li>TWCERT/CC</li>
                  <li>TYPO3 Association</li>
                  <li>Ubiquiti Inc.</li>
                  <li>upKeeper Solutions</li>
                  <li>Vaadin Ltd.</li>
                  <li>Vestel Electronics Industry & Trade Co.</li>
                  <li>Vivo Mobile Communication Technology Co., LTD.</li>
                  <li>VulDB</li>
                  <li>VulnCheck</li>
                  <li>WatchDogDevelopment.com, LLC</li>
                  <li>WatchGuard Technologies, Inc.</li>
                  <li>WIBU-SYSTEMS AG</li>
                  <li>wolfSSL Inc.</li>
                  <li>Wordfence</li>
                  <li>WSO2 LLC</li>
                  <li>Yandex N.V.</li>
                  <li>YesWeHack</li>
                  <li>Yokogawa Group</li>
                  <li>Zabbix</li>
                  <li>Zephyr Project</li>
                  <li>Zero Day Initiative</li>
                  <li>Zoom Video Communications, Inc.</li>
                  <li>Zscaler, Inc.</li>
                  <li>ZTE Corporation</li>
                  <li>ZUSO Advanced Research Team</li>
                  <li>Zyxel Corporation</li>
                </ul>
              </div>
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

<script>
import NavigationSidebar from '@/components/NavigationSidebar.vue';
import MetricsData from '@/assets/data/metrics.json';
import { usePartnerStore } from '@/stores/partners';

export default {
  name: 'Metrics',
  components: {
    NavigationSidebar,
  },
  props: {
    cvenavs: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      publishedRecordsSortByYearSelectedOption: 'desc',
      reservedIdsSortByYearSelectedOption: 'desc',
      recordPublicationsSortByYearSelectedOption: 'desc',
      partnerAddedSortByYearSelectedOption: 'desc',
      publishedCveRecords: {},
      reservedIds: {},
      recordPublications: {},
      cnasAddedByYear: {}
    };
  },
  created() {
    this.getSortedPublishedCveRecords('desc');
    this.getSortedReseredCveIds('desc');
    this.getSortedRecordPublications('desc');
    this.getSortedPartnerAddedByYear('desc');
  },
  computed: {
    usePartnerStoreInstance() {
      return usePartnerStore().partnerCounts;
    }
  },
  watch: {
    publishedRecordsSortByYearSelectedOption() {
      this.getSortedPublishedCveRecords();
    },
    reservedIdsSortByYearSelectedOption() {
      this.getSortedReseredCveIds();
    },
    recordPublicationsSortByYearSelectedOption() {
      this.getSortedRecordPublications();
    },
    partnerAddedSortByYearSelectedOption() {
      this.getSortedPartnerAddedByYear();
    },
  },
  methods: {
    sortMetricsDataByYear(data, sortDirection) {
      const sortModifier = sortDirection === 'asc' ? 1 : -1;
      data.sort((annualData1, annualData2) => {
        if (annualData1.year < annualData2.year) return -1 * sortModifier;
        if (annualData1.year > annualData2.year) return 1 * sortModifier;

        return 0;
      });
    },
    getSortedPublishedCveRecords() {
      const publishedCveRecords = { years: [], quarters: {}, total: [] };
      const metrics = MetricsData.publishedCveRecords;
      this.sortMetricsDataByYear(metrics, this.publishedRecordsSortByYearSelectedOption);

      metrics.forEach((annualData) => {
        publishedCveRecords.years.push(annualData.year);

        let total = 0;
        annualData.data.forEach((data) => {
          if (!Object.prototype.hasOwnProperty.call(publishedCveRecords.quarters, data.quarter)) {
            publishedCveRecords.quarters[data.quarter] = [];
          }
          publishedCveRecords.quarters[data.quarter].push(data.value);

          total += /\d/.test(data.value) ? parseInt(data.value.replace(/,/, ''), 10) : 0;
        });
        publishedCveRecords.total.push(Intl.NumberFormat('en-US').format(total));
      });

      this.publishedCveRecords = publishedCveRecords;
    },
    getSortedReseredCveIds() {
      const sortedReservedIdsByYear = { years: [], counts: {} };
      const metrics = MetricsData.reservedCveIds;
      this.sortMetricsDataByYear(metrics, this.reservedIdsSortByYearSelectedOption);

      metrics.forEach((annualData) => {
        sortedReservedIdsByYear.years.push(annualData.year);

        annualData.data.forEach((data) => {
          if (!Object.prototype.hasOwnProperty.call(sortedReservedIdsByYear.counts, data.quarter)) {
            sortedReservedIdsByYear.counts[data.quarter] = [];
          }
          sortedReservedIdsByYear.counts[data.quarter].push(data.value);
        });
      });

      this.reservedIds = sortedReservedIdsByYear;
    },
    getSortedRecordPublications() {
      const sortedRecordPublications = { years: [], countsByCnaType: {} };
      const metrics = MetricsData.cveRecordPublications;
      this.sortMetricsDataByYear(metrics, this.recordPublicationsSortByYearSelectedOption);

      metrics.forEach((annualData) => {
        if (annualData.year > 2015) {
          sortedRecordPublications.years.push(annualData.year);

          annualData.data.forEach((data) => {
            if (!Object.prototype.hasOwnProperty.call(sortedRecordPublications.countsByCnaType, data.heading)) {
              sortedRecordPublications.countsByCnaType[data.heading] = [];
            }
            sortedRecordPublications.countsByCnaType[data.heading].push(data.percentage);
          });
        }
      });

      if (this.recordPublicationsSortByYearSelectedOption === 'asc') {
        sortedRecordPublications.years[0] = '1999-2016';
      } else {
        sortedRecordPublications.years[sortedRecordPublications.years.length - 1] = '2016-1999';
      }

      this.recordPublications = sortedRecordPublications;
    },
    getSortedPartnerAddedByYear() {
      const cnasAddedByYear = { years: [], months: {}, total: [] };
      const metrics = MetricsData.cnasAddedByYear;
      this.sortMetricsDataByYear(metrics, this.partnerAddedSortByYearSelectedOption);

      metrics.forEach((annualData) => {
        cnasAddedByYear.years.push(annualData.year);

        let total = 0;
        annualData.data.forEach((data) => {
          if (!Object.prototype.hasOwnProperty.call(cnasAddedByYear.months, data.month)) {
            cnasAddedByYear.months[data.month] = [];
          }
          cnasAddedByYear.months[data.month].push(data.value);

          total += /\d/.test(data.value) ? parseInt(data.value.replace(/,/, ''), 10) : 0;
        });
        cnasAddedByYear.total.push(Intl.NumberFormat('en-US').format(total));
      });

      this.cnasAddedByYear = cnasAddedByYear;
    },
    anchorId(sectionName) {
      return this.metrics()['items'][sectionName]['anchorId'];
    },
    metrics() {
      return this.cvenavs['About']['submenu']['Metrics'];
    },
    sectionLabel(sectionName) {
        return this.metrics()['items'][sectionName]['label'];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

// Equally space data cells in metrics tables
// Numbers in metrics tables look better right-aligned.

td {
  width: auto !important;
  text-align: right !important;
}
</style>
