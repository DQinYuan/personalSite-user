<template>
  <div id="app">
    <nav class="navbar navbar-default" role="navigation">
      <div class="container-fluid">
          <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse"
                      data-target="#navbar-collapse">
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
                  <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="#">
                  <img alt="Brand" src="./assets/images/navicon.png">
              </a>
              <a href="#" class="navbar-brand dropdown-toggle" data-toggle="dropdown">
                  Welecome to DQYuan's blog
                  <b class="caret"></b>
              </a>
              <ul class="dropdown-menu">
                  <li><a href="#">About Me</a></li>
              </ul>
          </div>
          <div class="collapse navbar-collapse" id="navbar-collapse">
              <ul class="nav navbar-nav" id="mainNavul">
                  <li class="active delActive">
                      <a @click="panelFilt(-1)">首页</a>
                  </li>
                  <li class="dropdown delActive">
                      <a class="dropdown-toggle" data-toggle="dropdown">
                          聊聊技术
                          <b class="caret"></b>
                      </a>
                      <ul class="dropdown-menu">
                          <li><a @click="panelFilt(0)">杂谈</a></li>
                          <li><a @click="panelFilt(1)">笔记</a></li>
                          <li><a @click="panelFilt(2)">教程</a></li>
                      </ul>
                  </li>
                  <li class="delActive"><a class="cate-a"  @click="panelFilt(3)">聊聊生活</a></li>
                  <li class="delActive">
                    <router-link to='/leaveAmessage'>
                      <span class="glyphicon glyphicon-pencil"/>留言
                    </router-link>
                  </li>
              </ul>
              
              <UserBoard/>
              
          </div>


      </div>
    </nav>
    <form class="pull-right
                     col-lg-3 col-lg-offset-8
                     col-md-3 col-md-offset-8
                     col-sm-3 col-sm-offset-8
                     col-xs-8 col-xs-offset-3" role="form">
    <div class="input-group">
        <span class="input-group-addon"><a><span class="glyphicon glyphicon-search"></span></a></span>
        <input type="text" class="form-control" placeholder="搜索功能暂未开通">
    </div>
    </form>
    <br/>
    <br/>
    <br/>
    <router-view/>
    <LoginPopup/>
    <RegisterPopup/>
    <TipPopup/>
  </div>
</template>

<script>
import UserBoard from './components/nav/UserBoard.vue'
import RegisterPopup from './components/popup/RegisterPopup.vue'
import LoginPopup from './components/popup/LoginPopup.vue'
import TipPopup from './components/popup/TipPopup.vue'
import store from './vuex/store.js'

export default {
  data () {
    return {
    }
  },
  components: {UserBoard, RegisterPopup, LoginPopup, TipPopup},
  methods:{
    panelFilt(cateId){
      this.$router.push('/');
      store.dispatch("SetArtComShow", cateId);
    }
  },
  mounted(){
    store.dispatch("InitUser");
  }
}
</script>

<style>

</style>
