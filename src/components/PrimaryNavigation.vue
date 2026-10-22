<template>
  <header role="banner" id="cve-primary-header">
    <nav id="cve-main-nav" class="navbar is-transparent is-fixed-top"  role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a href="/" class="navbar-item">
          <img src="@/assets/cveLogoR.svg" alt="CVE logo" class="cve-logo">
        </a>
        <div v-if="websiteEnv === 'test'" class="mr-2 has-text-weight-bold cve-non-prod-label">
          <span class="icon-text">
            <span class="icon is-small">
              <font-awesome-icon  icon="exclamation-triangle" role="alert"
                aria-labelledby="alertIconTest" aria-hidden="false" />
            </span>
            <span id="alertIconTest" style="font-size: 1.5rem !important">TEST INSTANCE</span>
          </span>
        </div>
        <button ref="burger" role="button" class="navbar-burger button is-text cve-button-submenu-toggle" aria-label="menu" aria-expanded="false"
          @click="toggleTouchScreenBurgerMenu" :class="{'is-active': isOpen}">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>
      <!-- 'is-active' class in the line right below is ONLY applied for touchscreens and it's used to show/hide the primary nav -->
      <div class="navbar-menu" :class="{'is-active': isOpen}">
        <div class="navbar-start" id="cve-navbar-right-part">
          <!-- 'is-active' is only for desktop -->
          <div
            :class="{'is-active': isSubmenuActive[menuItemLabel]}"
            @mouseover="isSubmenuActive[menuItemLabel] = true"
            @mouseleave="isSubmenuActive[menuItemLabel] = false"
            class="navbar-item has-dropdown cve-navbar-item" v-for="(menuObj, menuItemLabel) in cvenavs" :key="menuObj.id">
            <!-- Touchscreen menu which includes the primary nav and dropdown menu-->
            <span
              class="is-flex cve-touch-devices-menu-toggle-button"
              style="justify-content: space-between; width: inherit"
              v-if="isPrimaryMenuItem(menuObj)"
            >
              <a
                :href="menuObj.primaryNavPath"
                class="navbar-link is-arrowless"
              >
                {{menuItemLabel}}
              </a>
              <button v-if="hasSubmenu(menuObj)"
                class="is-hidden-desktop button is-text cve-button-submenu-toggle" @click="selectedTouchScreenMenu = menuItemLabel">
                <span class="icon is-small">
                  <font-awesome-icon class="icon cve-icon-xxs" :icon="selectedTouchScreenMenu === menuItemLabel ? 'minus' : 'plus'"/>
                </span>
              </button>
            </span>

            <!-- Left part dropdown menu for all screensizes -->
            <div
              class="navbar-dropdown"
              :class="{'is-hidden-touch': !(selectedTouchScreenMenu === menuItemLabel) }"
              v-if="hasSubmenu(menuObj)">
              <router-link
                @click="isOpen = false; isSubmenuActive[menuItemLabel] = false"
                :to="`/${menuObj.path}/${submenuObj.path}`" v-slot="{ href, isActive }"
                v-for="(submenuObj, submenuLabel) in menuObj.submenu"  :key="submenuObj.id">
                <a class="navbar-item cve-submenu-item" :href="href" :class="{'is-active': isActive}">{{submenuLabel}}</a>
              </router-link>
            </div>
          </div>
        </div>
        <div class="navbar-end" id="cve-navbar-right-part">
          <!-- Right part dropdown menu for all screensizes -->
          <div
            :class="{'is-active': isSubmenuActive[menuItemLabel]}"
            @mouseover="isSubmenuActive[menuItemLabel] = true"
            @mouseleave="isSubmenuActive[menuItemLabel] = false"
            class="navbar-item has-dropdown cve-navbar-item" v-for="(menuObj, menuItemLabel) in cvenavs['Right Menu']"
            :key="menuObj.id"
          >
            <span
              class="is-flex"
              style="justify-content: space-between; width: inherit"
              v-if="isPrimaryMenuItem(menuObj) && hasSubmenu(menuObj)"
            >
              <a
                :href="menuObj.primaryNavPath"
                class="navbar-link is-arrowless"
              >
                {{menuItemLabel}}
              </a>
              <button v-if="menuItemLabel != 'Downloads'" class="is-hidden-desktop button is-text cve-button-submenu-toggle" @click="selectedTouchScreenMenu = menuItemLabel">
                <span class="icon is-small">
                  <font-awesome-icon class="icon cve-icon-xxs" :icon="selectedTouchScreenMenu === menuItemLabel ? 'minus' : 'plus'"/>
                </span>
              </button>
            </span>
            <div
              class="navbar-dropdown has-dropdown is-right"
              :class="{'is-hidden-touch': !(selectedTouchScreenMenu === menuItemLabel)}"
              v-if="hasSubmenu(menuObj)"
            >
              <router-link
                @click="isOpen = false; isSubmenuActive[menuItemLabel] = false"
                @mouseleave="isSubmenuActive[menuItemLabel] = false"
                :to="`/${menuObj.path}/${submenuObj.path}`" v-slot="{ href, isActive }"
                v-for="(submenuObj, submenuLabel) in menuObj.submenu"  :key="submenuObj.id">
                <a class="navbar-item cve-submenu-item cve-right-submenu-item" :href="href" :class="{'is-active': isActive}">
                  {{submenuLabel}}
                </a>
              </router-link>
            </div>
          </div>
          <div class="navbar-item has-dropdown is-hoverable cve-navbar-item is-hidden-desktop">
            <a href="/SiteSearch" class="navbar-link is-arrowless">
              <span>Site Search</span>
              <span class="icon">
                <font-awesome-icon icon="search" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <nav id="cve-secondary-navbar" class="navbar" aria-label="navigation">
      <div class="navbar-menu cve-secondary-navbar-menu is-active">
        <div class="navbar-start" style="flex-grow: 1 !important; align-items: center !important; justify-content: center !important;
          flex-direction: column !important">
          <div class="navbar-item cve-secondary-navbar-item">
            <cveRecordSearch/>
          </div>
          <div class="navbar-item cve-secondary-navbar-item cve-keyword-search">
            <div v-if="searchType">
            <p>
              <span class="icon-text cve-dark-blue-text" style="font-size: 14px">
                <router-link to="/ResourcesSupport/FAQs#pc_cve_list_basics-search_cve" class="cve-dark-blue-text" style="font-size: 14px">
                  CVE List Search Tips
                </router-link>
                <span class="icon">
                  <p id="lightBulbIcon" class="is-hidden">
                    lightbulb
                  </p>
                  <font-awesome-icon :icon="['fas', 'lightbulb']" aria-labelledby="lightBulbIcon" aria-hidden="false"/>
                </span>
              </span>
              <span class="has-text-black ml-2 mr-2">|</span>
              <span class="icon-text cve-dark-blue-text" style="font-size: 14px">
                <span>
                  <a href="https://forms.office.com/g/qmmTaYnr5y" target="_blank" class="cve-dark-blue-text" style="font-size: 14px">
                    Provide Feedback
                  </a>
                  <span class="icon cve-icon-xxs">
                    <p id="externalSurveyLink" class="is-hidden">
                      Survey opens in a new tab or window depending on browser settings
                    </p>
                    <font-awesome-icon icon="external-link-alt" aria-labelledby="extenalSurveyLink" aria-hidden="false"/>
                  </span>
                </span>
              </span>
            </p>
            </div>
          </div>
        </div>
        <div class="navbar-end is-hidden-touch">
          <div class="navbar-item cve-secondary-navbar-item">
            <div class="buttons">
              <router-link to="/SiteSearch" class="button cve-button cve-button-outline">
                <span>Site Search</span>
                <span class="icon">
                  <font-awesome-icon icon="search" />
                </span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import cveRecordSearch from '@/components/cveRecordSearchModule.vue';
