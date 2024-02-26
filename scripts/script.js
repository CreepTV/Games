const url = 'https://cobblemon.com/';
let darkMode = false;

const modeButton = document.getElementById('change-mode');
const logo = document.getElementById('logo');

const hero = document.getElementById('hero');
const waveDividers = document.getElementsByClassName('wave-divider-path');

const body = document.querySelector('body');
const header = document.querySelector('header');

const waveDividerWidth = 1440;

const headerSizing = {
    'default': {
        headerPaddingBlock: 40,
        headerPaddingBlockCondensed: 20,
        headerPaddingInline: 60,
        logoWidth: 500,
        logoWidthCondensed: 400
    },
    '1500': {
        headerPaddingBlock: 20,
        headerPaddingBlockCondensed: 14,
        headerPaddingInline: 30,
        logoWidth: 300,
        logoWidthCondensed: 200
    },
    '900': {
        headerPaddingBlock: 20,
        headerPaddingBlockCondensed: 12,
        headerPaddingInline: 30,
        logoWidth: 250,
        logoWidthCondensed: 200
    }
}

function toggleMode() {
    darkMode = !darkMode;
    if (darkMode) { enableDarkMode(); }
    else { enableLightMode(); }
}

function enableDarkMode() {
    if (!body.classList.contains('dark-mode')) { body.classList.add('dark-mode'); }
    document.documentElement.setAttribute('theme', 'dark');
}

function enableLightMode() {
    if (body.classList.contains('dark-mode')) { body.classList.remove('dark-mode'); }
    document.documentElement.setAttribute('theme', 'light');
}

function resizeHeader() {
    const heroScrollRatio = window.pageYOffset / hero.offsetHeight;
    const screenWidth = window.innerWidth;

    let width = 'default';
    if (screenWidth <= 1500 && screenWidth > 900) { width = '1500' }
    if (screenWidth <= 900) { width = '900' }

    if (heroScrollRatio <= 1) {
        if (header.classList.contains('condensed')) {
            header.classList.remove('condensed');
        }
        const ratio = Number(heroScrollRatio.toFixed(2));

        header.style.backgroundColor = "rgba(33, 32, 53, " + (ratio - 0.1) + ")";

        header.style.padding = (headerSizing[width].headerPaddingBlock - ((headerSizing[width].headerPaddingBlock - headerSizing[width].headerPaddingBlockCondensed) * ratio)) + "px " + headerSizing[width].headerPaddingInline + "px";
        logo.style.width = (headerSizing[width].logoWidth - ((headerSizing[width].logoWidth - headerSizing[width].logoWidthCondensed) * ratio)) + "px";
    } else {
        if (!header.classList.contains('condensed')) {
            header.style.backgroundColor = "rgba(33, 32, 53, 0.9)";
            header.style.padding = headerSizing[width].headerPaddingBlockCondensed + "px " + headerSizing[width].headerPaddingInline + "px";
            logo.style.width = headerSizing[width].logoWidthCondensed + "px";

            header.classList.add('condensed');
        }
    }
}

function resizeDivider() {
    const ratio = Math.ceil((window.innerWidth / waveDividerWidth) * 100) / 100;

    for (let i = 0; i < waveDividers.length; i++) {
        waveDividers[i].style.transform = 'scaleX(' + ratio + ') scaleY(0.5)';
    }
}

modeButton.addEventListener('click', function() {
    toggleMode();
});

logo.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (!logo.classList.contains('home')) {
        redirect();
    }
});

window.onresize = function() {
    resizeDivider();
}

body.onscroll = function() {
    resizeHeader();
}

function getModeFromQuery(changeMode = true) {
    const queryParameter = '?mode=';
    const query = window.location.search;
    const queryIndex = query.indexOf(queryParameter);

    // If URL contains query
    if (queryIndex >= 0) {
        const mode = query.substring(queryIndex + queryParameter.length);

        if(changeMode) {
            if (mode == 'dark') {
                darkMode = true;
                enableDarkMode();
            } else {
                darkMode = false;
                enableLightMode();
            }
        }

        return mode;
    }
    return false;
}

function checkForMode() {
    if (!getModeFromQuery() && getDarkModePreference()) {
        darkMode = true;
        enableDarkMode();
    }
}

function getDarkModePreference() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function modeMatchesPreference() {
    return darkMode == getDarkModePreference();
}

function redirect(id = null) {
    // Add mode query if the user's current mode is different than the computer preferred mode
    if (!modeMatchesPreference()) {
        const query = `?mode=${ darkMode ? 'dark' : 'light' }`;
        window.location.href = id? `${url}${id}${query}` : `${url}${query}`;
    } else {
        window.location.href = id ? `${url}${id}` : url;
    }
}

resizeHeader();
resizeDivider();
checkForMode();