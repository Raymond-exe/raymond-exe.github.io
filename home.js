const TINT_ALPHA = 0.75;

async function expandSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element.classList.contains("expanded"))
        element.classList.add("expanded");

    document.getElementById("overlay").style.pointerEvents = 'all';
    document.getElementById("tint").classList.add("shaded");
}

async function hideSection(sectionId) {
    const element = document.getElementById(sectionId);
    while (element.classList.contains("expanded"))
        element.classList.remove("expanded");

    document.getElementById("overlay").style.pointerEvents = 'none';
    document.getElementById("tint").classList.remove("shaded");
}

function lerp (a, b, alpha){
    return a*(1-alpha) + b*alpha;
  }
