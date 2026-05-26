// ==UserScript==
// @name         Nitroflare Download Ready Notifier
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @author       Piotr Stojanow (https://github.com/psto/)
// @license      MIT
// @description  Notifies when Nitroflare countdown reaches zero
// @match        https://nitroflare.com/*
// @grant        GM_notification
// ==/UserScript==

(function () {
  'use strict'

  function sendNotification() {
    GM_notification({
      title: 'Nitroflare - File Ready',
      text: 'Your download is ready!',
      onclick: () => {
        window.focus()
      },
      timeout: 10000,
    })
  }

  function startTimer() {
    // Select the spans inside the specific Nitroflare timer divs
    const minEl = document.querySelector('.textDiv_Minutes span')
    const secEl = document.querySelector('.textDiv_Seconds span')

    // If the elements aren't there yet, wait and try again
    if (!minEl || !secEl) {
      setTimeout(startTimer, 500)
      return
    }

    const minutes = Number.parseInt(minEl.textContent, 10) || 0
    const seconds = Number.parseInt(secEl.textContent, 10) || 0

    const totalMilliseconds = (minutes * 60 + seconds) * 1000

    // Only start if there is actually a countdown running
    if (totalMilliseconds > 0) {
      console.log(`Notification set for ${minutes}m ${seconds}s from now.`)
      setTimeout(() => {
        sendNotification()
      }, totalMilliseconds)
    }
  }

  // Nitroflare sometimes loads the timer via AJAX/JS after the initial page load
  // so we call the function to begin the check.
  startTimer()
})()
