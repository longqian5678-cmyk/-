<template>
  <div id="cve-secondary-page-main-container" class="container">
    <div class="columns is-centered is-multiline">
      <div class="column is-8-desktop cve-main-column-content-width is-12-tablet">
        <main id="cve-main-page-content" role="main">
          <div class="content">
            <h1 class="title">
              News Article Archives
            </h1>
            <p>News articles from {{endYear}} and earlier are archived below.
              There is one PDF for each calendar year. For the latest news
              articles, go to the
              <router-link to="/Media/News/AllNews">News</router-link> page.
            </p>
            <h2 class="title mt-4 mb-1 is-size-4">By Year</h2>
            <div class="fixed-grid has-5-cols">
              <div class="grid has-text-centered">
                <div v-for="year in archiveYears" :key="year" class="cell">
                  <a class="is-inline-block px-2 py-1" :href="archiveUrl(year)"
                    target="_blank">
                    {{year}}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div class="column is-3" :class="{'is-hidden-touch': isNavSidebarHiddenTouch}">
        <NavigationSidebar :nav="cvenavs['AllNews']"
          :isNavSidebarHiddenTouch="isNavSidebarHiddenTouch"/>
      </div>
    </div>
  </div>
</template>

<script setup>

import {ref} from 'vue';
import NavigationSidebar from '@/components/NavigationSidebar.vue';
import news from '@/utils/news';

defineProps({
  cvenavs: {
    type: Object,
    required: true
  }
});

const archiveData = news.archiveNews;

const isNavSidebarHiddenTouch = ref(false);

// 'startYear' is the starting year for the news archives, and the archived
// news runs each year after through the 'endYear'.  We display the years
// beginning with the end year back to the start year because it's most
// likely that the newer archives are of more interest than the older ones.

const startYear = archiveData.startYear;

const endYear = archiveData.endYear;

const archiveYears = Array.from({length: endYear - startYear + 1},
                                (_, i) => endYear - i);

function archiveUrl(year) {

  return `${archiveData.directory}/${year}${archiveData.suffix}`;
}

</script>
