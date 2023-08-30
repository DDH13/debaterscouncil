document.addEventListener("DOMContentLoaded", function () {
// Assuming you have a <div> element with the id "table-container" where the table will be created
    const tableContainer = document.getElementById("table-container");

// Fetch the TSV file
    fetch("../assets/files/LT.tsv")
        .then(response => response.text())
        .then(tsvData => {
            // Split the TSV data into rows
            const rows = tsvData.split("\n");
            //remove 2nd row
            rows.splice(1, 1);

            // Create the HTML table element
            const table = document.createElement("table");
            table.classList.add("table", "table-striped", "table-hover");

            // Create the HTML table header row using the first row of the TSV file
            const headerCells = rows[0].split("\t");
            //remove 1 before last cell
            headerCells.splice(headerCells.length - 2, 1);
            //remove first row
            rows.splice(0, 1);
            table.appendChild(document.createElement("thead"));
            table.querySelector("thead").appendChild(document.createElement("tr"));
            headerCells.forEach(function (headerCellData) {
                let headerCell = document.createElement("th");
                headerCell.textContent = headerCellData;
                table.querySelector("thead tr").appendChild(headerCell);
            });

            // Create the HTML table body using the remaining rows of the TSV file
            const tbody = document.createElement("tbody");
            tbody.classList.add("table-group-divider")
            table.appendChild(tbody);


            // Iterate over each row
            rows.forEach(function (rowData) {
                // Split the row data into cells and remove '\r' from last cell
                const cells = rowData.split("\t");
                cells[cells.length - 1] = cells[cells.length - 1].replace("\r", "");

                //remove 1 before last cell
                cells.splice(cells.length - 2, 1);


                // Check if the school has a non-zero total points ie. last cell is not zero
                if (cells[cells.length - 1] != "0") {
                    // Create a table row element
                    var row = document.createElement("tr");
                    // console.log(cells);

                    // Iterate over each cell
                    cells.forEach(function (cellData) {
                        // Create a table cell element
                        let cell = document.createElement("td");
                        // Set the cell content
                        cell.textContent = cellData;
                        // Append the cell to the row
                        row.appendChild(cell);
                    });

                    // Append the row to the table
                    tbody.appendChild(row);
                }
            });

            // Append the table to the table container
            tableContainer.appendChild(table);

            //highlight top 4 ranking teams
            for (let i = 1; i < table.rows.length; i++) {
                if (table.rows[i].cells[0].textContent < 5) {
                    table.rows[i].classList.add("font-weight-bold");
                }
            }

            for (let i = 0; i < table.rows.length; i++) {
                //add a class called web-view to each cell in all columns except the first two
                for (let j = 2; j < table.rows[i].cells.length-1; j++) {
                    table.rows[i].cells[j].classList.add("web-view");
                }
                //add a class called rank to the first cell in each row
                table.rows[i].cells[0].classList.add("rank");
                //add a class called school to the second cell in each row
                table.rows[i].cells[1].classList.add("school");
                //add a class called total to the last cell in each row
                table.rows[i].cells[table.rows[i].cells.length - 1].classList.add("total");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });


    const slider = document.querySelector(".items");
    const slides = document.querySelectorAll(".item");
    const button = document.querySelectorAll(".button");
    const picname = document.querySelector('#school-year');

    let numberOfImages = slides.length;
    let current = 0;
    let prev = numberOfImages - 1;
    let next = 1;

    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", () => i == 0 ? gotoPrev() : gotoNext());
    }

    const gotoPrev = () => current > 0 ? gotoNum(current - 1) : gotoNum(slides.length - 1);

    const gotoNext = () => current < numberOfImages - 1 ? gotoNum(current + 1) : gotoNum(0);

    const gotoNum = number => {
        current = number;
        prev = current - 1;
        next = current + 1;
        //change picname innerHTML to alt of current slide
        picname.innerHTML = slides[current].querySelector('img').alt;

        for (let i = 0; i < slides.length; i++) {
            slides[i].classList.remove("active");
            slides[i].classList.remove("prev");
            slides[i].classList.remove("next");
        }

        if (next == numberOfImages) {
            next = 0;
        }

        if (prev == -1) {
            prev = numberOfImages - 1;
        }

        slides[current].classList.add("active");
        slides[prev].classList.add("prev");
        slides[next].classList.add("next");
    }

    //every 5 seconds, go to next slide
    setInterval(gotoNext, 5000);

});