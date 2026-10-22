<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns  is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 :id="workingGroups()['id']" class="title">
              {{workingGroups()['label']}}</h1>
            <p>
              CVE Working Groups (WGs) actively focus on improving processes, workflows, and other aspects of the program as it continues to grow
              and expand. There are ten main WGs: Automation (AWG), CNA Organization of Peers (COOP), CVE Consumer Working Group (CWG),
              CVE Artificial Intelligence (CVEAI WG), Outreach and Communications (OCWG), Quality (QWG), Researcher Working Group (RWG),
              Strategic Planning (SPWG), Tactical (TWG), and Vulnerability Conference and Events (VCEWG).
            </p>
            <p>
              Details about these WGs are found below including information on how to join, as well as links to documents, repositories,
              and projects. Read the
              <router-link to="/Resources/Roles/WorkingGroups/CVE-Working-Group-Operations-Handbook-v1-0.pdf" target="_blank">CVE Working Group
              Operations Handbook</router-link>.
            </p>
            <div id="cve-how-to-join">
              <h3 class="title">
                How to Join
              </h3>
              <p>
                Access the
                <a href="https://cveform.mitre.org/" target="_blank">CVE Program Web Forms</a>
                using the “Join a WG” button below.
              </p>
              <ul>
                <li>
                  Choose the “General Support” form to ask a question.
                </li>
                <li>
                  To request to join a working group, choose the “Join a Working Group” form.
                </li>
              </ul>
              <div class="buttons is-centered pt-4">
                <a href="https://cveform.mitre.org/" class="button cve-button cve-button-accent-warm" target="_blank">Join a WG</a>
              </div>
            </div>
            <br/>
            <h2 :id="anchorId('Automation Working Group (AWG)')"
            class="title">
            {{sectionLabel('Automation Working Group (AWG)')}}</h2>
            <p>
              Co-Chairs: Kris Britton, Terrell Mitchell, and Dave Welch
            </p>
            <p>
              The AWG is focused on identifying and advancing proposals for the collaborative design, development, and deployment of
              automated capabilities that support the efficient management of the CVE Program.
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span> Per the AWG Charter, “Any active, CVE authorized
              program member may participate on the AWG. This includes Board members, CVE Numbering Authority (CNA) representatives,
              [and] participants from the Secretariat’s organization. In addition, the AWG is open to participation from the public
              at large. There is no limit to the number of representatives a given organization may have as members of the
              working group.”
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/cve-services/blob/dev/CONTRIBUTING.md" target="_blank">Contributing to CVE Services</a>
                  </li>
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/automation-working-group/blob/master/AWG_Charter.md" target="_blank">AWG Charter</a>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Repositories and Projects -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/CVE-Services" target="_blank">CVE Services Project</a>
                  </li>
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/cvelistV5" target="_blank">CVE List Bulk Downloads Repository</a>
                  </li>
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/automation-working-group" target="_blank">AWG GitHub Repository</a>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('CNA Organization of Peers (COOP)')"
              class="title">
              {{sectionLabel('CNA Organization of Peers (COOP)')}}
            </h2>
            <p id="CNACoordinationWorkingGroupCNACWG"></p>
            <p>
              Co-Chairs: Tod Beardsley and MegaZone
            </p>
            <p>
              The COOP (pronounced Co-Op) is focused on providing a forum for more effective communication and participation by the CVE Numbering
              Authorities (CNAs).
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span>
              Per the COOP Charter, “Membership to the working group is limited to representatives of currently active CVE Numbering Authorities
              (CNAs), as designated by the Secretariat. There is no limit to the number of representatives a given CNA may have as members of the
              working group.”
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <router-link to="/Resources/Roles/WorkingGroups/COOP/COOP-Charter.pdf" target="_blank">
                      COOP Charter (PDF, 0.1MB)
                    </router-link>
                  </li>
                </ul>
              </template>
              <template #box2>
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    TBA
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('CVE Consumer Working Group (CWG)')"
              class="title">
              {{sectionLabel('CVE Consumer Working Group (CWG)')}}
            </h2>
            <p>
              Co-Chairs: Jay Jacobs and Bob Lord
            </p>
            <p>
              The CWG serves as a dedicated forum for representing the perspectives of end-consumers of CVE List data, such as enterprises,
              security teams, vulnerability analysts, government agencies, managed security service providers (MSSPs), academic researchers,
              software vendors and tool developers who rely on CVE data to support decision-making, operational defense, and risk management.
            </p>
            <p>
              The CWG identifies consumer needs, evaluates the usability of CVE data, and recommends improvements to ensure that the
              CVE Program remains aligned with real-world use cases.
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span>
              Membership is open to external stakeholders who consume and work with CVE data, as well as CVE Board members,
              CVE Numbering Authorities (CNAs), and Authorized Data Publishers (ADPs). Individuals with relevant perspectives on CVE
              consumption are encouraged to participate.
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeXbh-w0HAHID0Qsj47jEosqdTihJgahnkNEGf9cN14vKKmoA/viewform"
                    target="_blank">Request CWG Membership</a> (Google Docs Form)
                  </li>
                  <li class="cve-task-tile-list-item">
                    CWG Charter - TBA
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Repositories and Projects -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/consumer-working-group" target="_blank">CWG GitHub Repository</a>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('CVE Artificial Intelligence Working Group (CVEAI WG)')"
              class="title">
              {{sectionLabel('CVE Artificial Intelligence Working Group (CVEAI WG)')}}
            </h2>
            <p>
              Chair: Erick Galinkin
            </p>
            <p>
              The CVEAI WG is focused on defining swim lanes for AI vulnerability disclosure within CVE. This WG will discuss the concerns
              in defining what is within the responsibilities of the CVE Program. Because not all AI issues are appropriate for a CVE assignment,
              it will also try to define when other AI security-related initiatives are needed to address concerns outside the CVE Program.
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span> Per the CVEAI WG Charter, “Any active CVE-authorized program
              member may participate in the CVEAI. This includes Board members, CVE Numbering Authority (CNA) representatives,
              Authorized Data Publishers (ADP), and participants from the Secretariat’s organization. This WG is also open to public membership,
              including members of corporate vulnerability management programs, as well as VM related standards, initiatives and associations
              and others. It is also open to members of the AI community with expertise in AI and AI related security concerns.”
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <router-link to="/Resources/Roles/WorkingGroups/CVEAIWG/CVEAIWG-Charter.pdf" target="_blank">CVEAI WG Charter</router-link>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Repositories and Projects -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    TBA
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Outreach and Communications Working Group (OCWG)')" class="title">
              {{sectionLabel('Outreach and Communications Working Group (OCWG)')}}
            </h2>
            <p>
              Co-Chairs: Tomo Ito and Robert Roberge
            </p>
            <p>
              The OCWG is focused on promoting the CVE Program to achieve program adoption and coverage goals through
              increased community awareness.
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span>
              Per the OCWG Charter, “Any active member of a CVE-authorized program may participate in the OCWG, including Board members,
              CVE Numbering Authority (CNA) representatives, as designated by the Secretariat, and participants from the Secretariat’s
              organization. The OCWG is also open to participation from the public at large.”
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <router-link to="/Resources/Roles/WorkingGroups/OCWG/OCWG-Charter.pdf" target="_blank">OCWG Charter (PDF, 0.1MB)</router-link>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Repositories and Projects -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <router-link to="/Media/News/Podcasts">Podcasts</router-link>
                  </li>
                  <li class="cve-task-tile-list-item">
                    <router-link to="/Media/News/Blogs">Blogs</router-link>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Quality Working Group (QWG)')"
              class="title">
              {{sectionLabel('Quality Working Group (QWG)')}}
            </h2>
            <p>
              Co-Chairs: Chris Coffin, MegaZone, and Dave Waltermire
            </p>
            <p>
              The QWG is focused on identifying areas where CVE content, rules, guidelines, and best practices must improve to
              better support stakeholder use cases.
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span> Per the QWG Charter, “Any active, CVE authorized
              program member may participate on the QWG. This includes Board members, CVE Numbering Authority (CNA) representatives,
              [and] participants from the Secretariat’s organization. There is no limit to the number of representatives a given
              CNA may have as members of the working group. The QWG is not open to participation from the public at large. On a
              case-by-case basis, the QWG can decide through consensus to allow a non-CVE program member to participate in the QWG.
              Their membership will be reviewed annually.”
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/quality-workgroup/blob/main/README.md" target="_blank">QWG Charter</a>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Repositories and Projects -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/cve-schema" target="_blank">CVE Record Format Schema</a>
                  </li>
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/quality-workgroup" target="_blank">QWG GitHub Repository</a>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Researcher Working Group (RWG)')"
            class="title">
              {{sectionLabel('Researcher Working Group (RWG)')}}
            </h2>
            <p>
              Chair: Yves Younan
            </p>
            <p>
              The RWG was established with the purpose of giving voice to, and establishing working norms for, the extended community of
              designated Research CVE Numbering Authorities (CNAs). This includes providing guidance and advice to the research community,
              as well as other research community activities designed to promote the CVE Program.
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span>
              In order to build and preserve a TLP: Amber level of trust among working group participants, membership to the group is limited to
              representatives of currently active CNAs that are designated as either research CNAs or bug bounty CNAs, as designated by the
              CVE Program Secretariat, as well as their respective Roots and the CVE Board. From time to time, individuals not associated with
              research or bug bounty CNAs may also be invited to join upon reaching consensus of the existing membership. There is
              no limit to the number of representatives a given CNA may have as members of the group.
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/researcher-working-group/blob/main/rwg-charter.md" target="_blank">RWG Charter</a>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Repositories and Projects -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    TBA
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Strategic Planning Working Group (SPWG)')"
            class="title">
              {{sectionLabel('Strategic Planning Working Group (SPWG)')}}
            </h2>
            <p>
              Chair: Art Manion
            </p>
            <p>
              The SPWG is focused on the long-term strategy (1-5 years) and goals of the CVE Program; will work closely with the
              <router-link to="/ProgramOrganization/Board">CVE Board</router-link> to determine goals and objectives and will act to achieve them.
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span> Per the SPWG Charter, “Any active, CVE authorized
              program member may participate on the SPWG. This includes Board members, CVE Numbering Authority (CNA) representatives,
              [and] participants from the Secretariat’s organization. There is no limit to the number of representatives a given CNA
              may have as members of the working group. The SPWG is not open to participation from the public at large. On a
              case-by-case basis, the SPWG can decide through consensus to allow a non-CVE Program member to participate in the SPWG.
              Their membership will be reviewed annually.”
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <router-link to="/Resources/Roles/WorkingGroups/SPWG/SPWG-Charter.pdf" target="_blank">SPWG Charter (PDF, 0.2MB)</router-link>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Repositories and Projects -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/strategic-planning-working-group" target="_blank">SPWG GitHub Repository</a>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Tactical Working Group (TWG)')"
            class="title">
              {{sectionLabel('Tactical Working Group (TWG)')}}
            </h2>
            <p>
              Co-Chairs: Lisa Olson and Alec Summers
            </p>
            <p>
              The TWG is focused on managing, coordinating, and expediting CVE Program activities, communications, and processes for the benefit of
              program stakeholders.
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span> Membership is limited to active CVE Board members, CVE Working Groups
              chairs, and participants from the Secretariat’s organization.
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    TWG Charter - TBA
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Repositories and Projects -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <a href="https://github.com/CVEProject/Ideas" target="_blank">
                        CVE Program Ideas Repository
                    </a>
                  </li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Vulnerability Conference and Events Working Group (VCEWG)')"
              class="title">
              {{sectionLabel('Vulnerability Conference and Events Working Group (VCEWG)')}}
            </h2>
            <p>
              Chair: Pete Allor
            </p>
            <p>
              The VCEWG provides a forum for program event planning, especially the annual “VulnCon” conferences (spring) co-hosted by the CVE
              Program and FIRST and the “CVE Program Workshops” (autumn) for CNAs. Meetings are scheduled as needed in the lead up to events.
            </p>
            <p>
              <span class="has-text-weight-bold">Membership Eligibility:</span> Per the VCEWG Charter, “Any active CVE-authorized program member
              may participate in the VCEWG. This includes CVE Board members, CVE Numbering Authority (CNA) representatives, Authorized Data Publishers
              (ADP), and participants from the Secretariat’s organization. This WG is also open to public membership, including members of
              corporate vulnerability management programs, as well as VM related standards, initiatives and associations, such as CVSS, CSAF,
              and others.”
            </p>
            <BoxPair :titles="boxTitles">
              <template #box1>
                <!-- Documents -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">
                    <router-link to="/Resources/Roles/WorkingGroups/VCEWG/VCEWG-Charter.pdf" target="_blank">
                      VCEWG Charter (PDF, 0.2MB)
                    </router-link>
                  </li>
                </ul>
              </template>
              <template #box2>
                <!-- Repositories and Projects -->
                <ul class="tile-body cve-task-tile-list">
                  <li class="cve-task-tile-list-item">TBA</li>
                </ul>
              </template>
            </BoxPair>
            <h2 :id="anchorId('Meeting Schedule')"
              class="title">
              {{sectionLabel('Meeting Schedule')}}
            </h2>
            <div class="table-container">
            <table class="table cve-border-dark-blue is-striped is-hoverable cve-table cve-border-bottom-unset">
              <thead id="cve-meeting-table-head">
                <tr>
                  <th scope="col" style="width: 55%">Working Group</th>
                  <th scope="col">Meeting Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Working Group" style="width: 55%">Automation Working Group (AWG)</td>
                  <td data-label="Meeting Time">Every Tuesday, alternating weekly between 9:00am ET and 4:00pm ET</td>
                </tr>
                <tr>
                  <td data-label="Working Group" style="width: 55%">CNA Organization of Peers (COOP)</td>
                  <td data-label="Meeting Time">Every other Wednesday 2:00pm ET and 9:00pm ET</td>
                </tr>
                <tr>
                  <td data-label="Working Group" style="width: 55%">CVE Artificial Intelligence Working Group (CVEAI WG)</td>
                  <td data-label="Meeting Time">Every other Monday 1:00pm ET</td>
                </tr>
                <tr>
                  <td data-label="Working Group" style="width: 55%">CVE Consumer Working Group (CWG)</td>
                  <td data-label="Meeting Time">Every other Thursday 11:00am ET</td>
                </tr>
                <tr>
                  <td data-label="Working Group" style="width: 55%">Outreach and Communications Working Group (OCWG)</td>
                  <td data-label="Meeting Time">Monthly on Wednesday 8:00am ET</td>
                </tr>
                <tr>
                  <td data-label="Working Group" style="width: 55%">Quality Working Group (QWG)</td>
                  <td data-label="Meeting Time">Every Thursday 4:00pm ET</td>
                </tr>
                <tr>
                  <td data-label="Working Group" style="width: 55%">Researcher Working Group (RWG)</td>
                  <td data-label="Meeting Time">Every Tuesday 2:00pm ET</td>
                </tr>
                <tr>
                  <td data-label="Working Group" style="width: 55%">Strategic Planning Working Group (SPWG)</td>
                  <td data-label="Meeting Time">Every other Wednesday 4:00pm ET</td>
                </tr>
                <tr>
                  <td data-label="Working Group" style="width: 55%">Tactical Working Group (TWG)</td>
                  <td data-label="Meeting Time">Every Thursday 10:00am ET</td>
                </tr>
                <tr>
                  <td data-label="Working Group" style="width: 55%">Vulnerability Conference and Events Working Group (VCEWG)</td>
                  <td data-label="Meeting Time">As needed for annual VulnCon conferences (spring) and CVE Program Workshops (autumn)</td>
                </tr>
              </tbody>
            </table>
            </div> <!-- end table container -->
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

const boxTitles = ['Documents', 'Repositories and Projects'];

const props = defineProps({
  cvenavs: {
    type: Object,
    required: true
  }
});

function anchorId(sectionName) {
  return workingGroups()['items'][sectionName]['anchorId'];
}

function workingGroups() {
  return props.cvenavs['Program Organization']['submenu']['Working Groups'];
}

function sectionLabel(sectionName) {
    return workingGroups()['items'][sectionName]['label'];
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@use '../../assets/style/elements/cveTableStacked.scss' as *;
</style>
