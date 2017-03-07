const database = {
    getToken() {
        return localStorage.getItem("token2");
    },
    setToken(token) {
        localStorage.removeItem("token2");

        localStorage.setItem("token2", token);
    },
    getName() {
        return localStorage.getItem("name");
    },
    setName(name) {
        localStorage.removeItem("name");

        localStorage.setItem("name", name);
    },
    getClazz() {
        return localStorage.getItem("clazz");
    },
    setClazz(clazz) {
        localStorage.removeItem("clazz");

        localStorage.setItem("clazz", clazz);
    }
};

export default database;
