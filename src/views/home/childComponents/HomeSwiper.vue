<template>
  <swiper>
    <swiper-item v-for="item in banners">
      <template v-slot>
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </template>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
  name: "HomeSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    banners:{
      type:Array,
      default: function (){   //注意：限制的数据类型为Array(数组)或对象时   defult的默认值必须为函数
        return []
      }
    },
  }
}

</script>

<style scoped>

</style>
