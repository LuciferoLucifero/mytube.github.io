<?php
require_once '../../videos/configuration.php';

require_once $global['systemRootPath'] . 'objects/EpgParser.php';

$epgs = array();
$minDate = strtotime('+1 year');
$maxDate = 0;
$videos_id = intval(@$_REQUEST['videos_id']);
$videos = Video::getAllActiveEPGs();
foreach ($videos as $video) {
    if (!isValidURL($video['epg_link'])) {
        continue;
    }
    $epgs[] = $video;
}
//var_dump($epgs);exit;
$fontSize = 18;

$timeLineElementMinutes = 30;
$timeLineElementSize = 200;
$paddingSize = 10;
$minimumWidth = 50;

if (isMobile()) {
    $timeLineElementSize = 150;
    $fontSize = 12;
}

$minuteSize = $timeLineElementSize / $timeLineElementMinutes;
$secondSize = $minuteSize / 60;

$cacheName = 'epg';

$forceRecreate = false;

$channelsList = array();
foreach ($epgs as $epg) {
    $videos_id = $epg['id'];
    $programCacheName = 'program_' . md5($epg['epg_link']);
    $timeout = random_int(21600, 43200); //6 to 12 hours
    $programData = ObjectYPT::getCache($programCacheName, $timeout);
    if ($forceRecreate || empty($programData)) {
        _error_log("EPG program expired creating again videos_id={$videos_id} " . $programCacheName);
        //var_dump($epg['epg_link']);exit;
        $Parser = new \buibr\xmlepg\EpgParser();
        $Parser->setURL($epg['epg_link']);
        $Parser->temp_dir = getCacheDir();
        try {
            $Parser->parseURL();
            $epgData = $Parser->getEpgdata();
            $channels = $Parser->getChannels();
            //var_dump($channels, $epgData);
            //$Parser->setTargetTimeZone('Europe/Skopje');
            // $Parser->setChannelfilter('prosiebenmaxx.de'); //optional
            // $Parser->setIgnoreDescr('Keine Details verfügbar.'); //optional
            foreach ($channels as $key => $value) {
                $channels[$key]['epgData'] = array();
                foreach ($epgData as $key2 => $program) {
                    if ($program['channel'] != $value['id']) {
                        continue;
                    }
                    $minutes = getDurationInMinutes(date('Y-m-d 00:00:00'), $program['stop']);
                    //var_dump(date('Y-m-d 00:00:00'), $program['stop'], $minutes);
                    if ($minutes > 0) {
                        $channels[$key]['epgData'][] = $program;
                        setMinDate($program['start']);
                        setMaxDate($program['stop']);
                    }
                    unset($epgData[$key2]);
                }
                //var_dump($channels[$key]);
                if (!empty($channels[$key])) {
                    usort($channels[$key]['epgData'], "cmpPrograms");
                    $channels[$key]['videos_id'] = $videos_id;
                    $channelsList[] = $channels[$key];
                    //var_dump($channelsList[0]);exit;
                }
            }
            $file = ObjectYPT::setCache($programCacheName, $channelsList);
            _error_log("EPG program cache created videos_id={$videos_id} " . json_encode($file));
        } catch (Exception $e) {
            throw new \RuntimeException($e);
        }
    } else {
        $channelsList = object_to_array($programData);
        foreach ($channelsList as $program) {
            foreach ($program["epgData"] as $epg) {
                setMinDate($epg['start']);
                setMaxDate($epg['stop']);
            }
        }
    }
}
usort($channelsList, "cmpChannels");

//var_dump($epgData);exit;
//var_dump($channelsList);exit;
function cmpPrograms($a, $b) {
    $AStartTime = strtotime($a['start']);
    $BStartTime = strtotime($b['start']);
    if ($AStartTime == $BStartTime) {
        return 0;
    }
    return ($AStartTime < $BStartTime) ? -1 : 1;
}

function cmpChannels($a, $b) {
    return strcasecmp($a['display-name'], $b['display-name']);
}

function getDurationInMinutes($start, $stop) {
    $timeStart = strtotime($start);
    $timeStop = strtotime($stop);
    //var_dump(date('Y-m-d H:i:s',$timeStart), date('Y-m-d H:i:s',$timeStop));
    $seconds = $timeStop - $timeStart;

    $minutes = intval($seconds / 60);
    return $minutes;
}

function setMaxDate($date) {
    global $maxDate;

    if (empty($maxDate)) {
        $maxDate = 0;
    }

    $newDate = strtotime($date);
    if ($newDate > $maxDate) {
        $maxDate = $newDate;
    }
}

function setMinDate($date) {
    global $minDate;

    if (empty($minDate)) {
        $minDate = strtotime('+30 days');
    }

    $newDate = strtotime($date);
    if ($newDate < $minDate) {
        $minDate = $newDate;
    }
}

