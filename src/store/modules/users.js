import axios from 'axios';
import router from '../../router/index.js';
const state = {
    user: null,
};

const getters = {
    isAuthenticated: state => !!state.user,
    stateUser: state => state.user,
};

const actions = {
    async register({ dispatch }, payload) {
        await axios.post(
            'api/v1/auth/register', payload
        ).then(async (resp) => {
            payload = { user: { email: payload.user.email, password: payload.user.password } }
            // console.log(payload)
            await dispatch('logIn', payload);
        }
        ).catch(error => {
            alert(error.response.data.errors.body)
        });
    },
    async logIn({ commit }, payload) {
        let user = null
        const useMockAuth = !!import.meta.env.VITE_MOCK_AUTH
        console.log(import.meta.env.VITE_MOCK_AUTH)
        if (useMockAuth) {
            const mockUsername = import.meta.env.VITE_MOCK_USERNAME
            const mockPassword = import.meta.env.VITE_MOCK_PASSWORD
            if (payload.username === mockUsername && payload.password === mockPassword) {
                user = {
                    email: 'mock@hylove.com.tw',
                    name: 'mock user'
                }
            }
        }
        else {
            let { data } = await axios.post('api/v1/auth/login', payload);
            user = data.user
        }
        console.log(user)
        await commit('setUser', user);
    },
    async deleteUser({ }, id) {
        await axios.delete(`user/${id}`);
    },
    async logOut({ commit }) {
        let user = null;
        await commit('logout', user);
        await commit('setQuota', null);
        await commit('setUsage', null);
        await router.push({ name: 'Login' });
    }
};

const mutations = {
    setUser(state, data) {
        console.log(data)
        state.user = data;
        console.log(state.user)
    },
    logout(state, user) {
        state.user = user;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};