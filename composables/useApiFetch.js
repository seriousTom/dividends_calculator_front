export default (url, opts) => {
    const config = useRuntimeConfig();

    return $fetch(url, { baseURL: config.public.apiBaseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, ...opts });
}
