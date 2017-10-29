<template>
<div class="modal fade" id="show-msg" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">
                    <span class="glyphicon glyphicon-tree-deciduous"></span>提示
                </h4>
            </div>
            <div class="modal-body">
                <strong style="color: red">{{msg}}</strong>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import bus from '../../bus.js'
export default {
  data () {
    return {
        msg:'',
        secs:1,  //模态框1秒自动关闭
        count:0,
        clearFlag:0
    }
  },
  methods:{
    showModalsecs() {        
      this.count = this.secs;
      $("#show-msg").modal("show");
      this.clearFlag = setInterval(this.autoClose, 1000);
    },
    autoClose() {
      if ( this.count > 0 ){
        this.count --;
      }else {
        $("#show-msg").modal("hide");
        this.count = this.secs;
        clearInterval(this.clearFlag);
      }
    }
  },
  mounted(){
    var that = this
    bus.$on("tip", function(msg){
      that.msg = msg;
      that.showModalsecs();
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
