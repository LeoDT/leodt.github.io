/**
 * Created by LeoDT on 13-11-11.
 */
(function(){
    var panes = $('.pane'),
        tabs = $('.tab'),
        skills = $('.skill'),
        links = $('.link'),
        last_hash,
        slide_in = function(hash){
            panes.filter(hash).addClass('show');
            setTimeout(function(){
                panes.filter(hash).addClass('in');
            }, 10); // 10 ms for firefox
        },
        trans_out = {
            'home': function(next, hash){
                panes.removeClass('in');
                setTimeout(function(){
                    panes.removeClass('show');
                    next(hash);
                }, 300);
            },
            'about': function(next, hash){
                panes.removeClass('in');
                setTimeout(function(){
                    panes.removeClass('show');
                    next(hash);
                }, 300);
            },
            'skills': function(next, hash){
                skills.each(function(i, el){
                    el = $(el);
                    setTimeout(function(){
                        el.removeClass('in');

                        if(i + 1 == skills.length){
                            setTimeout(function(){
                                panes.removeClass('show');
                                skills.find('.bar-inner').attr('style', '');
                                next(hash);
                            }, 120);
                        }
                    }, i*120 + 10);
                });
            },
            'links': function(next, hash){
                links.each(function(i, el){
                    el = $(el);
                    setTimeout(function(){
                        el.removeClass('in');

                        if(i + 1 == links.length){
                            setTimeout(function(){
                                panes.removeClass('show');
                                next(hash);
                            }, 120);
                        }
                    }, i*120 + 10);
                });
            }
        },
        trans_in = {
            'home': slide_in,
            'about': slide_in,
            'skills': function(hash, first){
                if(first){
                    first();
                }

                panes.filter(hash).addClass('show');

                skills.each(function(i, el){
                    el = $(el);
                    setTimeout(function(){
                        el.addClass('in');
                        setTimeout(function(){
                            el.find('.bar-inner').attr('style', el.find('.bar-inner').data('transition'));
                        }, i*50);
                    }, i*120 + 10);
                });
            },
            'links': function(hash, first){
                if(first){
                    first();
                }

                panes.filter(hash).addClass('show');

                links.each(function(i, el){
                    el = $(el);
                    setTimeout(function(){
                        el.addClass('in');
                    }, i*120 + 10);
                });
            }
        },
        change_tab = function(){
            var hash = location.hash;
            if(!hash){
                hash = '#home';
            }

            if(last_hash){
                trans_out[last_hash.slice(1)](trans_in[hash.slice(1)], hash);
            }
            else{
                trans_in[hash.slice(1)](hash);
            }

            tabs.removeClass('active');
            tabs.filter('a[href="' + hash + '"]').addClass('active');

            last_hash = hash;
        };

    skills.on('mouseenter', function(e){
        var target = $(e.currentTarget).find('.extra, .arrow'),
            extra = target.filter('.extra');

        target.show();
        extra.css('margin-left', -extra.width() / 2);
        setTimeout(function(){
            target.addClass('in');
        }, 0);
    }).on('mouseleave', function(e){
        var target = $(e.currentTarget).find('.extra, .arrow');

        target.removeClass('in');
        setTimeout(function(){
            target.hide();
        }, 300);
    });

    $(window).on('hashchange', function(e){
        change_tab();
    });
    change_tab();
})();