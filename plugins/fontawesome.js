import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faTrashCan, faPen, faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';

library.add(faTrashCan, faPen, faArrowUp, faArrowDown);

// This is important, we are going to let Nuxt worry about the CSS
config.autoAddCss = false;

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon, {})
});
