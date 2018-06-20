<template>
  <div class="drink-water-container">
    <h1>
      {{title}}
    </h1>
    <p>每天需要喝2L的水</p>
    <p>从现在开始记录你每天的喝水数量吧！看看达没达标！</p>
    <div class="user-name">
      <span>请输入你的用户名：</span>
      <i-input v-model="userName" placeholder="请输入user name" class="user-name-content">
      <!-- <el-input v-model="userName" placeholder="请输入user name" class="user-name-content" prefix-icon="el-icon-tickets"></el-input> -->
    </div>
    <div class="cup-capacity">
      <span>设置你的每杯水的容量：</span>
      <!-- <el-input v-model="cupCapacity" placeholder="请输入内容" class="cup-capacity-number" prefix-icon="el-icon-edit"></el-input> -->
      <span>ML</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DrinkWater',
  data () {
    return {
      title: 'You need drink WATER!',
      cupCapacity: 80,
      userName: 'xjw'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.drink-water-container
  .cup-capacity
    .cup-capacity-number
      width 100px
  .user-name
    .user-name-content
      width 100px
</style>
