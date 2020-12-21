<template>
  <div class="tab-bar-item" @click="itemClick">
<!--    <img src="../../assets/img/tabbar/home.svg" alt="">-->
<!--    <div>首页</div>-->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else >
      <slot name="item-icon-active"></slot>
    </div>
<!--    <div :class="{active:isActive}">-->
<!--      <slot name="item-text"></slot>-->
<!--    </div>-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>

</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path: { //动态路径
      type:String,
      default:"/"
    },
    activeColor:{ //动态文字样式
      type:String,
      default: "red"
    }
  },
  data : function (){
    return{
      //isActive:true, //是否处于活跃状态
    }
  },
  computed:{
    //动态计算路由是否处于活跃状态
    isActive(){
      //获取活跃中的路由的路径
      let active_path = this.$route.path
      //获取当前路由路径
      let cur_path = this.path
      //如果活跃中路由的路径包含当前路径 表示当前处于活跃状态
      return active_path.indexOf(cur_path) !== -1
    },
    //动态添加样式
    activeStyle(){
      return this.isActive ? {color:this.activeColor}:{}
    }
  },
  methods:{
    itemClick(){
      this.$router.push(this.path)
    }
  }
}
</script>

<style>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }


  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }

</style>
