const startWindow = {
    mobileBody: document.querySelector(".mobile__body"),
    selectBox: document.querySelector('.selectbox'),
    selectBoxList: document.querySelector('.selectbox__list'),
    mobileRooms: document.getElementById('mobile__rooms'),
    selectBoxSelected: document.querySelector('.selectbox__selected'),
    selectBoxValue: document.querySelector(".selectbox__value"),
};

let activeRoom = "allRooms";
// dropmenu - open & close  

startWindow.selectBoxSelected.addEventListener("click", function(event) {
    
    startWindow.selectBox.classList.toggle('selectbox_open');

});


// dropmenu - close (tap window)

function closeDropMenu() {
    startWindow.selectBox.classList.remove("selectbox_open");
}

startWindow.mobileBody.addEventListener("click", function(event) {

    if (!event.target.closest(".selectbox") && 
        startWindow.selectBox.classList.contains("selectbox_open")) {

            closeDropMenu();
    }
});


// dropmenu - unset & set active (selected) class

function unSetSelectboxActive() {
    const SelectItemSelected = document.querySelector('.selected');
    SelectItemSelected.classList.remove('selected');
}

function setSelectboxActive(classRoom) {
    classRoom.classList.add('selected');
}

// mobile Rooms - set & unset

function setRoomsItemActive(nameRoom) {

    // mobile Rooms - unset active
    const roomsItemActive = document.querySelector(".rooms__item_active");
    if (roomsItemActive) {
        roomsItemActive.classList.remove("rooms__item_active");
    }
    
    // mobile Rooms - set active
    if (nameRoom != "allRooms" && nameRoom != 'undefined') {
        activeRoom = nameRoom;
        const newRoomsItemActive = startWindow.mobileRooms.querySelector(`[data-room=${nameRoom}]`);
        newRoomsItemActive.classList.add('rooms__item_active');
        setActualTemperatureOnScreen(activeRoom);
        updateSettingsButtonPower(activeRoom);
        setActualSLidersOnScreen(activeRoom, activeType);
        
    } 
}

// drobmenu - set value

function setSelectBoxValue(nameRoom) {

    setTimeout(() => {
        startWindow.selectBoxValue.innerText = nameRoom.textContent;
    }, 250);
}

startWindow.selectBoxList.addEventListener("click", function(event) {

    const { target } = event;
    if (target.classList.contains("select__item")) {
        
        const nameRoom = target.dataset.room;
        
        closeDropMenu();
        setSelectBoxValue(target);
        unSetSelectboxActive();
        setSelectboxActive(target);
        setRoomsItemActive(nameRoom);
        nameRoom === "allRooms" ? renderScreeen(true): renderScreeen(false);

    }
});


// roomsItem - set $ unset
startWindow.mobileRooms.addEventListener("click", function(event) {

    const elementTarget = event.target;

    if (!elementTarget.classList.contains("rooms__item") && !elementTarget.classList.contains("mobile__rooms")) {
        const newRoomsItemActive = elementTarget.parentElement;
        const roomName = newRoomsItemActive.dataset.room;
        const newSelectItem = startWindow.selectBoxList.querySelector(`[data-room=${roomName}]`);

        setRoomsItemActive(roomName);
        setSelectBoxValue(newSelectItem);
        unSetSelectboxActive();
        setSelectboxActive(newSelectItem);
        renderScreeen(false);
        
    }

    if (elementTarget.classList.contains("rooms__item")) {
        const roomName = elementTarget.dataset.room;
        const newSelectItem = startWindow.selectBoxList.querySelector(`[data-room=${roomName}]`);

        setRoomsItemActive(roomName);
        setSelectBoxValue(newSelectItem);
        unSetSelectboxActive();
        setSelectboxActive(newSelectItem);
        renderScreeen(false);     
         
    }

})

// mobile_body - display room || none
function renderScreeen(isRooms) {
  
    setTimeout(() => {
        if (isRooms) {
            startWindow.mobileRooms.style.display = "grid";
        } else {
            startWindow.mobileRooms.style.display = 'none';
        }

        renderMobileSettings(isRooms);
    }, 250);  

}

const typeScreens = {
    settingsTypes: document.querySelector(".settings__types"),
    settingsScreens: document.querySelector(".settings__screens"),
};

let activeType = "lights";

