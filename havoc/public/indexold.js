
    // Initialize Firebase
    const app = firebase.initializeApp({
      apiKey: 'AIzaSyD7Sz29QSUMB_AAA_l9_HdTEdDZCsHg994',
      authDomain: 'havoc-4047c.firebaseapp.com',
      projectId: 'havoc-4047c',
      storageBucket: "havoc-4047c.appspot.com",
  messagingSenderId: "138747775040",
  appId: "1:138747775040:web:71688dd4f8c4e53956f7a5",
  measurementId: "G-2G2B74TTY6",    
databaseURL: "https://havoc-4047c-default-rtdb.firebaseio.com/"
    });


    //var globalgeojson = "";

    var globalgeojson = {
        type: "FeatureCollection",
        features: [],
      };

    //

    const rootRef = firebase.database().ref();

    // Get a reference to the Realtime Database
    //const db = firebase.database();

    // Get a reference to the root of the Realtime Database
    //const rootRef = db.ref();

    // Listen for form submissions
    document.getElementById('myForm').addEventListener('submit', (e) => {
      e.preventDefault();

      
      //const name = document.getElementById('name').value;
      var low = $('#rtloca').val();
      //console.log("location title sent:");
      //console.log(low); //ok

      var manual ="";
    var link = encodeURI("https://nominatim.openstreetmap.org/search?q="+low+"+Bengaluru+Karnataka+India&format=geocodejson");
    $.getJSON(link, 
        function(result)
    {     
      //console.log('inside result');  
      var oh = result.features[0].geometry.coordinates[0];
      var oh1 = result.features[0].geometry.coordinates[1];
      //$("div").html(oh+" && "+oh1);
        //rv = result.features[0].geometry.coordinates.toString();
        manual = "["+oh+","+oh1+"]";
        //console.log("coords sent:"+ rv);
        console.log("manual:");
        console.log(manual);
       //return manual;
    });


      //var lo = nominatim(low);

      // execute after 1 sec

      setTimeout(function (){
  
        // Something you want delayed.
 
        console.log("location coords sent:"); //empty
        console.log(manual);
        
  
        var dataToSubmit = {
          issue : $('.js-example-basic-single').find(":selected").text(),
          name : $('#rtname').val(),
          contact : $('#rtcontact').val(), 
          location : $('#rtloca').val(),
          locationc : manual,
          written : $('#rtwritten').val(),
          link : $('#rtlink').val(),
          dateofc: new Date().toLocaleString(),
          department : $('.js-example-basic-single :selected').parent().attr('label'),
          status : "New"
        };
  
          //console.log("we are going to  send:");
          //console.log(dataToSubmit);
  
  
        var newPostRef = rootRef.child('rtdata').push().set(dataToSubmit)
        .then(() => {
          $('#id01').css({"display": "block"});
          //const key = snapshot.key;
          const key = newPostRef.key;
          console.log("Generated key:", key);
          console.log("Data submitted successfully!");   
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });

      }, 2000);





    });
  


    const storageRef = firebase.storage().ref();



    document.getElementById('AIFiFo').addEventListener('submit', (e) => {
        e.preventDefault();

        const file = document.getElementById('avatar').files[0];

        //console.log('file name: ', file.name);

        const fileRef = storageRef.child('trainingdata/' + file.name); // Customize the path as needed
        
        $('#UploadingStatus').html('<img src="./images/loading.gif" style="color: blue; style="height:16px; width:16px;"></i> Uploading In Progress');

fileRef.put(file).then((snapshot) => {
  // Handle successful upload
  //console.log('Upload complete: ', snapshot.ref.fullPath);
  $('#UploadingStatus').html('<img src="./images/done.png" style="color: green; height:16px; width:16px;"></i> File Uploaded');
}).catch((error) => {
  // Handle errors
  console.error('Upload failed: ', error);
});



    });




    var database = firebase.database().ref().child('rtdata');
    database.on('value', function(snapshot){
        if(snapshot.exists()){
            var content = '';

            content += '<tr>';
  content += '<th>Complaint ID</th>';  
  content += '<th>Date</th>'; 
  content += '<th>Issue</th>';
  content += '<th>Location Of Issue</th>';
  content += '<th>Department</th>';
  content += '<th>Name/Anonymous(Telegram)</th>';
  content += '<th>Contact Complainer</th>';
  content += '<th>Written Details</th>';
  content += '<th>Photo/Video Link</th>';
  content += '<th>Status</th> ';
content += '</tr>';
/*    
var obj = `{
    'type': 'FeatureCollection',
    "age" : 32,
    "married" : false,
    }`;


    const geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-77.032, 38.913]
            },
            'properties': {
              'title': 'Mapbox',
              'description': 'Washington, D.C.'
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-122.414, 37.776]
            },
            'properties': {
              'title': 'Mapbox',
              'description': 'San Francisco, California'
            }
          }
        ]
      };
*/
            snapshot.forEach(function(data){
                
                
                content += '<tr>';
  content += '<td>'+ data.key+'</td>';
  content += '<td>'+ data.val().dateofc +'</td>'; 
  content += '<td>'+ data.val().issue +'</td>';
  content += '<td>'+ data.val().location +'</td>';
  content += '<td>'+ data.val().department +'</td>';
  content += '<td>'+ data.val().name +'</td>';
  content += '<td>'+ data.val().contact +'</td>';
  content += '<td>'+ data.val().written +'</td>';
  content += '<td><a href="'+ data.val().link +'" >'+ data.val().link +'</a></td>';
  content += '<td>'+ data.val().status +'</td>';
  content += '</tr>';
                 
  //mapboxxgeocoders(data.val().location);
  //return geo coordinates
  //var locastore = data.val().location;
  //console.log("locastore:");
  //console.log(locastore);

  var geocoorda = JSON.parse(data.val().locationc);


  //var geocoorda= nominatim(locastore); // blank due to foreach timeout before response from ajax

  console.log("geocoorda recv:");
  console.log(geocoorda);

  const features = [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: geocoorda,
      },
      properties: {
        title: data.val().issue,
        description: data.val().location
      },
    },
    // Add more features as needed
  ];
  
  const geojson = createGeoJSON(features);
  //console.log("globalgeojson:");
  //console.log (globalgeojson);
                 
            });
    
            $('#y-table').html(content);

            // add markers to map
            mapboxxmarkersadd();
  


        }
    });

