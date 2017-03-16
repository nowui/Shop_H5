import constant from '../util/constant';

const wechat_open_id_key = 'wechat_open_id_' + constant.version;
const user_name_key = 'user_name_key_' + constant.version;
const user_avatar_key = 'user_avatar_' + constant.version;
const token_key = 'token_' + constant.version;
const delivery_key = 'delivery_' + constant.version;
const product_key = 'product_' + constant.version;
const cart_key = 'cart_' + constant.version;

const database = {
    getWeChatOpenId() {
        let wechat_open_id = localStorage.getItem(wechat_open_id_key);

        if (wechat_open_id == null) {
            wechat_open_id = '';
        }

        return wechat_open_id;
    },
    setWeChatOpenId(wechat_open_id) {
        localStorage.removeItem(wechat_open_id_key);

        localStorage.setItem(wechat_open_id_key, wechat_open_id);
    },
    getUserName() {
        let user_name = localStorage.getItem(user_name_key);

        if (user_name == null) {
            user_name = '';
        }

        return user_name;
    },
    setUserAvatar(user_avatar) {
        localStorage.removeItem(user_avatar_key);

        localStorage.setItem(user_avatar_key, user_avatar);
    },
    getUserAvatar() {
        let user_avatar = localStorage.getItem(user_avatar_key);

        if (user_avatar == null) {
            user_avatar = '';
        }

        return user_avatar;
    },
    setUserName(user_name) {
        localStorage.removeItem(user_name_key);

        localStorage.setItem(user_name_key, user_name);
    },
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
