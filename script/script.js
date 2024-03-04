// Initialisation pour le premier chargement de la page puis stocker les modifs
// let region = 'WE'; // Variable globale pour stocker la région sélectionnée par défaut
let region = 'WE';

let Graphiques = [];
let Dropdowns = [];

let limit11 = 5;
let limitYears11 = 5;
let limitCountry11 = "Tous";

let limit12 = 5;
let limitCountry12 = "Tous";

let limit21 = 0;
let limitYears21 = 1;
let limitCountry21 = "Tous";

let limit22 = 0;
let limitYears22 = 1;
let limitCountry22 = "Tous";

let limit31 = 5;
let job31 = "Developer, back-end";
let limit32 = 5;
let job32 = "Developer, back-end";

changeRates = { // Valeurs du 20/11/2023
  'AED': 0.25,'AFN': 0.013,'ALL': 0.0096,'AMD': 0.0023,'ANG': 0.51,'ARS': 0.0026,'AUD': 0.6,'AWG': 0.51,'AZN': 0.54,'BAM': 0.51,'BGN': 0.51,'BIF': 0.00032,'BRL': 0.19,
  'BSD': 0.92,'CAD': 0.67,'CDF': 0.00037,'CHF': 1.04,'CLP': 0.001,'CNY': 0.13,'COP': 0.00023,'CRC': 0.0017,'CUP': 0.038,'DJF': 0.0052,'EUR': 1,'FKP': 1.14261,'FJD': 0.41,
  'GBP': 1.14,'GHS': 0.077,'GIP': 1.14261,'HKD': 0.12,'HUF': 0.0026,'IDR': 0.000059,'ILS': 0.25,'INR': 0.011,'IRR': 0.000022,'JPY': 0.0062,'KRW': 0.00079,'KZT': 0.0021,
  'LAK': 0.000044,'LKR': 0.0046,'LYD': 0.21,'MAD': 0.11,'MDL': 0.057,'MKD': 0.019,'MMK': 0.00058,'MNT': 0.00033,'MUR': 0.022,'MXN': 0.045,'MYR': 0.20,'NOK': 0.085,
  'NZD': 0.64,'PEN': 0.24,'PHP': 0.018,'PKR': 0.0053,'PLN': 0.23,'QAR': 0.25,'RON': 0.22,'RUB': 0.013,'SAR': 0.24,'SEK': 0.10,'SGD': 0.67,'THB': 0.026,'TRY': 0.073,
  'TWD': 0.029,'UAH': 0.025,'USD': 0.92,'UYU': 0.021,'VES': 0.00022,'VND': 0.00004,'XPF': 0.0083,'YER': 0.0037,'ZAR': 0.05,'ZMW': 0.04 };

console.log("Chez nous les graphiques s'affichent en 3 ~ 4 secondes");
console.log("Nous n'avons pas modifié les fichiers json fournis malgré le mensonge évidant de plusieurs participants");

