<template>
  <div id="home">
    <navbar class="home-nav">
      <template v-slot:center><span>购物街</span></template>
    </navbar>
    <better-scroll class="content"
                   ref="betterscroll"
                   :probe-type="3"
                   :pull-up-load="true"
                   @scroll="scroll"
                   @pullingUp="pullingUp">
        <home-swiper :banners="banners"></home-swiper>
        <home-recomend :recommends="recommends"></home-recomend>
        <home-feature-view></home-feature-view>
        <tab-control :titles="titles" class="tab-control" @tabClick="tabClick"></tab-control>
        <goods-list :goods="getCurrentGoods"></goods-list>
    </better-scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import Navbar from "components/common/navbar/Navbar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BetterScroll from "components/common/betterScroll/BetterScroll";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComponents/HomeSwiper";
import HomeRecomend from "./childComponents/HomeRecommend";
import HomeFeatureView from "./childComponents/HomeFeatureView";

import {getHomeMultidata,getHomeGoods} from "network/home";



export default {
  name: "Home",
  components:{
    Navbar,
    HomeSwiper,
    HomeRecomend,
    HomeFeatureView,
    TabControl,
    GoodsList,
    BetterScroll,
    BackTop
  },
  data:function (){
    return {
      //轮播图数据
      banners:[],
      recommends:[],
      titles:["流行","新款","精选"],
      goods:{
        'pop' :{page:0,list:[]},
        'new' :{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentTag:'pop',
      isShowBackTop:false,
    }
  },

  created() {
    //请求轮播图、推荐数据
    this.getHomeMultidata()
    //获取商品详细信息数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods:{
    /**
     * 网络请求相关方法
     * */
    getHomeMultidata(){
      getHomeMultidata()
        .then((res)=>{
          //console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
        .catch((err)=>{
          console.log(err);
        })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page)
        .then(res =>{
          //console.log(res);
          //请求到的数据存放到对应的对象中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page = page
          //刷新下拉加载
          this.$refs.betterscroll.finishPullingUp()
        })
        .catch(err => {
          console.log(err);
        })
    },

    /**
     * 事件监听方法
     * */
    //组件tab点击按钮
    tabClick(index){
      console.log(index)
      switch (index){
        case 0:
          this.currentTag = 'pop'
          break
        case 1:
          this.currentTag = 'new'
          break
        case 2:
          this.currentTag = 'sell'
          break
      }
    },
    //回到顶部事件监听
    backTopClick(){
      this.$refs.betterscroll.ScrollTo(0,0)
    },
    //组件滑动位置监听
    scroll(position){
      // console.log(position.y);
      this.isShowBackTop = -position.y > 800
    },
    //组件上拉加载更多
    pullingUp(){
      console.log('上拉加载更多');
      this.getHomeGoods(this.currentTag)
      //重新计算下拉区域高度
      this.$refs.betterscroll.bscroll.refresh()
    }
  },
  computed:{
    getCurrentGoods:function (){
      return this.goods[this.currentTag].list
    }
  }

}
</script>

<style scoped>
  .home-nav{
    background-color: var(--color-tint);
    color: white;

    /*位置固定 不随着页面而滑动*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 100;
  }

/*  因为导航栏在页面位置固定 因此整体布局要下拉一个导航栏的高度*/
  #home {
    padding-top: 44px;
    /*设置100%适应窗口高度*/
    height: 100vh;
    position: relative;
  }

  /*设置属性 使组件滑动到某一位置时 停止滚动*/
  .tab-control{
    position: sticky;
    top:44px;
    z-index: 100;
  }

/* 计算滚动区域高度 方案一  动态计算方法*/
/*  .content{*/
/*    height: calc(100% - 93px);*/
/*    overflow: hidden;*/
/*    margin-top: 51px;*/
/*  }*/

  /* 计算滚动区域高度 方案二  绝对定位*/
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    background-color: #fff;
  }


</style>
