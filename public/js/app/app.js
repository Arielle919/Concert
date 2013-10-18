// 'use strict';

// // Firebase Schema
// var Δdb;

// // Local Schema (defined in keys.js)

// $(document).ready(initialize);

// function initialize(fn, flag){
//   if(!canRun(flag)) {return;}

//   $(document).foundation();
//   Δdb = new Firebase(db.keys.firebase);
//   initMap(36, -86, 5);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function initMap(lat, lng, zoom){
//   var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
//   db.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function getValue(selector, fn){
//   var value = $(selector).val();
//   value = value.trim();
//   $(selector).val('');

//   if(fn){
//     value = fn(value);
//   }

//   return value;
// }

// function parseUpperCase(string){
//   return string.toUpperCase();
// }

// function parseLowerCase(string){
//   return string.toLowerCase();
// }

// function formatCurrency(number){
//   return '$' + number.toFixed(2);
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //

// function canRun(flag){
//   var isQunit = $('#qunit').length > 0;
//   var isFlag = flag !== undefined;
//   var value = isQunit && isFlag || !isQunit;
//   return value;
// }

// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
// // -------------------------------------------------------------------- //
