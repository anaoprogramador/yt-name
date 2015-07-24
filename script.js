(function() {
    'use strict';

    $('div.video-container').each(function() {
        var element = $(this);

        $.get(
            'http://www.youtube.com/get_video_info?video_id=' + element.attr('data-video'),
            function(response) {
                var title = getTitle(response);

                var isOpPost = element.parent('.reply').length === 0;
                var thumbnail = element.find('a img');
                var imagePosition = thumbnail.position();
                // Yay magic numbers!
                var thumbnailMargin = isOpPost ? 17 : 12;
                var spanOffset = isOpPost ? 20 : 5;
                var span = $('<span>')
                    .text(title)
                    .attr('title', title)
                    .css('position', 'absolute')
                    .css('top', imagePosition.top + 'px')
                    .css('left', imagePosition.left + spanOffset + 'px')
                    .css('width', thumbnail.width())
                    .css('white-space', 'nowrap')
                    .css('overflow', 'hidden')
                    .css('text-overflow', 'ellipsis');

                thumbnail.css('margin-top', thumbnailMargin + 'px');

                element.find('a').append(span);
            }
        );
    });

    function getTitle(data) {
        var match = RegExp('[?&]title=([^&]*)').exec(data);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }
})();
