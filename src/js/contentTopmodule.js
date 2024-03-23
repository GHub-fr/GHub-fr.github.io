const ids = [/*"statsContentIssues", "statsContentContributor",
    "statsContentBuild", "statsContentDiscussion", "statsContentGithubStatus",*/
    "statsContentConsoleInfo", "ContentLatestRSS", "ContentMusic", "statsContentMenu"];

async function showTopmodule(forceBlock, menuName) {
    console.log("Loading top module stats");
    var topModule = document.getElementById("TopModule");

    if (topModule.style.display == "block") {
        topModule.style = "display:none;";
        closeMenu();
    } else if (topModule.style.display == "none") {
        topModule.style = "display:block;";
        showMenu(menuName);
    }

    if (forceBlock === true) {
        topModule.style = "display:block;";
        showMenu(menuName);
    }
    else if (forceBlock === false) {
        topModule.style = "display:none;";
        closeMenu();
    }
}

async function showMenu(module) {
    closeMenu();

    if (module === "default") {
        var max = ids.length;
        var choiceRNG = Math.floor(Math.random() * max);
        var moduleName = ids[choiceRNG];
        module = moduleName;
    }

    for (i in ids) {
        if (module === ids[i]) {
            var element = document.getElementById(module);
            element.className = "visible";
            activateMenu(module);
        }
    }
}

function activateMenu(menuName) {
    if (menuName === "statsContentConsoleInfo") {
        statsConsoleSetup();
    }
    else if (menuName === "ContentLatestRSS") {
        getRSS();
    }
}

function closeMenu() {
    for (i in ids) {
        var element = document.getElementById(ids[i]);
        element.classList.remove("visible");
    }
}



function getRSS() {
    const RSS_URL = location.origin + "/rss.rss";

    fetch(RSS_URL)
        .then(response => response.text())
        .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
        .then(data => getLastRSSFeed(data))
}

function getLastRSSFeed(data) {
    const items = data.querySelectorAll("item");
    var size = items.length;
    size--;
    ShowRSSPost(items[size]);
}

function ShowRSSPost(data) {
    var link = data.querySelector("link");
    var title = data.querySelector("title");
    var description = data.querySelector("description");
    var date = data.querySelector("pubDate").textContent; 

   var dateGMT =  getRSSToDate(date);

    document.getElementById("titleNews").textContent = title.textContent;
    document.getElementById("titleNews").href = link.textContent;
    document.getElementById("titleNews").style = "padding-left:12px;padding-right:12px;";
    document.getElementById("descriptionNews").textContent = description.textContent;
    document.getElementById("descriptionNews").style = "padding-left:12px;";
    document.getElementById("dateNews").textContent = dateGMT;
}

function getRSSToDate(pubDate) {
    var date = new Date(pubDate);

    var months = Array("Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre");
    var string = date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();

    return string;
}