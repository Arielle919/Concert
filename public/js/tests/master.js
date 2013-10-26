'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
  var seats = [];

}

function teardownTest(){
}

test('Default DropDown, values, button', function(){
  expect(3);

  $('#sectionSelect option').val('sectionNeutral').attr('selected',true);
  $('#seatNum').val('');
  $('#seatCost').val('');
  $('#createSeats').trigger('click');

  deepEqual($('select#sectionSelect option:selected').val(), 'sectionNeutral', 'sectionNeutral is showing on page load');
  deepEqual($('#seatNum').val(), '', 'seatNum should be blank on page load');
  deepEqual($('#seatCost').val(), '', 'seatCost should be blank on page load');
});

test('GA Seat Div Creation', function(){
  expect(3);

  $('#sectionSelect option').val('ga').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');

  deepEqual($('#ga > div').length, 35, 'should be 35 ga seat divs');
  deepEqual($('#ga > div.seat:nth-child(4) > p').length, 2, 'div should contain 2 <p> tags');
  deepEqual($('#ga > div.seat:nth-child(4) > p.seatNum').text(), 'ga-4', 'ga seat div should have ga-4 in 4th seat, seat number p tag');
});

test('VIP Seat Div Creation', function(){
  expect(3);

  $('#sectionSelect option').val('vip').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');

  deepEqual($('#vip > div').length, 35, 'should be 35 vip seat divs');
  deepEqual($('#vip > div.seat:nth-child(4) > p').length, 2, 'seat div should contain 2 <p> tags');
  deepEqual($('#vip > div.seat:nth-child(4) > p.seatNum').text(), 'vip-4', 'vip seat div should have vip-4 in 4th seat, seat number p tag');

});

test('GA Seat Object Creation', function(){
  expect(4);
  $('#sectionSelect option').val('ga').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');
  $('#name').val('mary');
  $('.seat').trigger('dblclick');

  deepEqual(seats[3].name, 'mary', 'name should be present');
  deepEqual(seats[3].number, 'ga-4', 'ga-4 should be seat number');
  deepEqual(seats[3].price, '50', '50 should be seat price');
  deepEqual(seats[3].type, 'ga', 'ga should be seat type');
});

test('VIP Seat Object Creation', function(){
  expect(4);
  $('#sectionSelect option').val('vip').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');
  $('#name').val('mary');
  $('.seat').trigger('dblclick');

  deepEqual(seats[3].name, 'mary', 'name should be present');
  deepEqual(seats[3].number, 'vip-4', 'ga-4 should be seat number');
  deepEqual(seats[3].price, '50', '50 should be seat price');
  deepEqual(seats[3].type, 'vip', 'ga should be seat type');
});

test('GA Reserve Seat', function(){
  expect(3);

  $('#sectionSelect option').val('ga').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');
  $('#name').val('mary');
  $('.seat').trigger('dblclick');

//will need to come back to this on monday after i get answer on why nth-child(1) is no value!
  deepEqual($('#ga > div.seat:nth-child(5) > p.seatNum').text(), 'ga-4', 'should have ga-4 in 4th seat, seat number p tag');
  deepEqual($('#ga > div.seat:nth-child(5) > p.seatName').text(), 'mary', 'should have mary in 4th seat, seat name p tag');
  ok($('#ga > div.seat:nth-child(5)').hasClass('gaReserved'), true, 'should have a class of gaReserved');
});

test('VIP Reserve Seat', function(){
  expect(3);

  $('#sectionSelect option').val('vip').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');
  $('#name').val('bob');
  $('.seat').trigger('dblclick');

//will need to come back to this on monday after i get answer on why nth-child(1) is no value!
  deepEqual($('#vip > div.seat:nth-child(5) > p.seatNum').text(), 'vip-4', 'should have vip-4 in 4th seat, seat number p tag');
  deepEqual($('#vip > div.seat:nth-child(5) > p.seatName').text(), 'bob', 'should have bob in 4th seat, seat name p tag');
  ok($('#vip > div.seat:nth-child(5)').hasId('vipReserved'), true, 'should have a class of gaReserved');

});

