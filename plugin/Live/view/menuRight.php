<?php
$obj = AVideoPlugin::getDataObject("Live");

$buttonTitle = $this->getButtonTitle();
$obj = $this->getDataObject();
$isLive = isLive();
$liveInfo = Live::getInfo($isLive['key'], $isLive['live_servers_id']);
if (User::canStream()) {
    if (empty($obj->doNotShowGoLiveButton)) {
        ?>
        <li>
            <a id="TopCopyKeysButton" href="<?php echo "{$global['webSiteRootURL']}plugin/Live"; ?>" class="faa-parent animated-hover btn btn-danger navbar-btn" 
               data-toggle="tooltip" title="<?php echo __("Broadcast a Live Stream"); ?>" 
               data-placement="bottom" >
                <i class="fa fa-circle faa-flash"></i> <span class="hidden-md hidden-sm hidden-mdx"><?php echo __($buttonTitle); ?></span>
            </a>
        </li>
        <?php
    }
    if (empty($obj->hideTopCopyKeysButton)) {
        ?>
        <li>
            <button id="TopCopyKeysButton" onclick="copyToClipboard('<?php echo Live::getRTMPLink(User::getId()); ?>')" class="faa-parent animated-hover btn btn-primary navbar-btn" data-toggle="tooltip" title="<?php echo __($obj->topCopyKeysButtonTitle); ?>" data-placement="bottom" >
                <i class="far fa-copy faa-ring"></i> <span class="hidden-md hidden-sm hidden-mdx"><?php echo __($obj->topCopyKeysButtonTitle); ?></span>
            </button>
        </li>
        <?php
    }
}
?>
<style>
    .liveVideo{
        position: relative;
    }
    .liveVideo .liveNow, .liveVideo .liveFuture{
        position: absolute;
        bottom: 5px;
        right: 5px;
    }
    #availableLiveStream{
        width: 350px;
        overflow: hidden;
        max-height: 75vh;
        overflow-y: auto;
    }
    #availableLiveStream li a div{
        overflow: hidden;
    }

    <?php
    if (!empty($obj->hideTopButton)) {
        ?>
        #TopLiveNotificationButton{
            display: none !important;
        }
        <?php
    }
    ?>
</style>
<li class="dropdown" id="TopLiveNotificationButton" onclick="setTimeout(function () {
                lazyImage();
            }, 500);
            setTimeout(function () {
                lazyImage();
            }, 1000);
            setTimeout(function () {
                lazyImage();
            }, 1500);">
    <a href="#" class="faa-parent animated-hover btn btn-default navbar-btn" data-toggle="dropdown">
        <span class="fas fa-bell faa-ring"></span>
        <span class="badge onlineApplications" style=" background: rgba(255,0,0,1); color: #FFF;">0</span>
        <b class="caret"></b>
    </a>
    <ul class="dropdown-menu dropdown-menu-right notify-drop" >
        <?php
        if (Live::canStreamWithWebRTC() || Live::canScheduleLive()) {
            ?>
            <div class="btn-group btn-group-justified" style="padding: 5px;">
                <?php
                if (Live::canStreamWithWebRTC()) {
                    ?>
                    <button class="btn btn-default btn-sm faa-parent animated-hover " onclick="avideoModalIframeFull(webSiteRootURL + 'plugin/Live/webcamFullscreen.php');" data-toggle="tooltip" title="<?php echo __('Go Live') ?>" >
                        <i class="fas fa-circle faa-flash" style="color:red;"></i> <span class="hidden-sm hidden-xs"><?php echo __($buttonTitle); ?></span>
                    </button>
                    <?php
                }
                if (Live::canScheduleLive()) {
                    ?>
                    <button class="btn btn-primary btn-sm" onclick="avideoModalIframeFull(webSiteRootURL + 'plugin/Live/view/Live_schedule/panelIndex.php');" data-toggle="tooltip" title="<?php echo __('Schedule') ?>" >
                        <i class="far fa-calendar"></i> <span class="hidden-sm hidden-xs"><?php echo __('Schedule'); ?></span>
                    </button>
                <?php }
                ?>
            </div>
        <?php }
        ?>
        <div id="availableLiveStream">

        </div>
    </ul>
