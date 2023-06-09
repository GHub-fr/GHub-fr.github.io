githubHeader();

function gather(url) {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    resolve(data);
                    return;
                })
                .catch(error => console.error(error))
        }, 1000);
    });
}

function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

function getValue(obj, key) {
    var value;
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (i == key) {
            value = obj[i];
            break;
        }
    }
    return value;
}

function githubHeader() {
    var pathname = window.location.pathname;
    if (pathname == "/") {
        pathname += "index.html";
    }

    pageName(pathname);
    pageCommit();
    includePages(pathname);
}
function pageName(pathname) {
    document.getElementById("pageName").innerText += pathname;
    document.getElementById("pageName").href += pathname;
}

async function pageCommit() {
    var x = await gather('https://api.github.com/repos/GHub-fr/GHub-fr.github.io/commits');
    var y = getValue(x[0], "sha");
    if (String(y).length >= 8) {
        var y2 = String(y.substring(0, 12) + "...");
    }

    document.getElementById("pageCommit").href += y;
    document.getElementById("pageCommit").innerText += y2;

    var z = getValue(x[0], "commit")
    var z2 = getValue(z, "author");

    var name = getValue(z2, "name");
    document.getElementById("pageAuthor").href += name;
    document.getElementById("pageAuthor").innerText += name;

    var date = getValue(z2, "date");
    const date1 = new Date(date);
    var date2 = date1.toLocaleString();
    document.getElementById("pageDate").innerText += date2;

    var message = getValue(z, "message")
    document.getElementById("pageMessage").innerText += message;
}

function includedPages(nom, lien) {
    pageInclude.append(splitter());
    pageInclude = document.getElementById("pageInclude");

    var a = document.createElement('a');
    a.className = "text-link text-inline";
    a.textContent = nom;
    a.href = "https://github.com/GHub-fr/GHub-fr.github.io/tree/main/" + lien + "/" + nom;
    a.target = "_blank";

    pageInclude.append(a);
}

function splitter() {
    var p = document.createElement('p');
    p.className = "text-font text-splitter text-inline-pad";
    p.textContent = "|";

    return p;
}

function includePages(pathname) {
    if (pathname == "/index.html") {
        includedPages("home.html", "pages/contents");
        // includedPages("home.md", "pages/contents");
        // includedPages("md-parser.js", "scripts");
        //Ont étés déplacés vers opensource/contribuer
    }

    else if (pathname == "/pages/views/giscus.html") {
        includedPages("giscus.js", "scripts");
    }

    else if (pathname == "/pages/views/badges.html") {
        includedPages("github-badges.js", "scripts");
        includedPages("badges-GHub-fr.html", "pages/contents");
    }

    else if (pathname.startsWith("/pages/views/opensource")) {
        var pathnameInclude2 = pathname.split("/")
        includedPages(pathnameInclude2[pathnameInclude2.length - 1], "pages/contents/opensource");

        if (pathname == "/pages/views/opensource/participants.html") {
            includedPages("github-participants.js", "scripts");
        }
    }

    else if (pathname.startsWith("/pages/views/administrateur")) {
        var pathnameInclude = pathname.replace("views", "contents");
        var className = pathname.split("/");
        var finalClassName = className[className.length - 1];
        includedPages(finalClassName, "pages/contents/administrateur");
    }

    else {
        includedPages("404.html", "pages/contents");
        includedPages("404.md", "");
    }

    includedPages("content.html", "pages/includes");
    includedPages("github-header.js", "scripts");
    includedPages("menu.js", "scripts");
    includedPages("menu.html", "pages/includes");
    includedPages("fetch.js", "scripts");
} 
