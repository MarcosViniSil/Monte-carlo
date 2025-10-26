const ROWS = 27
const COLUMNS = 11
const MIN_RANDOM = 0
const MAX_RANDOM = 999999

let matrix = []

let isToShowTable = false

const map = new Map();

const convertedRange = new Map()
let convertedRange_min = 0
let convertedRange_max = 0

let MAX_ROUND = 100


let sum = 0

function countDecimalPlaces(number) {
    const numString = number.toString();
    const decimalIndex = numString.indexOf('.');

    if (decimalIndex === -1) {
        return 0;
    } else {
        return numString.length - decimalIndex - 1;
    }
}

function modifyMaxRounds() {
    let newMax = document.getElementById("tests").value
    if (!newMax) {
        return
    }

    MAX_ROUND = newMax
}

function getRandom() {
    return Math.round(Math.random() * MAX_RANDOM);
}

function toggleTable() {
    isToShowTable = !isToShowTable

    if (isToShowTable) {
        document.getElementById("tableArea").style.display = "block"
    } else {
        document.getElementById("tableArea").style.display = "none"
    }
}

function generateTableRandomValues() {
    matrix = []
    for (let i = 0; i < ROWS; i++) {
        let rows = []
        for (let j = 0; j <= COLUMNS; j++) {

            let randomValue = getRandom()
            while (map.get(randomValue) !== undefined) {
                randomValue = getRandom()
            }
            rows.push(String(randomValue).padStart(6, '0'))
            map.set(randomValue, 1)
        }
        matrix.push(rows)
    }
}


function generateRandomTable() {
    generateTableRandomValues()

    table = document.createElement('table');
    let header = document.createElement('tr');

    for (let j = 0; j <= COLUMNS; j++) {
        header.appendChild(document.createElement('th'));
        if (j == 0) {
            header.cells[j].appendChild(document.createTextNode(" "));
            continue
        }
        header.cells[j].appendChild(document.createTextNode(j));
    }
    table.appendChild(header)
    for (let i = 0; i < ROWS; i++) {
        let row = document.createElement('tr');
        row.appendChild(document.createElement('th'))
        row.cells[0].appendChild(document.createTextNode(i + 1));
        for (let j = 1; j <= COLUMNS; j++) {
            row.appendChild(document.createElement('td'));
            row.cells[j].appendChild(document.createTextNode(matrix[i][j]));
        }
        table.appendChild(row);
    }

    document.getElementById("tableArea").appendChild(table)
}

function convertFrequencyToRange() {
    const table = document.getElementById('tableData');
    let currentMin = 0;

    for (let r = 1, n = table.rows.length; r < n; r++) {
        const key = table.rows[r].cells[0].innerHTML.trim();
        const freq = parseFloat(table.rows[r].cells[1].innerHTML) * Math.pow(10, precision);
        const currentMax = currentMin + freq - 1;

        convertedRange.set(key, [currentMin, currentMax]);

        currentMin = currentMax + 1;
    }

    console.log("Converted Ranges:", convertedRange);
}

function monteCarlo() {
    let cutAt = precision > 6 ? 6 : precision
    generateTableRandomValues()
    convertFrequencyToRange()
    let count = 0;
    sum = 0;
    for (let k = 0; k < MAX_ROUND; k += COLUMNS * ROWS) {
        generateTableRandomValues()
        for (let i = 0; i < ROWS; i++) {
            for (let j = 0; j <= COLUMNS; j++) {
                const value = parseInt(matrix[i][j].toString().slice(0, cutAt), 10);

                for (const [key, range] of convertedRange.entries()) {
                    const [min, max] = range;
                    if (value >= min && value <= max) {
                        sum += parseFloat(key);
                        break;
                    }
                }

                count++;
                if (count >= MAX_ROUND) {
                    console.log("Parando após", MAX_ROUND, "iterações");
                    console.log("Soma parcial:", sum);
                    console.log("Média final:", sum / MAX_ROUND);

                    document.getElementById("sum").innerHTML = "soma " + sum
                    document.getElementById("avg").innerHTML = "Média " + (sum / MAX_ROUND).toFixed(3)
                    return;
                }
            }
        }
    }
}

generateRandomTable()
