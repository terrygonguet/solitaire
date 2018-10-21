<template>
  <div class="relative w-card">
    <playing-card v-for="(card, i) in cards" :key="card.full" :card="card" :style="{ 'margin-top': (i*1.8)+'rem' }" class="absolute"></playing-card>
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
    let data = {
      cards: this.initialCards
    }
    data.cards[data.cards.length - 1].hidden = false
    return data
  }
}
</script>
