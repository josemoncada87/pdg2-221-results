"use strict";

let projects = [];
window.addEventListener("load", function () {
    buildConfigForm();
});

async function buildConfigForm() {
    await updateValues();
    let codeQuery = prompt("inserte el código de uno de los integrantes");
    let index = projects.findIndex((item) => item.codeA == codeQuery || item.codeB == codeQuery);
    if(index!==-1){
        let nameView = document.querySelector(".project-name");
        let teamView = document.querySelector(".project-team");
        let resultView = document.querySelector(".project-result");
        nameView.innerHTML = projects[index].project;
        teamView.innerHTML = projects[index].team;
        resultView.innerHTML = projects[index].result;
        
    }
    
}
const fetchDatabase = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    } catch (error) {
        console.log('Fetch Error', error);
    };
}
const getDataAsJsonFrom = async (url) => {
    const raw = await fetchDatabase(url);
    const json = await Papa.parse(raw);
    return json.data;
}
async function updateValues() {
    /**
     * Request data from pages
     */
    const dbResults = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTscQ0Ct8XJpzDDjdKzbZi69uctTfNrEbm1W5keq0ewUJfIe6tCWyufExv4HPad_eTmcm40kP3CXUHI/pub?gid=0&single=true&output=csv";
    let dbResultsArrayData = await getDataAsJsonFrom(dbResults);
    dbResultsArrayData.forEach((element, index) => {
        if(index!=0){
            projects.push(buildProjectFromArray(element));
        }
    });
}



function buildProjectFromArray(projectArrayItem) {
    return {
        project: projectArrayItem[0],
        team: projectArrayItem[9],
        codeA: projectArrayItem[3],
        codeB: projectArrayItem[7],
        result: projectArrayItem[11],
    }
}