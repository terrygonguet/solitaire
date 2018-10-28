<template>
  <div :class="[className, 'card']" @click="$emit('click', card)"></div>
</template>

<script>
export default {
  props: {
    card: Object
  },
  computed: {
    className() {
      return (this.card && !this.card.hidden) ? `card-${this.card.value}${this.card.suit}` : "card-back"
    }
  },
}
</script>