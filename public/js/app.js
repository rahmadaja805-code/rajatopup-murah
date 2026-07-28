const closeMenu = document.getElementById("closeMenu");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const overlay = document.getElementById("menuOverlay");

if (menuToggle) {

  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    document.body.classList.toggle("menu-open");

    if(overlay){
      overlay.classList.toggle("active");
    }

  });

}

if(overlay){

  overlay.addEventListener("click",()=>{

    navLinks.classList.remove("active");

    document.body.classList.remove("menu-open");

    overlay.classList.remove("active");

  });

}

if(closeMenu){

    closeMenu.addEventListener("click",()=>{

        navLinks.classList.remove("active");

        document.body.classList.remove("menu-open");

        if(overlay){
            overlay.classList.remove("active");
        }

    });

}

// =========================
// SEARCH GAME
// =========================

const searchGame = document.getElementById("searchGame");

if (searchGame) {

  searchGame.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    const cards = document.querySelectorAll(".game-card");

    cards.forEach(card => {

      const nama = card.innerText.toLowerCase();

      if (nama.includes(keyword)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }

    });

  });

}

// =========================
// AUTO BANNER
// =========================

const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {

  let index = 0;

  setInterval(() => {

    slides[index].classList.remove("active");

    index++;

    if (index >= slides.length) {
      index = 0;
    }

    slides[index].classList.add("active");

  }, 3000);

}
