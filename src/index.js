

//This function is called when the user submits their earch request.
// This is where you handle what happens when the usr searches
document.getElementById("search").addEventListener("submit", function (event) {
  //Gets the value of the users input
  let input = document.getElementById("destination").value;
   
  //------------------------------------------------------------------------
  //TASK 1
  //error checking on user input
  //------------------------------------------------------------------------

  //now we need to get information from our database which is held in a json file
  readFile(input);

  //The following two lines prevent the page from reloading when the form is submitted
  event.preventDefault();
  return false;
});

// This function retreieves data from the database contained in the local
// database.json file. You can then call functions inside this.
function readFile() {
  const fs = require("fs");
  fs.readFile("src/database.json", "utf8", (err, jsonString) => {
    //error checkign to make sure that the database is read correctly
    if (err) {
      //This line will print if an error occurs
      console.log("Error reading file from disk:", err);
      return;
    }
    // the try catch method is used as an error prevention method. The code
    // in the 'try' section is run and if errors occur then the 'catch'
    // code is run
    try {
      // create an array of objects which will be each country
      var countries = JSON.parse(jsonString);
      //loop through each country
      countries.forEach(function (country) {
        //------------------------------------------------------------------------
        // TASK 2 and 3
        // you may want to create a seperate function and simply call that function here
        //------------------------------------------------------------------------
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
}

// This is an optional function to write data to the database. You do not need this function
// unless you finish all tasks and want to add more functionality.
function writeFile() {
  const fs = require("fs");
  fs.readFile("src/database.json", "utf8", (err, jsonString) => {
    //error checkign to make sure that the database is read correctly
    if (err) {
      //This line will print if an error occurs
      console.log("Error reading file from disk:", err);
      return;
    }
    // the try catch method is used as an error prevention method. The code
    // in the 'try' section is run and if errors occur then the 'catch'
    // code is run
    try {
      // create an array of objects which will be each country
      var countries = JSON.parse(jsonString);
      //loop through each country
      countries.forEach(function (country) {
        // YOUR CODE HERE
      });

      var stringCountries = JSON.stringify(countries);

      fs.writeFile("src/blank.json", stringCountries, (err) => {
        if (err) {
          console.log("Error writing file", err);
        } else {
          console.log("Successfully wrote file");
        }
      });
    } catch (err) {
      console.log("Error parsing JSON string:", err);
    }
  });
}

// Dont worry about this function until Task 4
// This function works to check how similar two strings are
function levenshtein(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  var matrix = [];

  // increment along the first column of each row
  var i;
  for (i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  // increment each column in the first row
  var j;
  for (j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  // Fill in the rest of the matrix
  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) == a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j] + 1
          )
        ); // deletion
      }
    }
  }

  return matrix[b.length][a.length];
}
