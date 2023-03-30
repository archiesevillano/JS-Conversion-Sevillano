//get objects

//Input Radio Objects
const r_distance = document.getElementById('findDistance');
const r_speed = document.getElementById('findSpeed');
const r_time = document.getElementById('findTime');

//Button Objects
const calculateBtn = document.getElementById("calculateBtn");
const resetBtn = document.getElementById("resetBtn");

//Input Object Units
const distance_unit = document.getElementById("distanceUnit");
const speed_unit = document.getElementById("speedUnit");
const time_unit = document.getElementById("timeUnit");

const d_units = ["km", "m", "cm", "mm"];
const s_units = ["km/hr", "min/sec", "cm/sec", "mm/sec"];
const t_units = ["hr", "min", "sec"];


//add values to selection
d_units.forEach(unit => {

    //create <option></option> and its text content, to be added to the <select>
    const opt = document.createElement("option");
    const optText = document.createTextNode(unit);
    opt.appendChild(optText);
    distance_unit.appendChild(opt);

});

s_units.forEach(unit => {

    //create <option></option> and its text content, to be added to the <select>
    const opt = document.createElement("option");
    const optText = document.createTextNode(unit);
    opt.appendChild(optText);
    speed_unit.appendChild(opt);

});

t_units.forEach(unit => {

    //create <option></option> and its text content, to be added to the <select>
    const opt = document.createElement("option");
    const optText = document.createTextNode(unit);
    opt.appendChild(optText);
    time_unit.appendChild(opt);

});

//Result Display Object
const result = document.querySelector('.answer');

//Input Objects
const distanceField = document.getElementById("inputDistance");
const speedField = document.getElementById("inputSpeed");
const timeField = document.getElementById("inputTime");

//Containers
const distanceContainer = document.querySelector(".distance");
const speedContainer = document.querySelector(".speed");
const timeContainer = document.querySelector(".time");

hideSelected();

//Adding click events to Button Objects

//ResetButton
resetBtn.addEventListener('click', handleReset);

//Calculate Button

calculateBtn.addEventListener('click', () => {

    //calculate based on what user has selected
    if (r_distance.checked) {
        if (speed_unit.value != "Unit" && time_unit.value != "Unit") {
            console.log("Distance");
            result.innerHTML = `Result is ${calculateDistance(parseFloat(speedField.value), parseFloat(timeField.value)) + checkUnit("distance")}`;
        }
        else {
            result.innerHTML = "Please select a Unit";
        }
    }
    else if (r_speed.checked) {
        if (distance_unit.value != "Unit" && time_unit.value != "Unit") {
            console.log("Speed");
            result.innerHTML = `Result is ${calculateSpeed(parseFloat(distanceField.value), parseFloat(timeField.value)) + checkUnit("speed")}`;
        }
        else {
            result.innerHTML = "Please select a Unit";
        }
    }
    else if (r_time.checked) {
        if (distance_unit.value != "Unit" && speed_unit.value != "Unit") {
            result.innerHTML = `Result is ${calculateTime(parseFloat(distanceField.value), parseFloat(speedField.value)) + checkUnit("time")} `;
        }
        else {
            result.innerHTML = "Please select a Unit";
        }
    }
    else {
        console.log("Cannot identify 'SELECTED FIND' ");
    }

});


function handleReset() {
    result.innerHTML = "Reset Successfully!";
    distanceField.value = "";
    speedField.value = "";
    timeField.value = "";
}

function calculateSpeed(distance, time) {
    return distance / time;
}

function calculateTime(distance, speed) {
    return distance / speed;
}

function calculateDistance(speed, time) {
    return speed * time;
}

function checkUnit(findValueUnit) {
    let calc_unit = "<Unsupported Unit>"; // Too many units, some are not included or not commonly use
    switch (findValueUnit) {
        case "distance":
            d_units.forEach(unit => {
                if (speed_unit.value == "km/hr") {
                    calc_unit = "km";
                }
                else if (speed_unit.value == "min/sec") {
                    calc_unit = "m"
                }
                else if (speed_unit.value == "cm/sec") {
                    calc_unit = "cm"
                }
                else if (speed_unit.value == "mm/sec") {
                    calc_unit = "mm"
                }
            });
            break;

        case "speed":
            if (distance_unit.value == "km" && time_unit.value == "hr") {
                calc_unit = "km/hr";
            }
            else if (distance_unit.value == "m" && time_unit.value == "min") {
                calc_unit = "min/sec"
            }
            else if (distance_unit.value == "cm" && time_unit.value == "sec") {
                calc_unit = "cm/sec"
            }
            else if (distance_unit.value == "mm" && time_unit.value == "sec") {
                calc_unit = "mm/sec"
            }
            break;

        case "time":
            s_units.forEach(unit => {
                if (unit == "km/hr") {
                    calc_unit = "hr"
                }
                else if (unit == "min/sec") {
                    calc_unit = "min";
                }
                else if (unit == "cm/sec") {
                    calc_unit = "sec"
                }
                else if (unit == "mm/sec") {
                    calc_unit = "sec"
                }
            });
            break;

        default:
            console.log("Unable to identify unit");
    }
    return calc_unit;
}


function hideSelected() {
    handleReset(); //reset all textboxes whenever change in calculation happen


    //hide the input field for the selected variable(e.g distance, time, speed)
    if (r_distance.checked) {
        distanceContainer.style.display = "none";
        speedContainer.style.display = "flex";
        timeContainer.style.display = "flex";
    }
    else if (r_speed.checked) {
        distanceContainer.style.display = "flex";
        speedContainer.style.display = "none";
        timeContainer.style.display = "flex";
    }
    else if (r_time.checked) {
        distanceContainer.style.display = "flex";
        speedContainer.style.display = "flex";
        timeContainer.style.display = "none";
    }

}