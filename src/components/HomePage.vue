<template>
  <div class="home-page-container">
    <h1>
      My Apps
    </h1>
    this is homepage.
    <div>
      <router-link to="/drink-water">喝水吧</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.home-page-container
  color red
</style>
