var id = "date";

setDateHTML();

function setDateHTML() {
    var div = document.createElement("div");
    div.style = "max-width: min-content;text-align: center;";
    var date = document.createElement("p")
    date.id = id;

    var content = document.querySelector("#content-right");
    if (content != null) {
        content.appendChild(div);

        div.appendChild(date);

        setInterval(getDate, 250);
    }
}

function getDate() {    
    var date = new Date();
    var message = addZero(date.getDate()) + "/" + addZero(date.getMonth() + 1) + " " + date.getFullYear() + " " + addZero(date.getHours()) + ":" + addZero(date.getUTCMinutes());

    document.getElementById(id).textContent = message;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}