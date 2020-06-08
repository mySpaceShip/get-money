import { getAuth } from '../../api/auth';

const state = () => ({
  auth: {},
});

const getters = {
  AUTH: state => state.auth,
};

const mutations = {
  SET_AUTH: (state, auth) => {
    state.auth = auth;
  },
};

const actions = {
  SEND_AUTH: async (context, auth) => {
    const authUser = await getAuth(auth)
      .then(resolve => resolve)
      .catch(err => console.error(err));
    context.commit('SET_AUTH', authUser);
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
  namespaced: true,
};
