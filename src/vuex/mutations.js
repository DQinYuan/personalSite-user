

const mutations = {
    
    AddFailMsg(state, msg){
        state.failMsgs.length = 0;//清空数组
        state.failMsgs.push(msg);
    },
    ClearFailMsgs(state){
        state.failMsgs.length = 0;
    },
    SetLogined(state, tf){
        state.isLogined = tf;
    },
    SetNickName(state, name){
        state.nickname = name;
    },
    InitArtComs(state, artComs){
        for ( let i = 0; i < artComs.length; i++ ){
            artComs[i].isShow = true;
        }
        state.artComs = artComs;
    },
    SetArtComShow(state, cateId){
        let artComs = state.artComs;
        for ( let i = 0; i < artComs.length; i++ ){
            let artCom = artComs[i];
            if ( cateId != -1 && artCom.category != cateId ){
                artCom.isShow = false;
            } else {
                artCom.isShow = true;
            }
        }
    },
    InitContent(state, artCustom){
        state.comments = artCustom.comments;
        for ( let i = 0; i < state.comments.length; i++ ){
            state.comments[i].canModify = false;
        }

        delete artCustom.comments;
        state.article = artCustom;
    },
    SetReadId(state, artId){
        state.readId = artId;
    },
    AddComment(state, comment){
        comment.canModify = true;
        state.comments.unshift(comment);
    },
    ModifyComment(state, custom){
        //允许不借助state而是直接对引用进行修改
        custom.comment.originalContent = custom.originalContent;
        custom.comment.content = custom.content;
    }
};

export default mutations
