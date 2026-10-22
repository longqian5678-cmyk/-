<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 :id="cvenavs['Resources & Support']['submenu']['Glossary']" class="title">
            {{cvenavs['Resources & Support']['submenu']['Glossary']['label']}}</h1>
            <div class="table-container">
              <SearchTable :table-headers="headers" :table-data="glossaryEntries" :renderAsHTML="true"></SearchTable>
            </div>
            <hr/>
           </div>  <!-- end content -->
          </main>
         </div> <!-- end is-8 -->
         <div class="column is-3 is-hidden-touch">
            <NavigationSidebar :nav="cvenavs['Resources & Support']" />
         </div>
      </div> <!-- end columns -->
    </div>
</template>

<script>
import NavigationSidebar from '@/components/NavigationSidebar.vue';
import SearchTable from '@/components/SearchTable.vue';
import GlossaryData from '../../assets/data/glossaryEntries.json';

import _ from 'lodash'

export default {
  name: 'Glossary',
  components: {
    NavigationSidebar,
    SearchTable
  },
  props: {
    cvenavs: {
      type: Object,
      required: true,
    },
    activeTerm: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isActive: GlossaryData[0].id,
      currentDefinition: GlossaryData[0].definition,
      currentTerm: GlossaryData[0].term,
      currentTermLink: GlossaryData[0].termLink,
      glossaryEntries: GlossaryData,
      headers: ['Term', 'Definition']
    };
  },
  methods: {
    setDefinitionForActiveTerm(termId) {
      const entry = this.glossaryEntries.find((e) => e.id === termId);
      this.currentTerm = entry.term;
      this.currentTermLink = entry.termLink;
      this.currentDefinition = entry.definition;
      this.isActive = termId;
    },
  },
  mounted() {
    // Sort data before creating table
    this.glossaryEntries = _.sortBy(this.glossaryEntries, ['term'])
  },
};
</script>
