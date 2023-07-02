import {useAuthStore} from '~/store/auth';

export default (url, opts) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    if(authStore.token) {
        headers['Authorization'] = 'Bearer ' + authStore.token;
    }

    return $fetch(url, { baseURL: config.public.apiBaseUrl, headers, ...opts });
}
