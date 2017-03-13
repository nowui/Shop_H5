import constant from '../util/constant';

export default {

    namespace: 'category',

    state: {
        index: 0,
        list: [],
        product: []
    },

    reducers: {
        fetch(state, action) {
            return {...state, ...action.data};
        }
    }

};
