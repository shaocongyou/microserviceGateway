import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import StandardProceduresUpdate from './standard-procedures-update.vue';
import StandardProceduresService from './standard-procedures.service';
import AlertService from '@/shared/alert/alert.service';

type StandardProceduresUpdateComponentType = InstanceType<typeof StandardProceduresUpdate>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const standardProceduresSample = { id: 123 };

describe('Component Tests', () => {
  let mountOptions: MountingOptions<StandardProceduresUpdateComponentType>['global'];
  let alertService: AlertService;

  describe('StandardProcedures Management Update Component', () => {
    let comp: StandardProceduresUpdateComponentType;
    let standardProceduresServiceStub: SinonStubbedInstance<StandardProceduresService>;

    beforeEach(() => {
      route = {};
      standardProceduresServiceStub = sinon.createStubInstance<StandardProceduresService>(StandardProceduresService);
      standardProceduresServiceStub.retrieve.onFirstCall().resolves(Promise.resolve([]));

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'b-input-group': true,
          'b-input-group-prepend': true,
          'b-form-datepicker': true,
          'b-form-input': true,
        },
        provide: {
          alertService,
          standardProceduresService: () => standardProceduresServiceStub,
        },
      };
    });

    afterEach(() => {
      vitest.resetAllMocks();
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const wrapper = shallowMount(StandardProceduresUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.standardProcedures = standardProceduresSample;
        standardProceduresServiceStub.update.resolves(standardProceduresSample);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(standardProceduresServiceStub.update.calledWith(standardProceduresSample)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        standardProceduresServiceStub.create.resolves(entity);
        const wrapper = shallowMount(StandardProceduresUpdate, { global: mountOptions });
        comp = wrapper.vm;
        comp.standardProcedures = entity;

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(standardProceduresServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        standardProceduresServiceStub.find.resolves(standardProceduresSample);
        standardProceduresServiceStub.retrieve.resolves([standardProceduresSample]);

        // WHEN
        route = {
          params: {
            standardProceduresId: `${standardProceduresSample.id}`,
          },
        };
        const wrapper = shallowMount(StandardProceduresUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(comp.standardProcedures).toMatchObject(standardProceduresSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        standardProceduresServiceStub.find.resolves(standardProceduresSample);
        const wrapper = shallowMount(StandardProceduresUpdate, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
