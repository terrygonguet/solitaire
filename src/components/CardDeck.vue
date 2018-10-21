<template>
  <div :class="[classes, 'relative']" @click="$emit('click')">
    <span class="absolute pin-x pin-b text-center p-2 text-black font-bold">{{ deck.cards.length }}</span>
  </div>
</template>

<script>
export default {
  props: {
    deck: Object
  },
  computed: {
    empty () {
      return this.deck.cards.length <= 0
    },
    classes () {
      if (this.empty) return "w-card h-card border-red border-2 border-dashed rounded-sm"
      else return "card card-back"
    }
  }
}
</script>
