<template>
    <div>
      <div class='panel panel-default thumb-panel cleared' v-for="artCom in artComs"
          v-show="artCom.isShow">
          <div class='panel-heading'>
              <h3 class='panel-title'>
                  <router-link :to="artUrlTem + artCom.id">{{artCom.title}}</router-link>
              </h3> 
          </div>
          <div class='panel-body'>{{artCom.artAbstract}}</div> 
      </div>
    </div>
</template>

<script>
import store from '../vuex/store.js'
export default {
  data () {
    return {
        artUrlTem:'/read/'
    }
  }
  ,
  computed:{
    artComs:{
        get(){
            return store.getters.artComs;
        }
    }
  },
  mounted(){
    store.dispatch("GetArtComs");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.thumb-panel{
    margin-left:5% ;
    width: 90%;
}
</style>
