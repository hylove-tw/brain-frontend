import createPersistedState from "vuex-persistedstate"
import Vuex from 'vuex'
import { useCookies } from 'vue3-cookies'
import users from './modules/users';
import dataRows from "./modules/dataRows";
const { cookies } = useCookies()

export default Vuex.createStore({
    state: {
        currentStep: 0,
        isSubmitted: false,
        showModal: false,
    },
    getters: {
        isSubmitted: state => state.isSubmitted,
        currentStep: state => state.currentStep,
        showModal: state => state.showModal,
    },
    mutations: {
        setCurrentStep(state, payload) {
            state.currentStep = payload
        },
        setIsSubmitted(state, payload) {
            state.isSubmitted = payload
        },
        setShowModal(state, payload) {
            state.showModal = payload
        }
    },
    actions: {
    },
    modules: {
        users,
        dataRows,
    },
    plugins: [createPersistedState(
        {
            reducer(val) {
                return {
                    'users': val.users //只儲存使用者資料   
                }
            }
        }
    )]
})
