import { createApp } from 'vue';
import TimeSlotList from './components/TimeSlotList.vue';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import 'vuetify/styles';

import '@mdi/font/css/materialdesignicons.min.css'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

createApp(TimeSlotList)
  .use(vuetify)
  .mount('#app')
