import { type Ref, computed, defineComponent, inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import type LoginService from '@/account/login.service';

import type AccountService from '@/account/account.service';
import EntitiesMenu from '@/entities/entities-menu.vue';

import { useStore } from '@/store';

type SubmenuKeys = 'entities' | 'admin' | 'account';
interface SubmenusState {
  entities: boolean;
  admin: boolean;
  account: boolean;
}

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'JhiNavbar',
  components: {
    'entities-menu': EntitiesMenu,
  },
  setup() {
    const loginService = inject<LoginService>('loginService')!;
    const { login } = loginService;

    const accountService = inject<AccountService>('accountService')!;
    const currentLanguage = inject('currentLanguage', () => computed(() => navigator.language ?? 'en'), true);

    const router = useRouter();
    const store = useStore();

    const version = `v${APP_VERSION}`;
    const hasAnyAuthorityValues: Ref<any> = ref({});
    const submenus = ref<SubmenusState>({
      entities: false,
      admin: false,
      account: false,
    });

    const openAPIEnabled = computed(() => store.activeProfiles.indexOf('api-docs') > -1);
    const inProduction = computed(() => store.activeProfiles.indexOf('prod') > -1);
    const authenticated = computed(() => store.authenticated);

    const subIsActive = (input: string | string[]) => {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => {
        return router.currentRoute.value.path.indexOf(path) === 0;
      });
    };

    const toggleSubmenu = (menuName: SubmenuKeys) => {
      submenus.value[menuName] = !submenus.value[menuName];
    };

    const logout = async () => {
      const response = await loginService.logout();
      store.logout();
      window.location.href = response.data.logoutUrl;
      const next = response.data?.logoutUrl ?? '/';
      if (router.currentRoute.value.path !== next) {
        await router.push(next);
      }
    };

    return {
      logout,
      subIsActive,
      toggleSubmenu,
      submenus,
      accountService,
      login,
      version,
      currentLanguage,
      hasAnyAuthorityValues,
      openAPIEnabled,
      inProduction,
      authenticated,
    };
  },
  methods: {
    hasAnyAuthority(authorities: any): boolean {
      this.accountService.hasAnyAuthorityAndCheckAuth(authorities).then(value => {
        if (this.hasAnyAuthorityValues[authorities] !== value) {
          this.hasAnyAuthorityValues = { ...this.hasAnyAuthorityValues, [authorities]: value };
        }
      });
      return this.hasAnyAuthorityValues[authorities] ?? false;
    },
  },
});
