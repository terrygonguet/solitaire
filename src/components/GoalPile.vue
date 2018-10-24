<template>
  <component
    :is="lastCard ? 'playing-card' : 'div'"
    :card="lastCard"
    :class="className"
    @click="$emit('click', $event)"></component>
</template>

<script>
import PlayingCard from "./PlayingCard.vue"

export default {
  components: {
    PlayingCard
  },
  props: {
    cards: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data () {
    return { }
  },
  computed: {
    lastCard () {
      return this.cards.length ? this.cards[this.cards.length - 1] : null
    },
    className () {
      return this.cards.length ? "" : "w-card h-card border-red border-2 border-dashed rounded-sm"
    }
  }
}
</script>
