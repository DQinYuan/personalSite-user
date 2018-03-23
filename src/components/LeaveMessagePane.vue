<template>
  <div class="panel panel-default content-panel">
    <div class="panel-heading">
      <form>
        <textarea v-model="originalContent" 
         placeholder="欢迎留言（删改请联系站长，邮箱：sa517067@mail.ustc.edu.cn）" 
         style="width: 100%" rows="5">
        </textarea><br/>
        <button class="btn" type="button" @click="submit">提交留言</button>
      </form>
    </div>
    <ul class="list-group" id="leaveMessageList">
      <li class="list-group-item" v-for="leaveMessage in leaveMessages">
        <span class="glyphicon glyphicon-user"></span>
        {{leaveMessage.username}} : 
<!--         <a class="pull-right" v-if='leaveMessage.canModify' 
  :leaveMessageId='leaveMessage.leaveMessageId' @click='modify($event)'>修改</a> -->
        <div v-html="leaveMessage.content"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import store from '../vuex/store.js'
import bus from '../bus.js'
export default {
  data () {
    return {
        originalContent:''
    }
  },
  computed:{
    leaveMessages:{
        get(){
            return store.getters.leaveMessages;
        }
    },
    nickname:{
      get(){
        return store.getters.userName;
      }
    }
  },
  methods:{
    submit(){
      if ( this.originalContent === "" ){
        bus.$emit('tip', '留言不能为空');
        return;
      }
      store.dispatch('AddLeaveMessage', {leaveMessage:{originalContent:this.originalContent},
                                         username:this.nickname});
      this.originalContent = "";
    }
  },
  mounted(){
    if ( !this.leaveMessages.length ){
        store.dispatch('InitLeaveMessage');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
