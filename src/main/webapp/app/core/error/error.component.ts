import { type ComputedRef, type Ref, defineComponent, inject, ref } from 'vue';
import { useRoute } from 'vue-router';
import type LoginService from '@/account/login.service';

export default defineComponent({
  compatConfig: { MODE: 3 },
  name: 'Error',
  setup() {
    const { login } = inject<LoginService>('loginService');
    const authenticated = inject<ComputedRef<boolean>>('authenticated');
    const errorMessage: Ref<string> = ref(null);
    const error403: Ref<boolean> = ref(false);
    const error404: Ref<boolean> = ref(false);
    const route = useRoute();

    if (route.meta) {
      errorMessage.value = route.meta.errorMessage ?? null;
      error403.value = route.meta.error403 ?? false;
      error404.value = route.meta.error404 ?? false;
      if (!authenticated.value && error403.value) {
        login();
      }
    }

    return {
      errorMessage,
      error403,
      error404,
    };
  },
});
