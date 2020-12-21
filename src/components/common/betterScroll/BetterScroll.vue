<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "BetterScroll",
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default: false
    }
  },
  data:function (){
    return{
      bscroll:null
    }
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
    })

    this.bscroll.on('scroll',(postion) => {
      // console.log(postion);
      this.$emit('scroll',postion)
    })
    this.bscroll.on('pullingUp',() => {
      // console.log('上拉加载更多');
      this.$emit('pullingUp')
    })
  },
  methods:{
    //滚动组件滚动到指定位置
    ScrollTo(x,y,time=500){
      this.bscroll.scrollTo(x,y,time)
    },
    finishPullingUp(){
      this.bscroll.finishPullUp()
    }
  }
}
</script>

<style scoped>

</style>