function getSettingsActive(newActiveType) {

    if (isNewActiveType(newActiveType)) {
       
        const nameType = newActiveType.dataset.setting;
        
        if (nameType == "lights" || nameType == "humidity") {
            activeType = nameType;
            setActualSLidersOnScreen(activeRoom, activeType);
        }

        const newTypeScreen = typeScreens.settingsScreens.querySelector(`[data-setting=${nameType}]`);
        return newTypeScreen;
    } else {

        return newActiveType;
    };
   
};

// SettingsScreen - set active || unactive
function updateSettingsScreen(newTypeScreen) {
    

    if ( isNewActiveType(newTypeScreen) && ((newTypeScreen.classList.contains("settings__screen_active")) == false)) {

        const oldActiveScreen = typeScreens.settingsScreens.querySelector(".settings__screen_active");

        oldActiveScreen.classList.remove("settings__screen_active");
        newTypeScreen.classList.add("settings__screen_active");
    };
};

function updateSettingsType(newActiveType) {

   
    if ( isNewActiveType(newActiveType) && ((newActiveType.classList.contains("settings__type_active")) == false)) {

        const oldActiveType = typeScreens.settingsTypes.querySelector(".settings__type_active");

        oldActiveType.classList.remove("settings__type_active");
        newActiveType.classList.add("settings__type_active");
    };

};

function isNewActiveType(newActiveType) {
    
    const result = (newActiveType != undefined) ? true : false;
    return result;
}

function getSettingType(elementTarget) {

    let newActiveType = undefined;

    if (elementTarget.className == "settings__type") {

        const nameType = elementTarget.dataset.setting;
        newActiveType = typeScreens.settingsTypes.querySelector(`[data-setting=${nameType}]`);

    } else if (!elementTarget.classList.contains("settings__type") && !elementTarget.classList.contains("settings__types")) {

        newActiveType = elementTarget.parentNode;
    };

    return newActiveType;
};


// SettingsType and Screen - active || unActive
typeScreens.settingsTypes.addEventListener("click", function(event) {

    const elementTarget = event.target;
    const newActiveType = getSettingType(elementTarget);
    updateSettingsType(newActiveType);

    setTimeout(() => {
        updateSettingsScreen(getSettingsActive(newActiveType));
    }, 300);

});


// Temperature
const temperatureScreen = {
    mobileSettings: document.querySelector(".mobile__settings"),
    settingsScrollTemprature: document.querySelector(".settings__scroll_temperature"),
    settingsLineActive: document.querySelector(".settings__lines-first_active"),
    settingsTemperature: document.querySelector(".settings__temperature"),
    temperatureButtonOn: document.querySelector('.icon_power'),
    settingsLabel: document.querySelector('.settings__label'),
    settingsButtonSet: document.querySelector('.settings__button-set'),
};

// mobile__settings-screen - display grid || none
function renderMobileSettings(isScreen) {

    if (isScreen) {
        temperatureScreen.mobileSettings.style.display = "none";
    } else {
        temperatureScreen.mobileSettings.style.display = "grid";
    }
    
};

// screens

const settingsRoomsData = {

    livingRoom: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
        lightsSwitch: false,
        humiditySwitch: false,
    },
    bedroom: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
        lightsSwitch: false,
        humiditySwitch: false,
    },
    kitchen: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
        lightsSwitch: false,
        humiditySwitch: false,
    },
    bathroom: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
        lightsSwitch: false,
        humiditySwitch: false,
    },
    studio: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
        lightsSwitch: false,
        humiditySwitch: false,
    },
    washing: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
        lightsSwitch: false,
        humiditySwitch: false,
    },
}

function getElementsTemperature(temperature) {

    const minTemperature = 15;
    const maxTemperature  = 40;
    const percentTemperature = ( maxTemperature - minTemperature ) / 100;

    const minLineFirstActive = 49;
    const maxLineFirstActive = 251;
    const percentLineFirstActive = ( maxLineFirstActive - minLineFirstActive ) / 100;
    
    if (temperature >= minTemperature && temperature <= maxTemperature) {
        
        const upPercentTemperature = Math.round(( temperature - minTemperature ) / percentTemperature);
        const upPercentLineFirstActive = percentLineFirstActive * upPercentTemperature + minLineFirstActive;
        setElementsTemperature(upPercentLineFirstActive);
        temperatureScreen.settingsTemperature.innerText = temperature;
    }
};

function setElementsTemperature(upPercentLineFirstActive) {
    temperatureScreen.settingsLineActive.style.strokeDasharray = `${upPercentLineFirstActive} 251`;
}


