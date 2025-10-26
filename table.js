let totalFrequency = 0
let precision = 2
function addRow() {
    const value = document.getElementById("value").value
    const frequency = document.getElementById("frequency").value
    if (!value) {
        alert("O valor informado é inválido")
        return
    }

    if (!frequency) {
        alert("A frequência informada é inválida")
        return
    }

    precision = Math.max(precision, countDecimalPlaces(parseFloat(frequency)))
    if ((parseFloat(frequency) + totalFrequency) > 1.0) {
        alert("A frequencia acumulada não pode ser maior que 1")
        return
    }

    totalFrequency += parseFloat(frequency)
    console.log(totalFrequency)

    let table = document.getElementById("tableData")
    let row = document.createElement('tr');

    let cell0 = document.createElement('td');
    cell0.appendChild(document.createTextNode(value));
    row.appendChild(cell0);

    let cell1 = document.createElement('td');
    cell1.appendChild(document.createTextNode(frequency));
    row.appendChild(cell1);

    let cell2 = document.createElement('td');

    let buttonDelete = document.createElement('button')
    buttonDelete.textContent = "deletar"
    buttonDelete.addEventListener('click', (event) => {
        getRowIndex(event)
    })
    cell2.appendChild(buttonDelete);
    row.appendChild(cell2);

    table.appendChild(row)

}

function getRowIndex(event) {
    const clickedRow = event.target.closest('tr');
    if (clickedRow) {
        deleteRow(clickedRow.rowIndex);
    }

}

function deleteRow(indexRow) {
    let table = document.getElementById("tableData")
    totalFrequency -= table.rows[indexRow].cells[1].innerHTML
    table.deleteRow(indexRow)
}