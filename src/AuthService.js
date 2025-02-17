import axios from "./AxiosConfig.js"

class AuthService {
    logout() {
        localStorage.removeItem("userInfo");
        window.location.reload();
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userInfo'));
    }
}

export default new AuthService();