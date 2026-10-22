<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-12-desktop is-11-tablet cve-main-column-content-width">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 class="title">
              Blog Archives
            </h1>
            <p>
              Blog articles from {{latestYear}} and earlier are archived below. For
              the most recent articles, go to the
                <router-link to="/Media/News/Blogs">Blogs</router-link>
              page.
            </p>
            <div class="columns">
            <div class="column is-one-quarter">
              <b-menu>
                <b-menu-list label="Year">
                  <b-menu-item v-for="year in blogArchiveYears"
                    :key="year" :label="year"
                    :model-value="year === selectedYear"
                    @update:model-value="onYearChange(year, $event)">
                  </b-menu-item>
                </b-menu-list>
              </b-menu>
            </div>
            <div class="column is-three-quarters archive-list">
              <div v-for="article in selectedArticles" :key="article.fileName"
                class="box">
                <div class="is-flex is-justify-content-space-between
                  is-align-items-center">
                  <div>
                    <a class="is-5" :href="blogArticleUrl(article)">
                      {{article.title}}
                    </a>
                    <p class="subtitle is-6">
                      {{monthDayYear(article.date)}}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </main>
      </div>
      <div class="column is-3">
        <NavigationSidebar :nav="cvenavs['AllNews']"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useRoute} from 'vue-router'
import {BMenu, BMenuItem, BMenuList} from "buefy";
import NavigationSidebar from '@/components/NavigationSidebar.vue';
import {blogArchives, blogArchiveYears} from '@/utils/blogArchives';
import {monthDayYear} from "@/utils/strUtils";

defineProps({
  cvenavs: {
    type: Object,
    required: true
  }
});

const blogsArchivePath = '/Resources/Media/Archives/Blogs';

// blogArchiveYears is sorted by descending year, so the first item
// in the list is the last archived year.

const latestYear = blogArchiveYears.length ? blogArchiveYears[0] : ''

const route = useRoute();

// A year will be included in the route if a URL pointing to the non-archived
// blog is encountered, which redirects to the archived blog.

const selectedYear = ref(route.params.year ? route.params.year : latestYear);

const selectedArticles = computed(() => blogArchives[selectedYear.value]
                                        || []);

function blogArticleUrl(article) {

  // Given the archived blog, return the URL for the corresponding PDF file.

  const year = article.date.split('-')[0];

  const url = `${blogsArchivePath}/${year}/${article.fileName}`;

  return url;
}

function onYearChange(year, active) {

  if (active)
    selectedYear.value = year;
}

</script>

<style lang="scss" scoped>

// The default top/bottom Bulma box padding (20px) and bottom margin (24px)
// yields far too much space between the box instances.  The following
// adjustments provide much better spacing for the list of blog articles.

.archive-list > .box:not(:last-child) {
    margin-bottom: .25rem;
}

.archive-list > .box {
    padding-block: .5rem;
}

// The Buefy menu is implemented as an unnumbered list, and with the outer
// wrapper with the "content" class, the leading dot before each menu item
// (year) is rendered.  This overrides the settings to remove that leading
// dot (and accompanying spacing).

.content :deep(.menu-list) {
    list-style: none;
    margin-inline-start: 0;
    padding-inline-start: 0;
    text-transform: none;
}

// Bulma has menu labels in uppercase (e.g., YEAR).  We're overriding it to
// make the labels consistent with other heading labels (e.g., All News).

.content :deep(.menu-label) {
    text-transform: none;
}

</style>
