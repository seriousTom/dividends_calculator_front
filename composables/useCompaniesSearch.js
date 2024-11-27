export default () => {
    const companiesOptions = ref([]);
    const searchString = ref('');
    const companies = ref([]);

    const fetchCompanies = async (searchString = '', companyId = '') => {
        const {data} = await useApiFetch('/companies?name=' + searchString + '&company_id=' + companyId);

        companies.value = data;

        return data;
    };

    const searchCompanies = async (search, loading) => {
        loading(true);
        searchString.value = search;
        companies.value = await fetchCompanies(search);
        companiesOptions.value = companies.value.map((element) => {
            element.label = element.search_title;
            return element;
        });
        loading(false);
    };

    return {fetchCompanies, companiesOptions, searchCompanies, searchString, companies};
}
