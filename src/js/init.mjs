// vi: ts=2 et

import { App } from './app/App.mjs'
;(function ($) {
  var app

  $(document).ready(function () {
    app = new App()
    app.init()
    app.readFromLocalStorage()
  })
})(jQuery)
