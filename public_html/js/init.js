(
    function($) {
        var app;
        
        $(document).ready(
            function() {
                app = new App();
                app.init();
                app.readFromLocalStorage();
            }
        );
    }(jQuery)
);