test('Revenue and Seat Reporting', function(){
  expect(14);

  $('#sectionSelect option').val('ga').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');
  $('#sectionSelect option').val('vip').attr('selected',true);
  $('#seatNum').val('20');
  $('#seatCost').val('100');
  $('#createSeats').trigger('click');
  $('#name').val('mary');
  $('.ga .seat div:nth-child(4)').trigger('dblclick'); ///WHAT IS THIS TARGET?
  $('#name').val('bob');
  $('.ga .seat div:nth-child(10)').trigger('dblclick'); ///WHAT IS THIS TARGET?
  $('#name').val('gary');
  $('.vip .seat div:nth-child(').trigger('dblclick'); ///WHAT IS THIS TARGET?
  $('#name').val('alice');
  $('.vip.seat').trigger('dblclick');  ///WHAT IS THIS TARGET?
  $('#name').val('sally');
  $('.vip.seat').trigger('dblclick');  ///WHAT IS THIS TARGET?

  deepEqual($('#revenue  tr  #gaRevenue').text(), '$70.00', 'should have $70.00 in GA Revenue');
  deepEqual($('#revenue  tr  #vipRevenue').text(), '300.00', 'should have $300.00 in VIP Revenue');
  deepEqual($('#revenue  tr  #totalRevenue').text(), '$370.00', 'should have $370.00 in Total Revenue');

  deepEqual($('#seatCount  tr  #gaSeats').text(), '2', 'should have 2 in GA Seats');
  deepEqual($('#seatCount  tr  #vipSeats').text(), '3', 'should have 3 in VIP Seats');
  deepEqual($('#seatCount  tr  #totalSeats').text(), '5', 'should have 5 in VIP Seats');

  deepEqual($('#gaSeatNumber li').length, 2, 'should be 2 GA seat numbers in Seat List');
  deepEqual($('#vipSeatNumber li').length, 3, 'should be 3 VIP seat numbers in Seat List');
  deepEqual($('#gaName li').length, 2, 'should be 2 GA names in Seat List');
  deepEqual($('#vipName li').length, 3, 'should be 3 VIP seat names in Seat List');

  deepEqual($('#vipSeatNumber li:nth-child(2)').text('alice'), 'alice', 'should have alice in 2nd vip list name position');
  deepEqual($('#vipName li:nth-child(2)').text('vip-??????'), 'vip=?????', 'should have VIP-??? in 2nd vip list seat position');
  deepEqual($('#gaSeatNumber li:nth-child(2)').text('bob'), 'bob', 'should have bob in 2nd ga list name position');
  deepEqual($('#gaName li:nth-child(2)').text('ga-??????'), 'ga-?????', 'should have GA-??? in 2nd ga list seat position');

});
  // deepEqual($('#gaTotal').text(), '1750', 'ga $ total is 1750');


  // deepEqual($('#ga > div.seat:nth-child(4) > p:first-child').text(), 'ga-3', 'In the 4th position ga-5 should appear');//ask child why is this acts as an array

  // $('#name').val('mary');
  // $('.seat').trigger('dblclick');

  // deepEqual($('#ga > div').hasClass('GaReserved'), true, 'background color should be same as class gaReserved');


// test('VIP seat val cost and number, length, and dblclick ', function(){
//   expect(5);
//   $('#sectionSelect option').val('vip').attr('selected',true);
//   $('#seatNum').val('35');
//   $('#seatCost').val('50');
//   $('#createSeats').trigger('click');
//   $('#name').val('bob');
//   $('.seat').trigger('dblclick');

//   deepEqual($('#vipTotal').text(), '1750', 'vip $ total is 1750');

//   deepEqual($('#vip > div').length, 35, 'should be 35 vip seats divs');

  // deepEqual($('#vip > div').hasClass('vipReserved'), true, 'background color should be same as class vipReserved');

  // deepEqual($('#vip > div.seat:nth-child(4) > p').length, 3, 'VIP Should be 3 properties in div name and number');
  // deepEqual($('#vip > div.seat:nth-child(4) > p:first-child').text(), 'vip-3', 'In the 4th position vip-5 should appear');//ask child why is this acts as an array

  // $('#seatName').val('');
// });



// test('GA Revenue and People Totals', function(){
//   expect(1);
//   $('#sectionSelect option').val('ga').attr('selected',true);
//   $('#seatNum').val('100');
//   $('#seatCost').val('15');
//   $('#createSeats').trigger('click');
//   $('#name').val('sally');
//   $('.seat').trigger('dblclick');

//   deepEqual($('#gaTotal').text(), '15', 'ga revenue is 50');
//   deepEqual($('#gaPeople').text(), '1', 'ga person is 1');
// })

// test('VIP Revenue and People Totals', function(){
//   expect(1);
//   $('#sectionSelect option').val('vip').attr('selected',true);
//   $('#seatNum').val('35');
//   $('#seatCost').val('50');
//   $('#createSeats').trigger('click');
//   $('#name').val('bob');
//   $('.seat').trigger('dblclick');

//   deepEqual($('#vipTotal').text(), '50', 'vip revenue is 50');
//   deepEqual($('#vipPeople').text(), '1', 'vip person is 1');
// })

