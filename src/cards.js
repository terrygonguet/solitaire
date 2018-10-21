import imgurl from "./cards.gif"

let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "1"]
let suits = ["H", "D", "C", "S"]
let img = {
  w: 1053, h: 587,
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
  width: calc(1053px / ${img.cols});
  height: calc(587px / ${img.rows});
}
.card-back {
  background-position: 0px -${((img.rows - 1) / img.rows) * img.h}px;
}
.w-card {
  width: calc(1053px / ${img.cols});
}
.h-card {
  height: calc(587px / ${img.rows});
}`

  css += Card.allCards().map((c, i) => `.card-${c.value}${c.suit} {
    background-position: -${(i % values.length) * (img.w / img.cols)}px -${Math.floor(i / values.length) * (img.h / img.rows)}px;
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

  get full () {
    return this.value + this.suit
  }

  static allCards () {
    return suits.map(suit => values.map(value => new Card(value, suit))).reduce((acc, cur) => acc.concat(cur), [])
  }
}

export { values, suits, getCardsCSS, Deck, Card, img }