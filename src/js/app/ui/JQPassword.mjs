// vi: ts=2 et

;(function ($) {
  $.fn.JQPassword = function (sub, options) {
    if (!sub) sub = 'init'

    switch (sub) {
      case 'init':
        return init.call(this, options.skeleton)

      case 'description':
        return setDescription.call(this, options.value)

      case 'score':
        return setScore.call(this, options.value)
      case 'fee':
        return setFee.call(this, options.value)
      case 'level':
        return setLevel.call(this, options.value)
      case 'status':
        return setStatus.call(this, options.value)
      case 'lockprogressinpercent':
        return setLockProgressInPercent.call(this, options.value)
    }
  }

  var init = function (skeleton) {
    var skel =
      '    <div class="password">\
                                <span class="passworddescription"></span><br/>\
                                <span class="passwordscore"></span> P (Lvl: <span class="passwordlevel"></span> Fee: <span class="passwordfee"></span> Status: <span class="passwordstatus"></span>)\
                            </div>'

    if (skeleton) skel = skeleton

    return this.append(skel)
  }

  var setDescription = function (value) {
    return this.find('.passworddescription').text(value)
  }

  var setScore = function (value) {
    return this.find('.passwordscore').text(value)
  }

  var setFee = function (value) {
    return this.find('.passwordfee').text(value)
  }

  var setLevel = function (value) {
    return this.find('.passwordlevel').text(value)
  }

  var setStatus = function (value) {
    return this.find('.passwordstatus').text(value)
  }

  var setLockProgressInPercent = function (value) {
    return this.find('.passwordlockprogressbar').css('width', value + '%')
  }
})(jQuery)
