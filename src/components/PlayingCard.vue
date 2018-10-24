<template>
  <div class="card" :class="[className]" @click="$emit('click', card)"></div>
</template>

<script>
export default {
  props: {
    card: Object
  },
  computed: {
    className() {
      return this.card.hidden ? "card-back" : `card-${this.card.value}${this.card.suit}`
    }
  },
}
</script>