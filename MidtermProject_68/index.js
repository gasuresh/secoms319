
function fetchLatestData() {
	
	
	
	fetch("./data.json", {cache: "no-store"})
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			displayDataHome(data);
			if(carouselHum && carouselTemp) {
				displayDataHumPic(data, carouselHum);
				displayDataTempPic(data, carouselTemp)
		    } 
		})
		.catch(function (err) {
			console.log('error:' +err);
		})
		
		
}


function displayDataHome(jsonData)
{
	let mainContainer = document.getElementById("sensor_data");
	
	for (let element in jsonData)
	{
		
		
		let dataParagraph = document.getElementById(element)
		dataParagraph.classList.add("fs-4")
		dataParagraph.classList.add("text-primary-emphasis")
		
		if (element === "temp_c" || element === "temp_f")
		{
			dataParagraph.innerHTML = `${jsonData[element]}&#176;`
		}
		
		else if (element === "humidity")
		{
			dataParagraph.innerHTML = `${jsonData[element]}%`
		}
		
		else
		{
			const timeArray = jsonData[element].split(" ")
			dataParagraph.innerHTML = `Date: ${timeArray[0]} <br> Time: ${timeArray[1]}`
		}
		
	}
}

function displayDataHumPic(jsonData, carousel)
{
	let humidity = jsonData["humidity"];
	
	
	if(humidity < 30) {
		
		carousel.to(0)
		
	}
	else if(humidity >= 30 && humidity <= 50) {
		
		carousel.to(1)
		
	}
	else {
		
		carousel.to(2)
		
	}
	
	
}


function displayDataTempPic(jsonData, carousel)
{
	let temp_f = jsonData["temp_f"];
	
	
	if(temp_f < 32)
	{
		carousel.to(0)
		
	}
	
	else if(temp_f >= 32 && temp_f <= 59) {
		
		carousel.to(1)
		
	}
	
	else if(temp_f > 59 && temp_f <= 77)
	{
		carousel.to(2)
	}
	
	
	else
	{
		carousel.to(3)
	}
	
	
}



let carouselHum;
let carouselTemp


let carouselHumEl = document.querySelector("#humCarousel")
if(carouselHumEl != null){
	carouselHum = new bootstrap.Carousel(carouselHumEl, {interval: false})
}

let carouselTempEl = document.querySelector("#tempCarousel")
if(carouselTempEl != null){
	carouselTemp = new bootstrap.Carousel(carouselTempEl, {interval: false})
}

console.log(window.location.href.endsWith("/index.html"))

if (carouselHum && carouselTemp || window.location.href.endsWith("/index.html"))
{
	
	setInterval(fetchLatestData, 5000);
	
}





