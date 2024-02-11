export default () => {
    const fetchCompanies = async (searchString = '', companyId = '') => {
        const {data: companies} = await useApiFetch('/companies?name=' + searchString + '&company_id=' + companyId);

        return companies.map((element) => {
            element.label = element.name;
            return element;
        })
    };

    const companiesOptions = ref([]);

    const searchString = ref('');

    const searchCompanies = async (search, loading) => {
        loading(true);
        searchString.value = search;
        companiesOptions.value = await fetchCompanies(search);
        loading(false);
    };

    return {fetchCompanies, companiesOptions, searchCompanies, searchString};
}
