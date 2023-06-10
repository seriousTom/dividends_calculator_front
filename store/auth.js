import {defineStore} from 'pinia';

export const useAuthStore = defineStore('authStore', () => {
    const name = ref(null);
    const email = ref(null);
    const token = ref(null);

    function setLoginData(userName, userEmail, userToken) {
        localStorage.setItem('userData', userToken + ';' + userName + ';' + userEmail);
        const userData = useCookie('userData', {
            maxAge: 24 * 60 * 60 * 365
        });
        userData.value = userToken + ';' + userName + ';' + userEmail;

        name.value = userName;
        email.value = userEmail
        token.value = userToken;
    }

    function checkLogin() {
        if(process.server) {
            const userData = useCookie('userData');
            if(!userData.value) {
                return false;
            }

            return checkAuthData(userData.value);

        } else if(process.client) {
            const userData = localStorage.getItem('userData');
            if(!userData) {
                return false;
            }
            return checkAuthData(userData);
        }

        return false;
    }

    function checkAuthData(userDataString) {
        const userData = userDataString.split(';');
        if(userData.length != 3) {
            return false;
        }

        token.value = userData[0];
        name.value = userData[1];
        email.value = userData[2];

        return true;
    }

    function logout() {
        const userData = useCookie('userData');
        userData.value = null;

        localStorage.removeItem('userData');

        token.value = null;
        name.value = null;
        email.value = null;
    }

    return {name, email, token, setLoginData, checkLogin, logout};
});
