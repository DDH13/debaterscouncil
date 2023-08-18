const loadFooter = () => {
    const footer = document.querySelector("footer");
    fetch("./templates/footer.html")
        .then(response => response.text())
        .then(data => {
            footer.innerHTML = data;
        });
}
const loadHeader = () => {
    const header = document.querySelector("header");
    fetch("./templates/header.html")
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data;
        });
}
const loadHeaderFooter = () => {
    const header = document.querySelector("header");
    const footer = document.querySelector("footer");
    fetch("./templates/header.html")
        .then(response => response.text())
        .then(data => {
            header.innerHTML = data;
        })
        .then(() => {
            fetch("./templates/footer.html")
                .then(response => response.text())
                .then(data => {
                    footer.innerHTML = data;
                });
        })
        .then(() => {
            //get current page
            let id = window.location.pathname.split("/").pop().split(".")[0] + "-link";
            let currentpage = document.getElementById(id)
            currentpage.style.color = "rgba(255,0,0,0.78)";
            currentpage.style.fontWeight = "bold";

            attachScroll();
        })
}

function attachScroll() {
    const contactButton = document.querySelector(".cta-contact");
    contactButton.addEventListener("click", function () {
        // Scroll to the footer
        document.querySelector(".page-footer").scrollIntoView({ behavior: "smooth" });

        // Add a delay before adding the class to the icons for a smoother scrolling effect
        setTimeout(function () {
            const icons = document.querySelectorAll(".page-footer i");
            icons.forEach(icon => {
                icon.classList.add("scale-effect");
                // Remove the "scale-effect" class after a short delay (e.g., 4 seconds for both scale up and down)
                setTimeout(() => icon.classList.remove("scale-effect"), 4000);
            });
        }, 500); // Adjust the delay (in milliseconds) to your preference
    });
}


document.addEventListener("DOMContentLoaded", () => {
    loadHeaderFooter();
});