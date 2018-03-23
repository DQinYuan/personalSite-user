import state from './state';

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
  },
  leaveMessages:(state) => {
    return state.leaveMessages
  },
  friendlyLinks:(state) => {
    return state.friendlyLinks
  }
};

export default getters
