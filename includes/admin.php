<?php

// Output the options page
function ooboo_options_page()
{
  // Get options
  $options = get_option('Ooboo_settings');
?>
  <div class="wrap">
      <h2>Ooboo Request a Quote Widget &raquo; <?php _e('Settings'); ?></h2>
      
      <div id="poststuff">
        <div id="post-body" class="metabox-holder columns-2">
          <!-- Content -->
          <div id="post-body-content">
          <div id="normal-sortables" class="meta-box-sortables ui-sortable">                        
                    <div class="postbox">
                        <h3 class="hndle"><?php _e('Settings'); ?></h3>
                        
                        <div class="inside">
                          <form action="options.php" method="post">
                            <?php settings_fields( 'Ooboo_settings_group' ); ?>
                            <table class="form-table" cellspacing="2" cellpadding="5" width="100%">
                            <tr> 
                              <th width="30%" valign="top" style="padding-top: 10px;">
                                <label for="ooboo_token"><strong><?php _e('Enter Ooboo Token'); ?></strong></label>
                              </th>
                              <td>
                                <input placeholder="Enter Token" name="Ooboo_settings[ooboo_token]" id="ooboo_token" style="font-family:Courier New;" value="<?php echo esc_attr($options['ooboo_token']); ?>">
                                </td>
                              </tr>
                            </table>
                            <p>
                              <ol>
                                <li>
                                  <?php _e('Copy and paste your Ooboo Token into the box above. (You can find your <a href="https://app.ooboo.com/widget#tab_wordpress">Ooboo Token here</a>. An Ooboo account is required to use this plugin.)'); ?> 
                                </li> 
                                <li>
                                  Go to any page where you want to add the plugin and add the shortcode [ooboo_quote_plugin] to display it
                                </li>
                                <li>
                                  If you need any help, please don't hesitate to <a href="mailto:support@ooboo.com">email us</a>.
                                </li>
                              <ol>
                            <p>
                    <input name="submit" type="submit" name="Submit" class="button button-primary" value="<?php _e('Save'); ?>" /> 
                  </p>
                  </form>
                        </div>
                    </div>
          </div>
          <!-- /normal-sortables -->
          </div>
        </div>
    </div>      
  </div>
<?php
}
?>
