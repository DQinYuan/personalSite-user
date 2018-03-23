<template>
    <div class="modal fade" id="sign-in" role="dialog" aria-hidden="true" v-if="existed">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title">
                        <span class="glyphicon glyphicon-user"></span> 登录
                    </h4>
                </div>
                <form class="form-horizontal" role="form" method="post">
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="username-signin" class="col-sm-2 control-label">用户名</label>
                            <div class="col-sm-10">
                                <input type="text" id="username-signin"  name="nickname" class="form-control" placeholder="请输入用户名" v-model="username">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="password-signin" class="col-sm-2 control-label">密码</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="password-signin"  name="password" placeholder="请输入密码" v-model="pin">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="verification-code-signin" class="col-sm-2 control-label">验证码</label>
                            <div class="col-sm-10">
                                <input type="text" style="width: 30%" 
                                   class="form-control col-sm-2" id="verification-code-signin" name="vcode"
                                   placeholder="请输入验证码" v-model="authCode">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label"></label>
                            <div class="col-sm-10">
                                <img id="loginimg" src="/authImg.jpg"/>
                            </div>
                        </div>
                        <div class='alert alert-error' v-for="msg in failMsgs"> 
                            <a class='close' data-dismiss='alert'>×</a> 
                            <strong style='color: red' >{{msg}}</strong> 
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭
                        </button>
                        <button type="button" @click="loginCommit" class="btn btn-primary">
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
let md5 = require('js-md5');
export default {
  data () {
    return {
        username: "",
        pin: "",
        authCode: "",
        existed: true
    }
  },
  computed:{
    failMsgs:{
      get(){
        return store.getters.failMsgs;
      }
    },
    isLogined:{
      get(){
        return store.getters.isLogined;
      }
    }
  },
  methods:{
    loginCommit(){
        let password = md5.hex(this.username + this.pin);
        store.dispatch("AuthUser", {nickname: this.username, password: password
            , vcode: this.authCode, iniPage: false});
    }
  },
  watch:{
    isLogined : function (val) {
        let that = this;
        if (val){
            $('#sign-in').modal('hide');
            $('#sign-in').on("hidden.bs.modal", function(){
              that.existed = false;
            });
        }
    }
  },
  mounted(){
    $('#sign-in').on("hidden.bs.modal", function(){
      store.dispatch('clearFailMsgs');
    });
  }
}
</script>

<style scoped>
</style>