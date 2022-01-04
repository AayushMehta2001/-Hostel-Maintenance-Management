(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });
    
        var myCalendar = $('.js-datepicker');
        var isClick = 0;
    
        $(window).on('click',function(){
            isClick = 0;
        });
    
        $(myCalendar).on('apply.daterangepicker',function(ev, picker){
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
    
        });
    
        $('.js-btn-calendar').on('click',function(e){
            e.stopPropagation();
    
            if(isClick === 1) isClick = 0;
            else if(isClick === 0) isClick = 1;
    
            if (isClick === 1) {
                myCalendar.focus();
            }
        });
    
        $(myCalendar).on('click',function(e){
            e.stopPropagation();
            isClick = 1;
        });
    
        $('.daterangepicker').on('click',function(e){
            e.stopPropagation();
        });
    
    
    } catch(er) {console.log(er);}
    /*[ Select 2 Config ]
        ===========================================================*/
    
    try {
        var selectSimple = $('.js-select-simple');
    
        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });
    
    } catch (err) {
        console.log(err);
    }
    

})(jQuery);





// let dropdown = document.getElementById('locality-dropdown');
// dropdown.length = 0;

// let defaultOption = document.createElement('option');
// defaultOption.text = 'Choose type';

// dropdown.add(defaultOption);
// dropdown.selectedIndex = 0;

// const url = 'F:/maintenanceGUI/json/complaintType.json';

// fetch(url)  
//   .then(  
//     function(response) {  
//       if (response.status !== 200) {  
//         console.warn('Looks like there was a problem. Status Code: ' + 
//           response.status);  
//         return;  
//       }

//       // Examine the text in the response  
//       response.json().then(function(data) {  
//         let option;
    
//     	for (let i = 0; i < data.length; i++) {
//           option = document.createElement('option');
//       	  option.text = data[i].type;
//       	  option.value = data[i].abbreviation;
//       	  dropdown.add(option);
//     	}    
//       });  
//     }  
//   )  
//   .catch(function(err) {  
//     console.error('Fetch Error -', err);  
//   });



document.getElementById('autofillDate').valueAsDate = new Date();



// var now = new Date();
// // var inputElementTime = document.getElementsByName("time")[0];
// var inputElementDate = document.getElementsByName("date")[0];
// // inputElementTime.value = ("0" + now.getHours()).slice(-2) + ":" + ("0" + now.getMinutes()).slice(-2);
// inputElementDate.value = now.getUTCFullYear() + "-" + ("0" + now.getMonth()).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);





// function populateSelect() {
      
//         var birds = [
//             {"ID": "001", "Bird_Name": "Eurasian Collared-Dove"},
//             {"ID": "002", "Bird_Name": "Bald Eagle"},
//             {"ID": "003", "Bird_Name": "Cooper's Hawk"},
//         ];

//         var ele = document.getElementById('sel');
//         for (var i = 0; i < birds.length; i++) {
//             // POPULATE SELECT ELEMENT WITH JSON.
//             ele.innerHTML = ele.innerHTML +
//                 '<option value="' + birds[i]['ID'] + '">' + birds[i]['Bird_Name'] + '</option>';
//         }
//     }

//     function show(ele) {
//         // GET THE SELECTED VALUE FROM <select> ELEMENT AND SHOW IT.
//         var msg = document.getElementById('msg');
//         msg.innerHTML = 'Selected Bird: <b>' + ele.options[ele.selectedIndex].text + '</b> </br>' +
//             'ID: <b>' + ele.value + '</b>';
//     }


let dropdown = $('#locality-dropdown');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Select Type</option>');
dropdown.prop('selectedIndex', 0);

const url = 'json/complaintType.json';

// Populate dropdown with list of provinces
$.getJSON(url, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option></option>').attr('value', entry.abbreviation).text(entry.type));
  })
});