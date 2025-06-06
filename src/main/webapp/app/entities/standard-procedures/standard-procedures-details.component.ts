import { type Ref, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import StandardProceduresService from './standard-procedures.service';
import useDataUtils from '@/shared/data/data-utils.service';
import { type IStandardProcedures } from '@/shared/model/standard-procedures.model';
import { useAlertService } from '@/shared/alert/alert.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'StandardProceduresDetails',
  setup() {
    const standardProceduresService = inject('standardProceduresService', () => new StandardProceduresService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const dataUtils = useDataUtils();

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);
    const standardProcedures: Ref<IStandardProcedures> = ref({});

    const retrieveStandardProcedures = async standardProceduresId => {
      try {
        const res = await standardProceduresService().find(standardProceduresId);
        standardProcedures.value = res;
      } catch (error) {
        alertService.showHttpError(error.response);
      }
    };

    if (route.params?.standardProceduresId) {
      retrieveStandardProcedures(route.params.standardProceduresId);
    }

    return {
      alertService,
      standardProcedures,

      ...dataUtils,

      previousState,
    };
  },
});