// settings_scrool_temperature - change on touch
function getChangeTemperature() {
    
    let flagMouseover = false;
    let flagMousedown = false;
    let startPosition = 0;
    let rangeCoordinat = 0;
    let change = 0;

    temperatureScreen.settingsScrollTemprature.onmouseover = () => flagMouseover = true;
    temperatureScreen.settingsScrollTemprature.onmouseout = () => flagMouseover = false;
    temperatureScreen.settingsScrollTemprature.onmouseup = () => flagMousedown = false;

    temperatureScreen.settingsScrollTemprature.addEventListener("mousedown", (event) => {
        
        flagMousedown = true;
        startPosition = event.offsetY;
        rangeCoordinat = 0;
    });

    temperatureScreen.settingsScrollTemprature.addEventListener("mousemove", (event) => {
        
        if (flagMousedown && flagMouseover) {
            
            rangeCoordinat = event.offsetY - startPosition;
            const newChange = Math.round(rangeCoordinat / -10);

            if (newChange != change) {
                let temperature = +temperatureScreen.settingsTemperature.innerHTML;
                
                if (newChange < change) {
                    temperature -= 1;
                }
    
                if (newChange > change) {
                    temperature += 1;
                }
    
                change = newChange;
                getElementsTemperature(temperature);
            }    
        }
    })
};

getChangeTemperature();

function updateSettingLabel(isTemperatureSet) {

    if (isTemperatureSet) {
        temperatureScreen.settingsLabel.innerText = "Click to turn OFF";
    } else {
        temperatureScreen.settingsLabel.innerText = "Click to turn ON";
    }  
};

function setActualTemperatureOnScreen(activeRoom) {
    let temperature = settingsRoomsData[activeRoom].temperature;
    getElementsTemperature(temperature);
};

// temperatureButtonOn - on || off and temperatureButtonSet - set value
temperatureScreen.temperatureButtonOn.addEventListener("click", function(event) {

    let settingActivRoom = !settingsRoomsData[activeRoom].temperatureButtonSet;
    settingsRoomsData[activeRoom].temperatureButtonSet = settingActivRoom;
    temperatureScreen.temperatureButtonOn.classList.toggle('icon_power_active');
    
    setTimeout(() =>{ 
        updateSettingLabel(settingActivRoom);
        setSettingsButtonsSet(settingActivRoom)}, 250);
});

function updateSettingsButtonPower(activeRoom) {
    
    let isSettingActivRoom = settingsRoomsData[activeRoom].temperatureButtonSet;
    
    if (isSettingActivRoom) {
        temperatureScreen.temperatureButtonOn.classList.add("icon_power_active");
    } else {
        temperatureScreen.temperatureButtonOn.classList.remove("icon_power_active");
    }

    updateSettingLabel(isSettingActivRoom);
    setSettingsButtonsSet(isSettingActivRoom);

};

// SetttingsButtons-set - on & off
function setSettingsButtonsSet(isTemperatureButtonSet) {

    if (isTemperatureButtonSet) {
        temperatureScreen.settingsButtonSet.classList.add("settings__button-set_active");
    } else {
        temperatureScreen.settingsButtonSet.classList.remove("settings__button-set_active");
    }
};

function setStatusLabel() {
    const statusOld = temperatureScreen.settingsLabel.innerText
    let statusNew = "Success";
    let label = temperatureScreen.settingsLabel;

    label.innerText = statusNew;
    label.style.color = "#44bf73";

    setTimeout(() => {
        label.innerText = statusOld;
        label.style.color = "#2D2D2D";
    }, 2000);
}


// temperature - save in temperatureScreen
temperatureScreen.settingsButtonSet.addEventListener("click", () => {

    if (temperatureScreen.settingsButtonSet.classList.contains("settings__button-set_active")) {

        settingsRoomsData[activeRoom].temperature = +temperatureScreen.settingsTemperature.innerText;
        setStatusLabel();
    };
});


const lightsScreen = {
    lightsScreenSlider: document.querySelector(".screen__slider"),
    lightsSliderProgress: document.querySelector(".screen__slider-progress"),
    lightsSwitch: document.querySelectorAll(".screen__switch")[0],
    lightsSwitchCircle: document.querySelectorAll(".screen__switch-circle")[0],
};

