var axios= require('../axios');


const getters = {

  failMsgs: (state) => {
    return state.failMsgs
  },
  isLogined: (state) => {
    return state.isLogined
  },
  userName:(state) => {
    return state.nickname
  },
  artComs:(state) => {
    return state.artComs
  },
  article:(state) => {
    return state.article
  },
  comments:(state) => {
    return state.comments
  },
  readId:(state) => {
    return state.readId
  }
};

export default getters
