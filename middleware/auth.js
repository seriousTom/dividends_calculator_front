import {useAuthStore} from '~/store/auth';

export default defineNuxtRouteMiddleware((context) => {
    const authStore = useAuthStore();
    const authenticated = authStore.checkLogin();

    if(!authenticated) {
        return navigateTo('/login');
    }
})
