<template>
  <div class="card" :class="[{ 'card-back': hidden }, className]" @click="toggle"></div>
</template>

<script>
export default {
  props: {
    card: Object
  },
  data () {
    return {
      hidden: this.card.hidden
    }
  },
  computed: {
    className() {
      return this.hidden ? "" : `card-${this.card.value}${this.card.suit}`
    }
  },
  methods: {
    toggle() {
      this.hidden = !this.hidden
    }
  }
}
</script>