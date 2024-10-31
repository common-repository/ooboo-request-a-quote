<?php

// Register settings
function Ooboo_register_settings()
{
  register_setting( 'Ooboo_settings_group', 'Ooboo_settings' );
}
add_action( 'admin_init', 'Ooboo_register_settings' );

// Delete options on uninstall
function Ooboo_uninstall()
{
  delete_option( 'Ooboo_settings' );
}
register_uninstall_hook( __FILE__, 'Ooboo_uninstall' );