"use strict";
(() => {
    let projects = [];
    window.addEventListener("load", function () {
        buildConfigForm();
    });

    async function buildConfigForm() {
        await updateValues();
        let buttonSearch = document.querySelector("#search-btn");
        let codeSearch = document.querySelector("#search-txt");
        buttonSearch.addEventListener(
            "click", () => {
                searchAndUpdate(codeSearch.value);
            }
        );
    }

    function searchAndUpdate(codeQuery) {
        if (codeQuery == "") return;

        let index = projects.findIndex((item) => item.codeA == codeQuery || item.codeB == codeQuery);

        if (index !== -1) {
            let nameView = document.querySelector(".project-name");
            let teamView = document.querySelector(".project-team");
            let resultView = document.querySelector(".project-result");
            let commentsView = document.querySelector(".project-comments");
            nameView.innerHTML = projects[index].project;
            teamView.innerHTML = projects[index].team;
            resultView.innerHTML = projects[index].result;
            let parts = projects[index].comments.split('//');
            let filtered = parts.filter(item => item !== "" && item !== " ");
            let comments = "";
            filtered.forEach((item) => {
                comments += "* " + item + "<br><br>";
            });
            commentsView.innerHTML = comments;
            updateEvaluationValues(projects[index]);
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
            if (index != 0) {
                projects.push(buildProjectFromArray(element));
            }
        });
    }

    function updateEvaluationValues(project) {

        const evalViewScoreDesir = document.querySelector(".project-evaluation-desirability-score");
        const evalViewScorefeasi = document.querySelector(".project-evaluation-feasibility-score");
        const evalViewScoreViabi = document.querySelector(".project-evaluation-viability-score");
        const evalViewScoreInnov = document.querySelector(".project-evaluation-innovation-score");
        const evalViewScoreLooki = document.querySelector(".project-evaluation-looking-score");
        const evalViewScoreFunct = document.querySelector(".project-evaluation-functionality-score");
        const evalViewScorePrese = document.querySelector(".project-evaluation-presentation-score");
        const evalViewScoreSpeec = document.querySelector(".project-evaluation-speech-score");
        const evalViewScoreAnaly = document.querySelector(".project-evaluation-analysis-score");

        evalViewScoreDesir.innerHTML = project.desir;
        evalViewScorefeasi.innerHTML = project.feasi;
        evalViewScoreViabi.innerHTML = project.viabi;
        evalViewScoreInnov.innerHTML = project.innov;
        evalViewScoreLooki.innerHTML = project.looki;
        evalViewScoreFunct.innerHTML = project.funct;
        evalViewScorePrese.innerHTML = project.prese;
        evalViewScoreSpeec.innerHTML = project.speec;
        evalViewScoreAnaly.innerHTML = project.analy;

    }

    function buildProjectFromArray(projectArrayItem) {
        return {
            project: projectArrayItem[0],
            team: projectArrayItem[9],
            codeA: projectArrayItem[3],
            codeB: projectArrayItem[7],
            result: projectArrayItem[11],
            comments: projectArrayItem[12],

            desir: projectArrayItem[13],
            feasi: projectArrayItem[14],
            viabi: projectArrayItem[15],
            innov: projectArrayItem[16],
            looki: projectArrayItem[17],
            funct: projectArrayItem[18],
            prese: projectArrayItem[19],
            speec: projectArrayItem[20],
            analy: projectArrayItem[21]

        }
    }
})();