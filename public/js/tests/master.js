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

test('Number of Divs and Number of Properties, ', function(){
  expect(6);

  $('#sectionSelect option').val('ga').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');

  deepEqual($('#ga > div').length, 35, 'should be 35 ga seats divs');

  deepEqual($('#ga > div.seat:nth-child(4) > p').length, 2, 'GA Should be 2 properties in div name and number');
  deepEqual($('#ga > div.seat:nth-child(4)').text(), 'ga-3', 'In the 4th position ga-5 should appear');//ask child why is this acts as an array

  $('#sectionSelect option').val('vip').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');

  deepEqual($('#vip > div').length, 35, 'should be 35 vip seats divs');

  deepEqual($('#vip > div.seat:nth-child(4) > p').length, 2, 'VIP Should be 2 properties in div name and number');
  deepEqual($('#vip > div.seat:nth-child(4)').text(), 'vip-3', 'In the 4th position vip-5 should appear');//ask child why is this acts as an array

  // deepEqual('seats[4].number').text(), 'vip-5', 'in object number vip-5 should appear');//ask child why is this acts as an array

});

