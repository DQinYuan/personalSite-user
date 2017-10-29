<template>
    <div class="modal fade" id="commentpopup" role="dialog" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                    &times;
                </button>
                <h4 class="modal-title" id="responseTitle">
                  {{info}}
                </h4>
            </div>
            <form action="" class="form-horizontal" role="form">
                <div class="modal-body" id="subcomment-modal-body">
                    <div class="form-group">
                        <div class="col-sm-10">
                            <textarea v-model="originalContent" class="form-control"></textarea>
                        </div>
                    </div>
                    <div class='alert alert-error' v-for="msg in failMsgs"> 
                        <a class='close' data-dismiss='alert'>×</a> 
                        <strong style='color: red' >{{msg}}</strong> 
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="submit">
                        提交
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
</template>

<script>
import store from '../../vuex/store.js'
export default {
  data () {
    return {
        originalContent:'',
        modifyIndex: -1
    }
  },
  computed:{
    failMsgs:{
      get(){
        return store.getters.failMsgs;
      }
    },
    artId:{
        get(){
            return store.getters.readId;
        }
    },
    nickName:{
        get(){
            return store.getters.userName;
        }
    },
    comments:{
        get(){
            return store.getters.comments;
        }
    }
  },
  props:['info', 'funcFlag', 'commentId'],
  methods:{
    frontJudge(){
      if ( this.originalContent === "" ){
        store.dispatch("AddFileMsg", "评论内容不能为空");
        return false;
      }
      $('#commentpopup').modal('hide');
      return true;
    },
    write(){
      if ( !this.frontJudge() ){
        return;
      }
      store.dispatch('AddComment', {
        commentSubmit:{
          articleId:this.artId, originalContent:this.originalContent
        },
        username:this.nickName
      });
    },
    reply(){
      if ( !this.frontJudge() ){
        return;
      }
      store.dispatch('AddComment', {
        commentSubmit:{
          articleId:this.artId, originalContent:this.originalContent,
          responseCommentId: this.commentId
        },
        username:this.nickName,
        replyname:this.info.slice(3)
      });
    },
    modify(){
      if ( !this.frontJudge() ){
        return;
      }
      store.dispatch("ModifyComment", {commentId: this.commentId, 
                                       newOriginalContent: this.originalContent,
                                       comment:this.comments[this.modifyIndex]});
    },
    submit(){
      if ( this.funcFlag === 'write' ){
        this.write();
      }
      if ( this.funcFlag === 'reply' ){
        this.reply();
      }
      if ( this.funcFlag === 'modify' ){
        this.modify();
      }
    }
  },
  mounted(){
    $('#commentpopup').on("hidden.bs.modal", function(){
      store.dispatch('clearFailMsgs');
    });
    let that = this;
    $('#commentpopup').on("shown.bs.modal", function(){
      if ( that.funcFlag === "modify" ){
        let comments = that.comments;
        for ( let i = 0; i < comments.length; i++ ){
            if ( comments[i].commentId == that.commentId ){
                that.originalContent = comments[i].originalContent;
                that.modifyIndex = i;
                break;
            }
        }
      }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
