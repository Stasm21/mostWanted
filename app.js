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
    alert(`Name: ${person[0].firstName} ${person[0].lastName}\nGender: ${person[0].gender}\nDOB: ${person[0].dob}\nEye Color: ${person[0].eyeColor}`);
    break;
    case "family":
    let spouse = searchForSpouse(people, person);
    alert(`Spouse: ${spouse[0].firstName} ${spouse[0].lastName}`);
    break;
    case "descendants":
    // TODO: get person's descendants
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


//finished function to search through an array of people to find matching eye colors.
function searchByTrait(people){
  let traitChosen;
  while(true){
  let traitsearch = promptFor("What trait would you like to search this person by?\n(EyeColor, Height, Weight, Gender or Occupation)",autoValid);
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
      default: alert('Please enter a valid trait');
    }
  }
}
//selection menu
let EyeColorSearch;
let matchList; 

//eyecolor
function searchByEyeColor(people){
matchList = []
let matches;
let eyeColorMatch = promptFor("What is the person's eye color?",autoValid);
  EyeColorSearch = people.filter(function(eyeMatch) {
  if(eyeMatch.eyeColor === eyeColorMatch) {
   matchList.push(eyeMatch["firstName"] + " " + eyeMatch["lastName"]);
  } else {
    return false;
  }
})
matches = prompt(`${matchList.length} MATCHES FOUND!!!\n${(matchList.join('\n'))}\n\nFound who you're looking for? Then write 'Yes'.
If still unsure write 'No' to further refine your search`).toLowerCase();
switch(matches){
  case 'yes' :
    app(people);
  break;
  case 'no' :
    searchByTrait()
  break;
}
return matchList;
}

//gender
function searchByGender(people){ 
  let matchesFound = [] 
  let matches;
  let genderMatch = promptFor("What is the person's gender?",autoValid);
  let genderSearch = matchList.filter(function(genderFound) {
    if(genderFound.gender === genderMatch) {
     matchesFound.push(genderFound["firstName"], genderFound["lastName"]);
     console.log(matchesFound);
    } else {
      return false;
    }
  })
  matches = prompt(`${matchList.length} MATCHES FOUND!!!\n${(matchList.join('\n'))}\n\nFound who you're looking for? Then write 'Yes'.\n
  If still unsure write 'No' to further refine your search`);
  return matchList;
  }


//TODO: add other trait filter functions here.
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
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
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
