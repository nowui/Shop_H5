import constant from '../util/constant';

const token_key = 'token_' + constant.version;
const delivery_key = 'delivery_' + constant.version;
const product_key = 'product_' + constant.version;
const cart_key = 'cart_' + constant.version;

const database = {
    getToken() {
        let token = localStorage.getItem(token_key);

        if (token == null) {
            token = '';
        }

        return token;
    },
    setToken(token) {
        localStorage.removeItem(token_key);

        localStorage.setItem(token_key, token);
    },
    removeToken() {
        localStorage.removeItem(token_key);
    },
    getDelivery() {
        let delivery = localStorage.getItem(delivery_key);

        if (delivery == null) {
            return {};
        }

        return JSON.parse(delivery);
    },
    setDelivery(delivery) {
        localStorage.removeItem(delivery_key);

        localStorage.setItem(delivery_key, JSON.stringify(delivery));
    },
    removeDelivery() {
        localStorage.removeItem(delivery_key);
    },
    getProduct() {
        let product = localStorage.getItem(product_key);

        if (product == null) {
            return [];
        }

        return JSON.parse(product);
    },
    setProduct(product) {
        localStorage.removeItem(product_key);

        localStorage.setItem(product_key, JSON.stringify(product));
    },
    removeProduct() {
        localStorage.removeItem(product_key);
    },
    getCart() {
        return localStorage.getItem(cart_key);
    },
    setCart(cart) {
        localStorage.removeItem(cart_key);

        localStorage.setItem(cart_key, cart);
    },
    removeCart() {
        localStorage.removeItem(cart_key);
    }
};

export default database;
