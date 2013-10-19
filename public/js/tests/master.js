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

test('Number of General Admission Seats', function(){
  expect(2);

  $('#sectionSelect option').val('ga').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');

  deepEqual($('#ga > div').length, 35, 'should be 35 ga seats divs');

  $('#sectionSelect option').val('vip').attr('selected',true);
  $('#seatNum').val('35');
  $('#seatCost').val('50');
  $('#createSeats').trigger('click');

  deepEqual($('#vip > div').length, 35, 'should be 35 vip seats divs');

});

// test('Name Populates Seat <p> on Seat Double-Click', function(){
//   expect(2);
//   $('#name').val('mary');
//   $('#seatCost').val('120');
//   $('#createSeats').trigger('click');

//   deepEqual($('#vip > div').length, 35, 'should be 35 seats divs');
// });
