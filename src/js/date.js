var id = "date";

setDateHTML();



function setDateHTML() {
    var div = document.createElement("div");
    div.style = "max-width: 50px;";
    var date = document.createElement("p")
    date.id = id;

    var dateTimeZone = document.createElement("p");
    dateTimeZone.id = id + "TimeZone";

    var content = document.querySelector("#content-right");
    if (content != null) {
        content.appendChild(div);

        div.appendChild(date);
        div.appendChild(dateTimeZone);

        setInterval(getDate, 250);
    }
}

function getDate() {    
    var date = new Date();
    var message = addZero(date.getDate()) + "/" + addZero(date.getMonth() + 1) + " " + date.getFullYear() + " " + date.getHours() + ":" + addZero(date.getUTCMinutes());
    console.log(message);

    document.getElementById(id).textContent = message;
    document.getElementById(id + "TimeZone").textContent = (Intl.DateTimeFormat().resolvedOptions().timeZone).replaceAll("/"," ");
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}