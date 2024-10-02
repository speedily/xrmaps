// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/storage';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7Sz29QSUMB_AAA_l9_HdTEdDZCsHg994",
  authDomain: "havoc-4047c.firebaseapp.com",
  projectId: "havoc-4047c",
  storageBucket: "havoc-4047c.appspot.com",
  messagingSenderId: "138747775040",
  appId: "1:138747775040:web:71688dd4f8c4e53956f7a5",
  measurementId: "G-2G2B74TTY6"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
///const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);


//seperate for storage
const storageRef = firebase.storage().ref();

const file = document.getElementById('fileInput').files[0];

const fileRef = storageRef.child('training_data/' + file.name); // Customize the path as needed

fileRef.put(file).then((snapshot) => {
  // Handle successful upload
  console.log('Upload complete: ', snapshot.ref.fullPath);
}).catch((error) => {
  // Handle errors
  console.error('Upload failed: ', error);
});

fileRef.getDownloadURL().then((url) => {
  // Do something with the download URL
  console.log('Download URL: ', url);
}).catch((error) => {
  // Handle errors
  console.error('Error getting download URL: ', error);
});


const databaseRef = firebase.database().ref();

function srtd()
{
   $(document).ready(function() {
    
    var selectedComp = $('.js-example-basic-single').find(":selected").text();
    var name = $('#rtname').val();
    var contact = $('#rtcontact').val(); 
    var location = $('"#rtloca').val();
    var written = $('"#rtwritten').val();
    var link = $('"#rtlink').val();

    alert("selected:"+selectedComp+" name:"+name+" contact:"+contact+" location:"+location+" written:"+written+" link:"+link);


} );

}


const dataToSubmit = {
  name: "John Doe",
  age: 30,
  city: "New York"
};

databaseRef.push().set(dataToSubmit)
  .then(() => {
    console.log("Data submitted successfully!");
  })
  .catch((error) => {
    console.error("Error submitting data:", error);
  });