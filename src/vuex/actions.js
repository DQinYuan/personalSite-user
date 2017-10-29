
let axios = require("../axios");


const actions = {
  AuthUser({commit}, userinfo){
     axios.post("/users/login", userinfo)
       .then(function (response){
            if ( response.data.islogined ){
                commit('SetLogined', true);
                commit('SetNickName', response.data.nickname);
            } else {
                commit('AddFailMsg', response.data.errormsg);
            } 
            
        })
       .catch( function (error)   { console.log(error);  } );
  },
  clearFailMsgs({commit}){
    commit('ClearFailMsgs');
  },
  AddFileMsg({commit}, failMsg){
    commit('AddFailMsg', failMsg);
  },
  InitUser({commit}){
    axios.post("/users/login", {nickname: "", password: ""
            , vcode: "", iniPage: true})
      .then(function (response){
            if ( response.data.islogined ){
                commit('SetLogined', true);
                commit('SetNickName', response.data.nickname);
            } else {
                commit('SetNickName', response.data.nickname);
            }
        })
       .catch( function (error)   { console.log(error);  } );
  },
  GetArtComs({commit}){
    axios.get("/articles/-1/0")
      .then(function (response){
          commit('InitArtComs', response.data);
      })
      .catch( function (error)   { console.log(error);  } );
  },
  SetArtComShow({commit}, cateId){
    commit("SetArtComShow", cateId);
  },
  IniContent({commit}, artId){
    axios.get("/articles/" + artId)
      .then(function (response){
        commit('InitContent', response.data);
        commit('SetReadId', artId);
      })
      .catch( function (error)   { console.log(error);  } );
  },
  AddComment({commit}, custom){
    axios.post("/comments", custom.commentSubmit)
      .then(function (response){
        if ( response.data.isSuccess ){
          let replyname = "作者";
          if ( custom.commentSubmit.responseCommentId ){
            replyname = custom.replyname;
          }
          commit('AddComment', {content: response.data.content, replyUsername:replyname,
                                username:custom.username, commentId: response.data.commentId,
                                originalContent: custom.commentSubmit.originalContent});
        } else{
          commit('AddFailMsg', response.data.errorInfo);
        }
      })
      .catch( function (error)   { console.log(error);  } );  
  },
  ModifyComment({commit}, custom){
    axios.put("/comments/" + custom.commentId, {newOriginalContent: custom.newOriginalContent})
      .then(function (response){
        if ( response.data.isSuccess ){
          commit('ModifyComment', {comment:custom.comment, content:response.data.content
                                   , originalContent: custom.newOriginalContent});
        } else {
          commit('AddFailMsg', response.data.errorInfo);
        }
      })
      .catch( function (error)   { console.log(error);  } );
  }
};

export default actions
