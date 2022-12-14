/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            // TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            // TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people)
            {
                
            };
            alert(personFamily);
            break;
        case "descendants":
            // TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            //Must be children and grandchildren
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;

        case "test":
            let results = searchByTraits(people);
            console.log(results);
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) { //comparing names
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()


/*function searchByTraits(people)
{
    let filteredTrait=[];
    let genderTrait="";
    let heightTrait="";
    let weightTrait="";
    let eyeTrait="";
    let occupationTrait="";
    let traitChoice = promptFor("Are you looking for 'one' trait or 'many''?", chars);
    if (traitChoice=="one")
    {
        let trait = promptFor("Please select one of the following traits: 'gender', 'height', 'weight', 'eye' color, 'occupation':", chars)
        switch (trait) 
        {
            case "gender":
                genderType = promptFor("enter 'male' or 'female: ", chars);
                filteredTrait = people.filter (function (el)
                {        
                    if (el.gender==genderType)
                {
                    return true;
                }
                });
                break;

            case "height":
                heightType = promptFor("Enter a height in inches: ", chars);
                filteredTrait = people.filter (function (el)
                {
                    if (el.height == heightType)
                    {
                        return true;
                        
                    }
                });
                break;
        
            case "weight":
                weightType = promptFor("Enter weight in pounds: ", chars);
                filteredTrait = people.filter (function (el)
                {
                    if (el.weight == weightType)
                    {
                        return true;
                        
                    }
                });
                break;
        
            case "eye":
                let eyeType = promptFor("Please enter an eye color: ", chars);
                filteredTrait = people.filter (function (el)
                {
                    if (el.eyeColor == eyeType)
                    {
                        return true;
                        
                    }
                });
                break;
        
            case "occupation":
                let occupationType = promptFor("Please enter occupation: ", chars);
                filteredTrait = people.filter (function (el)
                {
                    if (el.occupation == occupationType)
                    {
                        return true;
                        
                    }
                });
                break;
            }
    }
    else if (traitChoice=="many")
    {
        let filteredTrait="";
        
        filteredTrait = searchByUserDefinedProp(people).map(function (el)
        {
            return el;
        });

    }
    return filteredTrait;
}

        /*let yesOrNo = promptFor("Would you like to search by gender(yes/no): ", yesNo).toLowerCase();
        if (yesOrNo == "yes")
        {
            let genderType = promptFor("enter 'male' or 'female: ", chars);
            genderTrait = people.filter (function (el)
            {        
                if (el.gender==genderType)
                {
                    return true;
                }
            });
        }
        else if (yesOrNo=="no")
        {
            genderTrait = people;
        }
        yesOrNo = promptFor("Would you like to search by height(yes/no): ", yesNo).toLowerCase();
        if (yesOrNo == "yes")
        {
            let heightType = promptFor("enter height in inches: ", chars);
            heightTrait = people.filter (function (el)
            {        
                if (el.height==heightType)
                {
                    return true;
                }
            });
        }
        else if (yesOrNo=="no")
        {
            return heightTrait=people;
        }
        yesOrNo=promptFor("Would you like to search by weight(yes/no): ", yesNo).toLowerCase();
        if (yesOrNo == "yes")
        {
            let weightType = promptFor("enter weight in pounds: ", chars);
            weightTrait = people.filter (function (el)
            {        
                if (el.weight==weightType)
                {
                    return true;
                }
            });
        }
        else if (yesOrNo=="no")
        {
            return weightTrait=people;
        }
        yesOrNo=promptFor("Would you like to search by eye color(yes/no): ",yesNo).toLowerCase();
        if (yesOrNo == "yes")
        {
            let eyeType = promptFor("enter eye color: ", chars);
            eyeTrait = people.filter (function (el)
            {        
                if (el.eyeColor==eyeType)
                {
                    return true;
                }
            });
        }
        else if (yesOrNo=="no")
        {
            return eyeTrait=people;
        }
        yesOrNo=promptFor("Would you like to search by ocupation(yes/no): ", yesNo).toLowerCase();
        if (yesOrNo == "yes")
        {
            let occupationType = promptFor("enter occupation: ", chars);
            occupationTrait = people.filter (function (el)
            {        
                if (el.occupation==occupationType)
                {
                    return true;
                }
            });
        }
        else if (yesOrNo=="no")
        {
            return occupationTrait=people;
        }
        filteredTrait = people.filter(function (el)
        {
            if (el.gender.includes(genderType) && el.height.includes(heightType) && el.weight.includes(weightType) && el.eyeColor.includes(eyeType) && el.occupation.includes(occupationType))
            {
                return true;
            }

        });*/
        






/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    // #1a: finish getting the rest of the information to display //////////////////////////////////////////
    return personInfo;
}
// End of displayPerson()


function findPersonFamily(person, people)
{
    let wholeFamily = people.map(
        function(el)
        {
            let spouseName="";
            let parents="";
            let siblings="";
            if (person.currentSpouse == el.id)
            {
                spouseName = `Spouse:\nFirst Name ${el.firstName}\n`;
                spouseName += `Last name ${el.lastName}\n`; 
            }

            if (person.parents[0] == el.id || person.parents[1] == el.id)
            {
                parents += `Parent:\nFirst Name: ${el.firstName}\n`;
                parents += `Last Name: ${el.lastName}\n`;
            }
            if (person.parents[0]==el.parents[0])
            {
                siblings += `Sibling:\nFirst name: ${el.firstName}\n`;
                siblings += `Last Name: ${el.lastName}`
            }
            //compare parent ID 1 for siblings
            let familyNames = `${parents}${spouseName}${siblings}`; //\n
            return familyNames;
        }

    );


    return wholeFamily;
}


function findPersonDescendants(person, people)
{
    let descendants = people.map
    (
        function(el)
        {
            let descends="";
            if (person.id == el.parents[0] || person.id == el.parents[1])
            {
                descends += `Child: ${el.firstName} ${el.lastName}`
            }
            if (person.id == el.parents[0] || person.id == el.parents[1] && el.parents == el.id)
            {
                descends += ` Grandchild: ${el.firstName} ${el.lastName}`;
            }

            return descends;
        }
    )
    return descendants;
}
/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????
// 

function searchByTraits(people=[])
{
    let userInputProp=promptFor("Enter gender, weight, height, eyeColor, occupation: ",chars);
    let userInputVal=promptFor("Enter value: ", chars);
    let filteredTrait = people.filter(function (el)
    {
        try 
        {
            if (el[userInputProp] === userInputVal)
            {
                return true;
            }
        }
        catch (error) 
        {
            alert(error);
        }
        finally
        {
            if (el[userInputProp] === parseInt(userInputVal))
            {
                return true;
            } 
        }
    });
    let allResults = filteredTrait.map(function(el)
    {
        return `First name: ${el.firstName}\nLast name: ${el.lastName}\n`;
    });
    alert(allResults);

    if (filteredTrait.length===1) return filteredTrait;
    else if (filteredTrait.length===0) return searchByTraits(people);
    return searchByTraits(filteredTrait);
}