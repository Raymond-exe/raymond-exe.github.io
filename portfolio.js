
// Used to remember where the user scrolled on the main portfolio page
let resetScroll = 0;

function toggleDarkMode() {
    const element = document.body;
    element.classList.toggle("dark-mode");
    const html = document.getElementById("html");
    html.classList.toggle("dark-mode");
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
    resetScroll = document.children[0].scrollTop;
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
        window.scrollTo({top: height, behavior: 'smooth'})
    } catch (e) {
        window.scrollTo(0, height);
    }
}