function loadChart(region){
  let urlData = "";
  if (region === "WE") {
    urlData = "data/survey_results_WE.json";
  } else if (region === "NA") {
    urlData = "data/survey_results_NA.json";
  };

  let request = $.ajax({
    type: "GET",
    url: urlData
  });    

  request.done(function (output) {

    let dataString = JSON.stringify(output);
    let jsonData = JSON.parse(dataString);
  
    /////////////////////////////////////////////////////////
    ///////////////////// Graphique 1 1 /////////////////////
    /////////////////////////////////////////////////////////
    const preparedDataMeanSalaryYears = treatDataSalaryByYear11(jsonData);
    const Graph11 = document.getElementById('Chart11');
    const data11 = {
      labels: preparedDataMeanSalaryYears[0],
      datasets: [{ label: 'Mean salary', borderWidth: 1, data: preparedDataMeanSalaryYears[1],
        // borderColor: 'rgb(75, 192, 192)',
        // tension: 0.1
      }]
    };
    const config11 = { type: 'line', data: data11 };
    const Graphique11 = new Chart(Graph11, config11);

    const divChart11 = document.getElementById('divChart11');
      divChart11.style.width = '900px';
      divChart11.style.height = '500px';

    createLimitCountryDropdown11(jsonData, Graphique11);

    Graphiques.push(Graphique11);
    
    /////////////////////////////////////////////////////////
    ///////////////////// Graphique 1 2 /////////////////////
    /////////////////////////////////////////////////////////
    const preparedDataMeanSalaryStudy = treatDataSalaryByEducation(jsonData);

    const Graph12 = document.getElementById('Chart12');
    const data12 = { labels : preparedDataMeanSalaryStudy[0], datasets: [{ label : 'Mean salary', borderWidth: 1, data: preparedDataMeanSalaryStudy[1] }]};
    const config12 = { type: 'bar', data: data12 };
    const Graphique12 = new Chart(Graph12, config12);

    const divChart12 = document.getElementById('divChart12');
      divChart12.style.width = '900px';
      divChart12.style.height = '600px'; 

    createLimitCountryDropdown12(jsonData, Graphique12);

    Graphiques.push(Graphique12);

    /////////////////////////////////////////////////////////
    ///////////////////// Graphique 2 1 /////////////////////
    /////////////////////////////////////////////////////////
    const preparedDataMeanSalaryByPlatform = treatMeanSalaryByPlatform(jsonData);

    const Graph21 = document.getElementById('Chart21');
    const data21 = { labels : preparedDataMeanSalaryByPlatform[0], datasets: [{ label : 'Mean salary', borderWidth: 1, data: preparedDataMeanSalaryByPlatform[1] }]};
    const config21 = { type: 'bar', data: data21 };
    const Graphique21 = new Chart(Graph21, config21);

    const divChart21 = document.getElementById('divChart21');
      divChart21.style.width = '900px';
      divChart21.style.height = '500px'; 

    createLimitYearsDropdown21(jsonData, Graphique21);
    createLimitCountryDropdown21(jsonData, Graphique21);

    Graphiques.push(Graphique21);

    /////////////////////////////////////////////////////////
    ///////////////////// Graphique 2 2 /////////////////////
    /////////////////////////////////////////////////////////
    const preparedDataMeanSalaryByFramework = treatMeanSalaryByFramework(jsonData);
    const Graph22 = document.getElementById('Chart22');
    const data22 = { labels : preparedDataMeanSalaryByFramework[0], datasets: [{ label : 'Mean salary', borderWidth: 1, data: preparedDataMeanSalaryByFramework[1] }]};
    const config22 = { type: 'bar', data: data22 };
    const Graphique22 = new Chart(Graph22, config22);

    const divChart22 = document.getElementById('divChart22');
      divChart22.style.width = '900px';
      divChart22.style.height = '500px'; 

    createLimitYearsDropdown22(jsonData, Graphique22);
    createLimitCountryDropdown22(jsonData, Graphique22);

    Graphiques.push(Graphique22);

    /////////////////////////////////////////////////////////
    ///////////////////// Graphique 3 1 /////////////////////
    /////////////////////////////////////////////////////////
    const preparedDataOsJob = treatDataOsJob(jsonData);
    const Graph31 = document.getElementById('Chart31');
    const data31 = {labels: preparedDataOsJob[1], datasets: [{label: 'Mean salary by platform worked with', data: preparedDataOsJob[2]}]};
    const config31 = {type: 'doughnut', data: data31};
    const Graphique31 = new Chart(Graph31, config31);

    const divChart31 = document.getElementById('divChart31');
      divChart31.style.width = '500px';
      divChart31.style.height = '500px';

    createJobDropdown31(jsonData,Graphique31);
    createLimitJobDropdown31(jsonData,Graphique31);

    Graphiques.push(Graphique31);

    /////////////////////////////////////////////////////////
    ///////////////////// Graphique 3 2 /////////////////////
    /////////////////////////////////////////////////////////
    preparedDataComToolsJob = treatDataComToolsJob(jsonData);
    const Graph32 = document.getElementById('Chart32');
    const data32 = {labels: preparedDataComToolsJob[1], datasets: [{label: 'Communication tools by Job', data: preparedDataComToolsJob[2]}]};
    const config32 = {type: 'doughnut', data: data32};
    const Graphique32 = new Chart(Graph32, config32);

    const divChart32 = document.getElementById('divChart32');
      divChart32.style.width = '500px';
      divChart32.style.height = '500px';

    createJobDropdown32(jsonData,Graphique32);
    createLimitJobDropdown32(jsonData,Graphique32);

    Graphiques.push(Graphique32);
    /////////////////////////////////////////////////////////

    createDatasetDropdown(jsonData, Graphique31); // Pour choisir le continent

    /////////////////////////////////////////////////
    ///////////////////// TESTS /////////////////////
    /////////////////////////////////////////////////

    // console.log("test")
    // datatest = getComToolsByJob(jsonData,"");
    // console.log(datatest)

    // console.log(changeRates.hasOwnProperty("EUR"))
    // console.log(changeRates.hasOwnProperty("NA"))

  });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// Fonction Globale 1 ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getMeanByUsers(listUsers) {
  let totalEuros = 0;
  let count = 0;

  for (let userId in listUsers) {
    if (listUsers.hasOwnProperty(userId)) {
      let user = listUsers[userId];
      let amount = user['CompTotal'];
      let currency = user['Currency'].substring(0, 3);

      if (changeRates.hasOwnProperty(currency) && !isNaN(amount) && amount > 0) {
        let amountInEuros = toEuros(amount, currency);
        totalEuros += amountInEuros;
        count++;
      }
    }
  }

  if (count > 0) {
    let meanEuros = totalEuros / count;
    return meanEuros.toFixed(2);
  } else {
    // console.log("Aucune valeur valide mean");
    return 0;
  }
}

