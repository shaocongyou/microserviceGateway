import { vitest } from 'vitest';
import { computed } from 'vue';
import { shallowMount } from '@vue/test-utils';
import { type Router } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';

import JhiNavbar from './jhi-navbar.vue';
import { useStore } from '@/store';
import { createRouter } from '@/router';
import type LoginService from '@/account/login.service';

type JhiNavbarComponentType = InstanceType<typeof JhiNavbar>;

const pinia = createTestingPinia({ stubActions: false });
const store = useStore();

describe('JhiNavbar', () => {
  let jhiNavbar: JhiNavbarComponentType;
  let loginService: LoginService;
  const accountService = { hasAnyAuthorityAndCheckAuth: vitest.fn().mockImplementation(() => Promise.resolve(true)) };
  let router: Router;

  beforeEach(() => {
    router = createRouter();
    loginService = { login: vitest.fn(), logout: vitest.fn() };
    const wrapper = shallowMount(JhiNavbar, {
      global: {
        plugins: [pinia, router],
        stubs: {
          'font-awesome-icon': true,
          'b-navbar': true,
          'b-navbar-nav': true,
          'b-dropdown-item': true,
          'b-collapse': true,
          'b-nav-item': true,
          'b-nav-item-dropdown': true,
          'b-navbar-toggle': true,
          'b-navbar-brand': true,
        },
        provide: {
          loginService,
          currentLanguage: computed(() => 'foo'),
          accountService,
        },
      },
    });
    jhiNavbar = wrapper.vm;
  });

  it('should not have user data set', () => {
    expect(jhiNavbar.authenticated).toBeFalsy();
    expect(jhiNavbar.openAPIEnabled).toBeFalsy();
    expect(jhiNavbar.inProduction).toBeFalsy();
  });

  it('should have user data set after authentication', () => {
    store.setAuthentication({ login: 'test' });

    expect(jhiNavbar.authenticated).toBeTruthy();
  });

  it('should have profile info set after info retrieved', () => {
    store.setActiveProfiles(['prod', 'api-docs']);

    expect(jhiNavbar.openAPIEnabled).toBeTruthy();
    expect(jhiNavbar.inProduction).toBeTruthy();
  });

  it('should use login service', () => {
    jhiNavbar.login();

    expect(loginService.login).toHaveBeenCalled();
  });

  it('should use account service', () => {
    jhiNavbar.hasAnyAuthority('auth');

    expect(accountService.hasAnyAuthorityAndCheckAuth).toHaveBeenCalled();
  });

  it('logout should clear credentials', async () => {
    store.setAuthentication({ login: 'test' });
    const logoutUrl = '/to-match';
    (loginService.logout as any).mockReturnValue(Promise.resolve({ data: { logoutUrl } }));

    await jhiNavbar.logout();

    expect(loginService.logout).toHaveBeenCalled();
    expect(router.currentRoute.value.path).toBe(logoutUrl);
  });

  it('should determine active route', async () => {
    await router.push('/toto');

    expect(jhiNavbar.subIsActive('/titi')).toBeFalsy();
    expect(jhiNavbar.subIsActive('/toto')).toBeTruthy();
    expect(jhiNavbar.subIsActive(['/toto', 'toto'])).toBeTruthy();
  });
});
