var names =  [];
var passkeys = [];
var grades = [];
var ninthGraders = [];
var tenthGraders = [];
var eleventhGraders = [];
var twelvthGraders = [];
filterGrades();
var AA1 = [];
var AP1 = [];
var PAE1 = [];
var CAO1 = [];
var CSH1 = [];
var HC1 = [];
var AA2 = [];
var AP2 = [];
var PAE2 = [];
var CAO2 = [];
var CSH2 = [];
var HC2 = [];
var AA3 = [];
var AP3 = [];
var PAE3 = [];
var CAO3 = [];
var CSH3 = [];
var HC3 = [];
var AA4 = [];
var AP4 = [];
var CAO4 = [];
var HC4 = [];
var AA5 = [];
var AP5 = [];
var CAO5 = [];
var HC5 = [];
var faqQuestions = [];
var faqCategories = ["Student Usage", "Administrator Usage", "Interface Usage"];
var faqCategoryList = [];
var faqAnswers = [];
var faqStudentQuestions = [];
var faqAdminQuestions = [];
var faqInterfaceQuestions = [];
var bugs;
var categoryNames = {
  "AA": "Academic Achievement",
  "AP": "Athletic Participation",
  "PAE": "Performing Arts Experience",
  "CAO": "Clubs and Organizations",
  "CSH": "Community Service Hours",
  "HC": "Honors Classes"
};
var currentStudent;
var currentPasskey;
var currentStudentIndex;
var studentObject = {};
var currentCategory;
fillLists();
filterGrades();
filterQuestions();
updateStudentNameDropdown();
//var PasskeyInput = __;
//var studentNameDropdowns = __;

onEvent("adminStudentSelectBackButton", "click", function( ) {
  setScreen("adminSelectScreen");
});

onEvent("administratorButton", "click", function( ) {
  setProperty("adminPasskeyInput", "hidden", false);
  setProperty("adminEnterButton", "hidden", false);
});
onEvent("faqScreenBackButton", "click", function( ) {
  setScreen("HomeScreen");
});
onEvent("adminEnterButton", "click", function( ) {
  //change screen according to passkey correctness
  setProperty("incorrectAdminPasskey", "hidden", true);
  if (getText("adminPasskeyInput") == 1234) {
    setScreen("adminSelectScreen");
    setProperty("adminPasskeyInput", "hidden", true);
    setProperty("adminEnterButton", "hidden", true);
  } else if (getText("adminPasskeyInput") == ""){
    setText("incorrectAdminPasskey", "*Please enter the passkey*");
    setProperty("incorrectAdminPasskey", "hidden", false);
  }
  else {
    setText("incorrectAdminPasskey", "*Incorrect Passkey*");
    setProperty("incorrectAdminPasskey", "hidden", false);
  }
  setText("adminPasskeyInput", "");
});

onEvent("gradeSelectorA", "change", function( ) {
  updateStudentNameDropdown();
});
onEvent("enterButtonA", "click", function( ) {
  //find the index of the currently selected student in names list to find the coincident point values
  currentStudent = getText("studentNameDropdownA");
  setText("mainSelectionName", currentStudent);
  for (var i = 0; i < names.length; i++) {
    if ((names[i] == currentStudent)) {
      setScreen("Main_SelectionScreen");
      currentStudentIndex = i;
    }
  }
});
onEvent("studentButton", "click", function( ) {
  setScreen("Student_LoginScreen");
  setProperty("adminPasskeyInput", "hidden", true);
  setProperty("incorrectAdminPasskey", "hidden", true);
  setProperty("blankPasskeyMessage", "hidden", true);
  setProperty("adminEnterButton", "hidden", true);
  updateStudentNameDropdown();
});

onEvent("gradeSelector", "change", function( ){
  updateStudentNameDropdown();
});


