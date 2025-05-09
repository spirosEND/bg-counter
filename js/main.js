/* ------------------------------------------------------------------------------
 This is jquery module for main page
 ------------------------------------------------------------------------------ */

/*global jQuery */
jQuery(function ($) {
  'use strict';

  // Function to get the last day of June
  const getLastDayOfJune = () => {
    const currentYear = new Date().getFullYear();
    return new Date(currentYear, 5, 30, 23, 59, 59); // Month is 0-based, so 5 is June
  };

  // Function to get or set the target date in localStorage
  const getTargetDate = () => {
    const storedDate = localStorage.getItem('countdownTargetDate');
    if (storedDate) {
      const parsedDate = new Date(storedDate);
      // If the stored date is in the past, set a new target date for next year
      if (parsedDate < new Date()) {
        const newDate = getLastDayOfJune();
        localStorage.setItem('countdownTargetDate', newDate.toISOString());
        return newDate;
      }
      return parsedDate;
    }
    // If no stored date, set and return the last day of June
    const targetDate = getLastDayOfJune();
    localStorage.setItem('countdownTargetDate', targetDate.toISOString());
    return targetDate;
  };

  var App = {
    $options: {},
    $loader: $(".loader"),
    $animationload: $(".animationload"),
    $countdown: $('#countdown_dashboard'),

    bindEvents: function() {
      $(window).on('load', this.load.bind(this));
      $(document).on('ready', this.docReady.bind(this));
    },
    
    load: function() {
      /* ==============================================
      1.Page Preloader
      =============================================== */
      this.$loader.delay(300).fadeOut();
      this.$animationload.delay(600).fadeOut("slow");
    },
    
    docReady: function() {
      /* -----------------------------------------------------------------------
        Countdown
        ----------------------------------------------------------------------- */
        const targetDate = getTargetDate();
        
        this.$countdown.countDown({
          targetDate: {
            'day':    targetDate.getDate(),
            'month':  targetDate.getMonth() + 1, // JavaScript months are 0-based
            'year':   targetDate.getFullYear(),
            'hour':   targetDate.getHours(),
            'min':    targetDate.getMinutes(),
            'sec':    targetDate.getSeconds()
          },
          omitWeeks: true
        });
    },

    init: function (_options) {
      $.extend(this.$options, _options);
      this.bindEvents();
    }
  }

  // Initialize the app
  App.init();

  // Set current year in copyright
  document.getElementById('currentYear').textContent = new Date().getFullYear();
}); 