import { defineComponent, provide } from 'vue';

import Ribbon from '@/core/ribbon/ribbon.vue';
import JhiFooter from '@/core/jhi-footer/jhi-footer.vue';
import JhiNavbar from '@/core/jhi-navbar/jhi-navbar.vue';
import { useAlertService } from '@/shared/alert/alert.service';
import '@/shared/config/dayjs';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'App',
  components: {
    ribbon: Ribbon,
    'jhi-navbar': JhiNavbar,
    'jhi-footer': JhiFooter,
  },
  setup() {
    provide('alertService', useAlertService());

    return {};
  },
});