onEvent("enterButtonS", "click", function( ) {
  currentStudent = getText("studentNameDropdown");
  currentPasskey = getText("passkeyInput");
  //removes current input
  setText("passkeyInput", "");
  setProperty("incorrectPasskeyMessage", "hidden", true);
  setProperty("blankPasskeyMessage", "hidden", true);
  //Find the correct passkey of the currently selected student
  for (var i = 0; i < names.length; i++) {
    if (currentPasskey == "") {
      //if there is no passkey inputted
      setProperty("blankPasskeyMessage", "hidden", false);
    } else if (((names[i] == currentStudent) && (passkeys[i] == currentPasskey))) {
      //if the passkey is correct
      setScreen("Main_SelectionScreen");
      setText("mainSelectionName", currentStudent);
      currentStudentIndex = i;
      setProperty("incorrectPasskeyMessage", "hidden", true);

    } else if (!(/^\d+$/.test(currentPasskey))){
      //if there is a passkey input, but it contains non-digit values
      setProperty("incorrectPasskeyMessage", "hidden", false);
      setText("incorrectPasskeyMessage", "Passkeys should only include digits");
    }
    else{
      //if the passkey input is digits, but is wrong
      setProperty("incorrectPasskeyMessage", "hidden", false);
      setText("incorrectPasskeyMessage", "Your name or passkey may be incorret.");
    }

  }
});




onEvent("catSelAA", "click", function( ) {
  setText("AAName", names[currentStudentIndex]);
  setScreen("Academic_AchievementsScreen");
});
onEvent("catSelAP", "click", function( ) {
  setText("text_area11", names[currentStudentIndex]);
  setScreen("Athletic_ParticipationScreen");
});
onEvent("catSelPAE", "click", function( ) {
  setText("text_area14", names[currentStudentIndex]);
  setScreen("Performing_Arts_ExperienceScreen");
});
onEvent("catSelCAO", "click", function( ) {
  setText("text_area17", names[currentStudentIndex]);
  setScreen("Clubs_And_Organization_MembershipsScreen");
});
onEvent("catSelCSH", "click", function( ) {
  setText("text_area20", names[currentStudentIndex]);
  setScreen("Community_Service_HoursScreen");
});
onEvent("catSelHC", "click", function( ) {
  setText("text_area23", names[currentStudentIndex]);
  setScreen("Honors_ClassesScreen");
});

