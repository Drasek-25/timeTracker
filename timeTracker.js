let timerList = [
    [],
    [],
];


let rowCounter = 2;

function addRow()   {
let newRow = document.getElementById("row1");
let cln = newRow.cloneNode(true);
cln.id = `row${rowCounter}`;
timerList.push([])
rowCounter++;
document.getElementById("wrapper").appendChild(cln);
console.log(`Created row${rowCounter}`);
}


function deleteRow(elem) {
let row = elem.parentNode.parentNode.id;
if ( row == 'row0' || row == 'row1' )    {
    console.log('cannot remove row0 or row1');
    return;
} else {
    console.log(`removed ${row}`);
    let removeRow = document.getElementById(row);
    removeRow.remove();
    rowNumber = row.charAt(row.length -1);
    timerList.splice(rowNumber, 1)
    }
}

let activeTimers = [];
let end;
let start;

function startStop(elem) {
    let row = elem.parentNode.parentNode.id;
    let rowNumber = row.charAt(row.length -1);
    if (activeTimers.indexOf(row) == -1) {
        document.getElementById(row).style.backgroundColor = "green";
        start = window.performance.now();
        activeTimers.push(row);
        return;
    } else if (timerList[rowNumber] > .1)   {
        document.getElementById(row).style.backgroundColor = "transparent";
        end = window.performance.now();
        let time = end - start;
        currentTime = timerList[rowNumber];
        newTime = time + currentTime;
        timerList.splice(rowNumber, 1, newTime);
        let remove = activeTimers.indexOf(row);
        activeTimers.splice(remove, 1);

        
        let form = document.getElementById(row).getElementsByClassName('timeWorked')[0];
        let milliseconds = timerList[rowNumber];
        let minutes = milliseconds / 60000;
        let hours = minutes / 60;
        hours = hours.toFixed(2)
        form.value = hours;

        return;
    } else {
        document.getElementById(row).style.backgroundColor = "transparent";
        end = window.performance.now();
        let time = end - start;
        timerList.splice(rowNumber, 1, time);
        let remove = activeTimers.indexOf(row);
        activeTimers.splice(remove, 1);

        let form = document.getElementById(row).getElementsByClassName('timeWorked')[0];
        let milliseconds = timerList[rowNumber];
        let minutes = milliseconds / 60000;
        let hours = minutes / 60;
        hours = hours.toFixed(2)
        form.value = hours;

        return;
    }
}



function checkBox(elem) {
    let row = elem.parentNode.parentNode.id;
    currentlyChecked = document.getElementById(row).getElementsByClassName('checkBox')[0].checked;
    if (currentlyChecked == true)   {
        document.getElementById(row).style.border = "4px red solid"
    } else  {
        document.getElementById(row).style.border = "1px black solid"
    }


}