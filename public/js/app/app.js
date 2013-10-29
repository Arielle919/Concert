'use strict';

// Firebase Schema


// Local Schema (defined in keys.js)
// var gaSeats = [];
// var vipSeats = [];
var seats = [];
var gaRevenue = 0;
var vipRevenue = 0;

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  $('#createSeats').click(clickCreateSeats);
  $('#ga').on('dblclick', '.seat', dblclickReserveSeat);
  $('#vip').on('dblclick', '.seat', dblclickReserveSeat);
}

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

function clickCreateSeats(){
  // debugger;
  // var name = $('#name').val();
  var seatType = $('#sectionSelect').val();
  var numSeats = getValue('#seatNum', parseInt);
  var price = getValue('#seatCost', parseFloat);
  var $option = $('<option>').val(seatType);


  for(var i = 1; i <= numSeats; i++){
    var div = '<div class="seat"><p class="seatNum">' + seatType + '-' + i  + '</p><p class="seatName">' + name + '</p></div>';
    var $div = $(div);
    $div.addClass(seatType);

    $('#' + seatType).append($div);

    createSeatObject(name, seatType, numSeats, price, i);
    $option.addClass('hidden'); //WHY IS THIS NOT WORKING?

  }
}

function createSeatObject(name, seatType, numSeats, price, i)
  {
    var seat = {};
    seat.name = name;
    seat.number = seatType + '-' + i;
    seat.price = price;
    seat.type = seatType;

    seats.push(seat);
  }

function dblclickReserveSeat($this){
  // debugger;
  if($('#name').val() === ''){return;}
  var $name = $('#name').val();
  var $parentDiv = $(this);
  var index = parseInt(($(this).text().slice(-1)), 10) - 1;
  seats[index].name = $name;

  if($parentDiv.hasClass('ga')){
    $parentDiv.addClass('gaReserved');
  } else if($parentDiv.hasClass('vip')){
    $parentDiv.addClass('vipReserved');
  } else {return;}

  var $nameP = $parentDiv.children().next();

  if($nameP.text() === ''){
    $nameP.append($name);
  } else {return;}

  compileReport(index, $parentDiv);

  $('#name').val('');
}

function compileReport(index, $parentDiv){
  debugger;

  if($parentDiv.hasClass('gaReserved')){
    gaRevenue += seats[index].price;
    $('#gaRevenue').text(formatCurrency(gaRevenue));
    $('#gaSeats').text($('.gaReserved').length); //ok

    var $gaNameLi = '<li class="gaSeatName">' + seats[index].name + '</li>';
    $('#gaSeatNames').append($gaNameLi);

    var $gaNumberLi = '<li class="gaSeatNumber">' + seats[index].number + '</li>'; //ok
    $('#gaSeatNumbers').append($gaNumberLi); //ok

  } else if ($parentDiv.hasClass('vipReserved')) {
    // var vipPurchaseMoney = parseFloat(seats[index].price);

    vipRevenue += seats[index].price;
    $('#vipRevenue').text(formatCurrency(vipRevenue));
    $('#vipSeats').text($('.vipReserved').length);

    var $vipNameLi = '<li class="vipSeatName">' + seats[index].name + '</li>';
    $('#vipSeatNames').append($vipNameLi);

    var $vipNumberLi = '<li class="vipSeatNumber">' + seats[index].number + '</li>';
    $('#vipSeatNumbers').append($vipNumberLi);

  } else {}

  $('#totalRevenue').text(formatCurrency(gaRevenue + vipRevenue));

  var $totalSeats = $('.gaReserved').length + $('.vipReserved').length;
  $('#totalSeats').text($totalSeats);
}

  // var purchased = parseFloat(seats[index].price, 10);
  // balance += purchased;
  // htmlUpdateCash(balance);


  // var $GaTotal = $('#gaTotal');
  // var $VipTotal = $('#vipTotal');
  // var $grandTotal = $('#grandTotal');
  // var $gaReserved = $('#gaPeople');
  // var $vipReserved = $('#vipPeople');
  // var $ReservedTotal = $('#totalPeople');

  // var price = (parseInt($price,10));//parse int the price

  // if(($parentDiv).hasClass('gaSection')){
  //   GaTotalDatas += price;
  //   $GaTotal.text(GaTotalDatas);
  //   $grandTotal.text(GaTotalDatas + VipTotalDatas);
  //   $GaReserved.text($('.GaReserved').length);
  //   $ReservedTotal.text(($('.GaReserved').length) + ($('.vipReserved').length));

  //   var li = '<li class="seatType">' + $SeatType +'     '+ $name + '</li>';
  //   var $li = $(li);
  //   $('#gaAdd').append($li);

  // } else if(($parentDiv).hasClass('vipSection')){
  //   VipTotalDatas += price;
  //   $VipTotal.text(VipTotalDatas);
  //   $grandTotal.text(GaTotalDatas + VipTotalDatas);
  //   $vipReserved.text($('.vipReserved').length);
  //   $ReservedTotal.text(($('.GaReserved').length) + ($('.vipReserved').length));

  //   var liVip = '<li class="seatType">' + $SeatType +'     '+ $name + '</li>';
  //   var $liVip = $(liVip);
  //   $('#vipAdd').append($liVip);

  // } else {

  // }

// }

function htmlUpdateCash(){

}

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

  function getValue(selector, fn){
    var value = $(selector).val();
    value = value.trim();
    $(selector).val('');

    if(fn){
      value = fn(value);
    }

    return value;
  }

  function parseUpperCase(string){
    return string.toUpperCase();
  }

  function parseLowerCase(string){
    return string.toLowerCase();
  }

  function formatCurrency(number){
    return '$' + number.toFixed(2);
  }

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

  function canRun(flag){
    var isQunit = $('#qunit').length > 0;
    var isFlag = flag !== undefined;
    var value = isQunit && isFlag || !isQunit;
    return value;
  }

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
