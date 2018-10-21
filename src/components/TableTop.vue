<template>
  <div class="table-top">
    <card-deck style="grid-area: deck" @click="draw" :deck="deck"></card-deck>
    <playing-card style="grid-area: draw; justify-self: start" :card="lastDrawn" v-if="drawn.length"></playing-card>
    <goal-pile style="grid-area: pileH"></goal-pile>
    <goal-pile style="grid-area: pileD"></goal-pile>
    <goal-pile style="grid-area: pileC"></goal-pile>
    <goal-pile style="grid-area: pileS"></goal-pile>
    <card-column v-for="(col, i) in cols" :initial-cards="col" :key="i" :style="{ 'grid-area': 'col'+(i+1) }"></card-column>
  </div>
</template>

<script>
import PlayingCard from "./PlayingCard.vue"
import CardDeck from "./CardDeck.vue"
import CardColumn from "./CardColumn.vue"
import GoalPile from "./GoalPile.vue"

import * as cards from "../cards.js"

export default {
  components: {
    PlayingCard,
    CardDeck,
    CardColumn,
    GoalPile
  },
  data () {
    let data = {
      deck: new cards.Deck(),
      drawn: [],
      cols: []
    }
    data.cols = Array(7).fill([]).map((c, i) => data.deck.draw(i + 1))
    return data
  },
  computed: {
    lastDrawn () {
      return this.drawn.slice(-1)[0]
    }
  },
  methods: {
    draw () {
      if (this.deck.cards.length) {
        this.drawn.push(...this.deck.draw(1))
        this.drawn.forEach(c => (c.hidden = false))
      } else {
        this.deck.putBack(this.drawn)
        this.drawn = []
      }
    }
  },
  mounted () {
    document.querySelector(".table-top").style.minWidth = (8 * (cards.img.w / cards.img.cols)) + "px"
  },
}
</script>

<style>
.table-top {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: 1fr 3fr;
  grid-template-areas: 
    "deck draw draw draw pileH pileD pileC pileS"
    ".    col1 col2 col3 col4  col5  col6  col7";
  grid-gap: 14px;
  justify-items: center;
}
</style>
