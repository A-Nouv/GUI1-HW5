/*
Anderson Nouv
Created: 12/15/22
File: scrabble.js
*/ 

/* Originally made by Ramon Meza
   NOT MADE BY ME. WAS IN THE graphics_data zip folder
   JS array of objects for the value of each letter, as well as the original-distribution and the number-remaining
*/
var pieces = [
   {"letter":"A", "value":1,  "amount":9},
   {"letter":"B", "value":3,  "amount":2},
   {"letter":"C", "value":3,  "amount":2},
   {"letter":"D", "value":2,  "amount":4},
   {"letter":"E", "value":1,  "amount":12},
   {"letter":"F", "value":4,  "amount":2},
   {"letter":"G", "value":2,  "amount":3},
   {"letter":"H", "value":4,  "amount":2},
   {"letter":"I", "value":1,  "amount":9},
   {"letter":"J", "value":8,  "amount":1},
   {"letter":"K", "value":5,  "amount":1},
   {"letter":"L", "value":1,  "amount":4},
   {"letter":"M", "value":3,  "amount":2},
   {"letter":"N", "value":1,  "amount":6},
   {"letter":"O", "value":1,  "amount":8},
   {"letter":"P", "value":3,  "amount":2},
   {"letter":"Q", "value":10, "amount":1},
   {"letter":"R", "value":1,  "amount":6},
   {"letter":"S", "value":1,  "amount":4},
   {"letter":"T", "value":1,  "amount":6},
   {"letter":"U", "value":1,  "amount":4},
   {"letter":"V", "value":4,  "amount":2},
   {"letter":"W", "value":4,  "amount":2},
   {"letter":"X", "value":8,  "amount":1},
   {"letter":"Y", "value":4,  "amount":2},
   {"letter":"Z", "value":10, "amount":1},
   {"letter":"Blank", "value":0,  "amount":2}
];

// JavaScript array of objects to determine what letter each piece on your rack is.
var game_tiles = [
   {"id": "piece0", "letter": "A"},
   {"id": "piece1", "letter": "B"},
   {"id": "piece2", "letter": "C"},
   {"id": "piece3", "letter": "D"},
   {"id": "piece4", "letter": "E"},
   {"id": "piece5", "letter": "F"},
   {"id": "piece6", "letter": "G"}
]

// Displays the scrabble letters on the tile rack and allow them to be
// dragged and dropped in the tile rack and scrabble board
function display_letters() {
   var base_url = "graphics_data/Scrabble_Tiles/Scrabble_Tile_"
   var randNum = 1;
   var piece = "";
   var pieceID = "";
   var tile = [];

   // Generates 7 random letters
   for (var i = 0; i < 7; i++) {
      var loop = true;
      while (loop == true) {
         randNum = getRandomInt(0, 26);

         if (pieces[randNum].amount != 0) {
            loop = false;
            pieces[randNum].amount--;
         }
      }

      piece = "<img class='pieces' id='piece" + i + "' src='" + base_url + pieces[randNum].letter + ".jpg" + "'></img>";

      pieceID = "#piece" + i;

      // Assign each pieceID a spot in tile array so they can individually be used
      tile[i] = pieceID;

      
      game_tiles[i].letter = pieces[randNum].letter;

      // Checking that each index has the correct pieceID and letter
      console.log("Tile ", i, ": ", tile[i]);
      console.log("Tile ", i, ": ", game_tiles[i].letter);

      var img_left = 40 + (20 * i);
      var img_top = -120;

      $("#rack").append(piece);

      $(pieceID).css("left", img_left).css("top", img_top).css("position", "relative");

      // Used this demo to help me with the .draggable and .droppable:
      // https://codepen.io/jyloo/pen/GjbmLm

      // Makes letters draggable and can return back to the rack 
      // or scrabble board (wherever they last were) if not dropped in a droppable area
      $(pieceID).draggable({
         scope: "playArea",
         revertDuration: 200,
         start: function() {
            $(tile[0]).draggable("option", "revert", true);
            $(tile[1]).draggable("option", "revert", true);
            $(tile[2]).draggable("option", "revert", true);
            $(tile[3]).draggable("option", "revert", true);
            $(tile[4]).draggable("option", "revert", true);
            $(tile[5]).draggable("option", "revert", true);
            $(tile[6]).draggable("option", "revert", true);
         }
      });

      // Tile stays in droppable areas (tile rack and scrabble board)
      $(".area").droppable({
         scope: "playArea",
         drop: function() {
            $(tile[0]).draggable("option", "revert", false);
            $(tile[1]).draggable("option", "revert", false);
            $(tile[2]).draggable("option", "revert", false);
            $(tile[3]).draggable("option", "revert", false);
            $(tile[4]).draggable("option", "revert", false);
            $(tile[5]).draggable("option", "revert", false);
            $(tile[6]).draggable("option", "revert", false);
         }
      });

      // Check to make sure for loop is working
      console.log("for loop: ", i);
   }
   
}

/* 
Found in StackOverflow:
https://stackoverflow.com/questions/1527803/generating-random-numbers-in-javascript-in-a-specific-range
*/
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}