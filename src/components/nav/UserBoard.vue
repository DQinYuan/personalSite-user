<template>
    <div>
        <div v-if="!isLogined">
          <ul class="nav navbar-nav navbar-right" id="signup-in">
            <Register/>
            <Login/>
          </ul>
        </div>
        <div v-if="isLogined">
          <ul class="nav navbar-nav navbar-right" id="signup-in">
            <li><a>欢迎{{nickname}}光临本站</a></li>
          </ul>
        </div>
    </div>
</template>

<script>
import Register from './userboard/Register.vue'
import Login from './userboard/Login.vue'
import store from '../../vuex/store.js'
export default {
  data () {
    return {
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
    }
  },
  components:{Register, Login}
}
</script>

<style scoped>
</style>