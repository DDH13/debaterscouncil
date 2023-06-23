document.addEventListener("DOMContentLoaded", function () {
// Assuming you have a <div> element with the id "table-container" where the table will be created
    const tableContainer = document.getElementById("table-container");

// Fetch the TSV file
    fetch("../assets/files/LT.tsv")
        .then(response => response.text())
        .then(tsvData => {
            // Split the TSV data into rows
            var rows = tsvData.split("\n");
            //remove 2nd row
            rows.splice(1, 1);

            // Create the HTML table element
            var table = document.createElement("table");
            table.classList.add("table", "table-striped", "table-hover", "table-bordered", "table-sm");
            //Check no.of tournaments
            // const noOfTournaments = rows[0].split("\t").filter(function (el) { return el; }).length - 3;
            // console.log(`No.of tournaments ${noOfTournaments}`);
            // console.log(rows[0].split("\t").filter(function (el) { return el; }));

            // Create the HTML table header row using the first row of the TSV file
            var headerCells = rows[0].split("\t");
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
                var cells = rowData.split("\t");
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
                    table.rows[i].classList.add("table-success");
                }
                else{
                    table.rows[i].classList.add("table-light");
                }
            }
            //change header bg color
            table.rows[0].classList.add("table-primary");
        })
        .catch(error => {
            console.error("Error:", error);
        });

});