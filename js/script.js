// Initialize Firebase
var config = {
    apiKey: "AIzaSyDBMSpFoDC6P_4ARTpDiCi8eOjiy-gESQI",
    authDomain: "beacon-christmas.firebaseapp.com",
    databaseURL: "https://beacon-christmas.firebaseio.com",
    projectId: "beacon-christmas",
    storageBucket: "beacon-christmas.appspot.com",
    messagingSenderId: "597533871086"
};
firebase.initializeApp(config);
console.log(firebase);

// Get a reference to our database.
var database = firebase.database();
var greetings = database.ref('greetings');

greetings.limitToLast(25).on('child_added', function(greeting) {
  console.log(greeting);
  onplant(greeting.val().x, greeting.val().y, greeting.val().text);
})

function onplant(x, y, message) {
  var tree = document.createElement('span');
  var m = document.createElement('span');
  var i = document.createElement('span');
  m.textContent = message || '';
  i.textContent = '🎄';
  tree.appendChild(m);
  tree.appendChild(i);
  tree.style.cssText = `left:${ x * 100 }%; top:${ y * 100 }%`;
	document.body.appendChild(tree);
}

// On-Click Handler for Button
$(document).click(function(e) {
  // Get input text.
  var greeting = $('#input-greeting').val();
  var clickX = e.pageX / window.innerWidth;
  var clickY = e.pageY / window.innerHeight;



  // Our data object to store inside a database table.
  var data = {
    text: greeting,
    x: clickX,
    y: clickY
  }

  // Push some data into greetings ref.
  greetings.push(data);

})
