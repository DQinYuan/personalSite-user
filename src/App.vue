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
                  <li class="active delActive" id="nav-1">
                      <a @click="panelFilt(-1)">首页</a>
                  </li>
                  <li class="dropdown delActive" id="nav0">
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
                  <li class="delActive" id="nav1"><a class="cate-a"  @click="panelFilt(3)">聊聊生活</a></li>
                  <li class="delActive" id="nav2">
                    <router-link to='/leaveAmessage'>
                      <span class="glyphicon glyphicon-pencil"/>留言
                    </router-link>
                  </li>
                  <li>
                    <a class="dropdown-toggle" data-toggle="dropdown">
                          友情链接
                          <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu">
                      <li v-for="friendlyLink in friendlyLinks">
                          <a :href="friendlyLink.link">{{friendlyLink.name}}</a>
                      </li>
                    </ul>
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
      if ( cateId == -1 ){
          this.navChange(-1);
      }
      if ( cateId == 0 || cateId == 1 || cateId == 2 ){
          this.navChange(0)
      }
      if ( cateId == 3 ){
          this.navChange(1)
      }
    },
    navChange(nownav){
      $(".delActive").removeClass("active");
      $("#nav" + nownav).addClass("active");
    }
  },
  mounted(){
    store.dispatch("InitUser");
    store.dispatch("InitFriendlyLink");
  },
  watch:{
    $route:function(val){
        if ( val.path == "/leaveAmessage" ){
            this.navChange(2);
        }
    }
  },
  computed:{
    friendlyLinks:{
        get(){
            return store.getters.friendlyLinks;
        }
    }
  }
}
</script>

<style>

</style>
