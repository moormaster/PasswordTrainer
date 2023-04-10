// vi: ts=2 et

import { LeveledScoreFormatter } from './LeveledScoreFormatter.mjs'
import { LeveledScore } from '../model/LeveledScore.mjs'
import '../ui/JQPassword.mjs'

export var PageManagePasswords = (function ($) {
  var updateTable = function (tableSelector, passwordRegistrations) {
    var tableLineSkeleton =
      '<tr class="password">\
                        <td class="passworddescription"></td>\
                        <td>\
                                <span class="passwordscore"></span> / <span class="passwordlevel"></span>\
                        </td>\
                        <td style="background-color: lightgrey">\
                            <span class="passwordlockprogressbar passwordstatus" style="background-color: white; display: block; white-space: nowrap"/>\
                        </td>\
                    </tr>'

    tableSelector.find('.password').remove()

    if (!passwordRegistrations) return

    var passwordRegistrationsMap = passwordRegistrations.getAll()
    for (var desc in passwordRegistrationsMap) {
      var passwordRegistration = passwordRegistrationsMap[desc]

      var formatter = new LeveledScoreFormatter()
      var leveledScore = new LeveledScore(passwordRegistration.scoreData)

      tableSelector.JQPassword('init', { skeleton: tableLineSkeleton })
      var passwordSelector = tableSelector.find('.password:last')

      passwordSelector.JQPassword('description', { value: desc })
      passwordSelector.JQPassword('score', { value: formatter.formatScore(leveledScore) })
      passwordSelector.JQPassword('level', { value: formatter.formatLevel(leveledScore) })
      passwordSelector.JQPassword('status', { value: formatter.formatStatus(leveledScore) })
      passwordSelector.JQPassword('lockprogressinpercent', {
        value: 100 * (1 - leveledScore.lockHoursLeft / leveledScore.lockHours),
      })
    }
  }

  class PageManagePasswords {
    constructor(app) {
      // app instance where this page is displayed in
      this.appInstance = app
    }

    /*
     * initialize jquery ui widgets
     */
    init() {
      var pageInstance = this

      this.tableSelector = $('#pageManagePasswords .passwordTable')

      $('#pageManagePasswords').on('pageshow', function (e) {
        pageInstance.update()
      })
    }

    /*
     * update page display
     */
    update() {
      updateTable(this.tableSelector, this.appInstance.applicationModel.passwordRegistrations)
    }
  }

  return PageManagePasswords
})(jQuery)
