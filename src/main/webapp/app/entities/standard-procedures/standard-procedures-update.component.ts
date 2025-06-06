import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';

import StandardProceduresService from './standard-procedures.service';
import useDataUtils from '@/shared/data/data-utils.service';
import { useValidation } from '@/shared/composables';
import { useAlertService } from '@/shared/alert/alert.service';

import { type IStandardProcedures, StandardProcedures } from '@/shared/model/standard-procedures.model';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'StandardProceduresUpdate',
  setup() {
    const standardProceduresService = inject('standardProceduresService', () => new StandardProceduresService());
    const alertService = inject('alertService', () => useAlertService(), true);

    const standardProcedures: Ref<IStandardProcedures> = ref(new StandardProcedures());
    const isSaving = ref(false);
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const route = useRoute();
    const router = useRouter();

    const previousState = () => router.go(-1);

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

    const dataUtils = useDataUtils();

    const validations = useValidation();
    const validationRules = {
      isActive: {
        required: validations.required('This field is required.'),
      },
      specification: {
        required: validations.required('This field is required.'),
      },
      userLogin: {
        required: validations.required('This field is required.'),
      },
    };
    const v$ = useVuelidate(validationRules, standardProcedures as any);
    v$.value.$validate();

    return {
      standardProceduresService,
      alertService,
      standardProcedures,
      previousState,
      isSaving,
      currentLanguage,
      ...dataUtils,
      v$,
    };
  },
  created(): void {},
  methods: {
    save(): void {
      this.isSaving = true;
      if (this.standardProcedures.id) {
        this.standardProceduresService()
          .update(this.standardProcedures)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showInfo(`A StandardProcedures is updated with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      } else {
        this.standardProceduresService()
          .create(this.standardProcedures)
          .then(param => {
            this.isSaving = false;
            this.previousState();
            this.alertService.showSuccess(`A StandardProcedures is created with identifier ${param.id}`);
          })
          .catch(error => {
            this.isSaving = false;
            this.alertService.showHttpError(error.response);
          });
      }
    },
  },
});
