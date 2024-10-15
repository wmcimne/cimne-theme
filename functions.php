<?php
// Exit if accessed directly
if ( !defined( 'ABSPATH' ) ) exit;

// BEGIN ENQUEUE PARENT ACTION
// AUTO GENERATED - Do not modify or remove comment markers above or below:

if ( !function_exists( 'chld_thm_cfg_locale_css' ) ):
    function chld_thm_cfg_locale_css( $uri ){
        if ( empty( $uri ) && is_rtl() && file_exists( get_template_directory() . '/rtl.css' ) )
            $uri = get_template_directory_uri() . '/rtl.css';
        return $uri;
    }
endif;
add_filter( 'locale_stylesheet_uri', 'chld_thm_cfg_locale_css' );
// END ENQUEUE PARENT ACTION

// MANTENANCE MODE
// Activate WordPress Maintenance Mode
// function aulas_maintenance_mode(){

//     if(!current_user_can('edit_themes') || !is_user_logged_in()){

//     wp_die('<h1 style="color:red">Aulas CIMNE Website under Maintenance</h1><br />We are performing scheduled maintenance. We will be back on-line shortly!');

//     }

// }
// add_action('get_header', 'aulas_maintenance_mode');
// END MANTENANCE MODE

// CONSOLE LOG FUNCTION
function console_log( $data ){
    echo '<script>';
    echo 'console.log('. json_encode( $data ) .')';
    echo '</script>';
  }

// IS PAGE CHILD FUNCTION
function is_page_child_of($parent_slug) {
    global $post;

    if ( !has_post_parent( $post ) ) {
        console_log( 'No parent' );
        return false;
    }

    // if ( is_home() || is_front_page() ) {
    //     console_log( 'home' );
    //     return false;
    // }
    $parent = get_post_parent( $post );
    $slug = $parent->post_name;     
    if ($slug === $parent_slug) {
        console_log( 'true' );
        return true;
    }else{
        console_log( 'false' );
        return false;
    }
}

/**
 * REMOVE GENERATOR FROM HEAD - HIDE WP VERSION
 *
 *
 */
remove_action('wp_head', 'wp_generator');

/**
 * Removes the 'widgets-block-editor' support from the theme.
 *
 *
 */
function cimne_theme_support() {
    remove_theme_support( 'widgets-block-editor');
}
add_action( 'after_setup_theme', 'cimne_theme_support');

/**
 * CUSTOM LOGIN PAGE
 *
 *
 */
function my_login_page() {
    wp_enqueue_style( 'login-custom-style', get_bloginfo('stylesheet_directory'). '/login.css', array('login') );
    }
    
    add_action( 'login_enqueue_scripts', 'my_login_page' );
    
    /* Change the Login Logo URL */
    function my_login_logo_url() {
        return get_bloginfo( 'url' );
    }
    add_filter( 'login_headerurl', 'my_login_logo_url' );
    
    function my_login_logo_url_title() {
        return get_bloginfo( 'name' ) . ' | ' . get_bloginfo( 'description' );
    }
    add_filter( 'login_headertitle', 'my_login_logo_url_title' );
    
    /*Hide the Login Error Message*/
    function login_error_override()
    {
        return __( 'Incorrect login details.', 'targetimc' );
    }
    add_filter('login_errors', 'login_error_override');
    
    /*Change the Redirect URL */
    function admin_login_redirect( $redirect_to, $request, $user ) {
        global $user;
            if( isset( $user->roles ) && is_array( $user->roles ) ) {
                if( in_array( "administrator", $user->roles ) ) {
                    return $redirect_to;
                } else {
                    return home_url();
                }
            }
            else
            {
            return $redirect_to;
            }
    }
    add_filter("login_redirect", "admin_login_redirect", 10, 3);
    
// END OF CUSTOM LOGIN PAGE

/**
 * Insertar Javascript y enviar ruta admin-ajax.php
 *
 *
 */
function cimne_insertar_js(){

    wp_register_script('cimne_main_scripts', get_stylesheet_directory_uri(). '/js/functions.js', array('jquery'), '1', true );
    wp_enqueue_script('cimne_main_scripts');

    //echo get_permalink();

	if (is_page( 'projects-template' )) {      
        // wp_register_script('cimne_ajax_scripts', get_stylesheet_directory_uri(). '/js/cimne_ajax.js', array('jquery'), '1', true );
        wp_enqueue_script('cimne_ajax_scripts' , get_stylesheet_directory_uri(). '/js/cimne_ajax.js', array('jquery'), '1', true );
        wp_localize_script('cimne_ajax_scripts','cimne_vars',['ajaxurl'=>admin_url('admin-ajax.php')]);
    }
    if (is_page_child_of( 'research-clusters' )) {      
        // wp_register_script('cimne_fetch_scripts', get_stylesheet_directory_uri(). '/js/cimne_fetch.js', array('jquery'), '1', true );
        wp_enqueue_script('cimne_fetch_scripts', get_stylesheet_directory_uri(). '/js/cimne_fetch.js', array('jquery'), '1', true );
        wp_localize_script('cimne_fetch_scripts','cimne_vars',['ajaxurl'=>admin_url('admin-ajax.php')]);
    }

    if( strpos(get_permalink(), 'transparency' )) {
        wp_register_script('cimne_transparency_scripts', get_stylesheet_directory_uri(). '/js/transparency.js', array('jquery'), '1', true );
        wp_enqueue_script('cimne_transparency_scripts');
    }
}
add_action('wp_enqueue_scripts', 'cimne_insertar_js');