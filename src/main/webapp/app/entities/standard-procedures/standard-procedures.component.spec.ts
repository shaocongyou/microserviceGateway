import { vitest } from 'vitest';
import { type MountingOptions, shallowMount } from '@vue/test-utils';
import sinon, { type SinonStubbedInstance } from 'sinon';

import StandardProcedures from './standard-procedures.vue';
import StandardProceduresService from './standard-procedures.service';
import AlertService from '@/shared/alert/alert.service';

type StandardProceduresComponentType = InstanceType<typeof StandardProcedures>;

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  let alertService: AlertService;

  describe('StandardProcedures Management Component', () => {
    let standardProceduresServiceStub: SinonStubbedInstance<StandardProceduresService>;
    let mountOptions: MountingOptions<StandardProceduresComponentType>['global'];

    beforeEach(() => {
      standardProceduresServiceStub = sinon.createStubInstance<StandardProceduresService>(StandardProceduresService);
      standardProceduresServiceStub.retrieve.resolves({ headers: {} });

      alertService = new AlertService({
        bvToast: {
          toast: vitest.fn(),
        } as any,
      });

      mountOptions = {
        stubs: {
          jhiItemCount: true,
          bPagination: true,
          bModal: bModalStub as any,
          'font-awesome-icon': true,
          'b-badge': true,
          'jhi-sort-indicator': true,
          'b-button': true,
          'router-link': true,
        },
        directives: {
          'b-modal': {},
        },
        provide: {
          alertService,
          standardProceduresService: () => standardProceduresServiceStub,
        },
      };
    });

    describe('Mount', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        standardProceduresServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        const wrapper = shallowMount(StandardProcedures, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(standardProceduresServiceStub.retrieve.calledOnce).toBeTruthy();
        expect(comp.standardProcedures[0]).toEqual(expect.objectContaining({ id: 123 }));
      });

      it('should calculate the sort attribute for an id', async () => {
        // WHEN
        const wrapper = shallowMount(StandardProcedures, { global: mountOptions });
        const comp = wrapper.vm;
        await comp.$nextTick();

        // THEN
        expect(standardProceduresServiceStub.retrieve.lastCall.firstArg).toMatchObject({
          sort: ['id,asc'],
        });
      });
    });
    describe('Handles', () => {
      let comp: StandardProceduresComponentType;

      beforeEach(async () => {
        const wrapper = shallowMount(StandardProcedures, { global: mountOptions });
        comp = wrapper.vm;
        await comp.$nextTick();
        standardProceduresServiceStub.retrieve.reset();
        standardProceduresServiceStub.retrieve.resolves({ headers: {}, data: [] });
      });

      it('should load a page', async () => {
        // GIVEN
        standardProceduresServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        comp.page = 2;
        await comp.$nextTick();

        // THEN
        expect(standardProceduresServiceStub.retrieve.called).toBeTruthy();
        expect(comp.standardProcedures[0]).toEqual(expect.objectContaining({ id: 123 }));
      });

      it('should not load a page if the page is the same as the previous page', () => {
        // WHEN
        comp.page = 1;

        // THEN
        expect(standardProceduresServiceStub.retrieve.called).toBeFalsy();
      });

      it('should re-initialize the page', async () => {
        // GIVEN
        comp.page = 2;
        await comp.$nextTick();
        standardProceduresServiceStub.retrieve.reset();
        standardProceduresServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

        // WHEN
        comp.clear();
        await comp.$nextTick();

        // THEN
        expect(comp.page).toEqual(1);
        expect(standardProceduresServiceStub.retrieve.callCount).toEqual(1);
        expect(comp.standardProcedures[0]).toEqual(expect.objectContaining({ id: 123 }));
      });

      it('should calculate the sort attribute for a non-id attribute', async () => {
        // WHEN
        comp.propOrder = 'name';
        await comp.$nextTick();

        // THEN
        expect(standardProceduresServiceStub.retrieve.lastCall.firstArg).toMatchObject({
          sort: ['name,asc', 'id'],
        });
      });

      it('Should call delete service on confirmDelete', async () => {
        // GIVEN
        standardProceduresServiceStub.delete.resolves({});

        // WHEN
        comp.prepareRemove({ id: 123 });

        comp.removeStandardProcedures();
        await comp.$nextTick(); // clear components

        // THEN
        expect(standardProceduresServiceStub.delete.called).toBeTruthy();

        // THEN
        await comp.$nextTick(); // handle component clear watch
        expect(standardProceduresServiceStub.retrieve.callCount).toEqual(1);
      });
    });
  });
});
