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
  var name = $('#name').val();
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
  if($('#name').val() === ''){

  } else {
    var $name = $('#name').val();
  }

  var $parentDiv = $(this);

  if($parentDiv.hasClass('ga')){
    $parentDiv.addClass('gaReserved');
  } else if($parentDiv.hasClass('vip')){
    $parentDiv.addClass('vipReserved');
  } else {

  }

  var index = parseInt(($(this).text().slice(-1)), 10) - 1;
  seats[index].name = $name;

  var $nameP = $parentDiv.children().next();

// var $nameP = $parentDiv.children('.seatName');
// var $SeatType = $parentDiv.children().next().prev().text();
// var $price = $parentDiv.children().next().prev().next().next().text();
  if($nameP.text() === ''){
    $nameP.append($name);
  } else {

  }

  compileTotals(index, $parentDiv);
  // cashTotals($price,$SeatType,$name,$parentDiv);
  // debugger;

  $('#name').val('');
}

// function cashTotals($price,$SeatType,$name,$parentDiv){

function compileTotals(index, $parentDiv){
//   debugger;

//   // var seatsGa = _.filter(seats, function(seat))
//   // var sum = _.reduce(seats, function(memo, num){var temp = memo + seats[index].price;}, 0);

//   if(seats[index].type = 'ga' && $parentDiv.hasClass('purchased')){
//     var gaPurchaseTicket = parseFloat(seats[index].price);
//     gaRevenue += gaPurchaseTicket;
//     $('#gaTotal').text(gaRevenue);
//     $('#gaPeople').text('.reserved'.length);

//   } else {

//   }

//   }

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

}

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
