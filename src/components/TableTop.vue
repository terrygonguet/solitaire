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
            this.select(this.drawn.pop(), source)
          } else if (this.selected.source === source) {
            this.drawn.push(...this.unselect())
          }
          break;
        case 'pile':
          if (this.canPlaceOntoGoalPile(detail)) {
            this.goalPiles[detail].push(...this.unselect())
          }
          break;
        case 'column':
          if (this.canPlaceOntoColumn(detail)) {
            this.cols[detail].push(...this.unselect())
          } else if (!card.hidden && !this.hasCardsSelected) {
            let cardPos = this.cols[detail].indexOf(card)
            this.select(this.cols[detail].splice(cardPos), source, detail)
          }
          break;
      }
      if (!this.hasCardsSelected) this.cols.forEach(c => c.length && (c[c.length - 1].hidden = false))
    },
    handleMousemove (e) {
      this.selected.x = e.x - cards.img.cardw / 2
      this.selected.y = e.y + 15
    },
    canPlaceOntoGoalPile(i) {
      if (!this.hasCardsSelected) return false
      if (this.selected.cards.length > 1) return false
      let card = this.selected.cards[0]
      if (card.suit !== this.suits[i]) return false
      let pile = this.goalPiles[i]
      if (!pile.length && card.value === "1") return true
      let prevCard = pile[pile.length - 1]
      return (cards.Card.next(prevCard).equals(card))
    },
    canPlaceOntoColumn(i) {
      if (!this.hasCardsSelected) return false
      if (this.selected.source === 'column' && this.selected.detail === i) return true
      let firstSelected = this.selected.cards[0]
      let col = this.cols[i]
      if (firstSelected.value === "K") return (!col.length)
      let lastOnCol = col[col.length - 1]
      let previous = cards.Card.previous(lastOnCol)
      return (previous.value === firstSelected.value && !previous.isRed === firstSelected.isRed)
    },
    select (cards, source, detail) {
      if (!(cards instanceof Array)) cards = [cards]
      this.selected.cards.push(...cards)
      this.selected.source = source
      this.selected.detail = detail
    },
    unselect () {
      this.selected.source = null
      this.selected.detail = null
      return this.selected.cards.splice(0)
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
