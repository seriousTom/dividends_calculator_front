import {useAuthStore} from '~/store/auth';

export default (url, opts, headers = null) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    if(!headers) {
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }

    if(authStore.token) {
        headers['Authorization'] = 'Bearer ' + authStore.token;
    }

    return $fetch(url, { baseURL: config.public.apiBaseUrl, headers, ...opts });
}
