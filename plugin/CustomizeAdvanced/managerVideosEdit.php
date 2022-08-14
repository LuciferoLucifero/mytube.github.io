<?php
if (Permissions::canAdminVideos()) {
    ?>
    <br>
    <div class="clearfix"></div>
    <ul class="list-group">
        <li class="list-group-item"> 
            <i class="fas fa-photo-video"></i>
            <?php echo __('Do NOT Show Video Ads on this video'); ?>  
            <div class="material-switch pull-right">
                <input id="doNotShowAdsOnThisVideo" type="checkbox" value="">
                <label for="doNotShowAdsOnThisVideo" class="label-danger"></label>
            </div>
        </li>
    </ul>
    <div class="clearfix"></div>
    <div class="row">
        <div class="col-sm-4">

            <label for="redirectVideoCode" ><?php echo __("Redirect video code"); ?></label>
            <select class="form-control last" id="redirectVideoCode" >
                <option value='0'><?php echo __('Do not redirect'); ?></option>
                <option value='301'>(301) <?php echo __('Moved Permanently'); ?></option>
                <option value='307'>(307) <?php echo __('Temporary Redirect'); ?></option>
                <option value='308'>(308) <?php echo __('Permanent Redirect'); ?></option>
            </select>
        </div>
        <div class="col-sm-8">
            <label for="redirectVideoURL"><?php echo __("Redirect URL"); ?></label>
            <input type="url" id="redirectVideoURL" class="form-control" placeholder="<?php echo __("Redirect URL"); ?>">

        </div>
    </div>
    <br>
    <div class="clearfix"></div>
    <?php
}
?>