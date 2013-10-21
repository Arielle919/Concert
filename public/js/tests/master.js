'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){
}

test('DropDown, values, button', function(){
  expect(3);

  $('#sectionSelect option').val('sectionNeutral').attr('selected',true);
  $('#seatNum').val('');
  $('#seatCost').val('');
  $('#createSeats').trigger('click');

  deepEqual($('select#sectionSelect option:selected').val(), 'sectionNeutral', 'sectionNeutral is showing');
  deepEqual($('#seatNum').val(), '', 'seatNum should be blank');
  deepEqual($('#seatCost').val(), '', 'seatCost should be blank');
});

test('GA Number of Divs and Number of Properties and dbl Clicked, ', function(){
  expect(5);

  $('#sectionSelect option').val('ga').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');

  deepEqual($('#ga > div').length, 35, 'should be 35 ga seats divs');

  deepEqual($('#ga > div.seat:nth-child(4) > p').length, 3, 'GA Should be 3 properties in div name and number');
  deepEqual($('#ga > div.seat:nth-child(4)').text(), 'ga-350', 'In the 4th position ga-5 should appear');//ask child why is this acts as an array

  $('#name').val('mary');
  // $('#seatName').val('');
  $('.seat').trigger('dblclick');

  deepEqual($('#ga > div').hasClass('GaReserved'), true, 'background color should be same as class gaReserved');
  deepEqual($('#gaTotal').text(), '1750', 'ga $ total is 1750');

});

test('VIP seat val cost and number, length, and dblclick ', function(){
  expect(5);
  $('#sectionSelect option').val('vip').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');

  deepEqual($('#vip > div').length, 35, 'should be 35 vip seats divs');

  deepEqual($('#vip > div.seat:nth-child(4) > p').length, 3, 'VIP Should be 3 properties in div name and number');
  deepEqual($('#vip > div.seat:nth-child(4)').text(), 'vip-350', 'In the 4th position vip-5 should appear');//ask child why is this acts as an array

  $('#name').val('bob');
  // $('#seatName').val('');
  $('.seat').trigger('dblclick');

  deepEqual($('#vip > div').hasClass('VipReserved'), true, 'background color should be same as class VipReserved');
  deepEqual($('#vipTotal').text(), '1750', 'vip $ total is 1750');

});

