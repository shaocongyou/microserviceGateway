import { Authority } from '@/shared/security/authority';

const UserStandardProcedures = () => import('@/user/standard-procedures/user-standard-procedures.vue');

export default [
  {
    path: '/user',
    meta: { authorities: [Authority.USER] },
    children: [
      {
        path: 'standard-procedures',
        name: 'UserStandardProcedures',
        component: UserStandardProcedures,
      },
    ],
  },
];