onEvent("AAConfirm", "click", function( ) {
  getAvailableList("AA", currentStudentIndex)[currentStudentIndex] = getText("AANameInput") + "||" + getText("AAGradeDropdown") + "~~" + getText("AADescriptionInput");
  updateData();
  setText("AANameInput", "");
  setText("AADescriptionInput", "");
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("APConfirm", "click", function( ) {
  getAvailableList("AP", currentStudentIndex)[currentStudentIndex] = getText("text_input3") + "||" + getText("dropdown2") + "~~" + getText("APDescriptionInput");
  updateData();
  setText("text_input3", "");
  setText("APDescriptionInput", "");
  setScreen("Main_SelectionScreen");
});
onEvent("PAEConfirm", "click", function( ) {
  getAvailableList("PAE", currentStudentIndex)[currentStudentIndex] = getText("text_input5") + "||" + getText("dropdown3") + "~~" + getText("text_input6");
  setText("text_input5", "");
  setText("text_input6", "");
  updateData();
  setScreen("Main_SelectionScreen");
});
onEvent("CAOConfirm", "click", function( ) {
  getAvailableList("CAO", currentStudentIndex)[currentStudentIndex] = getText("text_input7") + "||" + getText("dropdown4") + "~~" + getText("text_input8");
  setText("text_input7", "");
  setText("text_input8", "");
  updateData();
  setScreen("Main_SelectionScreen");
});
onEvent("CSHConfirm", "click", function( ) {
  getAvailableList("CAO", currentStudentIndex)[currentStudentIndex] = getText("text_input9") + "||" + getText("dropdown5") + "~~" + getText("text_input10");
  updateData();
  setText("text_input9", "");
  setText("text_input10", "");
  setScreen("Main_SelectionScreen");
});
onEvent("HCConfirm", "click", function( ) {
  getAvailableList("HC",currentStudentIndex)[currentStudentIndex] = getText("text_input11") + "||" + getText("dropdown6") + "~~" + getText("text_input12");
  updateData();
  setText("text_input11", "");
  setText("text_input12", "");
  setScreen("Main_SelectionScreen");
});


onEvent("button16", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button24", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button28", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button30", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button32", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button26", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});



onEvent("button7", "click", function( ) {
  setScreen("Main_FinalScreen");
});
onEvent("button21", "click", function( ) {
  setScreen("FinalScreenAA");
  currentCategory = "AA";
  setText("text_area1", generateCategoryOutput(currentCategory, currentStudentIndex));
});
onEvent("button36", "click", function( ) {
  setScreen("FinalScreenAP");
  currentCategory = "AP";
  setText("text_area37", generateCategoryOutput(currentCategory, currentStudentIndex));
});
onEvent("button34", "click", function( ) {
  setScreen("FinalScreenPAE");
  currentCategory = "PAE";
  setText("text_area46", generateCategoryOutput(currentCategory, currentStudentIndex));
});
onEvent("button35", "click", function( ) {
  setScreen("FinalScreenCAO");
  currentCategory = "CAO";
  setText("text_area40", generateCategoryOutput(currentCategory, currentStudentIndex));
});
onEvent("button22", "click", function( ) {
  setScreen("FinalScreenCSH");
  currentCategory = "CSH";
  setText("text_area42", generateCategoryOutput(currentCategory, currentStudentIndex));
});
onEvent("button23", "click", function( ) {
  setScreen("FinalScreenHC");
  currentCategory = "HC";
  setText("text_area44", generateCategoryOutput("HC", currentStudentIndex));
});


onEvent("button1", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button8", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button12", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button14", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button17", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});
onEvent("button19", "click", function( ) {
  setScreen("Main_SelectionScreen");
  setText("mainSelectionName", currentStudent);
});

onEvent("image3", "click", function( ) {
  setScreen("Main_FinalScreen");
});
onEvent("image4", "click", function( ) {
  setScreen("Main_FinalScreen");
});
onEvent("image5", "click", function( ) {
  setScreen("Main_FinalScreen");
});
onEvent("image6", "click", function( ) {
  setScreen("Main_FinalScreen");
});
onEvent("image7", "click", function( ) {
  setScreen("Main_FinalScreen");
});
onEvent("image8", "click", function( ) {
  setScreen("Main_FinalScreen");
});

onEvent("button37", "click", function( ) {
  setScreen("HomeScreen");
});
onEvent("studentLoginBackButton", "click", function( ) {
  setScreen("HomeScreen");
});
onEvent("catSelBackButton", "click", function( ) {
  setScreen("Student_LoginScreen");
});

onEvent("AAReset", "click", function( ) {
  setScreen("resetConfirmationScreen");
});
onEvent("APReset", "click", function( ) {
  setScreen("resetConfirmationScreen");
});
onEvent("PAEReset", "click", function( ) {
  setScreen("resetConfirmationScreen");
});
onEvent("CAOReset", "click", function( ) {
  setScreen("resetConfirmationScreen");
});
onEvent("CSHReset", "click", function( ) {
  setScreen("resetConfirmationScreen");
});
onEvent("HCReset", "click", function( ) {
  setScreen("resetConfirmationScreen");
});

onEvent("resetConfirmationYes", "click", function( ) {
  resetStudentData(currentCategory, currentStudentIndex);
  setScreen("Main_SelectionScreen");
});
onEvent("resetConfirmationNo", "click", function( ) {
  setScreen("FinalScreen" + currentCategory);
});

onEvent("questionMarkButtonHome", "click", function( ) {
  setScreen("faqScreen");
});
onEvent("questionMarkButtonLogin", "click", function( ) {
  setScreen("faqScreen");
});
onEvent("faqCategoryDropdown" , "change", function( ){
  updateFAQScreen();
  // after the faq category dropdown eliminates the first option "category" , 
  // the slected option needs to stay as what was selected
  setProperty("faqCategoryDropdown", "options", faqCategories);
  setProperty("faqCategoryDropdown", "text", currentCategory);
});
onEvent("faqQuestionsDropdown" , "change", function( ){
    updateFAQScreen();
});
onEvent("bugReportButton", "click", function( ){
  setScreen("bugReportScreen");
});
onEvent("bugBackButton" , "click", function( ){
        setScreen("faqScreen");
});
onEvent("bugReportSubmit", "click", function ( ){
  var input = getText("bugInput");
  setText("bugInput", "");
  var i = getFirstFree(bugs);
  console.log(i);
  updateRecord("FAQ", {id:i+1, question: faqQuestions[i], category: faqCategoryList[i], answer: faqAnswers[i], bugs: input}, function(record, success) {
  bugs = getColumn("FAQ", "bugs");  
  });
});

function fillLists() {
  // fill lists with values from data set
  names = getColumn("Student Data", "name");
  passkeys = getColumn("Student Data", "passkey");
  grades = getColumn("Student Data", "grade");
  AA1 = getColumn("Student Data", "AA1");
  AP1 = getColumn("Student Data", "AP1");
  PAE1 = getColumn("Student Data", "PAE1");
  CAO1 = getColumn("Student Data", "CAO1");
  CSH1 = getColumn("Student Data", "CSH1");
  HC1 = getColumn("Student Data", "HC1");
  
  AA2 = getColumn("Student Data", "AA2");
  AP2 = getColumn("Student Data", "AP2");
  PAE2 = getColumn("Student Data", "PAE2");
  CAO2 = getColumn("Student Data", "CAO2");
  CSH2 = getColumn("Student Data", "CSH2");
  HC2 = getColumn("Student Data", "HC2");
  
  AA3 = getColumn("Student Data", "AA2");
  AP3 = getColumn("Student Data", "AP2");
  PAE3 = getColumn("Student Data", "PAE2");
  CAO3 = getColumn("Student Data", "CAO2");
  CSH3 = getColumn("Student Data", "CSH2");
  HC3 = getColumn("Student Data", "HC2");
  
  AA4 = getColumn("Student Data", "AA2");
  AP4 = getColumn("Student Data", "AP2");
  CAO4 = getColumn("Student Data", "CAO2");
  HC4 = getColumn("Student Data", "HC2");
  
  AA5 = getColumn("Student Data", "AA2");
  AP5 = getColumn("Student Data", "AP2");
  CAO5 = getColumn("Student Data", "CAO2");
  HC5 = getColumn("Student Data", "HC2");

  faqQuestions =   getColumn("FAQ", "question");
  faqCategoryList = getColumn("FAQ", "category");
  faqAnswers = getColumn("FAQ", "answer");
  bugs = getColumn("FAQ", "bugs");
  // the answers have quotes around them in the dataset, but these 
  // quotes should not show up in the text box
  for (var i = 0; i < faqAnswers; i++) {
    faqAnswers[i] =  faqAnswers[i].substring(2, faqAnswers[i].length-1);
  }
}
function filterGrades() {
  // reset lists
  ninthGraders = [];
  tenthGraders = [];
  eleventhGraders = [];
  twelvthGraders = [];
  // sort students by grade
  for (var i = 0; i < names.length; i++) {
    if (grades[i] == 9) {
      appendItem(ninthGraders, names[i]);
    } else if ((grades[i] == 10)) {
      appendItem(tenthGraders, names[i]);
    } else if ((grades[i] == 11)) {
      appendItem(eleventhGraders, names[i]);
    } else if ((grades[i] == 12)) {
      appendItem(twelvthGraders, names[i]);
    }
  }
}
function filterQuestions() {
  //sort the questions by category
  faqStudentQuestions = [];
  faqAdminQuestions = [];
  faqInterfaceQuestions = [];
  for (var i = 0; i < faqQuestions.length; i++) {
     if (faqCategoryList[i] == "Student Usage") {
       appendItem(faqStudentQuestions, faqQuestions[i]);
     }
     else if (faqCategoryList[i] == "Administrator Usage") {
       appendItem(faqAdminQuestions, faqQuestions[i]);
     }
     else if (faqCategoryList[i] == "Interface Usage"	) {
       appendItem(faqInterfaceQuestions, faqQuestions[i]);
     }
   }
}
function updateFAQScreen() {
  currentCategory = getText("faqCategoryDropdown");
  //before a category is selected, the only option in the dropdown should by "Questions"
  var blankQuestionsList = ["Questions"];
  // adjust the question dropdown based on the selected category
  switch(currentCategory){
    case "Student Usage":
    setProperty("faqQuestionsDropdown", "options",  faqStudentQuestions);
    break;
    case "Administrator Usage":
    setProperty("faqQuestionsDropdown", "options",  faqAdminQuestions);
    break;
    case "Interface Usage":
    setProperty("faqQuestionsDropdown", "options",  faqInterfaceQuestions);
    break;
    case "Categories":
    setProperty("faqQuestionsDropdown", "options",  blankQuestionsList);
    break;
  }
    // set the answer based on the index of the current question
  for (var i = 0; i < faqQuestions.length; i++) {
      if (getText("faqQuestionsDropdown") == faqQuestions[i])
      setText("faqOutput", faqAnswers[i]);
    }
}
function updateData() {
  //creates an object with all the data for the currently selected student
  studentObject = {
    "id": (currentStudentIndex + 1), 
    "name": (names[currentStudentIndex]),
    "grade": (grades[currentStudentIndex]),
    "passkey": passkeys[currentStudentIndex],
    "AA1": AA1[currentStudentIndex],
    "AP1": AP1[currentStudentIndex],
    "PAE1": PAE1[currentStudentIndex],
    "CAO1": CAO1[currentStudentIndex],
    "CSH1": CSH1[currentStudentIndex],
    "HC1": HC1[currentStudentIndex],
    "AA2": AA2[currentStudentIndex],
    "AP2": AP2[currentStudentIndex],
    "PAE2": PAE2[currentStudentIndex],
    "CAO2": CAO2[currentStudentIndex],
    "CSH2": CSH2[currentStudentIndex],
    "HC2": HC2[currentStudentIndex],
    "AA3": AA3[currentStudentIndex],
    "AP3": AP3[currentStudentIndex],
    "PAE3": PAE3[currentStudentIndex],
    "CAO3": CAO3[currentStudentIndex],
    "CSH3": CSH3[currentStudentIndex],
    "HC3": HC3[currentStudentIndex],
    "AA4": AA4[currentStudentIndex],
    "AP4": AP4[currentStudentIndex],
    "CAO4": CAO4[currentStudentIndex],
    "HC4": HC4[currentStudentIndex],
    "AA5": AA5[currentStudentIndex],
    "AP5": AP5[currentStudentIndex],
    "CAO5": CAO5[currentStudentIndex],
    "HC5": HC5[currentStudentIndex]
  };
  updateRecord("Student Data", studentObject, function() {
    
  });
}
function updateStudentNameDropdown() {
  //Have the grade dropdown effect the options in the name dropdown
  if (getText("gradeSelector") == "9th")  {
      setProperty("studentNameDropdown", "options", ninthGraders);
  } else if ((getText("gradeSelector") == "10th")) {
    setProperty("studentNameDropdown", "options", tenthGraders);
  } else if ((getText("gradeSelector") == "11th")) {
    setProperty("studentNameDropdown", "options", eleventhGraders);
  } else if ((getText("gradeSelector") == "12th")){
    setProperty("studentNameDropdown", "options", twelvthGraders);
  }
  if (getText("gradeSelectorA") == "9th")  {
      setProperty("studentNameDropdownA", "options", ninthGraders);
  } else if ((getText("gradeSelectorA") == "10th")) {
    setProperty("studentNameDropdownA", "options", tenthGraders);
  } else if ((getText("gradeSelectorA") == "11th")) {
    setProperty("studentNameDropdownA", "options", eleventhGraders);
  } else if ((getText("gradeSelectorA") == "12th")){
    setProperty("studentNameDropdownA", "options", twelvthGraders);
  }
}
function getActivityName(string){
  return string.substring(0,string.indexOf("||"));
}
function getActivityGrade(string){
  return string.substring(string.indexOf("||")+2, string.indexOf("~~"));
}
function getActivityDesc(string){
  return string.substring(string.indexOf("~~")+2);
}
function format(string){
  return "You did " + getActivityName(string) + " in " + getActivityGrade(string) + " grade." + " This events description is: " + getActivityDesc(string);
}

function getAvailableList(cat, index) {
  var maxNum = (cat === "CSH" || cat === "PAE") ? 3 : 5; // CSH and PAE go up to 3, others up to 5
  for (var num = 1; num <= maxNum; num++) {
    var list = getList(cat, num);
    if (list[index] == "") {
      return list;
    }
  }
  return getList(cat, maxNum); // Returns the last list if all are filled, assuming overflow is managed elsewhere
}

onEvent("image21", "click", function( ) {
  open("https://www.instagram.com/");
});
onEvent("image22", "click", function( ) {
  open("https://www.linkedin.com/");
});
onEvent("image11", "click", function( ) {
  open("https://www.instagram.com/");
});
onEvent("image16", "click", function( ) {
  open("https://www.linkedin.com/");
});
onEvent("image23", "click", function( ) {
  open("https://www.instagram.com/");
});
onEvent("image24", "click", function( ) {
  open("https://www.linkedin.com/");
});
onEvent("image26", "click", function( ) {
  open("https://www.instagram.com/");
});
onEvent("image27", "click", function( ) {
  open("https://www.linkedin.com/");
});
onEvent("image28", "click", function( ) {
  open("https://www.instagram.com/");
});
onEvent("image29", "click", function( ) {
  open("https://www.linkedin.com/");
});
onEvent("image30", "click", function( ) {
  open("https://www.instagram.com/");
});
onEvent("image31", "click", function( ) {
  open("https://www.linkedin.com/");
});
onEvent("enterButtonS", "click", function( ) {
  setText("text_area7", names[currentStudentIndex]);
});


function getList(cat, num) {
  switch(cat) {
    case "AA": // Academic Achievement
      switch(num) {
        case 1: return AA1;
        case 2: return AA2;
        case 3: return AA3;
        case 4: return AA4;
        case 5: return AA5;
        default: return null; // Invalid number
      }
      break; // Although 'return' makes this unnecessary, it's good practice
    case "AP": // Athletic Participation
      switch(num) {
        case 1: return AP1;
        case 2: return AP2;
        case 3: return AP3;
        case 4: return AP4;
        case 5: return AP5;
        default: return null; // Invalid number
      }
      break;
    case "PAE": // Performing Arts Experience
      if (num >= 1 && num <= 3) {
        switch(num) {
          case 1: return PAE1;
          case 2: return PAE2;
          case 3: return PAE3;
          default: return null; // Invalid number
        }
      } else {
        return null; // Invalid number for PAE
      }
      break;
    case "CAO": // Clubs and Organizations
      switch(num) {
        case 1: return CAO1;
        case 2: return CAO2;
        case 3: return CAO3;
        case 4: return CAO4;
        case 5: return CAO5;
        default: return null; // Invalid number
      }
      break;
    case "CSH": // Community Service Hours
      if (num >= 1 && num <= 3) {
        switch(num) {
          case 1: return CSH1;
          case 2: return CSH2;
          case 3: return CSH3;
          default: return null; // Invalid number
        }
      } else {
        return null; // Invalid number for CSH
      }
      break;
    case "HC": // Honors Classes
      switch(num) {
        case 1: return HC1;
        case 2: return HC2;
        case 3: return HC3;
        case 4: return HC4;
        case 5: return HC5;
        default: return null; // Invalid number
      }
      break;
    default:
      return null; // Invalid category
  }
}

function generateCategoryOutput(category, studentIndex) {
  var output = "";
  var maxCount = category === "CSH" || category === "PAE" ? 3 : 5; // PAE and CSH have a max of 3 items, others have 5
  var hasEntries = false;

  for (var i = 1; i <= maxCount; i++) {
    var list = getList(category, i);
    if (list[studentIndex] != "") {
      if (!hasEntries) {
        hasEntries = true; // Mark as having entries at least once
      }
      output += '\n\n' +categoryNames[category] + '(#' + i + "): " + format(list[studentIndex]);
    }
  }

  if (!hasEntries) {
    output = 'You do not have any events logged for this category';
  } else {
    // Remove the first two newlines for the initial entry
    output = trimStart(output);
  }

  return output;
}

function trimStart(str) {
  return str.replace(/^\s+/, "");
}

function resetStudentData(category, studentIndex) {
  // Determine the number of items based on the category
  var numItems = category === "CSH" || category === "PAE" ? 3 : 5;

  for (var i = 1; i <= numItems; i++) {
    var list = getList(category, i);
    if(list && list.length > studentIndex) { // Check if the list exists and has the student index
      list[studentIndex] = ""; // Reset the data for this student at the index
    }
  }
  updateData();
}

function getFirstFree(list){
  for(var i = list.length-1; i >= 0; i--)
  {
    if(list[i] != "") return i+1;
  }
  return 0;
}

