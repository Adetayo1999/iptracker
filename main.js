
//    document.addEventListener('DOMContentLoaded' , getMap());
const mapform = document.getElementById("mapform");


   mapform.addEventListener("submit" , getMapCoordinates)



    

        let mymap = L.map('tracker__map')        
        mymap.setView([34.041915, -118.09462], 13);

        var marker = L.marker([34.041915, -118.09462]).addTo(mymap);
        
        marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
        
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
        accessToken:"pk.eyJ1IjoidG9taXdhNDU5MSIsImEiOiJja3NoNHR3aWkxcXJ4MnZxa2swbzFsdHN0In0.ZEWR9PS_TakwH_w_hV3PGA"
        
        }).addTo(mymap);

    


    function getMapCoordinates(e){
         e.preventDefault();
         const inputedAddress = document.getElementById("inputedAddress").value;           
        let ipaddress = document.getElementById("ipaddress");
        let locale = document.getElementById("locale");
        let zone = document.getElementById("zone");
        let isprovider = document.getElementById("isp");


        fetch(`https://geo.ipify.org/api/v1?apiKey=at_dttsTPqSpVHaLDmrjG4CpXNUQ5zyr&ipAddress=${inputedAddress}`)
        .then(res => res.json())
        .then(data => {
             
            const { ip , location:{  region , city , lat , lng , timezone , } , isp } = data 
                    
                    ipaddress.innerText = ip;
                    locale.innerText = `${region}, ${city}`;
                    zone.innerText = timezone;
                    isprovider.innerText = isp;
                    
                    mymap.setView([lat, lng], 13);
                    L.marker([lat, lng]).addTo(mymap)
                // console.log();
        })
        .catch(err => console.log(err.message))
       
    }