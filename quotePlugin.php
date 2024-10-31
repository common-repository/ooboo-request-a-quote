<?php
/**
 * Plugin Name: Ooboo Request a Quote
 * Description: Adds a widget to your website so you can collect quotes/estimates.  Helps you create leads and sales.
 * Version: 1.0
 * Author: ooboo
 * Author URI: https://ooboo.com/
 */
include_once 'quote_plugin_common.php';
function ooboo_cf_shortcode() {
    ob_start();
    ooboo_html_form_code();
    ooboo_include_javascript();
    return ob_get_clean();
}

function ooboo_html_form_code() {
	$options = get_option('ooboo_settings');

	if (!empty($options['ooboo_token'])) {
		$ooboo_token = $options['ooboo_token'];
	} else {
		$ooboo_token = OOBOO_KEY_PLUGIN;
	}

    $layouts = wp_remote_retrieve_body( wp_remote_get(OOBOO_URL_PLUGIN.'/quote-plugin-api/get-layouts?token='.$ooboo_token));

    echo $layouts;
}

function ooboo_include_javascript() {
    wp_enqueue_script( 'quote-plugin-custom-script', plugins_url( '/quote_plugin.js', __FILE__ ));
}

add_shortcode('ooboo_quote_plugin', 'ooboo_cf_shortcode');
