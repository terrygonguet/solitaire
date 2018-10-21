import "./style.css"
import * as cards from "./cards.js"
import Vue from "vue/dist/vue.esm.browser"
import TableTop from "./components/TableTop.vue"

document.head.appendChild(cards.getCardsCSS(true))

let app = new Vue({
  el: "#container",
  components: {
    TableTop
  },
})
