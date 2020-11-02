﻿/// <reference path="../../../scripts/jquery-1.12.4.js" />
/// <reference path="../../../Scripts/jquery.validate.unobtrusive.js" />
/// <reference path="doctorJS.js" />
/// <reference path="../../../Scripts/bootstrap-select.min.js" />
/// <reference path="../../../Scripts/jquery.validate.js" />
$(function () {
    $('.citySelect').change(function () {
        onCitySelected(this);
    });
    $('.areaSelect').change(function () {
        var value = parseInt($(this).find('option:selected').val());
        value = (value == 0) ? "" : value;
        $('#destrictID').val(value);
        $('#registrationForm').validate().element('#destrictID');
    });
    $('.specialitySelect').change(function () { onSpecialitySelected(this) });
    /*selectpicker configuration for speciality and subspeciality menu*/
    $('.subSpeciality').selectpicker({
        size: 10,
    });
    $('.specialitySelect').selectpicker({
        size: 10
    });
    $('body').on('click', '.areaSelect>.btn:first-child', function () {
        var id = parseInt($('.citySelect').find('option:selected').val());
        if (id == 0) {
            //hide all destrits as default 
            $('.areaSelect .dropdown-menu li').not(':first-of-type').addClass('hidden');
        }
    });
    $('#termOfUse').change(function () {
        if ($(this).is(':checked')) {
            $(this).siblings('.validationMessage').text("");
        }
        else {
            $(this).siblings('.validationMessage').text(language.mustAgreeOntermOfuser);
        }
    });
    $('input#userNameOrEmail').on({
        keyup: function () {
            $(this).parents('form').find('.rememberPasswordError').text('');
        },
        blur: function () {
            var value = $(this).val().trim();
            if (value == "" || value.length < 3) {
                $(this).val('').attr('placeholder', language.enterValidUsernameOrPassword);
                return;
            }
            if (value.search('@') != -1) {
                if (value.match('^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$') == null) {
                    $(this).val('').attr('placeholder', language.enterValidUsernameOrPassword);
                    return;
                }
            }
        }
    });
});
function hideSubSpecialitiesOfUnSelectedSpeciality(selectedSpecialityID) {
    var spChilds = $('.specialitySelect option[value="' + selectedSpecialityID + '"]').attr('data-childs');
    if (spChilds.length > 0) spChilds = spChilds.substring(0, spChilds.length - 1).split(',');
    var subSpecialitiesItems = $('.subSpeciality .dropdown-menu li');
    if (spChilds.length > 0) {//if selected id has sub specialities           
        $('.subSpeciality').find('option').each(function (i, el) {
            if (spChilds.indexOf($(el).val()) != -1) {//this element is sub speciality for the selected speciality
                $(subSpecialitiesItems).eq(i).removeClass('hidden');
            }
            else {
                //this element is is not sub speciality for the selected speciality
                $(subSpecialitiesItems).eq(i).addClass('hidden');
            }
        });
    }
}
//get destricts id of selected city
function getDestrictsOfCity(cityID)
{
    var destrictsIds = [];
    $('.areaSelect').find('option').each(function (i, el) {
        if (parseInt($(el).attr('data-value')) == cityID) {
            destrictsIds.push(i);
        }
    });
    return destrictsIds;
}
function hideDestrictsOfUnSelectedCity(selectedCityID)
{
    var cityContext = $('select.citySelect').get(0);
    var areaItemsLi = $('.areaSelect .dropdown-menu li');//menu of areas/destricts
    var areaSelectsIDs = getDestrictsOfCity(selectedCityID);//all destricts of selected city
    areaItemsLi.each(function (i, li) {       
        if (areaSelectsIDs.indexOf(i) != -1) $(li).removeClass('hidden');
        else { $(li).addClass('hidden') }
    });//map select item to menu items
}
function onCitySelected(context)
{
    var id = parseInt($(context).find('option:selected').val());//selected city id
    var areaItemsLi = $('.areaSelect .dropdown-menu li');//menu of areas/destricts
    //all destricts except first one(----)
    if (id == 0) {//if no city is selected            
        $('#destrictID').val("");
        $('#cityID').val("");
        areaItemsLi.not(':first-of-type').addClass('hidden');//hide all destrcits
        $('.areaSelect .dropdown-toggle .filter-option').text('-------');
        $('#registrationForm').validate().element('#cityID');
        return;
    }
    $('#cityID').val(id);//set selected city id to input
    areaItemsLi.not(':first-of-type').addClass('hidden');//hide all destricts except default one
    var areaSelectsIDs = [];//all destricts of selected city
    //set default destrict ----- to be selected
    $('.areaSelect').find('option:selected').removeAttr('selected').end().find('option').eq(0).attr('selected', 'selected');
    //get areas id of selected city
    areaSelectsIDs = getDestrictsOfCity(id);
    areaItemsLi.each(function (i, li) {
        if (areaSelectsIDs.indexOf(i) != -1) $(li).removeClass('hidden');
    });
    areaItemsLi.removeClass('selected').eq(0).addClass('selected');
    //set default destrict to be selected  
    $('.areaSelect .dropdown-toggle .filter-option').text('-------');
    $('#registrationForm').validate().element('#cityID');
}
function onSpecialitySelected(selectedSp) {   /*when doctor select speciality
      if this selected speciality has sub specialities
      then a menu of sub specialities will appear
      this menu contains sub pecialities for that selected speciality*/
    //selected speciality option
    var selectedSpecialityOption = $(selectedSp).find('option:selected');
    //selected speciality id
    var value = parseInt(selectedSpecialityOption.val());
    var id = value;
    //selected speciality id
    value = (value == 0) ? "" : value;
    $('#spID').val(value);//set input of speciality id to selected id  
    $('#registrationForm').validate().element('#spID');
    //the number of subspecialities of the seleced specaility id
    var subCount = parseInt(selectedSpecialityOption.attr('data-value'));
    //the sub specialities items at dropdown menue 
    var subSpecialitiesItems = $('.subSpeciality .dropdown-menu li');
    //hide sub speciality select attribute  
    $('.subSpeciality').find('option').not(':first').removeAttr('selected');
    $('.subSpeciality .dropdown-toggle').find('.filter-option').text(language.getGeneralSpecialityName(selectedSpecialityOption.text()));
    $(subSpecialitiesItems).each(function (i, el) {
        //unselect all sub speciality items
        $(el).removeClass('selected');
    });
    if (!(subCount > 0)) {//if selected id has no sub specialities
        $('.subSpeciality-form-group').addClass('hidden');
        return;
    }
    //here the selected speciality has sub specialities
    var subSpecialitiesStr = selectedSpecialityOption.attr('data-Childs');
    var subSpecialitiesStr = subSpecialitiesStr.substring(0, subSpecialitiesStr.length - 1);
    //this is array of sub specialities id of the selected speciality
    var subSpecialitiesArr = subSpecialitiesStr.split(',');
    //show sub specialities menu
    $('.subSpeciality-form-group').removeClass('hidden');
    //show sub speciality select control            
    $('.subSpeciality').find('option').each(function (i, el) {
        if (subSpecialitiesArr.indexOf($(el).val()) != -1) {//this element is sub speciality for the selected speciality
            $(subSpecialitiesItems).eq(i).removeClass('hidden');
        }
        else {
            //this element is is not sub speciality for the selected speciality
            $(subSpecialitiesItems).eq(i).addClass('hidden');
        }
    });
    $('.subSpeciality').selectpicker({
        noneSelectedText: language.getGeneralSpecialityName(selectedSpecialityOption.text()),
        title: language.getGeneralSpecialityName(selectedSpecialityOption.text())
    });
}
function showPassword(context) {
    $(context).toggleClass('shown');
    if ($(context).hasClass('shown')) {
        $(context).parents('form').find('input#password').attr('type', 'text');
        $(context).text(language.hidePassword);
    }
    else {
        $(context).parents('form').find('input#password').attr('type', 'password');
        $(context).text(language.showPassword);
    }
}
function checkDoctorProperty(input, property) {
    var inputValue = $(input).val();
    inputValue = (inputValue.length > 0) ? inputValue.trim() : "";
    var formGroup = $(input).parent();
    if (
        (property == "username" && (inputValue == "" || inputValue == undefined || inputValue.length < 3))
        ||
        (property == "phone" && (inputValue.match('[0-9]{11}') == null || inputValue.length > 11))
        ) {
        formGroup.find('label .glyphicon-ok-sign').addClass('hidden');
        formGroup.find('label .fa-close').addClass('hidden');
        return;
    }
    formGroup.find('label .fa-spin').removeClass('hidden');
    $.post('/' + defaultPathForDoctorArea + '/IsUserNameOrPhoneExists', { value: inputValue, propertyType: property },
        function (isExistsProperty, status) {
        formGroup.find('label .fa-spin').addClass('hidden');
        if (isExistsProperty) {
            formGroup.find('label .glyphicon-ok-sign').addClass('hidden');
            formGroup.find('label .fa-close').removeClass('hidden');
        }
        else {
            formGroup.find('label .glyphicon-ok-sign').removeClass('hidden');
            formGroup.find('label .fa-close').addClass('hidden');
        }
    });
}
function validateDoctorRegistrationForm(type, form) {
    var loadingIcon = $(form).find(":submit i");
    var isValidate = true;
        var iconClass=(type=="account")?'fa-edit':'fa-send';
        /*var selectedSpecialityIndex = parseInt($('.specialitySelect .dropdown-menu li.selected').index());
        var selectedSpecialityElement = $('select.specialitySelect option').eq(selectedSpecialityIndex);
        var spSelectedID = selectedSpecialityElement.val();
        var spSelectedSubSpecialityCount = selectedSpecialityElement.attr('data-value');
        var subSpecialityItemsLi = $('.subSpeciality .dropdown-menu li.selected');
        if (spSelectedSubSpecialityCount > 0) {
            if (subSpecialityItemsLi.length == 0) {
                isValidate = false;
                $('.subSpeciality').find('.filter-option').css('color', 'red');
            }
        }*/
        if ($('#username').attr('dataValue') != undefined) {
            var oldUserName = $('#username').attr('dataValue').trim();
            var newUserName = $('#username').val().trim();
            if (oldUserName != newUserName) {
                if (!confirm(language.logoutAfterChangeUsename)) {
                    $('#username').val(oldUserName);
                    isValidate = false;
                }
            }
        }
        if (!$('#termOfUse').is(':checked') && type != "account") {
            $('#termOfUse').siblings('.validationMessage').text(language.mustAgreeOntermOfuser);
            isValidate = false;
        }
        if (isValidate)
        {
            $(loadingIcon).removeClass(iconClass).addClass('fa-circle-o-notch fa-spin');
        }
        return isValidate;
}
function validateDoctorAccountChangePasswrd(form) {
    var password = $(form).find('#password').val();
    var repassword = $(form).find('#repassword').val();
    return (password.trim() == repassword.trim())
}