function nominatim(loca)
{  var rv="";  //console.log('inside nomina');

    var link = encodeURI("https://nominatim.openstreetmap.org/search?q="+loca+"+Bengaluru+Karnataka+India&format=geocodejson");
    $.getJSON(link, 
        function(result)
    {     
      //console.log('inside result');  
      var oh = result.features[0].geometry.coordinates[0];
      var oh1 = result.features[0].geometry.coordinates[1];
      //$("div").html(oh+" && "+oh1);
        //rv = result.features[0].geometry.coordinates.toString();
        var manual = "["+oh+","+oh1+"]";
        //console.log("coords sent:"+ rv);
        console.log("manual:");
        console.log(manual);
       return manual;
    });

}


    
function mapboxxmarkersadd()
{

    for (const feature of globalgeojson.features) {
        // create a HTML element for each feature
                       /* 
                       BrokenStreetLights
                        AirPollution
                        GarbageDump
                        OverfloodingLake
                        RoadAccident 
                        PublicTransport(Bus/Cab/Auto)
                        CrowdedBuses
                        Crime
                        Bribe
                        TerrorismHint
                        OfficeAbuse
                        DumpedChild/Elders
                        NewStrayAnimals
                        */


        const el = document.createElement('div');
        el.className = 'marker';
        var mt= feature.properties.title.replace(" ",""); 
        console.log(mt);
        //el.style.backgroundImage = `url(https://picsum.photos/id/${marker.properties.imageId}/${width}/${height})`;

        if (mt !="PublicTransport(Bus/Cab/Auto)" && mt !="DumpedChild/Elders")
        {
            el.style.backgroundImage =  `url(./images/markers/`+mt+`.png)`;
        }
        else if (mt =="PublicTransport(Bus/Cab/Auto)")    
        {
            el.style.backgroundImage =  `url(./images/markers/transport.png)`; 
        }
        else if (mt =="DumpedChild/Elders")    
        {
                el.style.backgroundImage =  `url(./images/markers/childelder.png)`; 
        }
        el.style.width = `64px`;
        el.style.height = `64px`;
        el.style.backgroundSize = '100%';

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
          .setLngLat(feature.geometry.coordinates)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
              )
          )
          .addTo(map);
      }

}