</li>

<div class="col-lg-12 col-sm-12 col-xs-12 bottom-border hidden extraVideosModel liveVideo">
    <a href="" class="videoLink" class="videoLink galleryLink " >
        <div class="aspectRatio16_9" style="min-height: 70px;" >
            <img src="<?php echo getURL('videos/userPhoto/logo.png'); ?>" class="thumbsJPG img-responsive" height="130" itemprop="thumbnailUrl" alt="Logo" />
            <img src="" style="position: absolute; top: 0; display: none;" class="thumbsGIF img-responsive" height="130" />
            <span class="label label-danger liveNow faa-flash faa-slow animated"><?php echo __("LIVE NOW"); ?></span>
        </div>
    </a>

    <a class="h6 galleryLink " href="_link_" >
        <strong class="title liveTitle"><?php echo __("Title"); ?></strong>
    </a>
    <div class="galeryDetails" style="overflow: hidden;">
        <div>
            <img src="" class="photoImg img img-circle img-responsive" style="max-width: 20px;">
        </div>
        <div class="liveUser"><?php echo __("User"); ?></div>        
        <div class="galleryTags">
            <?php
            if (AVideoPlugin::isEnabledByName("LiveUsers") && method_exists("LiveUsers", "getLabels")) {
                echo LiveUsers::getLabels('extraVideosModelOnLineLabels');
            }
            ?>
        </div>
    </div>
</div>

