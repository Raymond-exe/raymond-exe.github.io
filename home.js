const TINT_ALPHA = 0.75;

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
}

async function toggleSection(sectionId, isSubsection = false) {
    const element = document.getElementById(sectionId);
    if (element.classList.contains("expanded")) {
        hideSection(sectionId, isSubsection);
    } else {
        expandSection(sectionId, isSubsection);
    }
}

function lerp (a, b, alpha) {
    return a*(1-alpha) + b*alpha;
}
