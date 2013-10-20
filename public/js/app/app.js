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


  $parentDiv.addClass('reserved');

  $nameP.append($name);

  cashTotals($price);
}

function cashTotals($price){

  var $GaTotal = $('#gaTotal');
  var $VipTotal = $('#vipTotal');
  var price = (parseInt($price,10));//parse int the price

  if(($('#sectionSelect').val() === 'ga')){
    GaTotalDatas += price * gaSeats.length;
    $GaTotal.text(GaTotalDatas);
  } else if(($('#sectionSelect').val() === 'vip')){
    VipTotalDatas += price * vipSeats.length;
    $VipTotal.text(VipTotalDatas);
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
