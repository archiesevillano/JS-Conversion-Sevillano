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
const t_units = ["h", "min", "sec"];

//Result Display Object
const result = document.querySelector('.answer-container');

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
resetBtn.addEventListener('click', () => {
    distanceField.value = "";
    speedField.value = "";
    timeField.value = "";
    console.log("Input items removed");
})

//Calculate Button

calculateBtn.addEventListener('click', () => {
    //calculate based on what user has selected
    if (r_distance.checked) {
        result.innerHTML = `Result is ${calculateDistance(parseFloat(speedField.value), parseFloat(timeField.value))}`;
    }
    else if (r_speed.checked) {
        result.innerHTML = `Result is ${calculateSpeed(parseFloat(distanceField.value), parseFloat(timeField.value))}`;
    }
    else if (r_time.checked) {
        result.innerHTML = `Result is ${calculateTime(parseFloat(speedField.value), parseFloat(speedField.value))}`;
    }
    else {
        console.log("Cannot identify 'SELECTED FIND' ")
    }
});


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
    let calc_unit = "???";
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
            if (distance_unit.value == "km" && time_unit.value == "min") {
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