function createEPG($channel) {
    global $minuteSize, $Date, $minimumWidth, $videos_id;
    $channel = object_to_array($channel);
    $displayname = $channel['display-name'];
    $channelId = $channel['id'];
    $this_videos_id = $channel['videos_id'];
    $firstProgram = $channel['epgData'][0];

    $class = '';
    if (!empty($this_videos_id) && $this_videos_id == $videos_id) {
        $class = 'active';
    }
    //var_dump($channel);exit;
    ?>
    <a href="<?php echo Video::getLinkToVideo($this_videos_id); ?>" target="_top">
        <div class="programs <?php echo $class; ?>" id="video_<?php echo $this_videos_id; ?>" >
            <div class="header">
                <?php echo $displayname; ?>
            </div>
            <div class="list">
                <?php
                $nowTime = time();
                foreach ($channel['epgData'] as $key => $program) {
                    $minutesSinceZeroTime = getDurationInMinutes("{$Date} 00:00:00", $program['start']);
                    if ($minutesSinceZeroTime < 0) {
                        continue;
                    }
                    $minutes = getDurationInMinutes($program['start'], $program['stop']);
                    $left = ($minuteSize * $minutesSinceZeroTime) + $timeLineElementSize;
                    $width = ($minuteSize * $minutes);
                    $_stopTime = strtotime($program['stop']);
                    $pclass = '';
                    if ($width <= $minimumWidth) {
                        $text = "<!-- too small $width -->";
                    } else {
                        $startTime = date('m-d H:i', strtotime($program['start']));
                        $stopTime = date('m-d H:i', $_stopTime);
                        $text = "{$program['title']}<div><small class=\"duration\">{$minutes} Min</small></div>";
                    }
                    if ($_stopTime < $nowTime) {
                        $pclass = 'finished';
                    }
                    echo "<div style=\"width: {$width}px; left: {$left}px;\" start=\"{$program['start']}\" stop=\"{$program['stop']}\" minutes=\"{$minutes}\" minutesSinceZeroTime=\"{$minutesSinceZeroTime}\" class=\"{$pclass}\">"
                    . "{$text}"
                    . "</div>";
                }
                ?>
            </div>
        </div>
    </a>
    <?php
}

$Date = date('Y-m-d');

$minutes = getDurationInMinutes(date('Y-d-m 00:00:00'), date('Y-d-m H:i:s'));
$positionNow = ($minuteSize * $minutes) + $timeLineElementSize;

//$bgColors = array('#feceea', '#fef1d2', '#a9fdd8', '#d7f8ff', '#cec5fa');

$bgColors = array('#222222', '#333333', '#444444', '#555555');

