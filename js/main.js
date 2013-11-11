/**
 * Created by LeoDT on 13-11-11.
 */
(function(){
    var panes = $('.pane'),
        tabs = $('.tab'),
        change_tab = function(){
            var hash = location.hash;
            panes.removeClass('show');
            panes.filter(hash).addClass('show');
            tabs.removeClass('active');
            tabs.filter('a[href="' + hash + '"]').addClass('active');
        };

    $(window).on('hashchange', function(e){
        change_tab();
    });
    change_tab();
})();