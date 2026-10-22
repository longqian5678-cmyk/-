
import { createApp, type Component } from 'vue';
import { VueHeadMixin } from '@unhead/vue';
import { createHead } from '@unhead/vue/client';
import { createPinia } from 'pinia';
import { configure } from 'vue-gtag';
import LoadScript from 'vue-plugin-load-script';

import App from './App.vue';
import router from './router/index.js';
import ExternalLinkMessage from '@/components/ExternalLinkMessage.vue';
import SurveyLinkComponent from '@/components/SurveyLinkComponent.vue';
import { usePartnerStore } from '@/stores/partners';
import { useGenericGlobalsStore } from '@/stores/genericGlobals.ts';


// Import and add icons to library
import '@fortawesome/fontawesome-free/css/all.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faArrowRight, faBlog, faBook, faCaretDown, faCaretUp, faInfoCircle, faCheckCircle,
  faExclamationCircle, faFileCode, faTriangleExclamation, faUpRightFromSquare, faLightbulb, faLink, faMinus, faPassport, faPlus, faPodcast, faIdCard,
  faSearch, faHandshake, faUsersCog, faLaptopCode, faPoll, faTimes, faToolbox, faSitemap, faUser, faUserShield, faBullhorn, faWindowMaximize,
} from '@fortawesome/free-solid-svg-icons';
import { faArrowAltCircleRight, faClipboard, faNewspaper } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faAngleDoubleLeft, faAngleDoubleRight, faAngleLeft, faAngleRight, faArrowRight, faBlog, faBook, faCaretDown, faCaretUp, faInfoCircle, faCheckCircle,
  faExclamationCircle, faFileCode, faTriangleExclamation, faUpRightFromSquare, faLightbulb, faLink, faMinus, faPassport, faPlus, faPodcast, faIdCard,
  faSearch, faHandshake, faUsersCog, faLaptopCode, faPoll, faTimes, faToolbox, faSitemap, faUser, faUserShield, faBullhorn,  faWindowMaximize,
  faArrowAltCircleRight, faClipboard, faNewspaper, fab,);


const app = createApp(App);
const head = createHead();
const pinia = createPinia();
pinia.use(({ store }) => {
  store.router = router;
});
app.use(pinia);
app.use(head);
app.mixin(VueHeadMixin);

usePartnerStore().initialize();

configure({
  appName: 'CVE Website',
  tagId: import.meta.env.VITE_GOOGLE_ANALYTICS_PROPERTY_ID,
  pageTracker: {router}
});

app.use(LoadScript);
app.use(router);

app.config.globalProperties.GenericGlobalsStore = useGenericGlobalsStore();

// The casting of FontAwesomeIcon is meant to avoid the TypeScript error
// "Expression produces a union type that is too complex to represent".

app.component('font-awesome-icon',
              FontAwesomeIcon as unknown as Component);
app.component('ExternalLinkMessage', ExternalLinkMessage);
app.component('SurveyLinkComponent', SurveyLinkComponent);

app.mount('#app');
