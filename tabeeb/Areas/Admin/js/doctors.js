/// <reference path="../../../Scripts/jquery-1.12.4.min.js" />
/// <reference path="../../../Scripts/jquery-ui-1.12.1.min.js" />
/// <reference path="extension.js" />
/// <reference path="adminTable.js" />
/// <reference path="jtable/jquery.jtable.min.js" />
var modelType;
$(function () {
    var dataContainer = $('#doctors');
     modelType = dataContainer.data('model');
    var tableTitle = "الاطباء" 
    dataContainer.jtable({
        title: tableTitle,
        paging: true,
        pageSize: 6,
        actions: {
            listAction:   '/admin/doctor/List?type='+modelType,            
            deleteAction: '/admin/doctor/Delete'
        },
        fields: {
            id: {
                key: true,
                list: false
            },
            name: {
                title: 'اسم الطبيب'
            },
            dateOfJoin: {
                title: 'تاريخ التسجيل',
                type:'date'
            },
            phone: {
                title: 'رقم التليفون',
                sorting:false
            },
            mail: {
                title: 'البريد الالكترونى'
            },
            details: {
                title: 'العمليات على الحقول',
                display:function(data)
                {
                    return doctorDetails(data.record);
                }
            }
        }       
    });
    //Re-load records when user click 'load records' button.
    $('#LoadRecordsButton').click(function (e) {
        e.preventDefault();
        dataContainer.jtable('load', {
            doctorName: $('#docName').val(),
            dateOfregister: $('#dateOfregister').val()
        });
    });
    //Load all records when page is first shown
    $('#LoadRecordsButton').click();
   // dataContainer.jtable('load');
});
function doctorDetails(record)
{
    var buttonControlsContainer = $('<div></div>');
    var buttonDetails = $('<a  class="btn btn-info" data-toggle="modal" data-target="#viewModal"> عرض<i class="fa fa-book fa-lg"></i></a>');
    buttonDetails.click(function () {
        fillDetailsModal(record);
    });
    buttonControlsContainer.append(buttonDetails);
    if (record.stat != undefined)
    {
        var buttonActivate;
        if (record.stat == false) {
            buttonActivate = $('<a href="#" class="btn btn-success" onclick="return activation(this,' + '\'' + record.id + '\'' + ')"><text>تفعيل</text> <i class="glyphicon glyphicon-saved  fa-lg"></i></a>');
        }
        else {
            buttonActivate = $('<a href="#" class="btn btn-danger"  onclick="return activation(this,' + '\'' + record.id + '\'' + ',' + false + ')"><text>تعطيل</text> <i class="fa fa-remove  fa-lg"></i></a>');
        }
        buttonControlsContainer.append(buttonActivate);
    }
    return buttonControlsContainer;
}
function fillDetailsModal(item) {
    $('#viewModal table tr td').remove();
    var html = '';
        var doctorSpecialities = "";
        var specialities = item.specialities;
        for (var i = 0; i < specialities.length; i++) {
            var sp = specialities[i];
            doctorSpecialities += sp.name;
            if (i < specialities.length - 1) doctorSpecialities += ",";
        }
        var type = (item.type == true) ? 'ذكر' : 'انثى';
        var tableTr = $('#viewModal table tr');
        tableTr.eq(0).append('<td>' + item.name + '</td>');
        tableTr.eq(1).append('<td>' + new Date(parseInt(item.dateOfJoin.substr(6))).toDateString() + '</td>');
        tableTr.eq(2).append('<td>' + item.phone + '</td>');
        tableTr.eq(3).append('<td>' + item.mail + '</td>');
        tableTr.eq(4).append('<td>' + type + '</td>');
        tableTr.eq(5).append('<td>' + item.examinFees + '</td>');
        tableTr.eq(6).append('<td>' + doctorSpecialities + '</td>');
        tableTr.eq(7).append('<td>' + item.education + '</td>');
        tableTr.eq(8).append('<td>' + item.city + '</td>');
        tableTr.eq(9).append('<td>' + item.destName + '</td>');
        tableTr.eq(10).append('<td>' + item.allReservings + '</td>');
        tableTr.eq(11).append('<td>' + item.dayReservings + '</td>');
        $('#viewModal img').attr('src', '/Areas/doctors/profImages/' + item.proImage);
        if(modelType=="noProfile")
        {
            tableTr.eq(5).remove();
            tableTr.eq(10).remove();
            tableTr.eq(11).remove();
            tableTr.eq(7).remove();
        }
}
