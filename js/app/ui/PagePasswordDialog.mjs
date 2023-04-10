// vi: ts=2 et

export var PagePasswordDialog = (function ($) {
  class PagePasswordDialog {
    constructor(app) {
      // app instance where this page is displayed in
      this.appInstance = app
    }

    /*
     * initialize jquery ui widgets
     */
    init() {
      var pageInstance = this

      $('#passwordregistration').JQPasswordRegistration({
        passwordDescription: $('#passwordregistration .passworddescription'),
        password: $('#passwordregistration .password'),
        passwordRepeat: $('#passwordregistration .passwordrepeat'),
      })

      $('#passwordregistration').on('passwordEntered', function (e, desc, pwd) {
        pageInstance.appInstance.addPasswordRegistration(desc, pwd)
      })
    }
  }

  return PagePasswordDialog
})(jQuery)
