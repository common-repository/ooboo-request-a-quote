<?php

// Create a option page for settings
add_action('admin_menu', 'add_ooboo_option_page');

// Add top-level admin bar link
add_action('admin_bar_menu', 'add_ooboo_link_to_admin_bar', 999);

// Adds Ooboo link to top-level admin bar
function add_ooboo_link_to_admin_bar()
{
  global $wp_admin_bar;

  $args = array(
    'id' => 'ooboo-admin-menu',
    'title' => 'Request a Quote', // alter the title of existing node
    'parent' => FALSE,   // set parent to false to make it a top level (parent) node
    'href' => get_bloginfo('wpurl') . '/wp-admin/options-general.php?page=ooboo_option_page',
    'meta' => array('title' => 'Ooboo')
  );

  $wp_admin_bar->add_node($args);
}

// Hook in the options page functionå
function add_ooboo_option_page()
{
  add_options_page('Request Quote Options', 'Request Quote Widget', 'activate_plugins', 'ooboo_option_page', 'ooboo_options_page');
}

?>
