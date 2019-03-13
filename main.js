const apiKey = 'e8fb26091948075045b4764168f0eb84';
let icon = document.getElementById("icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("humidity-div");
let kaupunki = document.getElementById("kaupunki");
let kuvaus = document.getElementById("kuvaus");
//let container = document.querySelector(".container");
function saa(){
fetch('https://api.openweathermap.org/data/2.5/weather?q=Vantaa,fi&APPID=' + apiKey)
    .then((response) => {
        response.json().then((data) => {
            console.log(data);
            icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            temperature.innerHTML = '' + parseInt(data.main.temp - 273) + "Â°C";
            humidity.innerHTML = 'ðŸ’§ ' + data.main.humidity + "%";
            kaupunki.innerHTML = data.name;
            kuvaus.innerHTML = data.weather[0].description;
            /*
            Ei toimi jostain syystÃ¤. Ideana vaihtaa containerin taustaa lÃ¤mpÃ¶tilan mukaan.
            if (parseInt(data.main.temp - 273) > 15) {
                container.style.backgroundcolor = 'yellow';
            } else if (parseInt(data.main.temp - 273) > 22) {
                container.style.backgroundcolor = 'gold';
            } else if (parseInt(data.main.temp - 273) > 35) {
                container.style.backgroundcolor = 'orangered';
            } else if (parseInt(data.main.temp - 273) > 5) {
                container.style.backgroundcolor = 'slategray';
            } else if (parseInt(data.main.temp - 273) > 10) {
                container.style.backgroundcolor = 'lightyellow';
            } else if (parseInt(data.main.temp - 273) < 4) {
                container.style.backgroundcolor = 'skyblue';
            } else if (parseInt(data.main.temp - 273) < -5) {
                container.style.backgroundcolor = 'cyan';
            } else {
                container.style.backgroundcolor = 'dodgerblue';
            }
            */
        })
    })
    .catch((err)=>{
        console.log('Fetch Error :-S', err);
    });
}
saa();
const main = document.querySelector("#main");
const ul = document.querySelector('ul');
const paivaMaara = () => {
    var d = new Date();
    var n = d.getDate();
    console.log("Date: "+n);
    return n;
}

const getRuokaLista = () => {
    paiva = paivaMaara();
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
        targetUrl = 'https://www.sodexo.fi/ruokalistat/output/daily_json/16365/2019/03/0'+paiva+'/fi'
    fetch(proxyUrl + targetUrl)
        .then(blob => blob.json())
        .then(data => {
            console.table("JSON:",	data.courses);
            console.table("JSON:",	data.courses[0].title_fi);
            console.table("JSON:",	data);
            // document.querySelector("pre").innerHTML = JSON.stringify(data, null, 2); ALKUPERÃ„INEN
            generoi(data.courses);
            return data;
        })
        .catch(e => {
            console.log(e);
            return e;
        });
}

const generoi = (arr) => {
    console.log("haettu lista:",arr);
    for(let i=0;i<arr.length; i++){

        const li = document.createElement('li');
        li.innerHTML = arr[i].title_fi +" , hinta: " + arr[i].price;
        ul.appendChild(li);
    }
}
getRuokaLista();


function editGrid(stationDetails, bool, cancel, hurry){		//päivitä junien tiedot ruudukkoon, booleanin mukaan laitetaan värit gridiin, sekä peruutettu cancel boolean

	for(let i=0; i<4; i++){
		let a = document.getElementById("grid-container");
		if(bool==true){		//laitetaan taustaväri joka toiseen eriväriseksi, sekä punaisella tietyt kohdat kuten juuri lähtevät junat tai perutut

			if(cancel==true){ //juna peruttu
				if(i==3){		//viimeinen sana punaiseksi "CANCELLED"
					a.innerHTML += "<div class='grid-item' style='background-color:#FAFAFA';> <p><font color='#fd4040'>"+stationDetails[i]+"</font></p></div>";
				}else{
					a.innerHTML += "<div class='grid-item' style='background-color:#FAFAFA';> <p><font color='#4a4a4a'>"+stationDetails[i]+"</font></p></div>";
				}
			}else{
				if(hurry==true && i==3){		//jos on alle 10minuuttia aikaa niin punaiseksi teksti
					a.innerHTML += "<div class='grid-item' style='background-color:#FAFAFA';> <p><font color='fd4040'>"+stationDetails[i]+"</font></p></div>";
				}else{
					a.innerHTML += "<div class='grid-item' style='background-color:#FAFAFA';> <p><font color='#4a4a4a'>"+stationDetails[i]+"</font></p></div>";
				}
			}
		}else{	//toisen väriseksi toiset
			if(cancel==true){
				if(i==3){
					a.innerHTML += "<div class='grid-item' style='background-color:#FFFFFF';> <p><font color='	#fd4040'>"+stationDetails[i]+"</font></p></div>";
				}else{
					a.innerHTML += "<div class='grid-item' style='background-color:#FFFFFF';> <p><font color='#bdbdbd'>"+stationDetails[i]+"</font></p></div>";
				}
			}else{
				if(hurry==true && i==3){
					a.innerHTML += "<div class='grid-item' style='background-color:#FFFFFF';> <p><font color='#fd4040'>"+stationDetails[i]+"</font></p></div>";
				}else{
					a.innerHTML += "<div class='grid-item' style='background-color:#FFFFFF';> <p><font color='#4a4a4a'>"+stationDetails[i]+"</font></p></div>";
				}
			} //Jos ei ole peruttu
		} //eri värinen
	} //For loop loppuu
}

function clearGrid(){			//tyhjennä gridi jokaisella haulla

	for(let j=0; j<10; j++){
		for(let i=0; i<4; i++){
			let a = document.getElementById("grid-container");
			a.innerHTML = "";
			}
		}
}

function editStationList(name){	 //Lisää asemien nimet hakulistaan

	let a = document.getElementById("myUL");
	let arr = name.split(" "); //laitetaan arrayksi sen takia että kaksi sanaiset stringit saadaan alla olevaan funktioon

	if(arr.length<2){
		a.innerHTML += "<li onClick=addToInputField('"+arr+"','null')> <a href='#'>"+name+"</a></li>";  //jos vain yksi sanainen asema
	}else{
		a.innerHTML += "<li onClick=addToInputField('"+arr[0]+"','"+arr[1]+"')> <a href='#'>"+name+"</a></li>";
	}

}



function getMetaData(station){  //Kerää asemien nimien lyhenteet

let urlString = "https://rata.digitraffic.fi/api/v1/metadata/stations";
  $.ajax({
                  url: urlString,
                  dataType: "text",
                  success: function(data) {
					let json = $.parseJSON(data);  //Aseman tiedot JSON muodossa
					handleMetaData(json,station);
				  }
      });
}

function handleMetaData(data,station){  //Käytä asemien tietoja

		let stationsArray = [];
		let stationShortCut = [];
		let length2 = Object.keys(data).length; //Asemia yhteensä
		let arr = [];

		for (let i=0;i<length2;i++) {
			arr[i] = [];
		}

		for(let i=0; i<length2; i++){    //Asemat laitetaan 2d array:hin muotoon [aseman nimi][lyhenne]
			arr[i] = [];
			arr[i].push(data[i]["stationName"]);
			arr[i].push(data[i]["stationShortCode"]);
			editStationList(data[i]["stationName"]);				//lisää asemat haku-listaan
		}
		window.globalArr = arr;
}

//main looppi
function getResponse(){

	getDataFromApi();
}

function getShortCode(station, stations){  		//muunna aseman nimi lyhenteeksi esim Helsinki -> HKI

		for(let i=0; i<stations.length; i++){  //katsotaan että haettu asema täsmää ja palautetaan lyhenteenä

				if(station==stations[i][0]){
					return stations[i][1];
				}
		}
}

function realStationName(station, stations){		//muunna aseman lyhenne oikeaksi

		for(let i=0; i<stations.length; i++){

					if(station==stations[i][1]){
					return stations[i][0];
				}
		}
}

function getDataFromApi(){	//Haetaan apista junien online tiedot

let stations = window.globalArr;  //ota juna-asemien nimet arrayna kun sivu ladataan

let station = "Myyrmäki";//document.getElementById("inputField").value;  //hakukentästä haettavan aseman nimi

	let st = "MYR";// getShortCode(station, stations);   //Asema lyhenteenä

	//Millä hakuehdoilla haetaan asemalta haetaa, kuten esimerkiksi monta minuuttia juna näytetään ennen sen lähtöä
	//https://rata.digitraffic.fi/#liikennepaikan-saapuvat-ja-l%C3%A4htev%C3%A4t-junat-aikav%C3%A4lirajoitus -> löytyy selitykset näihin parametreihin
	let urlString =  "https://rata.digitraffic.fi/api/v1/live-trains/station/"+st+"?minutes_before_departure=15&minutes_after_departure=15&minutes_before_arrival=15&minutes_after_arrival=15";

    $.ajax({
                  url: urlString,
                  dataType: "text",
                  success: function(data) {
                        let json = $.parseJSON(data);  //Aseman kautta kulkevien junien tiedot
				    	handleData(json, st);
                  }
      });
}

function handleData(data, stationName){ //käsitellään aseman junien tiedot (Junan numero,lähtöasema, pääteasema, lähtöaika), sekä miltä asemalta etsitään tietoja

	let trains  = Object.keys(data).length;  //montako on tulossa tällä hetkellä

	clearGrid(); //tyhjennä gridi tässä välissä, jottei siihen kasaannu gridejä

	for(let i=0; i<trains; i++) {  //10 seuraavan junan tiedot

	if(i<5){
		let startingPoint = data[i]["timeTableRows"][0]["stationShortCode"];			//Lähtöasema
		startingPoint = realStationName(startingPoint,window.globalArr);

		let endingPoint = getLastStation(data[i]["timeTableRows"]);						//Pääteasema
		endingPoint = endingPoint["stationShortCode"];
		endingPoint = realStationName(endingPoint,window.globalArr);

		let trainNumber = data[i]["trainNumber"];										//Junan numero

		let a = departingTime(data[i]["timeTableRows"], stationName);				//Mihin aikaan pysäkilä
		let aika = formatTime(a);
		let minutes = getMinutes(aika);
		let hours = getHours(aika);

		let time2 = getTime();															//nykyinen aika
		let minutes2 = getMinutes(time2);
		let hours2 = getHours(time2);

		let hurry = false;

		if(hours == hours2){
			if((minutes-minutes2)<5){	//jos aikaa saapumiseen vähemmän kuin 10min, niin punaiseksi teksti
				hurry = true;
			}else if (hours < hours2){
				hurry = true;
			}
		}

		let cancel = getCancelled(data, i);  											//Onko juna peruttu?

		let dataArr = []																//Lista näistä kaikista tiedoista joka lähetetään html muotoon

		if(cancel==true){																//jos on peruttu
			dataArr = [trainNumber, startingPoint, endingPoint, "CANCELLED"];
		}else{
			dataArr = [trainNumber, startingPoint, endingPoint, aika];
		}


		if(i % 2 == 0){																	//joka toinen gridissä eri väriseksi
			editGrid(dataArr,true,cancel,hurry);
		}else{
			editGrid(dataArr,false,cancel,hurry);
		}

		}//<10
	}//dor loop loppuu

	if(trains<5){		//väritetään loput gridit joissa ei ole mitään tietoja

			let a = ["&nbsp;","&nbsp;","&nbsp;","&nbsp;"];  //tyhjiä rivejä gridiin
			let num = 5 - trains

			for (let i=0; i<num; i++){

				if(num % 2 == 0){	 //lasketaan että onko jäljelle jäävien tyhjien gridien määrä jaollinen kahdella ja sen perusteella annetaan värit

					if(i % 2 == 0){
						editGrid(a,true);
					}else{
						editGrid(a,false);
					}
				}else{
					if(i % 2 == 0){
						editGrid(a,false);
					}else{
						editGrid(a,true);
					}
				}
			} //for loop
		}
}

function getLastStation(data){
	let length2 = Object.keys(data).length; //Pysäkkien arrayn pituus ja siitä listan viimeinen on päätepysäkki
	let lastElement = data[length2-1];
	return lastElement;
}

function departingTime(data, stationName){	//Etsitään junan saapumisaika tiedoista

	let length2 = Object.keys(data).length; //Pysäkkejä yhteensä
	for (let i=0; i<length2; i++) {

			if(data[i]["stationShortCode"] == stationName){
				return data[i]["scheduledTime"]; 		//Palautetaan aika jolloin juna on kyseisellä asemalla
			}
		}
}

function getCancelled(data,i){  //tieto perutuista junista

	if(data[i]["cancelled"] == true){
		return true;
	}else{
		return false;
	}
}


function getTime(){			//otetaan nykyinen aika
		let currentdate = new Date();
		let time3 = + currentdate.getHours() + ":" + currentdate.getMinutes();
		return time3;
}

function formatTime(time){		//muokkaa aika oikeaan muotoon
	let time4 = time.slice(11,16);
	
	let tempTime = time4[0] + +time4[1]; //bugi apissa, 3 tuntia j'ljessä
	tempTime = +tempTime + +2;
	
	let tempTime2 = time4[3] + +time4[4]; //bugi apissa
	tempTime2 = +tempTime2 + +20;
	if(tempTime2 > 60){
		let ylijaama = tempTime2-59;
		tempTime++;
		tempTime2 = ylijaama;
		if(tempTime2 < 10){
			tempTime2 = "0"+tempTime2;
		}
	}
	
	let tempTime3 = tempTime + time4[2] + tempTime2;// time4[3] + time4[4];
	return tempTime3;
}

function getMinutes(time){		//palauttaa saapumis ajan minuutit
	return time.slice(3,6);
}

function getHours(time){		//palauttaa saapumis ajan tunnit
	return time.slice(0,3);
}

let mylet = setInterval(myTimer, 5000); //30 sekunnin välein päivitä juna ajat

function myTimer() {
  getDataFromApi();
}

getDataFromApi(); //lataa juna-ajat kerran kun sivu avautuu, ylemmässä ajastimessa tämä päivitetään 30sec välein

function startTime() { //globaali kello juna aikatauluihin
  let today = new Date();
  let h2 = today.getHours();
  let m2 = today.getMinutes();
  let s2 = today.getSeconds();
  m2 = checkTime(m2);
  s2 = checkTime(s2);
  document.getElementById('globalKello').innerHTML =
  h2 + ":" + m2 + ":" + s2;
  let t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}

startTime(); //VR kello

var myIndex = 0;
carousel();

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {myIndex = 1}
    x[myIndex-1].style.display = "block";
    saa();
    setTimeout(carousel, 2000); // Change image every 2 seconds
}