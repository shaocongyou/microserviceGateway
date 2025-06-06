import { Authority } from '@/shared/security/authority';
const Entities = () => import('@/entities/entities.vue');

const StandardProcedures = () => import('@/entities/standard-procedures/standard-procedures.vue');
const StandardProceduresUpdate = () => import('@/entities/standard-procedures/standard-procedures-update.vue');
const StandardProceduresDetails = () => import('@/entities/standard-procedures/standard-procedures-details.vue');

// jhipster-needle-add-entity-to-router-import - JHipster will import entities to the router here

export default {
  path: '/',
  component: Entities,
  children: [
    {
      path: 'standard-procedures',
      name: 'StandardProcedures',
      component: StandardProcedures,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'standard-procedures/new',
      name: 'StandardProceduresCreate',
      component: StandardProceduresUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'standard-procedures/:standardProceduresId/edit',
      name: 'StandardProceduresEdit',
      component: StandardProceduresUpdate,
      meta: { authorities: [Authority.USER] },
    },
    {
      path: 'standard-procedures/:standardProceduresId/view',
      name: 'StandardProceduresView',
      component: StandardProceduresDetails,
      meta: { authorities: [Authority.USER] },
    },
    // jhipster-needle-add-entity-to-router - JHipster will add entities to the router here
  ],
};
