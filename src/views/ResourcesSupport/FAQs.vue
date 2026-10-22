<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-3 is-hidden-touch">
          <aside class="menu is-hidden-touch cve-sidebar-menu mt-3">
            <p class="menu-label cve-capitalize-first-letter message-label">All Questions</p>
            <ul class="menu-list cve-capitalize-first-letter">
              <li v-for="section in faqsData" :key="expandId(section)">
                <span class="sidebar-section-row">
                  <button type="button" class="button is-text sidebar-toggle"
                    @click="toggleSidebarSection(section)"
                    :aria-expanded="sidebarExpanded[expandId(section)]"
                    :aria-controls="`nav-${expandId(section)}`"
                    :aria-label="sidebarExpandText(section) + ` ${section.title}`">
                    <font-awesome-icon class="icon cve-icon-xxs"
                      :icon="sidebarExpanded[expandId(section)] ? 'minus' : 'plus'"
                      aria-hidden="true"/>
                  </button>
                  <router-link :to="'#' + expandId(section)"
                    class="sidebar-section-link">
                    {{section.title}}
                  </router-link>
                </span>
                <ul v-show="sidebarExpanded[expandId(section)]"
                  :id="`nav-${expandId(section)}`">
                  <li v-for="question in section.questions"
                    :key="expandId(section, question)">
                    <router-link :to="`#${expandId(section, question)}`">
                      {{question.text}}?
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
      </div>
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 class="title">Frequently Asked Questions (FAQs)</h1>
            <div class="buttons mb-0" style="justify-content: flex-end;">
              <button class="button cve-button" @click="expandOrCollapse">
                {{allExpand ? 'Collapse' : 'Expand'}} all
              </button>
            </div>
            <section>
              <div v-for="section in faqsData" :key="section.id"
                class="message">
                <h2 :id="expandId(section)" class="title">
                  {{section.title}}
                </h2>
                <div v-for="question in section.questions"
                  :key="expandId(section, question)">
                  <AccordionContent :header="`${question.text}?`"
                    v-model:expanded="expanded[expandId(section, question)]"
                    :id="expandId(section, question)">
                    <div v-if="question.id === 'search_cve'"
                      class="pb-3">
                      <p>
                        Search the CVE List by keywords using the
                        <router-link :to="{hash: '#cve-secondary-navbar'}">
                          search box
                        </router-link>
                        at the top of this page.
                      </p>
                    </div>
                    <p v-html="paragraph"
                      v-for="(paragraph, index) in question.response"
                      :key="expandId(section, question) + index"></p>
                  </AccordionContent>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>

import {reactive, ref} from 'vue';
import faqsData from '@/assets/data/faqs.json';
import AccordionContent from '@/components/AccordionContent.vue';

const allExpand = ref(true);

const expanded = reactive({});

const sidebarExpanded = reactive({});

// Initialize the expansion state for both the sidebar sections and the
// questions for each section in the main display.

for (const section of faqsData) {

  sidebarExpanded[expandId(section)] = false;

  for (const question of section.questions) {
      expanded[expandId(section, question)] = allExpand.value;
  }
}

function expandId(section, question = '') {

  // Given a section and optional question, construct an ID string, which is
  // used for HTML element IDs (as well as corresponding anchors), and keys
  // for the expansion state data.

  return `${section.id}` + (question ? `-${question.id}` : '');
}

function expandOrCollapse() {

  // This function handles the "collapse/expand all" button press.  It toggles
  // the state and propagates it to all the variables that control the
  // accordion expansion.

  allExpand.value = !allExpand.value;

  Object.keys(expanded).forEach(key => expanded[key] = allExpand.value);
}

function sidebarExpandText(section) {

  // Returns the text (Collapse/Expand) to be used for the ARIA label on the
  // expandable sidebar section topics.

  return sidebarExpanded[expandId(section)] ? 'Collapse' : 'Expand';
}

function toggleSidebarSection(section) {

  // This function handles the collapse and expansion of the sidebar section
  // topics.

  sidebarExpanded[expandId(section)] = !sidebarExpanded[expandId(section)];
}

</script>

<style scoped lang="scss">

.sidebar-section-link {
  min-width: 0;
}

.sidebar-section-row {
  display: grid;
  grid-template-columns: 1.25rem minmax(0, 1fr);
  column-gap: 0.4rem;
  align-items: center;
}

.sidebar-toggle {
  width: 1.25rem;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0;
  margin: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
