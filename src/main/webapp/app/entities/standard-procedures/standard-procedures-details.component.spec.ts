import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';
import { type RouteLocation } from 'vue-router';

import StandardProceduresDetails from './standard-procedures-details.vue';
import StandardProceduresService from './standard-procedures.service';
import AlertService from '@/shared/alert/alert.service';

type StandardProceduresDetailsComponentType = InstanceType<typeof StandardProceduresDetails>;

let route: Partial<RouteLocation>;
const routerGoMock = vitest.fn();

vitest.mock('vue-router', () => ({
  useRoute: () => route,
  useRouter: () => ({ go: routerGoMock }),
}));

const standardProceduresSample = { id: 123 };

describe('Component Tests', () => {
  let alertService: AlertService;

  afterEach(() => {
    vitest.resetAllMocks();
  });

  describe('StandardProcedures Management Detail Component', () => {
    let standardProceduresServiceStub: SinonStubbedInstance<StandardProceduresService>;
    let mountOptions: MountingOptions<StandardProceduresDetailsComponentType>['global'];

    beforeEach(() => {
      route = {};
      standardProceduresServiceStub = sinon.createStubInstance<StandardProceduresService>(StandardProceduresService);

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          'font-awesome-icon': true,
          'router-link': true,
        },
        provide: {
          alertService,
          standardProceduresService: () => standardProceduresServiceStub,
        },
      };
    });

    describe('Navigate to details', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        standardProceduresServiceStub.find.resolves(standardProceduresSample);
        route = {
          params: {
            standardProceduresId: `${123}`,
          },
        };
        const wrapper = shallowMount(StandardProceduresDetails, { global: mountOptions });
        const comp = wrapper.vm;
        // WHEN
        await comp.$nextTick();

        // THEN
        expect(comp.standardProcedures).toMatchObject(standardProceduresSample);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        standardProceduresServiceStub.find.resolves(standardProceduresSample);
        const wrapper = shallowMount(StandardProceduresDetails, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        comp.previousState();
        await comp.$nextTick();

        expect(routerGoMock).toHaveBeenCalledWith(-1);
      });
    });
  });
});