function getMaxYearsOfExperience(jsonData) {
  let maxYears = 0;
  for (let i = 0; i < jsonData.length; i++) {
    const yearsExp = parseInt(jsonData[i].YearsCodePro, 10);
    if (!isNaN(yearsExp) && yearsExp > maxYears) {
      maxYears = yearsExp;
    }
  }
  return maxYears;
}

function getAllEducationLevels(jsonData) {
  let educationLevels = [];
  for (let i = 0; i < jsonData.length; i++) {
    let user = jsonData[i];
    let educationLevel = user.EdLevel;
    if (educationLevel && !educationLevels.includes(educationLevel)) {
      educationLevels.push(educationLevel);
    }
  }
  return educationLevels;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Graphique 1 1 ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getUserByYearsWorked(jsonData, years) {
  let users = {};

  for (let i = 0; i < jsonData.length; i++) {
    let user = jsonData[i];
    const yearsExp = parseInt(user.YearsCodePro, 10);
    const userCountry = user.Country;
    const amount = parseInt(user['CompTotal']);
    const currency = user.Currency.substring(0, 3);

    const isValidValues = !isNaN(amount) && amount > 0 && !isNaN(yearsExp);
    const isValidExperience = yearsExp <= years;
    const isValidCurrency = changeRates.hasOwnProperty(currency);
    const isValidCountry = userCountry === limitCountry11 || limitCountry11 === "Tous";

    if ( isValidValues && isValidExperience && isValidCurrency && isValidCountry) {
      let responseId = user.ResponseId;
      users[responseId] = user;
    }
  }
  return users;
}

function treatDataSalaryByYear11(jsonData) {
  let maxYears = getMaxYearsOfExperience(jsonData);
  let yearsWorked = {};
  let usersByYears = {};

  for (let i = 0; i <= maxYears; i++) {
    usersByYears[i] = getUserByYearsWorked(jsonData, i);
    yearsWorked[i] = getMeanByUsers(usersByYears[i]);
  }

  let yearsList = [];
  let salariesList = [];

  for (let years = 1; years <= maxYears; years++) {
    yearsList.push(years);
    salariesList.push(yearsWorked[years] || 0);
  }
  return [yearsList, salariesList, maxYears];
}

function createLimitCountryDropdown11(jsonData, chart) {
  var selector = document.createElement("select");
  selector.id = "limitDropdown";
  const countries = getAllCountries(jsonData);

  const option = document.createElement('option');
  option.value = "Tous";
  option.textContent = 'Tous';
  selector.appendChild(option);

  for (let i = 0; i < countries.length; i++) {
    const option = document.createElement('option');
    const country = countries[i];
    option.value = country;
    option.textContent = country;
    selector.appendChild(option);
  }
  
  selector.onchange = function() {
    limitCountry11 = selector.value;
    console.log(limitCountry11)
    updateChart11(jsonData, chart);
  };

  const label = document.createElement("label");
  label.innerHTML = "Select a country ";
  label.htmlFor = 'selector';
  document.getElementById('LimitCountrySelector11').appendChild(label).appendChild(selector);

  Dropdowns.push('LimitCountrySelector11');
}

function updateChart11(jsonData, chart){
  preparedData = treatDataSalaryByYear11(jsonData);
  
  newdata = {
    labels: preparedData[0],
    datasets: [{
      label: 'Mean salary',
      borderWidth: 1,
      data: preparedData[1],
      // borderColor: 'rgb(75, 192, 192)',
      // tension: 0.1
    }]
  };
  chart.data = newdata;
  chart.update();
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Graphique 1 2 ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getUserByStudy(jsonData, study) {
  let users = {};

  for (let i = 0; i < jsonData.length; i++) {
    let user = jsonData[i];
    const studyExp = user.EdLevel.trim();

    const userCountry = user.Country;
    const amount = parseInt(user['CompTotal']);
    const currency = user.Currency.substring(0, 3);

    const isValidValues = !isNaN(amount) && amount > 0 && studyExp === study;

    const isValidCurrency = changeRates.hasOwnProperty(currency);
    const isValidCountry = userCountry === limitCountry12 || limitCountry12 === "Tous";

    if (isValidValues && isValidCurrency && isValidCountry) {
      let responseId = user.ResponseId;
      users[responseId] = user;
    }
  }
  return users;
}

function treatDataSalaryByEducation(jsonData) {
  let educationLevels = getAllEducationLevels(jsonData);
  let salariesByEducation = {};

  for (let i = 0; i < educationLevels.length; i++) {
    let usersByEducation = getUserByStudy(jsonData, educationLevels[i]);
    salariesByEducation[educationLevels[i]] = getMeanByUsers(usersByEducation);
  }

  let sortedPairs = Object.entries(salariesByEducation);
  sortedPairs.sort((a, b) => b[1] - a[1]);

  let sortedEducationList = [];
  let sortedSalariesList = [];

  for (let i = 0; i < sortedPairs.length; i++) {
    sortedEducationList.push(sortedPairs[i][0]);
    sortedSalariesList.push(sortedPairs[i][1]);
  }

  return [sortedEducationList, sortedSalariesList];
}



function createLimitCountryDropdown12(jsonData, chart) {
  var selector = document.createElement("select");
  selector.id = "limitDropdown";
  const countries = getAllCountries(jsonData);

  const option = document.createElement('option');
  option.value = "Tous";
  option.textContent = 'Tous';
  selector.appendChild(option);

  for (let i = 0; i < countries.length; i++) {
    const option = document.createElement('option');
    const country = countries[i];
    option.value = country;
    option.textContent = country;
    selector.appendChild(option);
  }
  
  selector.onchange = function() {
    limitCountry12 = selector.value;
    console.log(limitCountry12)
    updateChart12(jsonData, chart);
  };

  const label = document.createElement("label");
  label.innerHTML = "Select a country ";
  label.htmlFor = 'selector';
  document.getElementById('LimitCountrySelector12').appendChild(label).appendChild(selector);

  Dropdowns.push('LimitCountrySelector12');
}


function updateChart12(jsonData, chart){
  preparedData = treatDataSalaryByEducation(jsonData);
  
  newdata = {
    labels: preparedData[0],
    datasets: [{
      label: 'Mean salary',
      borderWidth: 1,
      data: preparedData[1],
      // borderColor: 'rgb(75, 192, 192)',
      // tension: 0.1
    }]
  };
  chart.data = newdata;
  chart.update();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// Fonction Globale 2 ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Graphique 2 1 ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getAllPlatform(jsonData){
  let plateform = [];
  for (element of jsonData) {
    let splited = element["PlatformHaveWorkedWith"].split(';');
    for (let answer of splited) {
      answer = answer.trim();
      if (answer !== '' && !plateform.includes(answer)) {
        plateform.push(answer);
      }
    }
  }
  return plateform;
}

function getUserByPlatform(jsonData, platform) {
  let users = {};
  for (let i = 0; i < jsonData.length; i++) {
    let user = jsonData[i];
    const yearsExp = parseInt(user.YearsCodePro, 10);
    const userCountry = user.Country;
    const amount = parseInt(user['CompTotal']);
    const currency = user.Currency.substring(0, 3);

    const platformsWorkedWith = user.PlatformHaveWorkedWith.split(';');

    for (let j = 0; j < platformsWorkedWith.length; j++) {
      platformsWorkedWith[j] = platformsWorkedWith[j].trim();
    }
    
    const isValidValues = !isNaN(amount) && amount > 0 && !isNaN(yearsExp);

    const isValidCurrency = changeRates.hasOwnProperty(currency);

    let isValidPlatform = false;
    for (let j = 0; j < platformsWorkedWith.length; j++) {
      if (platformsWorkedWith[j] === platform) {
        isValidPlatform = true;
        break;
      }
    }

    if (
      isValidPlatform &&
      isValidValues &&
      isValidCurrency &&
      (userCountry === limitCountry21 || limitCountry21 === "Tous")
    ) {
      let responseId = user.ResponseId;
      users[responseId] = user;
    }
  }
  return users;
}

function treatMeanSalaryByPlatform(jsonData) {
  let platforms = getAllPlatform(jsonData);
  let salaries = [];

  for (let i = 0; i < platforms.length; i++) {
    let platform = platforms[i];
    let usersByPlatform = getUserByPlatform(jsonData, platform);
    let filteredUsers = filterUsersByYearsAndCountry21(usersByPlatform);
    let meanSalary = getMeanByUsers(filteredUsers);

    salaries.push({ platform: platform, meanSalary: meanSalary });
  }

  salaries.sort((a, b) => b.meanSalary - a.meanSalary);

  let platformsList = [];
  let salariesList = [];

  if (limit21 !== 0) {
    for (let j = 0; j < limit21; j++) {
      platformsList.push(salaries[j].platform);
      salariesList.push(salaries[j].meanSalary);
    }
  } else {
    for (let j = 0; j < salaries.length; j++) {
      platformsList.push(salaries[j].platform);
      salariesList.push(salaries[j].meanSalary);
    }
  }

  return [platformsList, salariesList];
}


function filterUsersByYearsAndCountry21(users) {
  let filteredUsers = {};

  for (let userId in users) {
    if (users.hasOwnProperty(userId)) {
      let user = users[userId];
      const yearsExp = parseInt(user.YearsCodePro);
      const userCountry = user.Country;

      if ((limitYears21 === 0 || yearsExp <= limitYears21) && (userCountry === limitCountry21 || limitCountry21 === "Tous")) {
        filteredUsers[userId] = user;
      }
    }
  }

  return filteredUsers;
}


///// Dropdown /////

function createLimitYearsDropdown21(jsonData, chart){
  var selector = document.createElement("select");
  selector.id = "limitDropdown";
  MaxWorkExperience = getMaxWorkExperience(jsonData);

  for(let i = 1; i < MaxWorkExperience+1; i++){
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selector.appendChild(option);
  }

  const option = document.createElement('option');
  option.value = 0;
  option.textContent = 'Aucune';
  selector.appendChild(option);

  selector.onchange = function(){
    limitYears21 = parseInt(selector.value);
    updateChart21(jsonData, chart);
  };

  const label = document.createElement("label");
  label.innerHTML = "Select a years worked limit ";
  label.htmlFor = 'selector';

  document.getElementById('LimitYearSelector21').appendChild(label).appendChild(selector);
  Dropdowns.push('LimitYearSelector21');
}

function createLimitCountryDropdown21(jsonData, chart) {
  var selector = document.createElement("select");
  selector.id = "limitDropdown";
  const countries = getAllCountries(jsonData);

  const option = document.createElement('option');
  option.value = "Tous";
  option.textContent = 'Tous';
  selector.appendChild(option);
  for (let i = 0; i < countries.length; i++) {
    const option = document.createElement('option');
    const country = countries[i];
    option.value = country;
    option.textContent = country;
    selector.appendChild(option);
  }
  
  selector.onchange = function() {
    limitCountry21 = selector.value;
    updateChart21(jsonData, chart);
  };
  const label = document.createElement("label");
  label.innerHTML = "Select a country ";
  label.htmlFor = 'selector';
  document.getElementById('LimitCountrySelector21').appendChild(label).appendChild(selector);
  Dropdowns.push('LimitCountrySelector21');
}

function updateChart21(jsonData, chart){
  preparedData = treatMeanSalaryByPlatform(jsonData);
  
  newdata = { labels : preparedData[0], datasets: [{ label : 'Mean salary', borderWidth: 1, data: preparedData[1] }]};
  chart.data = newdata;
  chart.update();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Graphique 2 2 ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getAllFramework(jsonData){
  let framework = [];
  for (element of jsonData) {
    let splited = element["WebframeHaveWorkedWith"].split(';');
    for (let answer of splited) {
      answer = answer.trim();
      if (answer !== '' && !framework.includes(answer)) {
        framework.push(answer);
      }
    }
  }
  return framework;
}

function getUserByFramework(jsonData, framework) {
  let users = {};
  for (let i = 0; i < jsonData.length; i++) {
    let user = jsonData[i];
    const yearsExp = parseInt(user.YearsCodePro, 10);
    const userCountry = user.Country;
    const amount = parseInt(user['CompTotal']);
    const currency = user.Currency.substring(0, 3);

    const frameworksWorkedWith = user.WebframeHaveWorkedWith.split(';');

    for (let j = 0; j < frameworksWorkedWith.length; j++) {
      frameworksWorkedWith[j] = frameworksWorkedWith[j].trim();
    }

    const isValidValues = !isNaN(amount) && amount > 0 && !isNaN(yearsExp);
    const isValidCurrency = changeRates.hasOwnProperty(currency);

    let isValidFramework = false;
    for (let j = 0; j < frameworksWorkedWith.length; j++) {
      if (frameworksWorkedWith[j] === framework) {
        isValidFramework = true;
        break;
      }
    }

    if (
      isValidFramework &&
      isValidValues &&
      isValidCurrency &&
      (userCountry === limitCountry22 || limitCountry22 === "Tous")
    ) {
      let responseId = user.ResponseId;
      users[responseId] = user;
    }
  }
  return users;
}

function treatMeanSalaryByFramework(jsonData) {
  let frameworks = getAllFramework(jsonData);
  let salaries = [];

  for (let i = 0; i < frameworks.length; i++) {
    let framework = frameworks[i];
    let usersByFramework = getUserByFramework(jsonData, framework);
    let filteredUsers = filterUsersByYearsAndCountry22(usersByFramework);
    let meanSalary = getMeanByUsers(filteredUsers);

    salaries.push({ framework: framework, meanSalary: meanSalary });
  }

  salaries.sort((a, b) => b.meanSalary - a.meanSalary);

  let frameworksList = [];
  let salariesList = [];

  if (limit22 !== 0) {
    for (let j = 0; j < limit22; j++) {
      frameworksList.push(salaries[j].framework);
      salariesList.push(salaries[j].meanSalary);
    }
  } else {
    for (let j = 0; j < salaries.length; j++) {
      frameworksList.push(salaries[j].framework);
      salariesList.push(salaries[j].meanSalary);
    }
  }

  return [frameworksList, salariesList];
}


function filterUsersByYearsAndCountry22(users) {
  let filteredUsers = {};

  for (let userId in users) {
    if (users.hasOwnProperty(userId)) {
      let user = users[userId];
      const yearsExp = parseInt(user.YearsCodePro);
      const userCountry = user.Country;

      if ((limitYears22 === 0 || yearsExp <= limitYears22) && (userCountry === limitCountry22 || limitCountry22 === "Tous")) {
        filteredUsers[userId] = user;
      }
    }
  }

  return filteredUsers;
}


///// Dropdown /////

function createLimitYearsDropdown22(jsonData, chart){
  var selector = document.createElement("select");
  selector.id = "limitDropdown";
  MaxWorkExperience = getMaxWorkExperience(jsonData);

  for(let i = 1; i < MaxWorkExperience+1; i++){
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selector.appendChild(option);
  }

  const option = document.createElement('option');
  option.value = 0;
  option.textContent = 'Aucune';
  selector.appendChild(option);

  selector.onchange = function(){
    limitYears22 = parseInt(selector.value);
    updateChart22(jsonData, chart);
  };

  const label = document.createElement("label");
  label.innerHTML = "Select a years worked limit ";
  label.htmlFor = 'selector';

  document.getElementById('LimitYearSelector22').appendChild(label).appendChild(selector);
  Dropdowns.push('LimitYearSelector22');
}

function createLimitCountryDropdown22(jsonData, chart) {
  var selector = document.createElement("select");
  selector.id = "limitDropdown";
  const countries = getAllCountries(jsonData);

  const option = document.createElement('option');
  option.value = "Tous";
  option.textContent = 'Tous';
  selector.appendChild(option);

  for (let i = 0; i < countries.length; i++) {
    const option = document.createElement('option');
    const country = countries[i];
    option.value = country;
    option.textContent = country;
    selector.appendChild(option);
  }
  
  selector.onchange = function() {
    limitCountry22 = selector.value;
    updateChart22(jsonData, chart);
  };
  const label = document.createElement("label");
  label.innerHTML = "Select a country ";
  label.htmlFor = 'selector';
  document.getElementById('LimitCountrySelector22').appendChild(label).appendChild(selector);
  Dropdowns.push('LimitCountrySelector22');
}

function updateChart22(jsonData, chart){
  preparedData = treatMeanSalaryByFramework(jsonData, limit22);
  
  newdata = { labels : preparedData[0], datasets: [{ label : 'Mean salary by Framework', borderWidth: 1, data: preparedData[1] }]};
  chart.data = newdata;
  chart.update();
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////// Fonction Globale 3 ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getJob(jsonData){
  let jobList = {};

  for (element of jsonData) {
    let currentjob = element["DevType"];
    if (!jobList.hasOwnProperty(currentjob)) {
      jobList[currentjob] = true;
    }
  }
  return Object.keys(jobList);
}

function getJobCount(jsonData){
  let OpsysByJob = {};
  for (element of jsonData) {
    let currentjob = element["DevType"];
    if (OpsysByJob.hasOwnProperty(currentjob)) {
      OpsysByJob[currentjob] += 1;
    } else {
      OpsysByJob[currentjob] = 1;
    }
  }
  return OpsysByJob;
}

function filterByDevType(jsonData, devTypeValue) {
  return jsonData.filter(element => element["DevType"] === devTypeValue);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Graphique 3 1 ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

///// Dropdown /////
function createLimitJobDropdown31(jsonData, chart){
  var selector = document.createElement("select");
  selector.id = "limitDropdown";
  datajob = getJob(jsonData);

  for(let i = 5; i < 11; i++){
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selector.appendChild(option);
  }

  const option = document.createElement('option');
  option.value = 0;
  option.textContent = 'Tous';
  selector.appendChild(option);

  selector.onchange = function(){
    limit31 = parseInt(selector.value);
    updateChart31(jsonData, chart);
  };

  const label = document.createElement("label");
  label.innerHTML = "Select a limit ";
  label.htmlFor = 'selector';

  document.getElementById('LimitJobSelector31').appendChild(label).appendChild(selector);
  Dropdowns.push('LimitJobSelector31');
}

function createJobDropdown31(jsonData, chart){
  var selector = document.createElement("select");
  selector.id = "jobDropdown";
  datajob = getJob(jsonData);

  for(let i = 0; i < datajob.length; i++){
    const option = document.createElement('option');
    option.value = datajob[i];
    option.textContent = datajob[i];
    selector.appendChild(option);
  }

  selector.onchange = function(){
    job31 = selector.value;
    updateChart31(jsonData, chart);
  };

  const label = document.createElement("label");
  label.innerHTML = "Select a job ";
  label.htmlFor = 'selector';

  document.getElementById('JobSelector31').appendChild(label).appendChild(selector);
  Dropdowns.push('JobSelector31');
}

////////////////////

function updateChart31(jsonData, chart){
  preparedData = treatDataOsJob(jsonData);
  
  newdata = {
    labels: preparedData[1],
    datasets: [{  
      label: 'Operating System by Job',
      data: preparedData[2]
    }]
    }
  chart.data = newdata;
  chart.update();
}

function getOpSysCount(jsonData){
  let Opsys = {};
  for (element of jsonData) {
    let splited = element["OpSysProfessionaluse"].split(';');
    for (let answer of splited) {
      answer = answer.trim();
      if (answer !== '') {
        if (Opsys.hasOwnProperty(answer)) {
          Opsys[answer] += 1;
        } else {
          Opsys[answer] = 1;
        }
      }
    }
  }
  return Opsys;
}

function getOsSysByJob(jsonData, job) {
  let OsSysByJob = {};
  let newData = filterByDevType(jsonData, job);
  let opSysCount = getOpSysCount(newData);
  OsSysByJob[job] = opSysCount;
  return OsSysByJob;
}


function treatDataOsJob(jsonData) {
  let data = getOsSysByJob(jsonData, job31);
  let jobTitle = Object.keys(data);
  let listeOS = Object.keys(data[jobTitle]);
  let countOS = Object.values(data[jobTitle]);

  if (limit31 !== 0) {
    let osData = [];
    for (let i = 0; i < listeOS.length; i++) {
      osData.push({ os: listeOS[i], count: countOS[i] });
    }

    osData.sort((a, b) => b.count - a.count);

    let limitedOSData = osData.slice(0, limit31);
    listeOS = [];
    countOS = [];
    for (let i = 0; i < limitedOSData.length; i++) {
      listeOS.push(limitedOSData[i].os);
      countOS.push(limitedOSData[i].count);
    }
  }

  return [jobTitle, listeOS, countOS];
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////// Graphique 3 2 ///////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

///// Dropdown /////
function createLimitJobDropdown32(jsonData, chart){
  var selector = document.createElement("select");
  selector.id = "limitDropdown";
  datajob = getJob(jsonData);

  for(let i = 5; i < 11; i++){
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    selector.appendChild(option);
  }

  const option = document.createElement('option');
  option.value = 0;
  option.textContent = 'Aucune';
  selector.appendChild(option);

  selector.onchange = function(){
    limit32 = parseInt(selector.value);
    updateChart32(jsonData, chart);
  };

  const label = document.createElement("label");
  label.innerHTML = "Select a limit ";
  label.htmlFor = 'selector';

  document.getElementById('LimitJobSelector32').appendChild(label).appendChild(selector);
  Dropdowns.push('LimitJobSelector32');
}

function createJobDropdown32(jsonData, chart){
  var selector = document.createElement("select");
  selector.id = "jobDropdown";
  datajob = getJob(jsonData);

  for(let i = 0; i < datajob.length; i++){
    const option = document.createElement('option');
    option.value = datajob[i];
    option.textContent = datajob[i];
    selector.appendChild(option);
  }

  selector.onchange = function(){
    job32 = selector.value;
    updateChart32(jsonData, chart);
  };

  const label = document.createElement("label");
  label.innerHTML = "Select a job ";
  label.htmlFor = 'selector';

  document.getElementById('JobSelector32').appendChild(label).appendChild(selector);
  Dropdowns.push('JobSelector32');
}

////////////////////

function updateChart32(jsonData, chart){
  preparedData = treatDataComToolsJob(jsonData);
  
  newdata = {
    labels: preparedData[1],
    datasets: [{  
      label: 'Communication tools by Job',
      data: preparedData[2]
    }]
    }
  chart.data = newdata;
  chart.update();
}

function getComToolsCount(jsonData){
  let ComTools = {};
  for (element of jsonData) {
    let splited = element["OfficeStackSyncHaveWorkedWith"].split(';');
    for (let answer of splited) {
      answer = answer.trim();
      if (answer !== '') {
        if (ComTools.hasOwnProperty(answer)) {
          ComTools[answer] += 1;
        } else {
          ComTools[answer] = 1;
        }
      }
    }
  }
  return ComTools;
}

function getComToolsByJob(jsonData, job) {
  let ComToolsByJob = {};
  let newData = filterByDevType(jsonData, job);
  let ComToolsCount = getComToolsCount(newData);
  ComToolsByJob[job] = ComToolsCount;
  return ComToolsByJob;
}


function treatDataComToolsJob(jsonData) {
  let data = getComToolsByJob(jsonData, job32);
  let jobTitle = Object.keys(data);
  let listeComTools = Object.keys(data[jobTitle]);
  let countComTools = Object.values(data[jobTitle]);

  if (limit32 !== 0) {
    let ComToolsData = [];
    for (let index = 0; index < listeComTools.length; index++) {
      ComToolsData.push({ ComTools: listeComTools[index], count: countComTools[index] });
    }

    ComToolsData.sort((a, b) => b.count - a.count);

    let limitedComToolsData = ComToolsData.slice(0, limit32);

    listeComTools = [];
    countComTools = [];
    for (let i = 0; i < limitedComToolsData.length; i++) {
      listeComTools.push(limitedComToolsData[i].ComTools);
      countComTools.push(limitedComToolsData[i].count);
    }
  }

  return [jobTitle, listeComTools, countComTools];
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getCurrency(jsonData){
  let CurrencyList = {};

  for (element of jsonData) {
    let currentCurrency = element["Currency"];
    if (!CurrencyList.hasOwnProperty(currentCurrency)) {
      CurrencyList[currentCurrency] = true;
    }
  }
  return Object.keys(CurrencyList);
}

function toEuros(amount, currency){
  if (changeRates.hasOwnProperty(currency)) {
    let amountInEuros = amount / changeRates[currency];
    return Math.round(amountInEuros * 100) / 100;
  } else {
    console.log("Devise non trouvée dans la table de taux de change");
    return 0;
  }
}

function getDifferentYearsWorkedExperience(jsonData){
  const yearsOfExperience = [];
  jsonData.forEach(user => {
    const yearsExp = user.WorkExp;
    if (yearsExp && yearsExp !== 'NA' && !yearsOfExperience.includes(yearsExp)) {
      yearsOfExperience.push(yearsExp);
    }
  })
  return yearsOfExperience;
}

function getMaxWorkExperience(jsonData) {
  let maxExperience = 0;
  jsonData.forEach(user => {
    const yearsExp = user.WorkExp;
    if (yearsExp && yearsExp !== 'NA') {
      const experience = parseInt(yearsExp, 10);
      if (experience > maxExperience) {
        maxExperience = experience;
      }
    }
  });
  return maxExperience;
}

function getAllCountries(jsonData){
  const countries = [];
  for (let i = 0; i < jsonData.length; i++) {
    const country = jsonData[i].Country;
    if (country && !countries.includes(country)) {
      countries.push(country);
    }
  }
  return countries;
}

function removeDropdowns(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

function createDatasetDropdown(){
  const Region = ['WE', 'NA'];
  const TextRegion = ['West Europe', 'North America'];
  var selector = document.createElement("select");
  selector.id = "dropdown";

  for(let i = 0; i < Region.length; i++){
    const option = document.createElement('option');
    option.value = Region[i];
    option.textContent = TextRegion[i];

    // Sélectionner l'option correspondante à la valeur de region
    if (Region[i] === region) {
      option.selected = true;
    }

    selector.appendChild(option);
  }

  selector.onchange = function () {
    region = selector.value; 
    for (let i = 0; i < Graphiques.length; i++) {
      Graphiques[i].destroy();
    }
    Graphiques = [];

    for (let i = 0; i < Dropdowns.length; i++) {
      removeDropdowns(Dropdowns[i]);
    }
    Dropdowns = [];

    loadChart(region);
  };

  const label = document.createElement("label");
  label.innerHTML = "Select a region ";
  label.htmlFor = 'selector';

  document.getElementById('Selectors').appendChild(label).appendChild(selector);
  Dropdowns.push('Selectors');

  console.log("Le dataset chargé est : ", region);
}


$(document).ready(function() {
    loadChart(region); // Utiliser la variable globale pour charger les données au chargement de la page
});