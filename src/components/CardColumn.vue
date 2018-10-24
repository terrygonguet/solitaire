<template>
  <div class="relative w-card">
    <playing-card 
      v-for="(card, i) in cards" 
      :key="card.full" 
      :card="card" 
      :style="{ 'margin-top': (i*1.8)+'rem' }" 
      class="absolute"
      @click="$emit('click', $event)"></playing-card>
  </div>
</template>

<script>
import PlayingCard from "./PlayingCard.vue"

export default {
  props: {
    initialCards: Array
  },
  components: {
    PlayingCard
  },
  data() {
    return {
      cards: this.initialCards
    }
  }
}
</script>
