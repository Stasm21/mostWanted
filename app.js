"use strict"


//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no': //search by traits. ~DONE~
      searchResults = searchByTrait(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch(displayOption){
    case "info":
    displayPerson(person[0]);
    mainMenu(person, people);
    break;
    case "family":

      let spouse = searchForSpouse(people, person)
      alert(`Spouse: ${spouse[0].firstName} ${spouse[0].lastName}`);
      mainMenu(person, people)
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
      let descendants = searchForDescendants(people, person)
      alert(descendants);
      mainMenu(person, people)
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchForSpouse(people, person) {
  let spouse = people.filter(function (findSpouse) {
    if ((findSpouse.id === person[0].currentSpouse) === true) {
      return findSpouse;
    }
  })
  return spouse;
}
//#endregion
function searchForDescendants(people, person) {
  let arr = [];
  people.filter(function (findDescendents) {
    if ((findDescendents.id == person[0].parents[0]) === true || (findDescendents.id == person[0].parents[1]) === true) {
      arr.push(findDescendents)
    }
  })
    if (arr.length === 0) {
    return 'No descendants found'
  } else if (arr.length === 1) {
    return `Descendants:\n${arr[0].firstName} ${arr[0].lastName}`;
  } else if (arr.length === 2) {
    return `Descendants:\n${arr[0].firstName} ${arr[0].lastName}\n${arr[1].firstName} ${arr[1].lastName}`;
  }
}
//#endregion

//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
function searchByName(people){
  let firstName = promptFor("What is the person's first name?",autoValid);
  let lastName = promptFor("What is the person's last name?",autoValid);

  let foundPerson = people.filter(function(potentialMatch){
    if(potentialMatch.firstName.toLowerCase() === firstName && potentialMatch.lastName.toLowerCase() === lastName){
      return true;
    }
    else{
      return false;
    }
  })
    return foundPerson;
}

let traitChosen;

function searchByTrait(people){
  if(people.length > 1){
    let traitsearch = promptFor("What trait would you like to search this person by?\n'eye color', 'height', 'weight', 'gender' or 'occupation'",autoValid);
      switch (traitsearch) {
      case 'eye color' :
      traitChosen = searchByEyeColor(people)
      break;
      case 'height' :
      traitChosen = searchByHeight(people)
      break;
      case 'weight' :
      traitChosen = searchByWeight(people)
      break;
      case 'gender' :
      traitChosen = searchByGender(people)
      break;
      case 'occupation' :
      traitChosen = searchByOccupation(people)
      break;
      default:
      alert('Please enter a valid trait'); 
      break;
    }
  }else{
    return traitChosen;
  } 
}

function searchByEyeColor(people){
  let eyeColorSearch = promptFor("What is the person's eye color?",autoValid);
  let eyeColorFiltered = people.filter(function(eyeColorMatch){
    if (eyeColorMatch.eyeColor.toLowerCase() === eyeColorSearch){
    return true;
  }
  else{
    return false;
  }
  })
  displayPeople(eyeColorFiltered)
  if(eyeColorFiltered.length > 1){
    searchByTrait(eyeColorFiltered)
  }else {
    return eyeColorFiltered[0];
  }
  
}

function searchByHeight(people){
  let heightSearch = promptFor("What is the person's height(in)?",autoValid);
  let heightFiltered = people.filter(function(heightMatch){
    if (heightMatch.height === parseInt(heightSearch)){
    return true;
  }
  else{
    return false;
  }
  })
  displayPeople(heightFiltered);
  if(heightFiltered.length > 1){
    searchByTrait(heightFiltered)
  }else{
    return heightFiltered[0];
  }
}

function searchByWeight(people){
  let weightSearch = promptFor("What is the person's weight?",autoValid);
  let weightFiltered = people.filter(function(weightMatch){
    if (weightMatch.weight === parseInt(weightSearch)){
    return true;
  }
  else{
    return false;
  }
  })
  displayPeople(weightFiltered);
  if(people.length > 1){
    searchByTrait(weightFiltered)
  }
}

function searchByGender(people){
  let genderSearch = promptFor("What is the person's gender?",autoValid);
  let genderFiltered = people.filter(function(genderMatch){
    if (genderMatch.gender.toLowerCase() === genderSearch){
    return true;
  }
  else{
    return false;
  }
  })
  displayPeople(genderFiltered);
  if(people.length > 1){
    searchByTrait(genderFiltered)
  }
}

function searchByOccupation(people){
  let OccupationSearch = promptFor("What is the person's eye color?",autoValid);
  let OccupationFiltered = people.filter(function(OccupationMatch){
    if (OccupationMatch.Occupation.toLowerCase() === OccupationSearch){
    return true;
  }
  else{
    return false;
  }
  })
  displayPeople(OccupationFiltered);
  if(people.length > 1){
    searchByTrait(OccupationFiltered)
  }
}
//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n" +
  "Height: " + person.height + '\n' + 'Weight: ' + person.weight + '\n' +
  'Dob: ' + person.dob + '\n' + 'Occupation: ' + person.occupation + '\n' +
  'Eye Color: ' + person.eyeColor;
  alert(personInfo);
}
//#endregion
//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid){
  let response;
  let isValid;
  do{
    response = prompt(question.trim());
    isValid = valid(response)
  } while(response === ""  ||  isValid === false)
  return response.toLowerCase();
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input){
  if(input.toLowerCase() == "yes" || input.toLowerCase() == "no"){
    return true;
  }
  else{
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input){
  return true; // default validation only
}
//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
//#endregion
