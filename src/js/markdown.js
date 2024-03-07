
const parseMarkdown = (text) => {
    console.log("Loading markdown parser");
    const toHTML = text

        .replace(/([^!])\[([^\[]+)\]\(([^\)]+)\)/gim, '$1<a href=\"$3\">$2</a>') // <a>
        .replace(/!\[([^\[]+)\]\(([^\)]+)\)/gim, '<img src=\"$2\" alt=\"$1\" />') // <img>
        .replace(/^###### (.*$)/gim, '<h6>$1</h6>') // h6 tag
        .replace(/^##### (.*$)/gim, '<h5>$1</h5>') // h5 tag
        .replace(/^#### (.*$)/gim, '<h4>$1</h4>') // h4 tag
        .replace(/^### (.*$)/gim, '<h3>$1</h3>') // h3 tag
        .replace(/^## (.*$)/gim, '<h2>$1</h2>') // h2 tag
        .replace(/^# (.*$)/gim, '<h1>$1</h1>') // h1 tag
        .replace(/\`{3}(.*?)\`{3}/gms, '<textarea>$1</textarea>') // <code>
        .replace(/\`{1,3}(.*?)\`{1,3}/gms, '<code>$1</code>') // <code>
        .replace(/-{3,}/gim, '<hr/>') //hr (Decoration line)
        .replace(/\~\~(.*?)\~\~/gim, '<del>$1</del>')// <del>
        .replace(/\n(?:&gt;|\>)\W*(.*)/gim, '<blockquote><p>$1</p></blockquote>') // <blockquote>

        .replace(/\*\*(.*?)\*\*/gm, '<b>$1</b>') // bold text
        .replace(/\*(?![^]*(`{1,3}|<|&gt;|<code>\s*|<textarea>\s*)).*?(?=\s*(?!`{0,3}|<\/textarea>)|<|\/code>)/gm, '<em>$&</em>') // italic text inside code or textarea tags
        .replace(/\*(.*?)\*/gm, '<i>$1</i>') // italic text
        .replace(/\_\_(.*?)\_\_/gm, '<u>$1</u>') // underline

        .replace(/\n\s?\*\s*(.*)/gim, '<ul>\n\t<li>$1</li>\n</ul>') // <ul>
        .replace(/\n\s?[0-9]+\.\s*(.*)/gim, '<ol>\n\t<li>$1</li>\n</ol>') // <ol>

        .replace(/([a-z0-9A-Z:;|!§%'~’"°«»(){}@&=+-/^_¨$£¤µ*€.,âôœûùéêëèàç/]+)(?![^<]*>|[^>]*<\/)/gim, '<p>$1</p>') // text p balise

        .replace(/[\n]{1}/g, "<br>") //new line

        .trim();
    console.log("Loading return markdown trim");
    return toHTML.trim();
}

async function getMarkdown(url) {
    console.log("Loading download markdown");
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            fetch(url)
                .then(response => response.text())
                .then(data => {
                    resolve(data);
                    return;
                })
                .catch(error => console.error(error))
        }, 250);
    });
}

async function addMarkdown(repo, file, gist, doesSetAnchor) {
    console.log("Loading markdown CSS");
    await include_css("/src/css/markdown.css");
    console.log("Loading .md");
    var x;
    var x2;
    if (gist === true) {
        x = await getMarkdown('https://gist.githubusercontent.com/' + repo + "/" + file + "/raw")
        x = "<h1>code</h1>\n<textarea>" + x + "</textarea>";
        x2 = x;
    }else if(gist === false){
        x = await getMarkdown('https://raw.githubusercontent.com/' + repo + "/main/" + file);
        x2 = parseMarkdown(x);
    }
    // console.log(".md : " + x);
    // console.log("Loading HTML wrapped .md :" + x2);
   
    //console.log("Loading clean code in .md");
    var regex = /<textarea>((?!<<textarea>>))*((?!<\/textarea>)[\s\S])*<\/textarea>/gim;
    var x3 = x2.match(regex);
    //console.log(x3);

    for (i in x3) {
        //console.log(x3[i]);
        var res = x3[i].replaceAll("<br>", "\n");
        x2 = x2.replace(x3[i], res);
    }
    //console.log(x2)

    var content = document.querySelector("#contentArticle");

    var markdownHolder = document.getElementById("markdown");
    if(markdownHolder === null || markdownHolder === undefined){
        var newDiv = document.createElement("div");
        newDiv.id = "markdown";
        content.appendChild(newDiv);
    }
    markdownHolder = document.getElementById("markdown");
    markdownHolder.innerHTML += x2;

    anchorButton(repo, file, gist);
    if (doesSetAnchor === true){
        setAnchor();
    }
    autoScroll();
    console.log("Fin markdown");
}

function anchorButton(repo, file, gist) {
    var anchor = document.querySelector("#anchor");
    var divEdit = document.querySelector("#editAnchor");
    if (divEdit === null || divEdit === undefined) {
        var newDivEdit = document.createElement("div");
        newDivEdit.id = "editAnchor";
        anchor.appendChild(newDivEdit);
    }

    divEdit = document.querySelector("#editAnchor");
    var link = document.createElement("a");
    var button = document.createElement("button");
    var image = document.createElement("img");
    if (gist === true) {
        link.href = "https://gist.github.com/" + repo + "/" + file;
        image.src = "/assets/svg/language.svg";
        button.classList = "edit-gist"
     }
    else if (gist === false) {
        link.href = "https://github.com/" + repo + "/blob/main/" + file;
        image.src = "/assets/svg/edit.svg";
        button.classList = "edit-md"
    }
    link.target = "_blank";
    image.classList = "svg";
    button.appendChild(image);
    link.appendChild(button);
    divEdit.appendChild(link);
}

function setAnchorButton() { 
    var content = document.querySelector("#anchor");

    var button = document.createElement("button");
    button.id = "SummaryAnchor";
    var image = document.createElement("img");
    
    button.onclick = function () {
        var anchorList = document.getElementById("anchorList");

        if (anchorList.style.display === "none") {
            anchorList.style.display = "grid";
        }
        else {
            anchorList.style.display = "none";
        }
    }

    image.classList = "svg";
    image.src = "/assets/svg/book.svg";

    button.appendChild(image);
    content.appendChild(button);
}

function setAnchor() {
    setAnchorButton();
    var anchorList = document.createElement("div");
    anchorList.id = "anchorList";
    var contentLeft = document.getElementById("content-left");
    contentLeft.appendChild(anchorList);

    var anchorTitle = document.createElement("b");
    anchorTitle.textContent = "Sommaire"

    var anchorTitleLogo = document.createElement("img");
    anchorTitleLogo.src = "/assets/svg/book.svg";
    anchorTitleLogo.classList = "svg";
    anchorTitleLogo.style = "max-width: 25px; transform: translateY(25%); padding-right: 15px; padding-left: 10px;"

    var divAnchorTitle = document.createElement("div");

    divAnchorTitle.appendChild(anchorTitleLogo);
    divAnchorTitle.appendChild(anchorTitle);

    var check = document.createElement("div");
    check.classList = "check";
    check.style = "padding:25px;";
    var checkbox = document.createElement("div");
    checkbox.classList = "checkbox";
    var input = document.createElement("input");
    input.type = "checkbox";
    var isOn = false;
    input.onclick = () => {
        var list = document.getElementById('anchorList').getElementsByClassName("summary-hidder");

        if (isOn) {
            isOn = false;

        } else {
            isOn = true;
        }

        console.log("run");
        for (i = 0; i < list.length; i++) {
            var childDiv = list[i];
            if (isOn) {
                childDiv.style.display = "none";
            } else {
                childDiv.style.display = "block";
            }
            console.log("run child");
        }
    };
    var textCheck = document.createElement("p");
    textCheck.textContent = "Titre #3 +";
    textCheck.style = "padding:10px;";
    var span = document.createElement("span");



    //

    var check2 = document.createElement("div");
    check2.classList = "check";
    check2.style = "padding:25px;";
    var checkbox2 = document.createElement("div");
    checkbox2.classList = "checkbox";
    var input2 = document.createElement("input");
    input2.type = "checkbox";
    var isOn2 = false;
    input2.onclick = () => {
        var list2 = document.getElementById('anchorList').getElementsByClassName("summary-h2");

        if (isOn2) {
            isOn2 = false;
        } else {
            isOn2 = true;
        }

        console.log("run");
        for (i = 0; i < list2.length; i++) {
            var childDiv2 = list2[i];
            if (isOn2) {
                childDiv2.style.display = "none";
            } else {
                childDiv2.style.display = "block";
            }
            console.log("run child");
        }
    };
    var textCheck2 = document.createElement("p");
    textCheck2.textContent = "Titre #2";
    textCheck2.style = "padding:10px;";
    var span2 = document.createElement("span");


    check2.appendChild(checkbox2);
    check2.appendChild(textCheck2);
    checkbox2.appendChild(input2);
    checkbox2.appendChild(span2);
    divAnchorTitle.appendChild(check2);

    //

    check.appendChild(checkbox);
    check.appendChild(textCheck);
    checkbox.appendChild(input);
    checkbox.appendChild(span);
    divAnchorTitle.appendChild(check);

    anchorList.appendChild(divAnchorTitle);


    var childDivs = document.getElementById('markdown').querySelectorAll("h1, h2, h3, h4, h5, h6");

    for (i = 0; i < childDivs.length; i++) {
        var childDiv = childDivs[i];
        var textPre = childDiv.textContent;
        var text = textPre.replaceAll(" ", "-");
        var text = text.replaceAll("'", "");
        var text = text.replaceAll(":", "");
        var text = text.replaceAll("@", "");
        var text = text.replaceAll("(", "");
        var text = text.replaceAll(")", "");
        var anchor = document.createElement("a");
        anchor.href = "#" + text;
        anchor.id = text;
        anchor.style = "padding-left:12px;scroll-margin-top: 100px;";
        childDiv.append(anchor);

        var anchorOnList = document.createElement("a");
        anchorOnList.href = "#" + text;
        if (childDivs[i].tagName.toLocaleLowerCase() === "h1") {
            anchorOnList.textContent = "#1 " + textPre;
            anchor.textContent = "#";
            anchorOnList.style = "padding-left:5px;font-size: large;";
            anchorOnList.className = "summary-h1";
        }
        else if (childDivs[i].tagName.toLocaleLowerCase() === "h2") {
            anchorOnList.textContent = "#2 " + textPre;
            anchor.textContent = "##";
            anchorOnList.style = "padding-left:15px;text-decoration:none;font-size: medium;";
            anchorOnList.className = "summary-h2";
        }
        else if (childDivs[i].tagName.toLocaleLowerCase() === "h3") {
            anchorOnList.textContent = "#3 " + textPre;
            anchor.textContent = "###";
            anchorOnList.style = "padding-left:45px;text-decoration:none;font-size: small;";
            anchorOnList.className = "summary-hidder";
        }
        else if (childDivs[i].tagName.toLocaleLowerCase() === "h4") {
            anchorOnList.textContent = "#4 " + textPre;
            anchor.textContent = "####";
            anchorOnList.style = "padding-left:45px;text-decoration:none;font-size: x-small;";
            anchorOnList.className = "summary-hidder";
        }
        else if (childDivs[i].tagName.toLocaleLowerCase() === "h5") {
            anchorOnList.textContent = "#5 " + textPre;
            anchor.textContent = "#####";
            anchorOnList.style = "padding-left:45px;text-decoration:none;font-size: xx-small;";
            anchorOnList.className = "summary-hidder";
        }
        else if (childDivs[i].tagName.toLocaleLowerCase() === "h6") {
            anchorOnList.textContent = "#6 " + textPre;
            anchor.textContent = "######";
            anchorOnList.style = "padding-left:45px;text-decoration:none;font-size: xx-small;";
            anchorOnList.className = "summary-hidder";
        }
        else {
            anchorOnList.textContent = "#7+ " + textPre;
            anchor.textContent = "#7+";
            anchorOnList.style = "padding-left:60px;text-decoration:none;font-size: xx-small;";
            anchorOnList.className = "summary-hidder";
        }
        anchorList.appendChild(anchorOnList);
    }
}

function autoScroll() {
    var hash = decodeURIComponent(window.location.hash);
    hash = hash.replace("#", "");

    var element = document.getElementById(hash);
    if (element !== null) {
        element.scrollIntoView();
    } 
}

function addHRChapter() {
    var hr = document.createElement("hr");
    hr.style.marginTop = "100px"; hr.style.marginBottom = "100px";
    document.getElementById("markdown").appendChild(hr);
}