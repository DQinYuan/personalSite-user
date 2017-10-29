<template>
  <div>
    <div class="panel panel-primary content-panel cleared">
        <div class="panel-heading">
           <div class="panel-title">
               <h1>{{article.title}}</h1>
           </div>
        </div>
        <div class="panel-body">
               浏览次数：{{article.browseTimes}}<br/>
               最近修改时间：{{article.latestModifTime}}<br/><br/>
               {{article.content}}
        </div>
    </div>
    <CommentPane/>
  </div>
</template>

<script>
import CommentPane from './subpane/CommentPane.vue'
import store from '../vuex/store.js'
export default {
  data () {
    return {
    }
  },
  computed:{
    article:{
      get(){
          return store.getters.article;
      }
    }
  },
  components:{CommentPane},
  mounted(){
    store.dispatch("IniContent", this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>