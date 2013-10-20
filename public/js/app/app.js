'use strict';

// Firebase Schema


// Local Schema (defined in keys.js)
var gaSeats = [];
var vipSeats = [];
var seats = [];


$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();
  $('#createSeats').click(createSeats);
}

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

function createSeats(){
  var name = $('#name').val();
  var seatType = $('#sectionSelect').val();
  var numSeats = getValue('#seatNum', parseInt);
  var price = $('#seatCost').val();


  for(var i = 1; i <= numSeats; i++){
    var div = '<div class="seat"><p class="seatNum">' + seatType + '-' + i + '</p><p class="seatName">' + name + '</p></div>';
    var $div = $(div);
    $('#' + seatType).append($div);

    createSeatObject(name, seatType, numSeats, price, i);

    if(($('#sectionSelect').val() === 'ga')){
      gaSeats.push(i);
    } else if(($('#sectionSelect').val() === 'ga')){
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
  seat.price= price;

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