const humidityScreen = {
    humditySlider: document.querySelector('[data-slider="humidity"]'),
    humiditySwitch: document.querySelectorAll(".screen__switch")[1],
    humiditySwitchCircle: document.querySelectorAll(".screen__switch-circle")[1],
};

function updateSliderInfo(screenSliderProgress, value) {

    const minValue = 0;
    const maxValue  = 100;
    
    if (value >= minValue && value <= maxValue) {
        
        setSliderValue(screenSliderProgress, value);
    }
};

function saveSlidersValue(screenSlider, screenSliderProgress) {
    
    const nameType = screenSlider.dataset.slider;
    settingsRoomsData[activeRoom][nameType] = +screenSliderProgress.innerText.slice(0, -1);
    
};

function setActualSLidersOnScreen(activeRoom, activeType) {
    
    let value = settingsRoomsData[activeRoom][activeType];
    const actualSlider = document.querySelector(`[data-slider=${activeType}]`);
    const actualSliderProgress = actualSlider.querySelector(".screen__slider-progress");
    setSliderValue(actualSliderProgress, value);
    setActualSwitch(activeRoom, activeType);
};

function setSliderValue(screenSliderProgress, value) {

    screenSliderProgress.style.height = `${value}%`;
    screenSliderProgress.innerText = `${value}%`;
}


// settings_scrool_temperature - change on touch
function getChangeSlider(screenSlider) {
    
    let flagMouseover = false;
    let flagMousedown = false;
    let startPosition = 0;
    let rangeCoordinat = 0;
    let change = 0;
    let screenSliderProgress = screenSlider.querySelector(".screen__slider-progress");

    screenSlider.onmouseover = () => {
        flagMouseover = true;
        flagMousedown = false;
    };

    screenSlider.onmouseout = () => flagMouseover = false;
    screenSlider.onmouseup = () => {
        flagMousedown = false;
        saveSlidersValue(screenSlider, screenSliderProgress);
    }

    screenSlider.addEventListener("mousedown", (event) => {
        
        flagMousedown = true;
        startPosition = event.offsetY;
        rangeCoordinat = 0;
    });

    screenSlider.addEventListener("mousemove", (event) => {
        
        if (flagMouseover && flagMousedown) {
            
            rangeCoordinat = event.offsetY - startPosition;
            const newChange = Math.round(rangeCoordinat / -3);

            if (newChange != change) {
                let value = +screenSliderProgress.innerText.slice(0, -1);
                
                if (newChange < change) {
                    value -= 1;
                }
    
                if (newChange > change) {
                    value += 1;
                }
                change = newChange;
                updateSliderInfo(screenSliderProgress, value);
            }    
        }
    })
};

getChangeSlider(lightsScreen.lightsScreenSlider);
getChangeSlider(humidityScreen.humditySlider);


// Screen Switch
lightsScreen.lightsSwitch.addEventListener("click", function(event) {

    const isSwitch = !settingsRoomsData[activeRoom].lightsSwitch;
    lightsScreen.lightsSwitchCircle.classList.toggle("screen__switch-circle_active");
    updateSwitchInfo(activeRoom, activeType, isSwitch);
});

humidityScreen.humiditySwitch.addEventListener("click", function(event) {

    const isSwitch = !settingsRoomsData[activeRoom].humiditySwitch;
    humidityScreen.humiditySwitchCircle.classList.toggle("screen__switch-circle_active");
    updateSwitchInfo(activeRoom, activeType, isSwitch);
});

function updateSwitchInfo(activeRoom, activeType, isSwitch) {

    if (activeType == "lights") {

        settingsRoomsData[activeRoom].lightsSwitch = isSwitch;
    } else if ( activeType == "humidity") {

        settingsRoomsData[activeRoom].humiditySwitch = isSwitch;
    }
};

function setActualSwitch(activeRoom, activeType) {
    
    if (activeType == "lights") {

        const isSwitch = settingsRoomsData[activeRoom].lightsSwitch;
        updateSwitchOnScreen(isSwitch, lightsScreen.lightsSwitchCircle);
    } else if ( activeType == "humidity") {

        const isSwitch = settingsRoomsData[activeRoom].humiditySwitch;
        updateSwitchOnScreen(isSwitch, humidityScreen.humiditySwitchCircle);
    }
}

function updateSwitchOnScreen(isSwitch, actualSwitch) {

    if (isSwitch) {
        actualSwitch.classList.add("screen__switch-circle_active");
    } else {
        actualSwitch.classList.remove("screen__switch-circle_active");
    };
}






