/*  * To change this license header, choose License Headers in Project Properties. * To change this template file, choose Tools | Templates * and open the template in the editor. */jQuery(document).ready(function() {    var form_html = jQuery("#form_create_quote").html();    jQuery(document).on("click", "#checkout_button", function(){       create_quote();    });    jQuery(document).on("click", "#back_create", function(){       jQuery("#form_create_quote").html(form_html);       jQuery("#create_quote_sucess").html("");       set_height();       reset();    });    jQuery(document).on("click", "#hide_plugin", function(){        window.parent.postMessage({'type':'_hide_plugin'}, '*');    });    jQuery(window).resize(function(){        set_height();    });    jQuery(document).on('change','#ooboo_model',function(e){        validate_car();    });    jQuery(document).on('change','#ooboo_make, #ooboo_year',function(e){            e.preventDefault();            var elm  = jQuery('#ooboo_make');            var year = jQuery("#ooboo_year").val();            var d = new Date();            if (year == "") {                year = d.getFullYear();            }            var url = jQuery("#form_create_quote").attr("data-url")+'/ajax/ajax-get-model';            jQuery.ajax({                    url: url,                    data: {                        name:elm.val(),                        year: year                    },                    type:'GET',                    dataType:'JSON',                    success: function(r){                       if(r.status == true) {                           jQuery('#ooboo_model').html(r.view);                           validate_car();                       }                    }                }            );    });});jQuery(document).on("change", "#ooboo_name, #ooboo_email, #ooboo_phone, #ooboo_coverage", function(){    var elm       = jQuery(this);    var class_err = "";    var name      = "";    if (elm.attr("id") == "ooboo_name") {         class_err = "name_errors";         name      = "Name";    }    if (elm.attr("id") == "ooboo_email") {         class_err = "email_errors";         name      = "Email";    }    if (elm.attr("id") == "ooboo_phone") {         class_err = "phone_errors";         name      = "Phone";    }    if (elm.attr("id") == "ooboo_coverage") {         class_err = "converage_errors";         name      = "Coverage";    }    if (elm.val() == "") {        jQuery("."+class_err).text(name+" can't be blank.");        check = 1;    } else {        if (elm.attr("id") == "ooboo_email") {            if(!validateEmail(elm.val())) {                jQuery("."+class_err).text(name+" is not a valid email address.");            } else {                jQuery("."+class_err).text("");            }        } else {            jQuery("."+class_err).text("");        }    } });function validate_car() {    var year      = jQuery("#ooboo_year");    var make      = jQuery("#ooboo_make");    var model     = jQuery("#ooboo_model");    if (year.val() != "" || model.val() != "" || make.val() != "") {        if (year.val() == "") {            jQuery(".year_errors").text("Vehicle Year can't be blank.");        } else {            jQuery(".year_errors").text("");        }        if (model.val() == "") {            jQuery(".model_errors").text("Vehicle Model can't be blank.");        } else {            jQuery(".model_errors").text("");        }        if (make.val() == "") {            jQuery(".make_errors").text("Vehicle Make can't be blank.");        } else {            jQuery(".make_errors").text("");        }    } else {         jQuery(".make_errors").text("");         jQuery(".model_errors").text("");         jQuery(".year_errors").text("");    }}function validate_form() {    var name      = jQuery("#ooboo_name");    var email     = jQuery("#ooboo_email");    var phone     = jQuery("#ooboo_phone");    var company   = jQuery("#ooboo_company");    var zip       = jQuery("#ooboo_zip");    var about     = jQuery("#ooboo_about");    var location  = jQuery("#ooboo_location");    var year      = jQuery("#ooboo_year");    var make      = jQuery("#ooboo_make");    var model     = jQuery("#ooboo_model");    var converage = jQuery("#ooboo_coverage");    var type      = jQuery("#ooboo_type");    var tell_more = jQuery("#ooboo_tell_more");    var check = 0;    if (name.val() == "") {        jQuery(".name_errors").text("Name can't be blank.");        check = 1;    } else {        jQuery(".name_errors").text("");    }    if (email.val() == "") {        check = 1;        jQuery(".email_errors").text("Email can't be blank.");    } else {        if(!validateEmail(email.val())) {            check = 1;            jQuery(".email_errors").text("Email is not a valid email address.");        } else {            jQuery(".email_errors").text("");        }    }    if (phone.val() == "") {        check = 1;        jQuery(".phone_errors").text("Phone can't be blank.");    } else {        jQuery(".phone_errors").text("");    }    if (year.val() != "" || model.val() != "" || make.val() != "") {        if (year.val() == "") {            check = 1;            jQuery(".year_errors").text("Vehicle Year can't be blank.");        } else {            jQuery(".year_errors").text("");        }        if (model.val() == "") {            check = 1;            jQuery(".model_errors").text("Vehicle Model can't be blank.");        } else {            jQuery(".model_errors").text("");        }        if (make.val() == "") {            check = 1;            jQuery(".make_errors").text("Vehicle Make can't be blank.");        } else {            jQuery(".make_errors").text("");        }    }    if (converage.val() == "") {        check = 1;        jQuery(".converage_errors").text("Please select What are you interested in.");    } else {        jQuery(".converage_errors").text("");    }    set_height();    if (check === 1) {        return 0;    }    return 1;}function create_quote() {    var elm = jQuery(this);    if (elm.hasClass("wt")) {        return false;    }    elm.addClass("wt");    var check = validate_form();    if (check === 0) {        elm.removeClass("wt");        return;    }    var formData = new FormData(jQuery('.form')[0]);    var url = jQuery("#form_create_quote").attr("data-url") + '/embed/create/'+jQuery('.form').attr("token");    jQuery.ajax({        url: url,        data: formData,        method: 'POST',        dataType: 'JSON',        processData: false,  // tell jQuery not to process the data        contentType: false,        success: function(r) {            if (r.code== 200) {                elm.removeClass("wt");                jQuery(".card-body.p-3.pd_imp").html("");                show_html_success();                return true;            }            elm.removeClass("wt");            show_errors(r.Error);            return false;        }    });}function validateEmail(email) {    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;    return re.test(email);}function phonenumber(inputtxt) {  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})jQuery/;  if(inputtxt.value.match(phoneno)) {    return true;  }  else {    return false;  }}function show_html_success() {    var html = "<div class='row' style='margin-top:100px;'><div class='col-md-12'>";        html = html + '<p><span style="font-size: 13.008px; line-height: 20.0063px;"><strong>Thank you</strong> for submitting a quote request. We aim to respond to quote requests within 24 hours during the work week. If you submit a quote request over the weekend, we will get back to you on Monday. We look forward to working with you!</span></p>';        html = html +'<div class="links" style="margin-top:50px;"> <a id="back_create" href="javascript:void(0)" style="color: #ff9900;text-decoration: none;">Go back to the form</a></div>';        html = html + "</div></div>";        jQuery("#create_quote_sucess").html(html);        window.parent.postMessage({'type':'_load_iframe', 'action':'_height', 'value':'500px'}, '*');}function show_errors(errors) {    if (typeof errors.email !== 'undefined') {        jQuery(".email_errors").text(errors.email);    }    if (typeof errors.phone !== 'undefined') {        jQuery(".phone_errors").text(errors.phone);    }    if (typeof errors.year !== 'undefined') {        jQuery(".year_errors").text(errors.year);    }    if (typeof errors.make !== 'undefined') {        jQuery(".make_errors").text(errors.make);    }    if (typeof errors.converage !== 'undefined') {        jQuery(".converage_errors").text(errors.converage);    }}function set_height() {    var height = jQuery('#ooboo_request_quote_gslugin').height();    window.parent.postMessage({'type':'_load_iframe', 'action':'_height', 'value': height+'px'}, '*');}function reset() {    jQuery("#ooboo_name").val("");    jQuery("#ooboo_email").val("");    jQuery("#ooboo_phone").val("");    jQuery("#ooboo_company").val("");    jQuery("#ooboo_zip").val("");    jQuery("#ooboo_about").val("");    jQuery("#ooboo_location").val("");    jQuery("#ooboo_year").val("");    jQuery("#ooboo_model").val("");    jQuery("#ooboo_make").val("");    jQuery("#ooboo_converage").val("");    jQuery("#ooboo_tell_more").val("");    jQuery("#ooboo_file").val("");}