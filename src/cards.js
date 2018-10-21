import imgurl from "./cards.gif"

let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "1"]
let suits = ["H", "D", "C", "S"]
let img = {
  w: 1053, h: 587,
  cols: 13, rows: 5,
  url: imgurl
}

function allCards () {
  return suits.map(suit => values.map(value => ({ value, suit }))).reduce((acc, cur) => acc.concat(cur), [])
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
h-card {
  height: calc(587px / ${img.rows});
}`

  css += allCards().map((c, i) => `.card-${c.value}${c.suit} {
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
    this.cards = source || allCards()
    if (this.shuffled) this.shuffle()
  }

  shuffle () {
    this.cards.sort(() => 0.5 - Math.random())
  }

  draw (number = 1) {
    return this.cards.splice(0, number)
  }

}

export { values, suits, getCardsCSS, allCards, Deck, img }