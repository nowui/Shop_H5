import http from './http';
import database from './database';

const wechat = {
    auth() {
        if (database.getWeChatOpenId() != '' && database.getToken() == '') {
            http({
                url: '/member/wechat/login',
                data: {
                    wechat_open_id: database.getWeChatOpenId()
                },
                success: function (json) {
                    database.setToken(json.data.token);
                    database.setDelivery(json.data.delivery);
                    database.setUserName(json.data.user_name);
                    database.setUserAvatar(json.data.user_avatar);
                }.bind(this),
                complete: function () {

                }.bind(this)
            }).post();
        }
    }
};

export default wechat;
