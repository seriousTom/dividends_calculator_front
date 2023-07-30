const useCommonData = () => {
    const number = useState('number', () => {
        return 0;
    });

    const incrementNumber = () => {
        number.value = number.value + 1;
    };

    return {number, incrementNumber};
};

export default useCommonData;
