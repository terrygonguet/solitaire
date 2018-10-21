<template>
  <div class="column w-card">
    <div v-for="(card, i) in cards" :key="i" class="card card-back card-column" :class="['mt-'+i*4]"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cards: Array(7).fill(0)
    }
  }
}
</script>

<style>
.card-column {
  position: absolute;
}

.column {
  position: relative;
}
</style>
