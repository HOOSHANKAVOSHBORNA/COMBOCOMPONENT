var backend;
window.onload = function()
    {
        new QWebChannel(qt.webChannelTransport, function(channel) {
            backend = channel.objects.backend;
        });
    }


$('select.dropdown').each(function() {

    var dropdown = $('<div />').addClass('dropdown selectDropdown');

    $(this).wrap(dropdown);

    var label = $('<span />').text($(this).attr('placeholder')).insertAfter($(this));
    var list = $('<ul />');

    $(this).find('option').each(function() {
        list.append($('<li />').append($('<a />').text($(this).text())));
    });

    list.insertAfter($(this));

    if($(this).find('option:selected').length) {
        label.text("Please choose");
        list.find('li:contains(' + $(this).find('option:selected').text() + ')').addClass('active');
        $(this).parent().addClass('filled');
    }

});

$(document).on('click touch', '.selectDropdown ul li a', function(e) {
    e.preventDefault();
    var dropdown = $(this).parent().parent().parent();
    var active = $(this).parent().hasClass('active');

    var txt = $(this).text()
    backend.change_Text_combo(txt, function(callback) {
        result = callback;
    });


    var label = active ? dropdown.find('select').attr('placeholder') : $(this).text();





    dropdown.find('option').prop('selected', false);
    dropdown.find('ul li').removeClass('active');


    dropdown.toggleClass('filled', !active);
    dropdown.children('span').text(label);

    if(!active) {
        dropdown.find('option:contains(' + $(this).text() + ')').prop('selected', true);

        $(this).parent().addClass('active');




    }
    else {

        txt = "none"
            backend.change_Text_combo(txt, function(callback) {
                result = callback;
            });
    }

    dropdown.removeClass('open');

});

$('.dropdown > span').on('click touch', function(e) {

    var self = $(this).parent();
    self.toggleClass('open');

});

$(document).on('click touch', function(e) {
    var dropdown = $('.dropdown');
    if(dropdown !== e.target && !dropdown.has(e.target).length) {

        dropdown.removeClass('open');

    }
});

// light
$('.switch input').on('change', function(e) {
    backend.change_color_switch("#de6262", function(callback) {
        result = callback;
    });
    $('.dropdown, body').toggleClass('light', $(this).is(':checked'));
});
