const NAVBAR_MENU = {
    "Home": "./index.html",
    "Projects": "./projects.html"
}

function create_navbar_link(text, link) {
    const LINK = document.createElement("a");
    LINK.href = link;
    LINK.innerText = text;
    return LINK;
}

document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav")

    const nav_list = document.createElement("ul");

    for (const ITEM_NAME in NAVBAR_MENU) {
    
        const BTN = document.createElement("li");

        if (typeof NAVBAR_MENU[ITEM_NAME] === 'string') {
            //Creates a button with a hyper link
            BTN.appendChild(create_navbar_link(ITEM_NAME, NAVBAR_MENU[ITEM_NAME]));
      
        } else {

            //Dropdown list
            BTN.classList.add("dropdown");
            const BTN_LINK = document.createElement("span");
            BTN_LINK.innerText = ITEM_NAME;
            BTN_LINK.classList.add("dropbtn");
            const CONTENT = document.createElement("div");
            CONTENT.classList.add("dropdown-content");

            for (const DROPDOWN_ITEM in NAVBAR_MENU[ITEM_NAME]) {
                DROPDOWN_BTN = create_navbar_link(DROPDOWN_ITEM, NAVBAR_MENU[ITEM_NAME][DROPDOWN_ITEM]);
                CONTENT.appendChild(DROPDOWN_BTN);
            }
            BTN.appendChild(BTN_LINK);
            BTN.appendChild(CONTENT);
        }
        nav_list.appendChild(BTN);
    }
    nav.appendChild(nav_list);
});