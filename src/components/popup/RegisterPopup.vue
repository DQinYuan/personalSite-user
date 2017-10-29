<template>
    <div class="modal fade" id="sign-up" role="dialog" aria-hidden="true" v-if="!isLogined">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <h4 class="modal-title" id="myModalLabel">
                        <span class="glyphicon glyphicon-log-in"></span> 注册
                    </h4>
                </div>
                <div class="modal-body">
                    注册功能暂未开放
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
    }
  }
}
</script>

<style scoped>
</style>