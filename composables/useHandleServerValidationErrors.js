export default () => {
    const serverValidationErrors = ref({});

    const refreshErrors = (error) => {
        if (error.status == 422) {
            serverValidationErrors.value = error.data.errors;
            console.log(error.data.errors);
        }
    };

    const clearErrors = () => {
        serverValidationErrors.value = {};
    };

    const getServerValidationError = (fieldName, errors) => {
        if(errors) {
            serverValidationErrors.value = errors;
        }
        if (serverValidationErrors.value[fieldName]) {
            return serverValidationErrors.value[fieldName][0];
        }
        return '';
    }

    const hasServerValidationError = (fieldName, errors) => {
        if(errors) {
            serverValidationErrors.value = errors;
        }
        if (serverValidationErrors.value[fieldName]) {
            return true;
        }
        return false;
    }

    return {
        serverValidationErrors,
        refreshErrors,
        clearErrors,
        getServerValidationError,
        hasServerValidationError
    };
}
