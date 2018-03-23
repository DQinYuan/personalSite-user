
let axios = require("../axios");
import bus from "../bus"


const actions = {
  AuthUser({commit}, userinfo){
     axios.post("/users/login", userinfo)
       .then(function (response){
            if ( response.data.islogined ){
                commit('SetLogined', true);
                commit('SetNickName', response.data.nickname);
            } else {
                commit('AddFailMsg', response.data.errormsg);
                let timestamp = new Date().getTime();
                $("#loginimg").attr("src", $("#loginimg").attr('src') + '?' +timestamp);
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
  },
  InitLeaveMessage({commit}){
    axios.get("/leavemessages")
      .then(function (response){
        commit('InitLeaveMessage', response.data);
      })
      .catch( function (error)   { console.log(error);  } );
  },
  AddLeaveMessage({commit}, custom){
    axios.post("/leavemessages", custom.leaveMessage)
      .then(function (response){
        if ( response.data.isSuccess ){
          commit("AddLeaveMessage", {originalContent:custom.leaveMessage.originalContent
                                    , content:response.data.content
                                    , username:custom.username});
          bus.$emit("tip", "留言成功");
        } else {
          bus.$emit("tip", response.data.errorInfo);
        } 
      })
      .catch( function (error)   { console.log(error);  } );
  },
  InitFriendlyLink({commit}){
    axios.get("/friendly-links")
      .then(function(response){
        commit("InitFriendlyLink", response.data);
      })
      .catch( function (error)   { console.log(error);  } );
  }
};

export default actions
