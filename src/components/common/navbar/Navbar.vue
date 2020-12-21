<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
name: "Navbar"
}
</script>

<style scoped>
  .nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.3);
  }
  .left,.right{
    width: 60px;
    /*background-color:paleturquoise;*/
  }
  .center{
    /*占据剩余空间 打开上下两个background-color样式可以看出*/
    flex: 1;
    /*background-color: #ff8198;*/
  }

</style>
