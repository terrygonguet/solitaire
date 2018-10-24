<template>
  <div class="h-screen w-screen flex justify-center items-center flex-col overflow-hidden" @mousemove="handleMousemove">
    <div class="table-top">
      <card-deck 
        style="grid-area: deck" 
        @click="handleClick(null, 'deck')" 
        :deck="deck"></card-deck>
      <component
        :is="drawn.length ? 'playing-card' : 'div'"
        style="grid-area: draw; justify-self: start" 
        :card="lastDrawn" 
        :class="drawn.length ? '' : 'w-card h-card border-2 border-red border-dashed rounded-sm'"
        @click="handleClick($event, 'draw')"></component>
      <goal-pile
        v-for="(suit, i) in suits"
        :key="suit"
        :style="{ 'grid-area': 'pile'+suit }"
        @click="handleClick($event, 'pile', i)"
        :cards="goalPiles[i]"></goal-pile>
      <card-column 
        v-for="(col, i) in cols" 
        :key="i" 
        :initial-cards="col" 
        :style="{ 'grid-area': 'col'+(i+1) }"
        @click="handleClick($event, 'column', i)"></card-column>
    </div>
    <card-column 
      :style="{ position: 'absolute', top: selected.y+'px', left: selected.x+'px' }" 
      :initial-cards="selected.cards"></card-column>
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
    let deck = new cards.Deck()
    let cols = Array(7).fill().map((c, i) => deck.draw(i + 1))
    cols.forEach(c => c[c.length - 1].hidden = false)
    return {
      deck,
      cols,
      drawn: [],
      goalPiles: [[], [], [], []],
      suits: cards.suits,
      selected: {
        cards: [],
        x: 0,
        y: 0,
        source: null,
        detail: null
      }
    }
  },
  computed: {
    lastDrawn () {
      return this.drawn.slice(-1)[0]
    },
    hasCardsSelected () {
      return !!this.selected.cards.length
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
    },
    handleClick (card, source, detail) {
      console.log(card && card.full, source, detail);
      switch (source) {
        case 'deck':
          if (!this.hasCardsSelected) {
            this.draw()
          }
          break;
        case 'draw':
          if (!this.hasCardsSelected) {
            this.selected.cards.push(this.drawn.pop())
            this.selected.source = source
          } else if (this.selected.source === source) {
            this.drawn.push(this.selected.cards.pop())
            this.selected.source = null
          }
          break;
        case 'pile':
          if (this.hasCardsSelected) {
            this.goalPiles[detail].push(this.selected.cards.pop())
            this.selected.source = null
          }
          break;
        case 'column':
          if (!card.hidden) {
            this.selected.cards.push(this.cols[detail].pop())
            this.selected.source = source
          }
          break;
      }
    },
    handleMousemove (e) {
      this.selected.x = e.x - cards.img.cardw / 2
      this.selected.y = e.y + 15
    }
  },
  mounted () {
    document.querySelector(".table-top").style.minWidth = (8 * (cards.img.w / cards.img.cols)) + "px"
    console.log(this)
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
