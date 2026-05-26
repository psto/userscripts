// ==UserScript==
// @name         Rapidgator Download Ready Notifier
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @author       Piotr Stojanow (https://github.com/psto/)
// @license      MIT
// @description  Notifies when Rapidgator countdown reaches zero
// @match        https://rapidgator.net/file/*
// @grant        GM_notification
// ==/UserScript==

(function () {
  'use strict'

  function sendNotification() {
    GM_notification({
      title: 'Rapidgator - File Ready',
      text: 'Your download is ready!',
      timeout: 10000,
    })
  }

  function startTimer() {
    const secondsEl = document.querySelector('.seconds')
    if (!secondsEl) {
      setTimeout(startTimer, 500)
      return
    }

    const initialSeconds = Number.parseInt(secondsEl.textContent, 10)
    if (Number.isNaN(initialSeconds) || initialSeconds <= 0) {
      return
    }

    setTimeout(() => {
      sendNotification()
    }, initialSeconds * 1000)
  }

  startTimer()
})()
