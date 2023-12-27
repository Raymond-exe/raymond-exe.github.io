const TINT_ALPHA = 0.75;

window.addEventListener('popstate', checkUrl);

async function checkUrl() {
    const url = window.location.href;

    if (url.includes('#')) {
        const overlay = document.getElementById('overlay');
        const id = url.substring(url.lastIndexOf('#') + 1);
        const element = document.getElementById(id);

        if (element && overlay.contains(element)) {
            expandSection(id);
        }
    }
}

async function expandSection(sectionId, isSubsection = false) {
    const element = document.getElementById(sectionId);
    if (!element.classList.contains("expanded"))
        element.classList.add("expanded");

    if (!isSubsection) {
        document.getElementById("overlay").style.pointerEvents = 'all';
        document.getElementById("tint").classList.add("shaded");
    }
}

async function hideSection(sectionId, isSubsection = false) {
    const element = document.getElementById(sectionId);
    while (element.classList.contains("expanded"))
        element.classList.remove("expanded");

    if (!isSubsection) {
        document.getElementById("overlay").style.pointerEvents = 'none';
        document.getElementById("tint").classList.remove("shaded");
    }

    // removes the id from the URL
    const url = window.location.href;
    if (url.includes('#')) {
        // console.log(url.substring(url.lastIndexOf('/'), url.lastIndexOf('#') ));
        window.history.pushState("", "", url.substring(url.lastIndexOf('/'), url.lastIndexOf('#')));
    }
}

async function toggleSection(sectionId, isSubsection = false) {
    const element = document.getElementById(sectionId);
    if (element.classList.contains("expanded")) {
        hideSection(sectionId, isSubsection);
    } else {
        expandSection(sectionId, isSubsection);
    }
}
