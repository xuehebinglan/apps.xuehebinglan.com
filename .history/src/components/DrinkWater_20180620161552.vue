<template>
  <div class="drink-water-container">
    <h1>
      {{title}}
    </h1>
    <p>每天需要喝2L的水</p>
    <p>从现在开始记录你每天的喝水数量吧！看看达没达标！</p>
    <div class="cup-capacity">
      <span>设置你的每杯水的容量：</span>
      <el-input v-model="cupCapacity" placeholder="请输入内容" class="cup-capacity-number"></el-input>
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
      cupCapacity: 80
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drink-water-container

</style>
