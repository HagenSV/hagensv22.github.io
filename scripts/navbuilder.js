const NAVBAR_MENU = {
    "Home": "./index.html",
    "Projects": "./projects.html"
}

/**
 * Creates a navbar button with provided text and link destination
 * @param {string} text the link text
 * @param {string} link the link destination
 * @returns
 */
function create_navbar_btn(text, link) {
    const LINK = document.createElement("a");
    LINK.href = link;
    LINK.innerText = text;
    return LINK;
}

/**
 * Generates a dropdown container with the results of the search
 * @param {string} items 
 * @returns {HTMLDivElement}
 */
function createSearchResults(items){
    const SEARCH_RESULTS = document.createElement("div");
    SEARCH_RESULTS.classList.add("dropdown-content");
    SEARCH_RESULTS.id = "search-results";

    for (let i in items){
        SEARCH_RESULTS.appendChild(create_navbar_btn(items[i],"./projects.html#"+items[i].toLowerCase().replace(" ","-")))
    }

    return SEARCH_RESULTS;
}

document.addEventListener("DOMContentLoaded", function () {
    const nav = document.getElementById("nav")

    //Fill nav bar with links
    const nav_menu = document.createElement("div")
    nav_menu.id = "nav-menu";

    const menu_btn = document.createElement("span")
    menu_btn.id = "menu"
    menu_btn.classList.add("material-icons")
    menu_btn.appendChild(create_navbar_btn("menu","javascript:void(0)"))
    nav_menu.appendChild(menu_btn)

    const nav_list = document.createElement("ul");
    for (const ITEM_NAME in NAVBAR_MENU) {
    
        const BTN = document.createElement("li");

        //If the key content is a string, create a button
        if (typeof NAVBAR_MENU[ITEM_NAME] === 'string') {
            BTN.appendChild(create_navbar_btn(ITEM_NAME, NAVBAR_MENU[ITEM_NAME]));
      
        //Create dropdown list
        } else {

            BTN.classList.add("dropdown");
            const BTN_LINK = document.createElement("span");
            BTN_LINK.innerText = ITEM_NAME;
            BTN_LINK.classList.add("dropbtn");
            const CONTENT = document.createElement("div");
            CONTENT.classList.add("dropdown-content");

            for (const DROPDOWN_ITEM in NAVBAR_MENU[ITEM_NAME]) {
                DROPDOWN_BTN = create_navbar_btn(DROPDOWN_ITEM, NAVBAR_MENU[ITEM_NAME][DROPDOWN_ITEM]);
                CONTENT.appendChild(DROPDOWN_BTN);
            }
            BTN.appendChild(BTN_LINK);
            BTN.appendChild(CONTENT);
        }
        nav_list.appendChild(BTN);
    }
    nav_menu.appendChild(nav_list);
    nav.appendChild(nav_menu);

    // Create container for search functions
    const SEARCH_CONTAINER = document.createElement("div")
    SEARCH_CONTAINER.id ="search";

    //Create search bar
    const SEARCH_BAR = document.createElement("input");
    SEARCH_BAR.type = "text";
    SEARCH_BAR.placeholder = "search";
    SEARCH_BAR.autocomplete = "off";
    SEARCH_BAR.id = "search-input";
    SEARCH_CONTAINER.appendChild(SEARCH_BAR)

    //Create container for search results
    SEARCH_CONTAINER.appendChild(createSearchResults([]));

    //Search bar event listeners
    SEARCH_BAR.oninput = (e) => {
        let results = search(SEARCH_BAR.value)
        document.getElementById("search-results").remove();
        SEARCH_CONTAINER.appendChild(createSearchResults(results));
    };

    //Add to nav bar
    nav.appendChild(SEARCH_CONTAINER);
});