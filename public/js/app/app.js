'use strict';

// Firebase Schema


// Local Schema (defined in keys.js)
var gaSeats = [];
var vipSeats = [];
var seats = [];
var gaRevenue = 0;
var vipRevenue = 0;


var GaTotalDatas = 0;
var VipTotalDatas = 0;

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


  for(var i = 1; i <= numSeats; i++){
    var div = '<div class="seat"><p class="seatNum">' + seatType + '-' + i  + '</p><p class="seatName">' + name + '</p></div>';
    var $div = $(div);
    $div.addClass(seatType);

    $('#' + seatType).append($div);

    createSeatObject(name, seatType, numSeats, price, i);

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
  if($('#name').val() === ''){} //need to come back to this - what do i do to make nothing else execute?
  var $name = $('#name').val();
  var $parentDiv = $(this);
  var index = parseInt(($(this).text().slice(-1)), 10) - 1;
  seats[index].name = $name;


  if($parentDiv.hasClass('ga')){
    $parentDiv.addClass('gaPurchased');
  } else if($parentDiv.hasClass('vip')){
    $parentDiv.addClass('vipPurchased');
  } else {}

  var $nameP = $parentDiv.children().next();

  if($nameP.text() === ''){
    $nameP.append($name);
  } else {}

  compileReport(index, $parentDiv);

  $('#name').val('');
}

function compileReport(index, $parentDiv){
  debugger;

  if($parentDiv.hasClass('gaPurchased')){
    gaRevenue += seats[index].price;
    $('td#gaTotal').text(formatCurrency(gaRevenue));
    $('td#gaSeats').text($('.gaPurchased').length);

    var $gaNameLi = '<li class="gaSeatName">' + seats[index].name + '</li>';
    $('ul#gaSeatNames').append($gaNameLi);

    var $gaNumberLi = '<li class="gaSeatNumber">' + seats[index].number + '</li>';
    $('ul#gaSeatNumbers').append($gaNumberLi);

  } else if ($parentDiv.hasClass('vipPurchased')) {
    // var vipPurchaseMoney = parseFloat(seats[index].price);

    vipRevenue += seats[index].price;
    $('td#vipTotal').text(formatCurrency(vipRevenue));
    $('td#vipSeats').text($('.vipPurchased').length);

    var $vipNameLi = '<li class="vipSeatName">' + seats[index].name + '</li>';
    $('ul#vipSeatNames').append($vipNameLi);

    var $vipNumberLi = '<li class="vipSeatNumber">' + seats[index].number + '</li>';
    $('ul#vipSeatNumbers').append($vipNumberLi);

  } else {}

  var $totalRevenue = gaRevenue + vipRevenue;
  $('td#totalRevenue').text(formatCurrency($totalRevenue));

  var $totalSeats = $('.gaPurchased').length + $('.vipPurchased').length;
  $('td#totalSeats').text($totalSeats);

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
