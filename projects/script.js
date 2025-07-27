$(document).ready(function () {

    // Menu toggle for mobile hamburger
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // On scroll or load, reset menu and toggle scroll-top button
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            $('#scroll-top').addClass('active');
        } else {
            $('#scroll-top').removeClass('active');
        }
    });
});

// Change title and favicon on tab visibility change
document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Shahil Bhusal";
        $("#favicon").attr("href", "/assets/images/logo.png");
    } else {
        document.title = "The journey continues";
        $("#favicon").attr("href", "/assets/images/cmsoon.png");
    }
});

// Fetch projects JSON data
function getProjects() {
    return fetch("projects.json")
        .then(response => response.json());
}

// Render projects and initialize Isotope and VanillaTilt
function showProjects(projects) {
    let projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = "";

    projects.forEach(project => {
        projectsHTML += `
        <div class="grid-item">
          <div class="box tilt">
            <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
            <div class="content">
              <div class="tag">
                <h3>${project.name}</h3>
              </div>
              <div class="desc">
                <p>${project.desc}</p>
                <div class="btns">
                  <a href="${project.links.view}" class="btn" target="_blank">
                    <i class="fas fa-eye"></i> View
                  </a>
                  <a href="${project.links.code}" class="btn" target="_blank">
                    Code <i class="fas fa-code"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>`;
    });

    projectsContainer.innerHTML = projectsHTML;

    // Initialize VanillaTilt
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });

    // Initialize Isotope
    var $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows'
    });

    // Filter buttons (if any)
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
}

// Call fetch and render projects
getProjects().then(data => {
    showProjects(data);
});

// Disable developer mode keys
document.onkeydown = function (e) {
    if (e.keyCode === 123) { // F12
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode === 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0)) {
        return false;
    }
};
