const jwt = require('jsonwebtoken');
const privateKey = 'krishan80541533319';
export const state = () => {
    return {
        firstName: '',
        userInfo: null,
        employees: [],
        posts: []
    }
}

export const mutations = {
    SET_FIRST_NAME(state, firstName) {
        state.firstName = firstName
    },
    SET_USERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    SET_EMPLOYEE(state, employees) {
        state.employees = employees
    },
    SET_POSTS(state, posts) {
        state.posts = posts
    },
}

export const actions = {
    async setFirstName({ commit }) {
        if(this.$storage.getUniversal('_login')){
            const firstName = jwt.verify(this.$storage.getUniversal('_login'), privateKey).firstName;
            commit('SET_FIRST_NAME', firstName);
        }
    },
    async login({ commit }, userData) {
        try {
            const data = await this.$axios.$put(`user`, userData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }); 
            commit('SET_FIRST_NAME', data.firstName);
            const token = jwt.sign(data, privateKey);
            this.$storage.setUniversal('_login', token);
            return data;
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error(error.response.data.message)
            }
            throw error
        }
    },
    async logout({ commit }) {
        try {
           const token = jwt.verify(this.$storage.getUniversal('_login'), privateKey).token;
                await this.$axios.$delete(`user`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }); 
                commit('SET_FIRST_NAME', '');
                this.$storage.removeUniversal('_login');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error('Bad credentials')
            }
            throw error
        }
    },
    async getUserInfo({ commit }) {
        try {
            const token = jwt.verify(this.$storage.getUniversal('_login'), privateKey).token;
            const data = await this.$axios.$get(`user`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            commit('SET_USERINFO', data.profile);
            commit('SET_FIRST_NAME', data.profile.firstName);
            const encodeData = jwt.verify(this.$storage.getUniversal('_login'), privateKey);
            encodeData.firstName = data.profile.firstName;
            this.$storage.setUniversal('_login', jwt.sign(encodeData, privateKey));
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error('Bad credentials')
            }
            throw error
        }
    },
    async updateProfile({ commit } , userData) {
        try {
            const token = jwt.verify(this.$storage.getUniversal('_login'), privateKey).token;
            const data = jwt.verify(this.$storage.getUniversal('_login'), privateKey);
            await this.$axios.$patch(`user`, userData ,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            data.firstName = userData.firstName;
            commit('SET_USERINFO', userData);
            commit('SET_FIRST_NAME', userData.firstName);
            this.$storage.setUniversal('_login', jwt.sign(data, privateKey));
           
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error('Bad credentials')
            }
            throw error
        }
    },
    async getEmployee({ commit }) {
        try {
            const data = await this.$axios.$get('http://dummy.restapiexample.com/api/v1/employees');
            commit('SET_EMPLOYEE', data.data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error('Bad credentials')
            } 
            throw error
        }
    },
    async getPosts({ commit }) {
        try {
            const data = await this.$axios.$get('https://jsonplaceholder.typicode.com/posts');
            commit('SET_POSTS', data);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                throw new Error('Bad credentials')
            } 
            throw error
        }
    },
}
