import axios from "./AxiosConfig.js"

class AuthService {
    logout() {
        axios.post("/auth/signout", {}, { withCredentials: true });
        localStorage.removeItem("userInfo");
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('userInfo'));
    }
}

export default new AuthService();