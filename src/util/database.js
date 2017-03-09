const database = {
    getToken() {
        let token = localStorage.getItem("token");

        if (token == null) {
            token = '';
        }

        return token;
    },
    setToken(token) {
        localStorage.removeItem("token");

        localStorage.setItem("token", token);
    },
    removeToken() {
        localStorage.removeItem("token");
    },
    getDelivery() {
        let delivery = localStorage.getItem("delivery");

        if (delivery == null) {
            return {};
        }

        return JSON.parse(delivery);
    },
    setDelivery(delivery) {
        localStorage.removeItem("delivery");

        localStorage.setItem("delivery", JSON.stringify(delivery));
    },
    removeDelivery() {
        localStorage.removeItem("delivery");
    },
    getProduct() {
        let product = localStorage.getItem("product");

        if (product == null) {
            return [];
        }

        return JSON.parse(product);
    },
    setProduct(product) {
        localStorage.removeItem("product");

        localStorage.setItem("product", JSON.stringify(product));
    },
    removeProduct() {
        localStorage.removeItem("product");
    },
    getCart() {
        return localStorage.getItem("cart");
    },
    setCart(cart) {
        localStorage.removeItem("cart");

        localStorage.setItem("cart", cart);
    },
    removeCart() {
        localStorage.removeItem("cart");
    }
};

export default database;
