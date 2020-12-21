<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goods:Array
  }
}
</script>

<style scoped>
  .goods {
    display: flex;
    /*包裹属性 当item中存在width属性时 可以按照宽度排列行数*/
    flex-wrap: wrap;
    /*均分属性*/
    justify-content: space-evenly;
  }
</style>
