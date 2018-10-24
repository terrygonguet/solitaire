import imgurl from "./cards.gif"

let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "1"]
let suits = ["H", "D", "C", "S"]
let img = {
  w: 1053, h: 587,
  cardw: 1053 / 13,
  cardh: 587 / 5,
  cols: 13, rows: 5,
  url: imgurl
}

/**
 * Returns the css classes for the cards
 * @param {Bool} asElement if true, return a <style> element
 */
function getCardsCSS (asElement = false) {
  let css = `.card {
  background-image: url('${img.url}');
  width: ${img.cardw}px;
  height: ${img.cardh}px;
}
.card-back {
  background-position: 0px -${img.h - img.cardh}px;
}
.w-card {
  width: ${img.cardw}px;
}
.h-card {
  height: ${img.cardh}px;
}`

  css += Card.allCards().map((c, i) => `.card-${c.value}${c.suit} {
    background-position: -${(i % values.length) * img.cardw}px -${Math.floor(i / values.length) * img.cardh}px;
  }`).reduce((acc, cur) => acc + cur, [])

  if (asElement) {
    let el = document.createElement('style')
    el.innerHTML += css
    return el
  } else return css
}

class Deck {

  constructor (source, shuffled = true) {
    this.cards = source || Card.allCards()
    if (shuffled) this.shuffle()
  }

  shuffle () {
    this.cards.sort(() => 0.5 - Math.random())
  }

  draw (number = 1) {
    return this.cards.splice(0, number)
  }

  putBack (cards, onTop = false, hide = true) {
    if (onTop) this.cards.unshift(...cards)
    else this.cards.push(...cards)
    if (hide) cards.forEach(c => (c.hidden = true))
  }

}

class Card {

  constructor (value, suit, hidden = true) {
    this.value = value
    this.suit = suit
    this.hidden = hidden
  }

  static allCards () {
    return suits.map(suit => values.map(value => new Card(value, suit))).reduce((acc, cur) => acc.concat(cur), [])
  }

  static next (card) {
    if (card.value === "1") return new Card("2", card.suit)
    else {
      let valueindex = values.indexOf(card.value)
      return new Card(values[++valueindex], card.suit)
    }
  }

  get full () {
    return this.value + this.suit
  }

  get isRed () {
    return ["H", "D"].includes(this.suit)
  }

  get isBlack () {
    return !this.isRed
  }

  equals (other, includeHidden = false) {
    return this.full === other.full && (this.hidden === other.hidden || !includeHidden)
  }
}

export { values, suits, getCardsCSS, Deck, Card, img }