<template>
  <div ref="tableRef" class="table-container">
    <table aria-live="polite" class="table cve-border-dark-blue is-striped is-hoverable">
      <thead>
        <tr>
          <th v-for="(header, index) in tableHeaders" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(entry, index) in tableData"
          :key="index"
          :id="entry.id"
          :ref="entry.id"
          @click="selectRow(entry.id)"
          :class="{ 'cve-term-active': selectedRow === entry.id }"
        >
          <td class="table-column-width">
            <router-link
              :to="'#' + entry.id"
              :class="{ selectTermLink: selectedRow === entry.id }"
              class="has-text-weight-bold termLink"
            >
              {{ entry.term }}
            </router-link>
          </td>
          <td
            v-if="renderAsHTML"
            class="cve-term-definition"
            v-html="entry.definition"
          ></td>
          <td v-else class="cve-term-definition">{{ entry.definition }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SearchTable",
  props: {
    tableData: {
      type: Array,
      required: true,
    },
    tableHeaders: {
      type: Array,
      required: true,
    },
    renderAsHTML: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      selectedRow: null,
    };
  },
  mounted() {
    let term = null;

    if (this.$route.hash) {
      term = this.$route.hash.slice(1);
      this.selectRow(term);
    }
  },
  methods: {
    selectRow(rowId) {
      this.selectedRow = rowId;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@use 'initial-variables' as *;

@media only screen and (min-width: $desktop) {
  .table-column-width {
    width: 30% !important;
  }
}

.cve-term-active {
  background-color: $theme-color-accent-cool-light !important;
  color: black;
  padding-left: 8px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.termLink {
  color: $theme-color-primary;
  background: unset;
}

.selectTermLink {
  color: black;
}
</style>
