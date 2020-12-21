<template>
  <div id="tab-bar">
   <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
  #tab-bar{
    display: flex;
    background-color: #f6f6f6;
    /*将div位置移到下面*/
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    /*阴影 x,y坐标用的时左上角坐标系 y正坐标向下表示正数 因此y坐标-2表示阴影向上*/
    box-shadow: 0px -2px 1px rgba(100,100,100,0.1);

  }


</style>
