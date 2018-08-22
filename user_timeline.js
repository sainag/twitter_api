var statuses = eval('(' + _REST.response.body + ')');

for (i = 0; i < statuses.length; i++) {

    var text = statuses[i].retweeted == true ? statuses[i].retweeted_status.full_text : statuses[i].full_text;

    //Remove non-ascii characters and unknown characters (emojis etc)
    //text = text.replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '');
    text = text.replace(/[^\x00-\x7F]/g,"");

    // Replace t.co URLs with their full versions.
    var urls = statuses[i].retweeted == true ? statuses[i].retweeted_status.entities.urls : statuses[i].entities.urls;
    for (var j = 0; j < urls.length; j++) {
        text = text.replace(urls[j].url, '<a href="' + urls[j].expanded_url + '">' + urls[j].url + '</a>');
    }

    // Remove media urls from full_text
    var media = statuses[i].retweeted == true ? statuses[i].retweeted_status.entities.media : statuses[i].entities.media;
    if(typeof(media) != 'undefined'){
        for (var j = 0; j < media.length; j++) {
           text = text.replace(media[j].url, '');
        }
    }

    // Replace hashtags with Twitter searches.
    var tags = statuses[i].retweeted == true ? statuses[i].retweeted_status.entities.hashtags : statuses[i].entities.hashtags;
    for (var j = 0; j < tags.length; j++) {
        text = text.replace('#' + tags[j].text, '<a href="https://twitter.com/search/%23' + tags[j].text + '">#' + tags[j].text + '</a>');
    }

    // Replace user mentions with Twitter URL links.
    var users = statuses[i].retweeted == true ? statuses[i].retweeted_status.entities.user_mentions : statuses[i].entities.user_mentions;
    for (var j = 0; j < users.length; j++) {
        text = text.replace('@' + users[j].screen_name, '<a href="https://twitter.com/' + users[j].screen_name + '">@' + users[j].screen_name + '</a>');
    }
    var profile_image_url = statuses[i].user.profile_image_url;
    var profile_image = "<img class='twitter-profile-image' src='"+profile_image_url+"' />";
    var reply_url ="<a href='https://twitter.com/intent/tweet?in_reply_to="+statuses[i].id_str+"' target='_blank'><img src='/__data/assets/file/0011/868961/twitter-reply.svg' alt='Reply' title='Reply' /></a>";
    var retweet_url ="<a href='https://twitter.com/intent/retweet?tweet_id="+statuses[i].id_str+"' target='_blank'><img src='/__data/assets/file/0004/868963/twitter-retweet.svg' alt='Retweet' title='Retweet' /></a>";
    var like_url ="<a href='https://twitter.com/intent/like?tweet_id="+statuses[i].id_str+"' target='_blank'><img src='/__data/assets/file/0012/868962/twitter-like.svg' alt='Like' title='Like' /></a>";
    var created_at = statuses[i].created_at;
    /**calculating tweet time*/
    var system_date = new Date(Date.parse(created_at));
    var user_date = new Date();
    // var K = function () {
    //   var a = navigator.userAgent;
    //   return {
    //      ie: a.match(/MSIE\s([^;]*)/)
    //  }
    // }();
    // if (K.ie) {
    //   system_date = Date.parse(created_at.replace(/( \+)/, ' UTC$1'))
    // }
    var tweet_time = "on "+system_date;
    var diff = Math.floor((user_date - system_date) / 1000);
    if (diff <= 1) {tweet_time = "just now";}
    if (diff < 20) {tweet_time = diff + " seconds ago";}
    if (diff < 40) {tweet_time = "half a minute ago";}
    if (diff < 60) {tweet_time = "less than a minute ago";}
    if (diff <= 90) {tweet_time = "one minute ago";}
    if (diff <= 3540) {tweet_time = Math.round(diff / 60) + " minutes ago";}
    if (diff <= 5400) {tweet_time = "1 hour ago";}``
    if (diff <= 86400) {tweet_time = Math.round(diff / 3600) + " hours ago";}
    if (diff <= 129600) {tweet_time = "1 day ago";}
    if (diff < 604800) {tweet_time = Math.round(diff / 86400) + " days ago";}
    if (diff <= 777600) {tweet_time = "1 week ago";}

    var tweetContent = profile_image+"<p>"+text+"</p><div class='tweet-data'>"+tweet_time+" <span class='detail'>"+reply_url+" "+retweet_url+" "+like_url+"</span></div>";
    print("<article class='twitter-item'>" +  tweetContent + "</article>");
}
