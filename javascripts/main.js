"use strict";

let apiKeys = {};

let imageList = (searchText)=>{
	return new Promise ((resolve, reject) => {
		$.ajax({//first ajax request for keys
			method: "GET",
			url:"apiKeys.json"
		}).then((response) => {
			apiKeys = response;
			let authHeader = /*"Client-ID " +*/ apiKeys.client_id;
			// console.log("authHeader",authHeader );	
			
			 $.ajax({//be sure to read api doc to see if you need this Authorization code
				method: "GET",//use this GET method to get the url below
			// 	headers:{
			// 		"Authorization": authHeader
			// 	},
				url: `http://api.openweathermap.org/data/2.5/weather?zip=${searchText},us&units=imperial&APPID=${authHeader}`,
			}).then((response2)=>{
				console.log("imgur response",response2);
				resolve(response2);
			},(errorResponse2)=>{
			console.log("imgur fail", errorResponse2);
			reject(errorResponse2);
			});
		},(errorResponse)=>{
			reject(errorResponse);
		});
	});
};
$(document).ready(function(){
	$("#clicky-button").on("click",()=>{
	 $("#clicky-button").button("loading");
	$("#output").html("");	
		let searchy = $("#weather-search").val();
		console.log("its working", searchy);
		//imageList(searchy);
		 imageList(searchy).then((dataFromWeather)=>{
		 	// $('#clicky-button').button("reset");
		 	console.log("data from newest call", dataFromWeather);
		 	console.log('yo', dataFromWeather.weather[0].description);
			// dataFromWeather.forEach((image)=>{
				 $('#output').append(`<div id="weather-search">city: ${dataFromWeather.name}</div>
				 					  <div id="weather-search">conditions: ${dataFromWeather.weather[0].description}</div>
				 					  <div id="weather-search">temperature: ${dataFromWeather.main.temp}</div>
				 					  <div id="weather-search">air pressure: ${dataFromWeather.main.pressure}</div>
				 					  <div id="weather-search">wind speed: ${dataFromWeather.wind.speed}</div>`);	
			});
	 	});
	 });
