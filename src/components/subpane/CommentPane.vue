<template>
<div>
  <div id="comment_panel" class="panel panel-default content-panel cleared">
    <div class="panel-heading">
        <div class="panel-title">
            <h5>评论区（提示：点击小人头像可以回复评论）</h5>
            <button class="btn" data-toggle="modal" @click="writeComments">写评论</button>
        </div>
    </div>
    <ul class="list-group">
      <li class="list-group-item" v-for="comment in comments">
        <a @click="replyComment($event)" :username='comment.username'
         :commentId='comment.commentId'>
            <span class="glyphicon glyphicon-user"></span>
        </a>
        &nbsp;&nbsp;{{comment.username}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{comment.replyUsername}}：
        <a class="modifyComment pull-right" type="button" v-if="comment.canModify" 
        @click="modifyComment($event)" :commentId='comment.commentId'>修改</a>
        <div v-html="comment.content"></div>
      </li>
    </ul>
  </div>
  <CommentPopup :info='showinfo' :funcFlag='funcFlag' :commentId='touchCommentId'/>
</div>
</template>

<script>
import CommentPopup from '../popup/CommentPopup.vue'
import store from '../../vuex/store'
export default {
  data () {
    return {
      showinfo:'',
      funcFlag:'',
      touchCommentId:-1
    }
  },
  computed:{
    isLogined:{
      get(){
        return store.getters.isLogined;
      }
    },
    nickname:{
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
  components:{CommentPopup},
  methods:{
    showModal(strtoShow, funcFlag){
      this.funcFlag = funcFlag
      this.showinfo = strtoShow;
      $('#commentpopup').modal('show');
    },
    writeComments(){
      let greet = this.isLogined ? "用户" : "网友";
      this.touchCommentId = -1;
      this.showModal("写评论（" + greet +"：" + this.nickname + "）", "write");    
    },
    replyComment(event){
      let userToReply = event.currentTarget.getAttribute('username');
      this.touchCommentId = event.currentTarget.getAttribute('commentId');
      this.showModal("回复 " + userToReply, "reply");
    },
    modifyComment(event){
      this.touchCommentId = event.currentTarget.getAttribute('commentId');
      this.showModal('修改评论（只允许在本次会话之内）', 'modify')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>