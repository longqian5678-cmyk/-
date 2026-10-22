<template>
  <aside class="menu cve-sidebar-menu mt-3" :class="isNavSidebarHiddenTouch ? 'is-hidden-touch' : ''">
    <p class="menu-label cve-capitalize-first-letter">{{nav.label}}</p>
    <ul class="menu-list cve-capitalize-first-letter">
      <li v-for="(submenuObj, submenuLabel) in nav.submenu" :key="submenuObj.id">
        <span class="is-flex" style="justify-content: space-between; width: inherit">
          <router-link v-if="submenuObj.hasOwnProperty('path')" :to="getAdjustedPath(submenuObj.path)">
            {{ submenuLabel }}
          </router-link>
          <span v-else class="cve-menu-shift">
            {{ submenuLabel }}
            <li v-for="(subsubmenuObj, subsubmenuLabel) in submenuObj.submenu" :key="subsubmenuObj.id">
              <span class="is-flex" style="justify-content: space-between; width: inherit">
                <router-link :to="getAdjustedPath(subsubmenuObj.path)">{{ subsubmenuLabel }}</router-link>
              </span>
            </li>
          </span>
          <button class="button is-text cve-button-submenu-toggle has-text-right"
            @click="submenuObj.hasOwnProperty('items') && toggleSubmenuItem(`/${nav.path}/${submenuObj.path}`)"
            :class="{'is-hidden': !submenuObj.hasOwnProperty('items')}"
            :aria-expanded="isExpanded(submenuObj) ? 'true' : 'false'"
            :aria-controls="submenuObj.id + 'nav'">
            <span class="icon cve-icon-xxs">
              <font-awesome-icon class="icon"
                :icon="isExpanded(submenuObj) ? 'minus' : 'plus'"
                :title="isExpanded(submenuObj) ? 'collapse' : 'expand'"
                aria-hidden="false" focusable="true" :aria-labelledby="'navExpandCollapseAltText' + submenuObj.id"/>
            </span>
          </button>
        </span>
        <ul v-if="isExpanded(submenuObj)" :id="submenuObj.id + 'nav'">
          <li v-for="(submenuItem, label) in submenuObj.items" :key="`${submenuObj.id}-${label}`">
            <router-link :class="isExactPath(`/${nav.path}/${submenuObj.path}#${submenuItem.anchorId}`) ? '' : 'cve-not-active-link'"
              :to="`/${nav.path}/${submenuObj.path}#${submenuItem.anchorId}`" >{{ submenuItem.label }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </aside>
</template>

<script>
import { useLinkStore } from '@/stores/link';

export default {
  props: {
    nav: {
      type: Object,
      required: true,
    },
    isNavSidebarHiddenTouch: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      selectedSubmenu: [this.$route.path],
    };
  },
  methods: {
    isExpanded(submenuObj) {
      return this.selectedSubmenu.includes(`/${this.nav.path}/${submenuObj.path}`);
    },
    toggleSubmenuItem(path) {
      if (this.selectedSubmenu.includes(path)) {
        const index = this.selectedSubmenu.indexOf(path);
        this.selectedSubmenu.splice(index, 1);
      } else {
        this.selectedSubmenu.push(path);
      }
    },
    getAdjustedPath(path) {

      // The given path is relative, and it comes from the navigation data.

      const currentPath = this.$route.path;

      const rootPath = '/Media/News'

      // If the current path is any of the following, the path may contain
      // parameters, in which case the returned path is constructed from
      // the root path.  An absolute path is returned in this case.

      const newsRoutes = [`${rootPath}/item`,
                          `${rootPath}/BlogArchives`,
                          `${rootPath}/NewsArchives`,
                          `${rootPath}/PressReleaseArchives`];

      const isNewsPage = newsRoutes.some(
        prefix => currentPath.startsWith(prefix)
      );

      return isNewsPage ? `${rootPath}/${path.replace(/^\/+/, '')}` : path;
    },
    isExactPath(onPageLink) {
      return useLinkStore().isExactPath(onPageLink, this.$route.fullPath);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

// This adds the background for the current section (and subsection) in the
// sidebar.  The color comes from the Vue Router (LIME_500 defined in
// vue-router.cjs).  We're keeping the background behavior from the
// pre-Bulma 1 upgrade, where it was done by the router CSS.  If we don't
// do this ourselves and let the router do the background, it puts the
// background all over the place, even in text links with local anchors,
// which we don't want.

a.cve-router-link:not(.cve-not-active-link) {
  background-color: #97d4ea;
}

.cve-menu-shift {
  font-weight: bold;
  padding-left: 12px;
}

</style>
