'use strict'


const params = new URLSearchParams(window.location.href);
const navPages = new Array({ innerHTML: 'NHL Teams', link: 'index.html' }, { innerHTML: 'NHL People', link: 'NHLPeople.html' }, { innerHTML: 'NHL Games', link: 'NHLGames.html' }, { innerHTML: 'Read Me', link: 'README.html' });
createTopNav();
createThemeButton();
createFooter();

function createFooter() {


    const footer = document.createElement('footer');
    navPages.forEach(navpage => {
        if (navPages[navPages.length - 1] === navpage) {
            footer.innerHTML += '<a href="./' + navpage.link + '">' + navpage.innerHTML + '</a>';
        } else {
            footer.innerHTML += '<a href="./' + navpage.link + '">' + navpage.innerHTML + '</a>' + '&emsp; | &emsp;';
        }
    });

    footer.innerHTML += ' <span style="float: right;"> <a href="http://validator.w3.org/check/referer">HTML5</a> <a href="http://jigsaw.w3.org/css-validator/check/referer?profile=css3"> CSS3 </a>';

    footer.style = "border-top: 3px solid blue;";
    document.body.insertBefore(footer, document.body.lastChild);
}

const switcher = document.querySelector('.btn');
switcher.addEventListener('click', function() {
    var className = document.body.className;
    if (className == "dark-theme") {
        setTheme("light-theme");
    }
    if (className == "light-theme") {
        setTheme("dark-theme");
    }
});
params.forEach(element => {
    setTheme(element)
});

function createThemeButton() {
    const button = document.createElement('button');
    button.classList.add('btn');
    params.forEach(element => {
        console.log(element);
        if (element == "dark-theme") {
            button.innerHTML = "Light Mode"
        } else if (element == "light-theme") {
            button.innerHTML = "Dark Mode"
        } else {
            button.innerHTML = "Dark Mode"
        }
    });
    document.body.insertBefore(button, document.body.getElementsByClassName("app")[0]);
    //    <button class="btn">Dark Mode</button>
}

function setTheme(className) {

    if (className == "dark-theme" && document.body.className == "light-theme") {
        switcher.innerHTML = "Light Mode";
        document.body.classList.toggle('light-theme')

        document.body.classList.toggle('dark-theme')

    }
    if (className == "light-theme" && document.body.className == "dark-theme") {

        document.body.classList.toggle('dark-theme')

        document.body.classList.toggle('light-theme')

        switcher.innerHTML = "Dark Mode";
    }
    console.log('current class name: ' + document.body.className);
}

function createTopNav() {
    const topnav = document.createElement('div');
    topnav.classList.add('topnav');
    navPages.forEach(navpage => {
        if (window.location.href.includes(navpage.link)) {
            topnav.innerHTML += '<a class="active" href="./' + navpage.link + '">' + navpage.innerHTML + '</a>';
        } else {
            topnav.innerHTML += '<a href="./' + navpage.link + '">' + navpage.innerHTML + '</a>';
        }
    });
    document.body.insertBefore(topnav, document.body.firstChild);
}

const link = document.querySelectorAll('a');
link.forEach(link => {
    link.addEventListener('click', function() {
        var el = link;
        if (params.has('theme')) {
            print("has theme")
            params.delete('theme')
        }
        el.href += '?theme=' + document.body.className;
    });
});