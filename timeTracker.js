let timerList = [
    [],
    [],
];


let rowCounter = 2;

function addRow() {
    let newRow = document.getElementById("row0");
    let cln = newRow.cloneNode(true);
    cln.id = `row${rowCounter}`;
    timerList.push([])
    rowCounter++;
    document.getElementById("wrapper").appendChild(cln);
    console.log(`Created row${rowCounter}`);
}

function deleteRow(elem) {
    let row = elem.parentNode.parentNode.id;

    if (row == 'row0') {
        alert('cannot remove row0');
        return;

    } else {
        console.log(`removed ${row}`);
        let removeRow = document.getElementById(row);
        removeRow.remove();
        rowNumber = row.charAt(row.length - 1);
        timerList.splice(rowNumber, 1)
    }
}

let activeTimers = [];
let end;
let start;

function startStop(elem) {

    let row = elem.parentNode.parentNode.id;
    let rowNumber = row.charAt(row.length - 1);
    if (activeTimers.indexOf(row) == -1) {
        document.getElementById(row).style.backgroundColor = "#EDA920";
        start = window.performance.now();
        activeTimers.push(row);
        return;

    } else if (timerList[rowNumber] > .1) {
        document.getElementById(row).style.backgroundColor = "transparent";
        end = window.performance.now();
        let time = end - start;
        currentTime = timerList[rowNumber];
        newTime = time + currentTime;
        timerList.splice(rowNumber, 1, newTime);
        let remove = activeTimers.indexOf(row);
        activeTimers.splice(remove, 1);
        pushTime(timerList, rowNumber);
        return;

    } else {
        document.getElementById(row).style.backgroundColor = "transparent";
        end = window.performance.now();
        let time = end - start;
        timerList.splice(rowNumber, 1, time);
        let remove = activeTimers.indexOf(row);
        activeTimers.splice(remove, 1);
        pushTime(timerList, rowNumber);
        return;
    }

    function pushTime(timerList, rowNumber) {
        let form = document.getElementById(row).getElementsByClassName('timeWorked')[0];
        let milliseconds = timerList[rowNumber];
        let minutes = milliseconds / 60000;
        let hours = minutes / 60;
        hours = hours.toFixed(2)
        form.value = hours;
    }
}



function checkBox(elem) {
    let row = elem.parentNode.parentNode.id;
    currentlyChecked = document.getElementById(row).getElementsByClassName('checkBox')[0].checked;

    if (currentlyChecked == true) {
        document.getElementById(row).style.border = "#EDA920 3px solid"

    } else {
        document.getElementById(row).style.border = "#EDA920 1px solid"
    }


}

function savePage() {
    let csvRowChange = '\r\n'
    let saveData = ['',
        document.getElementById("header1").innerText,
        document.getElementById("header2").innerText,
        document.getElementById("header3").innerText,
        document.getElementById("header4").innerText,
        csvRowChange];
    let projectNumber;
    let showName;
    let lineItem;
    let time;
    for (i = 0; document.getElementById(`row${i}`) !== null; i++) {
        projectNumber = document.getElementById(`row${i}`).getElementsByClassName("projectNumber")[0].value;
        showName = document.getElementById(`row${i}`).getElementsByClassName("showName")[0].value;
        lineItem = document.getElementById(`row${i}`).getElementsByClassName("lineItem")[0].value;
        time = document.getElementById(`row${i}`).getElementsByClassName("timeWorked")[0].value;
        saveData.push(projectNumber);
        saveData.push(showName);
        saveData.push(lineItem);
        saveData.push(time);
        saveData.push(csvRowChange);
    }
    let d = new Date();
    let month = d.getMonth()+1;
    let day = d.getDate();
    let year = d.getFullYear();
    let saveDate = `${month}.${day}.${year}`;
    console.log(d)
    var file = new Blob([saveData], {
        encoding: "UTF-8",
        type: "text/csv;charset=UTF-8"
    });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, `Time Tracker_${saveDate}.csv`);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = `Time Tracker_${saveDate}.csv`;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}