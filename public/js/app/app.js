'use strict';

// Firebase Schema


// Local Schema (defined in keys.js)
var gaSeats = [];
var vipSeats = [];
var seats = [];
var GaTotalDatas = 0;
var VipTotalDatas = 0;

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  $('#createSeats').click(createSeats);
  $('#ga').on('dblclick', '.seat', reserveSeat);
  $('#vip').on('dblclick', '.seat', reserveSeat);
}

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

function reserveSeat(){

  var $name = $('#name').val();
  var $parentDiv = $(this);
  var $nameP = $parentDiv.children('.seatName');

  var $SeatType = $parentDiv.children().next().prev().text();
  var $price = $parentDiv.children().next().prev().next().next().text();

 if(($('#sectionSelect').val() === 'ga')){
    $parentDiv.addClass('GaReserved');
  } else if(($('#sectionSelect').val() === 'vip')){
    $parentDiv.addClass('VipReserved');
  } else {

  }

  if(($('.seatName').text() === '')){
    $nameP.append($name);
  } else {

  }

  cashTotals($price,$SeatType,$name);

  $('#name').val('');
}

function cashTotals($price,$SeatType,$name){


  var $GaTotal = $('#gaTotal');
  var $VipTotal = $('#vipTotal');
  var $grandTotal = $('#grandTotal');
  var $GaReserved = $('#gaPeople');
  var $VipReserved = $('#vipPeople');
  var $ReservedTotal = $('#totalPeople');

  var price = (parseInt($price,10));//parse int the price

  if(($('#sectionSelect').val() === 'ga')){
    GaTotalDatas += price;
    $GaTotal.text(GaTotalDatas);
    $grandTotal.text(GaTotalDatas + VipTotalDatas);
    $GaReserved.text($('.GaReserved').length);
    $ReservedTotal.text(($('.GaReserved').length) + ($('.VipReserved').length));

    var li = '<li class="seatType">' + $SeatType +'     '+ $name + '</li>';
    var $li = $(li);
    $('#gaAdd').append($li);

  } else if(($('#sectionSelect').val() === 'vip')){
    VipTotalDatas += price;
    $VipTotal.text(VipTotalDatas);
    $grandTotal.text(GaTotalDatas + VipTotalDatas);
    $VipReserved.text($('.VipReserved').length);
    $ReservedTotal.text(($('.GaReserved').length) + ($('.VipReserved').length));

    var liVip = '<li class="seatType">' + $SeatType +'     '+ $name + '</li>';
    var $liVip = $(liVip);
    $('#vipAdd').append($liVip);

  } else {

  }

}

function createSeats(){
  var name = $('#name').val();
  var seatType = $('#sectionSelect').val();
  var numSeats = getValue('#seatNum', parseInt);
  var price = $('#seatCost').val();


  for(var i = 1; i <= numSeats; i++){
    var div = '<div class="seat"><p class="seatNum">' + seatType + '-' + i + '</p><p class="seatName">' + name + '</p><p class="seatPrice">' + price + '</p></div>';
    var $div = $(div);

    $('#' + seatType).append($div);


    createSeatObject(name, seatType, numSeats, price, i);

    if(($('#sectionSelect').val() === 'ga')){
      gaSeats.push(i);
    } else if(($('#sectionSelect').val() === 'vip')){
      vipSeats.push(i);
    } else {

    }
  }

  $('#seatCost').val('');

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
