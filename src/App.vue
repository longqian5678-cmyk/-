<template>
  <div>
    <div v-if="['NotFound'].indexOf($route.name) > -1">
      <NotFound/>
    </div>
    <div v-else id="app">
      <a href="#cve-main-page-content" id="cve-skip-link">Skip to main content</a>
      <PrimaryNavigation :cvenavs="NavigationItems"/>
      <NotificationBannerModule/>
      <RouterView :cvenavs="NavigationItems"/>
      <FooterModule/>
    </div>
  </div>
</template>

<script>
import NavigationItems from './assets/data/navigation.json';
import PrimaryNavigation from './components/PrimaryNavigation.vue';
import NotificationBannerModule from './components/NotificationBannerModule.vue';
import FooterModule from './components/FooterModule.vue';
import NotFound from './views/NotFound.vue';
import { useGenericGlobalsStore } from './stores/genericGlobals';
import { useSeoMeta } from '@unhead/vue';

export default {
  components: {
    NotFound,
    PrimaryNavigation,
    NotificationBannerModule,
    FooterModule
  },
  data() {
    return {
      NavigationItems
    }
  },
  beforeMount() {
    useSeoMeta({
      title: 'CVE: Common Vulnerabilities and Exposures',
      description: 'At cve.org, we provide the authoritative '
        + 'reference method for publicly known information-security '
        + 'vulnerabilities and exposures'
    });
  },
  mounted() {

    // Hide the cookie widget that runs along the right side of the website
    // window.

    window.Osano.cm.hideWidget();
  },
  head() {

    const isProductionSite = useGenericGlobalsStore().isProductionWebsite;

    if (!isProductionSite) {

        // Particularly for the test CVE website (test.cve.org), prevent
        // any search engine from crawling the content.  This should only
        // be allowed for the production website.

        return {
            meta: [{name: 'robots', content: 'noindex, nofollow'}]
        }
    }

    // Remove any trailing and leading slashes on the base URL and
    // path suffix so we know what we're dealing with and we control
    // the slash separating the two components.

    const baseURL = window.location.origin.replace(/\/+$/, '');
    const suffix = this.$route.fullPath.replace(/^\/+/, '');

    return {
      link: [{rel: 'canonical', href: `${baseURL}/${suffix}`}]
    }
  }
}
</script>


<style lang="scss">

@use 'bulmaCveCustomizations';
@use 'bulma-timeline';
@use 'globals';
@use 'osano';
@use 'routerLink';

#cve-skip-link {
  background-color: white;
  text-decoration: underline;
  left: 0;
  padding: .5rem 1rem;
  position: absolute;
  top: -3rem;
  z-index: 50;
  opacity: 0;
}

#cve-skip-link:focus {
  opacity: 1;
  top: 0;
  outline: none;
  transition: .2s ease-in-out;
  box-shadow: unset;
  border-bottom-width: 6px;
  border-bottom-style: solid;
  border-bottom-color: $theme-color-accent-warm;
  border-right-width: 6px;
  border-right-style: solid;
  border-right-color: $theme-color-accent-warm;
}
</style>
