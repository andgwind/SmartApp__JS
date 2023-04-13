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
};


function updateSettingsType(elementTarget, newActiveType) {

    if (elementTarget.classList.contains("settings__type_active") == false && newActiveType != undefined) {

        const oldActiveType = typeScreens.settingsTypes.querySelector(".settings__type_active");

        oldActiveType.classList.remove("settings__type_active");
        newActiveType.classList.add("settings__type_active");
    };

};


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

// SettingsType - active || unActive
typeScreens.settingsTypes.addEventListener("click", function(event) {

    const elementTarget = event.target;
    updateSettingsType(elementTarget, getSettingType(elementTarget));

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
    },
    bedroom: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
    },
    kitchen: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
    },
    bathroom: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
    },
    studio: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
    },
    washing: {
        temperature: 15,
        temperatureButtonSet: false,
        lights: 0,
        humidity: 0,
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



