
const getBody = () => document.getElementById('body');

// Used to remember where the user scrolled on the main portfolio page
let resetScroll = 0;

function toggleDarkMode() {
    const element = document.body;
    element.classList.toggle('dark-mode');
    const html = document.getElementById('html');
    html.classList.toggle('dark-mode');
}

function showProjectViewer(project) {
    // hide main portfolio view
    const portfolio = document.getElementById('portfolio-container');
    portfolio.classList.add('hidden');

    // show project viewer
    const projectViewer = document.getElementById('project-viewer');
    projectViewer.classList.remove('hidden');

    // specify project to show on markdown renderer
    const markdown = document.getElementById('markdown-renderer');
    markdown.src = `./projects/${project}.md`;

    // Scroll to top of page
    resetScroll = getBody().scrollTop;
    setScroll();
}

function hideProjectViewer() {
    // hide project viewer
    const projectViewer = document.getElementById('project-viewer');
    projectViewer.classList.add('hidden');

    // show main portfolio view
    const portfolio = document.getElementById('portfolio-container');
    portfolio.classList.remove('hidden');

    // Restore original scroll
    setScroll(resetScroll);
}

function setScroll(height = 0) {
    try {
        // throw new Error(''); // TODO figure out smooth scrolling
        getBody().scrollTo({top: height, behavior: 'smooth'})
    } catch (e) {
        getBody().scrollTo(0, height);
    }
}

addEventListener("load", () => {
    // update instruction to say "Tap" if display is vertical
    const element = document.getElementById('instruction');
    if (element && window.innerHeight > window.innerWidth) {
        const text = element.textContent.replace('Click', 'Tap');
        element.textContent = text;
    }
    console.log(element.textContent);

    // show body when it's finished loading
    const body = document.getElementById('body');
    if (body) {
        body.classList.remove('hidden');
    }
});