//sample geojson
/*
    const geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-77.032, 38.913]
            },
            'properties': {
              'title': 'Mapbox',
              'description': 'Washington, D.C.'
            }
          },
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [-122.414, 37.776]
            },
            'properties': {
              'title': 'Mapbox',
              'description': 'San Francisco, California'
            }
          }
        ]
      };
*/

      function createGeoJSON(features) {
        
      
        for (let i = 0; i < features.length; i++) {
          const feature = features[i];
          const geometry = {
            type: feature.geometry.type,
            coordinates: feature.geometry.coordinates,
          };
          const properties = {
            // Include relevant properties from feature
            //name: feature.properties.name,
            title: feature.properties.title,
            description: feature.properties.description,
            
          };
      
          const newFeature = {
            type: "Feature",
            geometry,
            properties,
          };
      
          globalgeojson.features.push(newFeature);
        }
      
        return globalgeojson;
      }
      
      

  function test()
  {
    alert("i dont reload");
  }


  $(document).ready(function() {

    $("#pdf-button").click(function() {
    var link = "http://www.desorissa.nic.in/pdf/dshb-dhenkanal-2020-final.pdf";
 //upload pdf
    uploadpdf(link);
})

  //var link = "./dhenkanal.pdf";
 //upload pdf
 function uploadpdf(link)
 {
 $.ajax({
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCdFp0shl_gXc1P2PvzFp6yWN7Ba2kU3BI',
crossDomain: true,
method: 'post',
contentType: 'application/json',
data: '{\n      "contents": [{\n        "parts":[\n          {"text": "Can you add a few more lines to this poem?"},\n          {"file_data":{"mime_type": "application/pdf", "file_uri": ' + link + '}}]\n        }]\n       }'
}).done(function(response) {
console.log(response);
});

} 


// Replace with your Gemini Chat API key
// message = 'Explain how AI works';
function sendMessage(message) {
    $.ajax({
    url: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCdFp0shl_gXc1P2PvzFp6yWN7Ba2kU3BI',
    crossDomain: true,
    method: 'post',
    contentType: 'application/json',
    data: JSON.stringify({
    'contents': [
    {
    'parts': [
    {
    'text': message
    }
    ]
    }
    ]
    })
    }).done(function(data) {
console.log(data);
//JSON.stringify(data)
var td = JSON.stringify(data.candidates[0].content.parts[0].text);
var tr = td.replace(/(?:\r\n|\r|\n)/g, '<br>');

$("#usagetotaltokens").html(JSON.stringify(data.usageMetadata.totalTokenCount));
$("#usageprompttokens").html(JSON.stringify(data.usageMetadata.promptTokenCount));
$("#usagecandidatestokens").html(JSON.stringify(data.usageMetadata.candidatesTokenCount));


displayResponse(tr);
})
}




$("#send-button").click(function() {
    const message = $("#message-input").val();
    sendMessage(message);
    $("#message-input").val("");
})

function displayResponse(response) {
    $("#chat-container").append("<p><strong>Gemini Chat:</strong> " + response + "</p>");
}

})