import { useCveListSearchStore } from '@/stores/cveListSearch';
import { mapState } from 'pinia'

export default {
  components: { cveRecordSearch },
  props: {
    cvenavs: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState(useCveListSearchStore, ['searchType'])
  },
  data() {
    return {
      isOpen: false,
      submenuStates: false,
      isSubmenuActive: {},
      selectedTouchScreenMenu: '',
      websiteEnv: import.meta.env.VITE_WEBSITE_ENVIRONMENT
    };
  },
  created () {
    Object.keys(this.cvenavs).forEach(primaryNavLabel => {
      this.isSubmenuActive[primaryNavLabel] = false;
    });
  },
  methods: {
    hasSubmenu(menuObject) {

      return this.isPrimaryMenuItem(menuObject)
        && Object.prototype.hasOwnProperty.call(menuObject, 'primarySubmenu')
        && menuObject.primarySubmenu;
    },
    isPrimaryMenuItem(menuObject) {

      return Object.prototype.hasOwnProperty.call(menuObject, 'primaryNavPath');
    },
    toggleTouchScreenMenuDropdown(menuOption) {
      // This is only used for touch
      if (this.selectedTouchScreenMenu.includes(menuOption)) {
        this.selectedTouchScreenMenu = this.selectedTouchScreenMenu.filter(
          (item) => item !== menuOption,
        );
      } else {
        this.selectedTouchScreenMenu.push(menuOption);
      }
    },
    toggleTouchScreenBurgerMenu() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>

<style scoped lang="scss">
@use 'initial-variables' as *;

/* Components - Navbar customization starts here */
#cve-main-nav {
  background-image: linear-gradient(to right, $cve-color-dark-purple, $theme-color-primary-darker);
}

a.navbar-item {
  background-color: unset;
}

a.navbar-item.cve-submenu-item {
  color: white !important;
  background-color: $theme-color-primary-darker;
}

.navbar-link {
  color: unset;
  background-color: unset;
}

.cve-non-prod-label {
  color: yellow;
}

.navbar-brand {
  align-items: center !important;
  justify-content: center !important;
}

.navbar-item {
  padding: 0rem 0.5rem;
}

.cve-logo {
  min-height: 40px;
  min-width: 100px;
}

.navbar#cve-secondary-navbar {
  z-index: 2; // puts secondary behind primary navbar dropdown
  background-color: $theme-color-accent-cool-light;
  border-bottom: 1px solid $theme-color-primary-darker;
}

.navbar-item {
  text-align: left;
}

@media screen and (min-width: $desktop){
  div.navbar-item.has-dropdown.is-hoverable.cve-navbar-item:hover {
    border:1px solid white;
  }

  .navbar-item {
    border: 1px solid transparent;
  }

  .navbar.is-transparent .navbar-dropdown a.navbar-item {
    background-color: $theme-color-primary-darker;
  }
}

@media screen and (max-width: $desktop){
  a.navbar-item.is-active {
    color: $theme-color-accent-cool-light;
  }

  a.cve-submenu-item {
    margin-bottom: 2rem;
  }

  .cve-secondary-navbar-menu {
    background-color: $theme-color-accent-cool-light;
  }

  .cve-keyword-search {
    font-size: 14px;
    text-align: center;
  }
}

.navbar-burger:hover {
  color: white;
}
/* Components customization ends here */

/* Elements - Button customization starts here */

.cve-button-submenu-toggle {
  background: unset !important;
  color: $white !important;
}
.cve-button-submenu-toggle:hover {
  color: $theme-color-accent-warm !important;
}

.cve-button-submenu-toggle:active {
  color: $theme-color-accent-warm !important;
}
/* Elements customization ends here */
</style>
