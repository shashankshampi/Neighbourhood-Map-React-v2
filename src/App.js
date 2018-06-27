/* *****************************
   **Developed and Designed By** 
   ********shashank sanket******
*/
import React, {Component} from 'react';
import Map from './Map';
import Complex from "./Complex";
import './index.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [
                { 
                    'PlaceName': "Bannerghatta National Park",
                    'lat': 12.800285,
                    'lng': 77.577047  
                },
                {
                    'PlaceName': 'Lalbagh Botanical Garden',
                    'lat': 12.950743,
                    'lng': 77.584777,  
                },
                {
                    'PlaceName': 'Vidhana Soudha',
                    'lat': 12.979462,
                    'lng': 77.590909
                },
                {
                    'PlaceName': 'Cubbon Park',
                    'lat': 12.976347,
                    'lng': 77.592928
                },
                {
                    'PlaceName': "Tipu Sultan's Summer Palace",
                    'lat': 12.959342,
                    'lng': 77.573625
                },
                {
                    'PlaceName': "Visvesvaraya Technological Museum",
                    'lat': 12.975226,
                    'lng':77.596345
                },
                {
                    'PlaceName': "Jawaharlal Nehru Planetarium",
                    'lat': 12.984731,
                    'lng': 77.589489
                },
                {
                    'PlaceName': "Bangalore Fort",
                     'lat': 12.962901,
                    'lng': 77.576046
                },
                {
                    'PlaceName': "ISKCON Temple Bangalore",
                    'lat': 13.009833,
                    'lng':77.551096
                },
                {
                    'PlaceName': "Wonderla Bangalore",
                    'lat': 12.834556,
                    'lng': 77.400972
                }
            ],
            'Mark': [],
             'map': '',
            'informationWindow': ''
        };
	this.Pointer = this.Pointer.bind(this);
        this.initMap = this.initMap.bind(this);
        this.Markspoter = this.Markspoter.bind(this); 
    }
    componentDidMount() {
        window.initMap = this.initMap;
        MapLoader('https://maps.googleapis.com/maps/api/js?key=AIzaSyBe3zAG-R8pBPxA3mbzh24ER1CdT_k_INw&callback=initMap');
    }
    initMap() {
        var map;
        map = new window.google.maps.Map(document.getElementById('map'), {
            center: {lat: 12.971599, lng: 77.594563},
            zoom: 13
        });
        var iw = new window.google.maps.InfoWindow({});
        this.setState({map: map, informationWindow: iw});
        this.Markspoter(map);
    }
    Markspoter(map) {
        let global = this;

        this.state.markers.forEach(m => {
            const lc = {lat: m.lat, lng: m.lng}

            let mark = new window.google.maps.Marker({
                position: lc,
                map: map,
                title: m.PlaceName
            });
            mark.addListener('click', function () {
                global.Pointer(mark);
            });

            let virtMarker = this.state.Mark;
            virtMarker.push(mark);

            this.setState({Mark: virtMarker});
        });
    }

    Pointer(node= '') {
        const addr = "https://api.foursquare.com/v2/venues/search?client_id=" + 'A0RQGD4P1KEFNMJHHB0THD0H2C51OLRNWU42FN1D2AQD1SU5' + "&client_secret=" + 'XOUFIOCM2A2XTAM5SSFPT3WBXNHLAL40PTFP3KVGXYZBDMII' + '&v=20180323&ll=' + node.getPosition().lat() + "," + node.getPosition().lng() + "&limit=1";

        if (this.state.informationWindow.node !== node) {
            this.state.informationWindow.node = node;
            this.state.informationWindow.open(this.state.map, node);
            node.setAnimation(window.google.maps.Animation.DROP);
            this.state.informationWindow.addListener('closeClick', function () {
            this.state.informationWindow.setMarker(null);
            });
            this.infoloader(addr);
        }
    }
    infoloader(addr) {
        var global = this.state.informationWindow;
        fetch(addr).then(function (respond) { if (respond.status !== 200) {
                 this.state.informationWindow.setContent("Erron on data retrival");
                 return;
       }
       //obtaining Result from the Foursquare API and considering the 1st result
     respond.json().then(function (resdata) {
    var data = resdata.response.venues[0];
    var rating=0;
    var desc='';
    var urls='';
    var count=0;
    var locate='';
    locate = "<p><b>Address:</b> "+ data.location.address + ", " + data.location.city +"</p>";
    count = "<p><b>UserCount:</b> "+ data.stats.usersCount +"</p>";
    rating = "<p><b>Rating:</b> "+ data.rating +"</p>";
    desc = "<p><b>Description:</b> "+ data.description +"</p>";
    urls = "<p><b>Website:</b> "+ data.url +"</p>";
    global.setContent( "<div id='node'>" + "<h2>" + global.node.title + "</h2>" +  rating + desc + count + urls + locate + "</div>"  );
                });
            }).catch(function (err) {
                global.setContent("Failed To load Data, Try Again");
            });        
    }
   render() {
        return (
          <div>
              <header>
                 <Complex infoWindow={this.state.informationWindow} openInfo={this.Pointer} virtualMarker={this.state.Mark}>
                 </Complex>
                    <h1 id="title"><br/>Bangalore Tourist Places List</h1>
                    <h3 id="title"><span>Designed & Developed by Shashank Sanket</span></h3>
               </header>
               <Map markers={this.state.markers}></Map>
          </div>
        );
     }
  }
function MapLoader(addr) {
    var refrn = window.document.getElementsByTagName("script")[0];
    var obj = window.document.createElement("script");
    obj.src = addr;
    obj.async = true;
    obj.onerror = function () { document.write("Fail To Load the value"); };
    refrn.parentNode.insertBefore(obj, refrn);
}
export default App;
