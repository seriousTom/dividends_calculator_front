export default () => {
    const changeUrlParameters = (key, value) => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        urlSearchParams.set(key, value);

        const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
        window.history.replaceState({}, document.title, newUrl);

        return newUrl;
    };

    return {changeUrlParameters};
}
