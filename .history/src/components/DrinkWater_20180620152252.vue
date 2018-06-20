<template>
  <div class="drink-water-container">
    <h1>
      {{msg}}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'DrinkWater',
  data () {
    return {
      msg: 'You need drink WATER'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
