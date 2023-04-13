const TINT_ALPHA = 0.75;

async function expandSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (!element.classList.contains("expanded"))
        element.classList.add("expanded");

    document.getElementById("overlay").style.zIndex = 10;
    document.getElementById("tint").classList.add("shaded");
}
async function hideSection(sectionId) {
    const element = document.getElementById(sectionId);
    while (element.classList.contains("expanded"))
        element.classList.remove("expanded");

    document.getElementById("overlay").style.zIndex = -10;
    document.getElementById("tint").classList.remove("shaded");
}

async function screenTint(darken = true) {
    const element = document.getElementById("tint");

    document.getElementById("overlay").style.zIndex = darken ? 10 : -10;

    // TODO
}

function lerp (a, b, alpha){
    return a*(1-alpha) + b*alpha;
  }
