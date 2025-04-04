let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  // console.log("Not empty");
  // console.log(mainColors);
  document.documentElement.style.setProperty('--main-color', mainColors);

  document.querySelectorAll(".colors-list li").forEach(element => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  })
}

let backgroundOption = true;
let backgroundInterval;

let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach(element => {
    element.classList.remove("active");
  })

  if (backgroundLocalItem === 'true') {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
  // console.log(backgroundLocalItem);
}

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
}

const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
  
});

const randomBackgEl = document.querySelectorAll(".random-backgrounds span");

randomBackgEl.forEach(span => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === 'yes') {
      backgroundOption = true;
      randomizeImg();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
  
});

let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

function randomizeImg() {
  if (backgroundOption) {

    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 5000);

  }
}
randomizeImg();


let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  // Height Betwen Start Page And Section
  let skillsOffsetTop = ourSkills.offsetTop;
  // Section Height
  let skillsOuterHeight = ourSkills.offsetHeight;
  // Window/Page Height
  let windowHeight = this.innerHeight;
  // Window Scroll Position
  let windowScrollTop = this.scrollY;
  // this.console.log(windowScrollTop);

  if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
    // this.console.log("Skills Section");
    let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
    allSkills.forEach(skill => {
      skill.style.width = skill.dataset.progress;
    })
  }
}


let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
  img.addEventListener('click', (e) => {
    let overlay = document.createElement("div");
    overlay.className = 'popup-overlay';
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = 'popup-box';
    
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = 'close-button';
    popupBox.appendChild(closeButton);
  })
})

document.addEventListener("click", function (e) {
  if (e.target.className == 'close-button') {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
})

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

const allLinks = document.querySelectorAll(".links a");

function scrollToSomewhere(elements) {
  elements.forEach(ele => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: 'smooth'
      })
    })
  })  
}

scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach(element => {
    element.classList.remove("active");
  })
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {
  // console.log('Not Empty');
  bulletsSpan.forEach(span => {
    span.classList.remove("active");
  })

  if (bulletLocalItem === 'block') {
    bulletsContainer.style.display = 'block';
    document.querySelector(".bullets_option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = 'none';
    document.querySelector(".bullets_option .no").classList.add("active");
  }
}

bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === 'show') {
      bulletsContainer.style.display = 'block';
      localStorage.setItem("bullets_option", 'block');
    } else {
      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullets_option", 'none');
    }

    handleActive(e);
  })
})

document.querySelector(".reset-options").onclick = function() {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");

  window.location.reload();
}


let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
}

document.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // console.log("Not button & not menu");
    if (tLinks.classList.contains("open")) {
      // console.log("Menu is open");
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
})

tLinks.onclick = function (e) {
  e.stopPropagation();
}
