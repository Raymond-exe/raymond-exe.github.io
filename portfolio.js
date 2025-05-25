
const getBody = () => document.getElementById('body');

// Used to remember where the user scrolled on the main portfolio page
let resetScroll = 0;
let projectTitles = {};

function toggleDarkMode() {
    const element = document.body;
    element.classList.toggle('dark-mode');
    const html = document.getElementById('html');
    html.classList.toggle('dark-mode');
}

function showProjectViewer(project, title = '') {
    // hide main portfolio view
    const portfolio = document.getElementById('portfolio-container');
    portfolio.classList.add('hidden');

    // show project viewer
    const projectViewer = document.getElementById('project-viewer');
    projectViewer.classList.remove('hidden');

    // specify project to show on markdown renderer
    const markdown = document.getElementById('markdown-renderer');
    markdown.src = project;

    // add hash for linking specific projects
    const filename = project.split('/').pop().split('.')[0];
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${filename}`);

    // update title
    setTabTitle(title);

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

    // reset hash in URL
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);

    // reset tab title
    setTabTitle();

    setTimeout(() => {
        // clear project shown on markdown renderer
        const markdown = document.getElementById('markdown-renderer');
        markdown.src = '';
    }, 500);

    // Restore original scroll
    setScroll(resetScroll);
}

function setScroll(height = 0) {
    try {
        getBody().scrollTo({top: height, behavior: 'smooth'})
    } catch (e) {
        getBody().scrollTo(0, height);
    }
}

async function loadProjects(callback = () => {}) {
    const response = await fetch('./projects/projects.json');
    const projects = await response.json();
    const grid = document.getElementById('projects-grid');

    projects.forEach(project => {
        projectTitles[project.file] = project.title;

        const button = document.createElement('button');
        button.classList.add('project-link');
        button.onclick = () => showProjectViewer(project.file, project.title);

        const projectTitle = document.createElement('h2');
        projectTitle.classList.add('project-title');
        projectTitle.innerText = project.title;

        const statusTags = document.createElement('div');
        statusTags.classList.add('project-status-tags');
        project.tags.forEach(tag => {
            const image = document.createElement('img');
            image.src = `https://img.shields.io/badge/${tag}`;
            statusTags.appendChild(image);
        });

        const projectInfo = document.createElement('div');
        projectInfo.classList.add('project-info');
        projectInfo.appendChild(projectTitle);
        projectInfo.appendChild(statusTags);

        const thumbnail = document.createElement('img');
        thumbnail.classList.add('thumbnail');
        thumbnail.src = project.thumbnail;
        thumbnail.onload = onLoad;

        button.appendChild(projectInfo);
        button.appendChild(thumbnail);

        grid.appendChild(button);
    });

    let loaded = 0;
    function onLoad(){
        loaded++;
        if(loaded == projects.length){
            callback()
        }
    }
}

function setTabTitle(title = '𝘗𝘰𝘳𝘵𝘧𝘰𝘭𝘪𝘰') {
    document.title = `𝘙. 𝘞𝘰𝘯𝘨 - ${title}`;
}

addEventListener("load", () => {
    loadProjects(() => {
        // detect hash if present
        const hash = window.location.hash.substring(1);
        if (`./projects/${hash}.md` in projectTitles) {
            showProjectViewer(`./projects/${hash}.md`, projectTitles[`./projects/${hash}.md`]);
        }

        // update instruction to say "Tap" if display is vertical
        const element = document.getElementById('instruction');
        if (element && window.innerHeight > window.innerWidth) {
            const text = element.textContent.replace('Click', 'Tap');
            element.textContent = text;
        }

        // show body when it's finished loading
        const body = document.getElementById('body');
        if (body) {
            body.classList.remove('hidden');
        }
    });
});
