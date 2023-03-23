set_all_text();

window.addEventListener("resize", set_all_text);

function set_all_text() {
    setText("div_devmode", "button_devmode", "💻", "Github");
    setText("menu-main-card", "button_menu", "📋", "Menu");
}


function toggle_button_menu() {
    toggle_button("menu-main-card", true, "button_menu", "📋", "Menu");
}

function toggle_button_devmode() {
    toggle_button("div_devmode", true, "button_devmode", "💻", "Github");
}

function toggle_button(name, inline, button, icon, text) {
    var a = document.getElementById(name);
    var b = document.getElementById(button);

    if (window.getComputedStyle(a).getPropertyValue("display") === "none") {
        if (inline) {
            a.style.display = "inline-block";
        }
        else {
            a.style.display = "block";
        }
        setText(name, button, icon, text);
    } else {
        a.style.display = "none";
        setText(name, button, icon, text);
    }
}

function setText(name, button, icon, text) {
    var a = document.getElementById(name);
    var b = document.getElementById(button);

    if (window.getComputedStyle(a).getPropertyValue("display") === "none") {
        b.textContent = "👀" + text + icon;
    } else {
        b.textContent = "❌" + text + icon;
    }
}
