export default () => {
    const fetchCompanies = async (searchString = '') => {
        const {data: companies} = await useApiFetch('/companies?name=' + searchString);

        return companies.map((element) => {
            element.label = element.name;
            return element;
        })
    };

    const companiesOptions = ref([]);

    const searchCompanies = async (search, loading) => {
        loading(true);
        companiesOptions.value = await fetchCompanies(search);
        loading(false);
    };

    return {fetchCompanies, companiesOptions, searchCompanies};
}
