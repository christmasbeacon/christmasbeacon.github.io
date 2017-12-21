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

var emojis = [
  "🦌",
  "🎄",
  "🎄",
  "🎄",
  "❄️"
];

greetings.limitToLast(50).on('child_added', function(greeting) {
  console.log(greeting);
  onplant(greeting.val().x, greeting.val().y, greeting.val().text, greeting.val().icon);
});

function onplant(x, y, message, icon) {
  var tree = document.createElement('span');
  tree.setAttribute("class", "emoji-container");
  var m = document.createElement('span');
  m.setAttribute("class", "emoji-text");
  var i = document.createElement('span');
  i.setAttribute("class", "emoji-icon");
  m.textContent = message || '';
  i.textContent = icon;
  tree.appendChild(m);
  tree.appendChild(i);
  tree.style.cssText = `left:calc(${ x * 100 }% - 50px); top:calc(${ y * 100 }% - 25px);`;
	document.body.appendChild(tree);
}

// On-Click Handler for Button
$(document).click(function(e) {
  // Get input text.
  var greeting = $('#input-greeting').val();
  var clickX = e.pageX / window.innerWidth;
  var clickY = e.pageY / window.innerHeight;

  var randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]

  // Our data object to store inside a database table.
  var data = {
    text: greeting,
    x: clickX,
    y: clickY,
    icon: randomEmoji
  }

  // Push some data into greetings ref.
  greetings.push(data);

})
