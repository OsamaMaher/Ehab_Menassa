window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.getElementById("my-navbar") != null) {
    if (window.innerWidth <= 760) {
      document.getElementById("my-navbar").style.top = "0";
    } else {
      if (
        document.body.scrollTop > 150 ||
        document.documentElement.scrollTop > 150
      ) {
        document.getElementById("my-navbar").style.cssText =
          "background: #0d3e10 !important";
      } else {
        document.getElementById("my-navbar").style.cssText =
          "background: transparent !important";
      }
    }
    document.body.style.setProperty(
      "--scroll",
      window.scrollY / (document.body.offsetHeight - window.innerHeight)
    );
    document.body.querySelector("path");
  }
}

// Check every time the user scrolls
window.addEventListener("scroll", function () {
  if (document.querySelector(".fixed-element")) {
    // Get the fixed element and its initial height

    var fixedElement = document.querySelector(".fixed-element");
    var fixedElementHeight = 345; //fixedElement.offsetHeight;
    var fixedElementOffset = 134; //fixedElement.offsetTop;
    // Get the footer element and its offset
    // var footer = document.querySelector(".footer");
    var footerOffset = 1105; //footer.offsetTop - 36;

    // Y position of the vertical scrollbar
    var y = window.scrollY;

    if (y >= fixedElementOffset && y + fixedElementHeight < footerOffset) {
      fixedElement.classList.add("fixed");
      fixedElement.classList.remove("bottom");
    } else if (
      y >= fixedElementOffset &&
      y + fixedElementHeight >= footerOffset - 36
    ) {
      fixedElement.classList.remove("fixed");
      fixedElement.classList.add("bottom");
    } else {
      fixedElement.classList.remove("fixed", "bottom");
    }
  }
});

// document.querySelectorAll(".navbar-nav").forEach(function (link) {
//   link.addEventListener("click", function (event) {
//     if (!this.parentElement.classList.contains("dropdown")) {
//       var navbarCollapse = document.querySelector(".navbar-collapse");
//       if (navbarCollapse) {
//         navbarCollapse.classList.remove("show");
//       }
//     }
//   });
// });

var navbarCollapseLinks = document.querySelectorAll(".navbar-collapse");

navbarCollapseLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    var navbarCollapse = document.querySelector(".navbar-collapse");
    if (navbarCollapse) {
      navbarCollapse.classList.remove("show");
    }
  });
});

function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 10;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);
