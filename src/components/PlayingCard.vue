<template>
  <div class="card" :class="[className]"></div>
</template>

<script>
export default {
  props: {
    card: Object
  },
  data () {
    return {
      hidden: this.card ? this.card.hidden : true
    }
  },
  computed: {
    className() {
      return this.hidden ? "card-back" : `card-${this.card.value}${this.card.suit}`
    }
  },
}
</script>