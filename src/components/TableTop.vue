<template>
  <div class="table-top">
    <card-deck style="grid-area: deck"></card-deck>
    <div style="grid-area: draw; justify-self: start" class="relative h-card">
      <div class="card card-7S absolute ml-0"></div>
      <div class="card card-KC absolute ml-6"></div>
      <div class="card card-10H absolute ml-12"></div>
    </div>
    <goal-pile style="grid-area: pileH"></goal-pile>
    <goal-pile style="grid-area: pileD"></goal-pile>
    <goal-pile style="grid-area: pileC"></goal-pile>
    <goal-pile style="grid-area: pileS"></goal-pile>
    <card-column style="grid-area: col1"></card-column>
    <card-column style="grid-area: col2"></card-column>
    <card-column style="grid-area: col3"></card-column>
    <card-column style="grid-area: col4"></card-column>
    <card-column style="grid-area: col5"></card-column>
    <card-column style="grid-area: col6"></card-column>
    <card-column style="grid-area: col7"></card-column>
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
    return { }
  },
  mounted () {
    document.querySelector(".table-top").style.minWidth = (8 * (cards.img.w / cards.img.cols)) + "px"
  }
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