<script>
    async function refreshGetLiveImage(selector) {
        $(selector).find('.thumbsImage img').each(function (index) {
            var src = $(this).attr('src');
            src = addGetParam(src, 'cache', Math.random());
            $(this).attr('src', src);
        });
        setTimeout(function () {
            $(selector).slideDown();
        }, 1000); // give some time to load the new images
    }

    var _processLiveStats_processingNow = 0;
    async function processLiveStats(response) {
        if (_processLiveStats_processingNow) {
            return false;
        }
        _processLiveStats_processingNow = 1;
        setTimeout(function () {
            _processLiveStats_processingNow = 0;
        }, 200);
        if (typeof response !== 'undefined') {
            if (isArray(response)) {
                for (var i in response) {
                    if (typeof response[i] !== 'object') {
                        continue;
                    }
                    //console.log('processLiveStats is array', response[i]);
                    processApplicationLive(response[i]);
                }
            } else {
                //console.log('processLiveStats not array', response);
                processApplicationLive(response);
            }
            if (!response.countLiveStream) {
                availableLiveStreamNotFound();
            } else {
                $('#availableLiveStream').removeClass('notfound');
            }
            $('.onlineApplications').text($('#availableLiveStream > div').length);
        }

        setTimeout(function () {
<?php
if (!empty($obj->playLiveInFullScreenOnIframe)) {
    echo 'if (typeof linksToFullscreen === \'function\') {linksToFullscreen(\'.liveVideo a, #availableLiveStream a\');}';
} elseif (!empty($obj->playLiveInFullScreen)) {
    echo 'if (typeof linksToEmbed === \'function\') {linksToEmbed(\'.liveVideo a, #availableLiveStream a\');}';
}
?>
        }, 200);
    }

    function getStatsMenu(recurrentCall) {
        if (avideoSocketIsActive()) {
            return false;
        }
        availableLiveStreamIsLoading();
        $.ajax({
            url: webSiteRootURL + 'plugin/Live/stats.json.php?Menu',
            success: function (response) {
                //console.log('getStatsMenu processLiveStats', response);
                processLiveStats(response);
                if (avideoSocketIsActive()) {
                    //console.log('getStatsMenu: Socket is enabled we will not process ajax result');
                    return false;
                }
                if (recurrentCall) {
                    var timeOut = <?php echo $obj->requestStatsInterval * 1000; ?>;
                    setTimeout(function () {
                        getStatsMenu(true);
                    }, timeOut);
                }
            }
        });
    }

    async function processApplicationLive(response) {
        if (typeof response.applications !== 'undefined') {
            var applications = response.applications;
            response.applications = [];
            for (let key in applications) {
                if (applications[key].hasOwnProperty('html')) {
                    response.applications.push(applications[key]);
                }
            }

            if (typeof onlineLabelOnline == 'function' && response.applications.length) {
                //console.log('processApplicationLive 1', response.applications, response.applications.length);
                for (i = 0; i < response.applications.length; i++) {
                    //console.log('processApplicationLive 1 title', response.applications[i].title);
                    if (!empty(response.applications[i].expires) && response.applications[i].expires < _serverTime) {
                        return false;
                    }
                    processApplication(response.applications[i]);
                    if (!response.applications[i].comingsoon) {
                        if (typeof response.applications[i].live_cleanKey !== 'undefined') {
                            selector = '.liveViewStatusClass_' + response.applications[i].live_cleanKey;
                            onlineLabelOnline(selector);
                        }
                        if (typeof response.applications[i].key !== 'undefined') {
                            selector = '.liveViewStatusClass_' + response.applications[i].key;
                            onlineLabelOnline(selector);
                        }
                    }
                }
                mouseEffect();
            } else {
                //console.log('processApplicationLive ERROR', response);
            }
        }
        // check for live servers
        var count = 0;
        while (typeof response[count] !== 'undefined') {
            //console.log('processApplicationLive 2',count, response[count].applications, response[count].applications.length);
            for (i = 0; i < response[count].applications.length; i++) {
                processApplication(response[count].applications[i]);
            }
            count++;
        }
    }

    function availableLiveStreamIsLoading() {
        if ($('#availableLiveStream').hasClass('notfound')) {
            availableLiveStreamEmpty();
        }
    }

    function availableLiveStreamNotFound() {
        $('#availableLiveStream').addClass('notfound');
        availableLiveStreamEmpty();
    }

    async function availableLiveStreamEmpty() {
        $('#availableLiveStream').empty();
    }
    var hideWhenExpireClasses = [];
    function hideWhenExpire(application){
        var className = application.className;
        if (!empty(application.expires) && !in_array(className, hideWhenExpireClasses)) {
            var expires_in_seconds = application.expires - _serverTime;
            console.log('hideWhenExpire', expires_in_seconds, className);
            hideWhenExpireClasses.push(className);
            setTimeout(function(){
                console.log('hideWhenExpire now', className);
                $('.'+className).slideUp();
                $('.onlineApplications').text($('.onlineApplications').text()-1);
            },expires_in_seconds*1000);
        }
    }

    var linksToEmbedTimeout;
    async function processApplication(application) {
        href = application.href;
        title = application.title;
        name = application.name;
        user = application.user;
        photo = application.photo;

        if (!empty(application.expires) && application.expires < _serverTime) {
            return false;
        }
        hideWhenExpire(application);
        if (application && typeof application.key == 'string') {
            key = application.key.replace(/[&=]/g, '');
        } else {
            key = '';
        }

        ////console.log('processApplication', application.className);
        callback = '';
        if (typeof application.callback === 'string') {
            callback = application.callback;
        }
        isPrivate = application.isPrivate;
        if (application.type === 'Live') {
            online = application.users.online;
            views = application.users.views;
        } else {
            online = 0;
            views = 0;
        }
        if (typeof application.html != 'undefined') {
            var notificationHTML = $(application.html);
            var notificatioID = (notificationHTML.attr('id') + '_notification').replace(/[&=]/g, '');
            if (typeof key !== 'undefined') {
                ////console.log('processApplication remove class .live_' + key);
                $('.live_' + key).remove();
            }
            if (!$('#' + notificatioID).length) {
                notificationHTML.attr('id', notificatioID);
                if (application.comingsoon) {
                    //console.log('application.comingsoon 1', application.comingsoon, application.method);
                    $('#availableLiveStream').append(notificationHTML);
                } else {
                    $('#availableLiveStream').prepend(notificationHTML);
                }
                animateChilds('#availableLiveStream', 'animate__bounceInRight', 0.05);
            } else {
                ////console.log('processApplication is already present '+notificatioID, application.className);
            }

            var html;
<?php
if (isVideo()) {
    ?>
                html = application.htmlExtraVideoListItem;
    <?php
} elseif (isLive()) {
    ?>
                html = application.htmlExtraVideoPage;
    <?php
} else {
    ?>
                html = application.htmlExtra;
<?php }
?>
            var id = $(html).attr('id').replace(/[&=]/g, '');
            
            if ($('#' + id).length) {
                //console.log('processApplication key found', id);
                return false;
            }
            //console.log('processApplication key NOT found', id);
            if (application.comingsoon && application.comingsoon > _serverTime) {
                ////console.log('application.comingsoon 2', application.comingsoon, application.method);
                $('#liveScheduleVideos .extraVideos').append(html);
                $('#liveScheduleVideos').slideDown();
            } else {
                $('#liveVideos .extraVideos').prepend(html);
                $('#liveVideos').slideDown();
            }
            setTimeout(function () {
                lazyImage();
            }, 1000);
            if (callback) {
                eval("try {" + callback + ";} catch (e) {console.log('processApplication application.callback error',e.message);}");
            }
        } else {
            //console.log('application.html is undefined');
        }
        clearTimeout(linksToEmbedTimeout);
        linksToEmbedTimeout = setTimeout(function () {
<?php
if (!empty($obj->playLiveInFullScreenOnIframe)) {
    echo 'if (typeof linksToFullscreen === \'function\') {linksToFullscreen(\'.liveVideo a, #availableLiveStream a\');}';
} elseif (!empty($obj->playLiveInFullScreen)) {
    echo 'if (typeof linksToEmbed === \'function\') {linksToEmbed(\'.liveVideo a, #availableLiveStream a\');}';
}
?>
            avideoSocket();
        }, 500);
        if (application.users && typeof application.users.views !== 'undefined') {
            $('.views_on_total_on_live_' + application.users.transmition_key + '_' + application.users.live_servers_id).text(application.users.views);
        }
    }

    function socketLiveONCallback(json) {
        //console.log('socketLiveONCallback processLiveStats', json);
        processLiveStats(json.stats);
        var selector = '.live_' + json.live_servers_id + "_" + json.key;
        $(selector).slideDown();

        if (typeof onlineLabelOnline == 'function') {
            selector = '#liveViewStatusID_' + json.key + '_' + json.live_servers_id;
            onlineLabelOnline(selector);
            selector = '.liveViewStatusClass_' + json.key + '_' + json.live_servers_id;
            onlineLabelOnline(selector);
            selector = '.liveViewStatusClass_' + json.cleanKey;
            ////console.log('socketLiveOFFCallback 3', selector);
            onlineLabelOnline(selector);
        }

        // update the chat if the history changes
        var IframeClass = ".yptchat2IframeClass_" + json.key + "_" + json.live_servers_id;
        if ($(IframeClass).length) {
            var src = $(IframeClass).attr('src');
            if (src) {
                avideoToast('Loading new chat');
                var newSRC = addGetParam(src, 'live_transmitions_history_id', json.live_transmitions_history_id);
                $(IframeClass).attr('src', newSRC);
            }
        }
        if (isInLive(json)) {
            playerPlay();
            showImage('prerollPoster', json.cleanKey);
        }
    }
    function socketLiveOFFCallback(json) {
        //console.log('socketLiveOFFCallback', json);
        var selector = '.live_' + json.live_servers_id + "_" + json.key;
        selector += ', .liveVideo_live_' + json.live_servers_id + "_" + json.key;
        selector += ', .live_' + json.key;
        ////console.log('socketLiveOFFCallback 1', selector);
        $(selector).slideUp("fast", function () {
            $(this).remove();
        });
        if (typeof onlineLabelOffline == 'function') {
            selector = '#liveViewStatusID_' + json.key + '_' + json.live_servers_id;
            ////console.log('socketLiveOFFCallback 2', selector);
            onlineLabelOffline(selector);
            selector = '.liveViewStatusClass_' + json.key + '_' + json.live_servers_id;
            ////console.log('socketLiveOFFCallback 3', selector);
            onlineLabelOffline(selector);
            selector = '.liveViewStatusClass_' + json.cleanKey;
            ////console.log('socketLiveOFFCallback 3', selector);
            onlineLabelOffline(selector);
        }
        setTimeout(function () {
            //console.log('socketLiveOFFCallback processLiveStats');
            processLiveStats(json.stats);
            setTimeout(function () {
                hideExtraVideosIfEmpty();
            }, 500);
        }, 500);

        if (isInLive(json)) {
            showImage('postrollPoster', json.cleanKey);
        }
    }

    async function hideExtraVideosIfEmpty() {
        $('#liveScheduleVideos .extraVideos').each(function (index, currentElement) {
            var somethingIsVisible = false;
            $(this).children('div').each(function (index2, currentElement2) {
                if ($(this).is(":visible")) {
                    somethingIsVisible = true;
                    return false;
                }
            });
            if (!somethingIsVisible) {
                $('#liveScheduleVideos').slideUp();
            }
        });
        $('#liveVideos .extraVideos').each(function (index, currentElement) {
            var somethingIsVisible = false;
            $(this).children('div').each(function (index2, currentElement2) {
                if ($(this).is(":visible")) {
                    somethingIsVisible = true;
                    return false;
                }
            });
            if (!somethingIsVisible) {
                $('#liveVideos').slideUp();
            }
        });
    }

    $(document).ready(function () {
        if (!avideoSocketIsActive()) {
            availableLiveStreamIsLoading();
            getStatsMenu(true);
        }
<?php
//var_dump(isLive(),$times,$liveInfo['users_id'], $liveInfo['live_servers_id'], $liveInfo['live_schedule_id']);exit;
if (AVideoPlugin::isEnabledByName('YPTSocket')) {
    //echo 'console.log(\'YPTSocket processLiveStats\');';
    echo 'processLiveStats(' . json_encode(getStatsNotifications()) . ');';
}
if (isLive()) {
    if ($liveInfo['isLive']) {
        $times = Live::getPrerollPosterImageTimes($liveInfo['users_id'], $liveInfo['live_servers_id'], $liveInfo['live_schedule_id']);
        if ($liveInfo['startedSecondsAgo'] < $times->liveImgTimeInSeconds) {
            echo "setTimeout(function(){showImage('prerollPoster', '{$liveInfo['key']}');},1500);";
        } else {
            echo "/* prerollPoster will notplay */";
        }
    } else {
        $times = Live::getPostrollPosterImageTimes($liveInfo['users_id'], $liveInfo['live_servers_id'], $liveInfo['live_schedule_id']);
        //var_dump(isLive(),$times,$liveInfo['users_id'], $liveInfo['live_servers_id'], $liveInfo['live_schedule_id']);exit;
        if (!empty($liveInfo['finishedSecondsAgo']) && $liveInfo['finishedSecondsAgo'] < $times->liveImgTimeInSeconds) {
            echo "setTimeout(function(){showImage('postrollPoster', '{$liveInfo['key']}');},1500);";
        } else {
            echo "/* postrollPoster will notplay */";
        }
    }
}
?>
    });
</script>
<script src="<?php echo getURL('plugin/Live/view/live.js'); ?>" type="text/javascript"></script>