//var_dump($minuteSize, $minutes,$positionNow);exit;
?><!DOCTYPE html>
<html>
    <head>
        <title>EPG</title>

        <link href="<?php echo getURL('view/bootstrap/css/bootstrap.min.css'); ?>" rel="stylesheet" type="text/css"/>
        <style>
            body{
                background-color: #000000AA;
                font-size: <?php echo $fontSize; ?>px;
            }
            div.list > div,
            div.header{
                width: <?php echo $timeLineElementSize; ?>px;
                padding: 5px <?php echo $paddingSize; ?>px;
                text-align: center;
                align-content: center;
                overflow: hidden;
                height: <?php echo ($fontSize * 4) - 2; ?>px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                background-color: #000000;
                color: #FFF;
                cursor: pointer;
            }
            div.timeline > div.list > div,
            .programs > div.list > div{
                border-right: solid #777 1px;
                display:grid;
            }
            div.header{
                position: absolute;
                left: 0;
                font-weight: bolder;
                z-index: 10;
                padding: 0 10px;
                display:flex;
                align-items:center;
                border: solid #CCC 1px;
                border-width: 0 1pz 1px 0;
            }
            div.timeline{
                z-index: 20;
            }
            div.list{
                margin-left: <?php echo $timeLineElementSize; ?>px;
            }
            div.list > div{
                position: absolute;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 1.1;
            }
            #positionNow{
                position: absolute;
                top: 0;
                background-color: #FF000077;
                width: 5px;
                height: 100%;
                z-index: 5;
            }
            .timeline, #programsList, .programs{
                position: relative;
                height: <?php echo ($fontSize * 4); ?>px;
                margin: 0;
            }
            body > div.container-fluid{
                padding: 0;
            }
            .duration{
                font-size: 0.8em;
            }
            .programs{
                opacity: 0.7;
            }
            .programs.active, .programs:hover{
                opacity: 1;
            }
            .programs.active .list > div, .programs.active .header{
                border: 1px solid green;
                animation: glowBox 1s infinite alternate;
            }
            .programs:hover .list > div, .programs:hover .header{
                border: 1px solid blue;
            }
            .glowBox{
                animation: glowBox 1s infinite alternate;
            }

            @keyframes glowBox {
                from {
                    color: #DFD;
                    box-shadow:
                        0 0 1px #050,
                        0 0 2px #070,
                        0 0 3px #670,
                        0 0 4px #670;
                }
                to {
                    color: #FFF;
                    box-shadow:
                        0 0 2px #020,
                        0 0 5px #090,
                        0 0 10px #0F0,
                        0 0 15px #BF0,
                        0 0 20px #B6FF00;
                }
            }
            <?php
            foreach ($bgColors as $key => $value) {
                $n = $key + 1;
                echo "div.programs > div.list > div:nth-child({$n}n){"
                . "background-color: {$value};"
                . "color: #FFF;"
                //. "font-weight: bolder;"
                . "text-shadow: 1px 1px 5px {$value},"
                . "2px 0 5px #000,"
                . "0 2px 5px #000,"
                . "-2px -2px 5px #000, "
                . "-2px 0 5px #000, "
                . "0 -2px 5px #000, "
                . "-2px -2px 5px #000, "
                . "2px 2px 5px #000;"
                . "}";
            }
            ?>
            .finished{
                opacity: 0.4;
                background-color: #00000077 !important;
            }
        </style>
    </head>
    <body>
        <div class="container-fluid">
            <div class="timeline">
                <div class="list">
                    <?php
                    $lastStopDate = $maxDate;
                    //var_dump($lastStopDate);exit;
                    $maxDate = 0;
                    $count = 0;
                    $countElements = 0;
                    while ($lastStopDate > $maxDate && $count < 600) {
                        $tomorrowDate = date('Y-m-d', strtotime("+{$count} days"));
                        for ($i = 0; $i < 24; $i++) {
                            $hour = $i;
                            $amPm = 'AM';
                            if ($i > 12) {
                                $hour = $i - 12;
                                $amPm = 'PM';
                            }
                            $hour = sprintf("%02d", $hour);

                            for ($j = 0; $j < 60; $j += $timeLineElementMinutes) {
                                $minutes = sprintf("%02d", $j);
                                if (empty($count)) {
                                    $text = "<div>{$hour}:{$minutes} {$amPm}</div>";
                                } else {
                                    $text = "<small>{$tomorrowDate}</small><div>{$hour}:{$minutes} {$amPm}</div>";
                                }
                                $left = ($countElements * $timeLineElementSize) + $timeLineElementSize;
                                echo "<div style=\"width: {$timeLineElementSize}px; left: {$left}px;\">{$text}</div>";

                                setMaxDate("$tomorrowDate $i:$minutes:00");
                                $countElements++;
                                if ($lastStopDate < $maxDate) {
                                    break;
                                }
                            }
                            if ($lastStopDate < $maxDate) {
                                break;
                            }
                        }
                        $count++;
                    }
                    ?>
                </div>
            </div>
            <div id="programsList">
                <?php
                foreach ($channelsList as $channel) {
                    createEPG($channel);
                }
                ?>
            </div>
        </div>
        <div id="positionNow" style="left: <?php echo $positionNow; ?>px;"></div>
        <script src="<?php echo getURL('node_modules/jquery/dist/jquery.min.js'); ?>" type="text/javascript"></script>
        <script src="<?php echo getURL('view/bootstrap/js/bootstrap.min.js'); ?>" type="text/javascript"></script>
        <script>
            $(document).ready(function () {
                setPositionNow();
                setInterval(function () {
                    setPositionNow();
                }, 1000);
                $(window).scroll(function () {
                    $('div.header').css({
                        'left': $(this).scrollLeft()
                    });
                    $('#positionNow, div.timeline').css({
                        'top': $(this).scrollTop()
                    });
                });
                setTimeout(function () {
                    //$(document).scrollLeft($('#positionNow').position().left -<?php echo $timeLineElementSize + 50; ?>);
                    $('html, body').animate({
                        scrollLeft: ($('#positionNow').position().left -<?php echo $timeLineElementSize + 50; ?>),
                        <?php
                        if (!empty($videos_id)) {
                            echo "scrollTop: (($(\"#video_{$videos_id}\").offset().top) - 100)";
                        }
                        ?>
                    }, 1000);
                }, 200);
            }
            );
            function setPositionNow() {
                var left = parseFloat($('#positionNow').css("left"));
                var newLeft = (left +<?php echo $secondSize; ?>);
                $('#positionNow').css("left", newLeft + 'px');
            }
        </script>
    </body>
</html>