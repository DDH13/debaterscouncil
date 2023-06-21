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