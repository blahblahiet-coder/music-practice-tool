const specificKeySection = document.getElementById('specificKeySection');
const initialKeys = document.querySelectorAll('input[type=radio]');
const advancedArticle = document.getElementById('advancedArticle');
const arrow = document.getElementById('arrow');
const advancedSection = document.getElementById('advancedSection');
const inversionsArticle = document.getElementById('inversions');
const checkPic = document.getElementById('checkPic');
const addKeyButton = document.getElementById('addKeyButton');
const keySelect = document.getElementById('keySelect');
const tonalitySelect = document.getElementById('tonalitySelect');
const selectedKeysSection = document.getElementById('selectedKeysSection');
const minorTypeSection = document.getElementById('minorTypeSection');
const numberInput = document.getElementById('number');
const octaveSelect = document.getElementById('octaveSelect');
const clearButton = document.getElementById('clearButton');
const exerciseTypeChecks = document.querySelectorAll('.exerciseTypeCheck');
const generateButton = document.getElementById('generateButton');
const generatedList = document.getElementById('generatedList');
const practiceSection = document.getElementById('practiceSection');
const error = document.getElementById('error');
const finalText = document.getElementById('finalText');

const allKeys = ["C major", "C minor", "C# major", "C# minor", "D major", "D minor", "E♭ major", "E♭ minor", "E major", "E minor", "F major", "F minor", "F# major", "F# minor", "G major", "G minor", "A♭ major", "A♭ minor", "A major", "A minor", "B♭ major", "B♭ minor", "B major", "B minor"];
const initialHidden = [specificKeySection, minorTypeSection, advancedSection];
const inversionsArray = ['root', 'first inversion', 'second inversion'];


let inversions = false;
let specificKeysArray = [];
let finalKey = []
let includesMinors = false
let numberOfItems = 0;
let octaves = 1;
let exercisesArray = [];
let visiblePair;

function resetBoxes(checkbox) {
    if (checkbox.checked) {
        checkbox.checked = false;
    }
}

//checks for minor keys in the final key array
function checkForMinor() {
    if (finalKey.some(e => e.includes("minor")) && exercisesArray.includes('scale')) { //from stack overflow
        minorTypeSection.classList.add('fadeIn');
        minorTypeSection.classList.remove('hide');
        includesMinors = true;
    }
    else {
        minorTypeSection.classList.add('hide');
        includesMinors = false;
    }
}
//Initial Key Section
initialKeys.forEach(function (key) {
    key.addEventListener('click', function () {
        let checkedRadio = document.querySelector('input[type=radio]:checked');
        let checkedRadioValue = checkedRadio.value;
        if (checkedRadioValue == 'specific') {
            specificKeySection.classList.add('fadeIn');
            specificKeySection.classList.remove('hide');
            finalKey = specificKeysArray;
        }
        else if (checkedRadioValue == 'all') {
            specificKeySection.classList.remove('fadeIn');
            specificKeySection.classList.add('hide');;
            finalKey = allKeys;
        }
        checkForMinor();
    })
})

//Advanced section
advancedArticle.addEventListener('click', function () {
    if (window.getComputedStyle(advancedSection).display === "none") { //from W3 Schools
        arrow.src = './images/arrow-up.svg';
        advancedSection.classList.add('fadeIn');
    }
    else {
        arrow.src = './images/arrow-down.svg'
        advancedSection.classList.remove('fadeIn');
    }
    advancedSection.classList.toggle('hide');
})

//inversions

inversionsArticle.addEventListener('click', function (e) {
    console.log('click');

    if (inversions === false) {
        inversions = true
        checkPic.src = './images/checkbox-checked.svg'
    } else if (inversions === true) {
        inversions = false;
        checkPic.src = './images/checkbox-blank.svg';
    }

})

//specific Keys
addKeyButton.addEventListener('click', function () {
    let addedKey = `${keySelect.value}-${tonalitySelect.value}`
    let shownAddedKey = `${keySelect.value} ${tonalitySelect.value}`
    //selected keys
    if (!specificKeysArray.includes(addedKey)) {
        specificKeysArray.push(addedKey);
        let selectedKey = document.createElement('div');
        selectedKey.className = 'selectedKey'
        selectedKey.innerHTML = `<p class="selectedKeyText">${shownAddedKey}</p>
                        <img src="./images/x-normal.svg" class='remove' id='${addedKey}' alt="remove">`
        selectedKeysSection.appendChild(selectedKey);
        selectedKey.classList.add('fadeIn')
        checkForMinor();

        //selected keys remove
        allRemoveButtons = document.querySelectorAll('.remove');
        allRemoveButtons.forEach(function (button) {
            button.addEventListener('mouseover', function () {
                button.src = './images/x-red.svg'
            })
            button.addEventListener('mouseout', function () {
                button.src = './images/x-normal.svg'
            })
            button.addEventListener('click', function (e) {
                e.target.parentNode.remove();
                let id = e.target.getAttribute('id')
                let index = specificKeysArray.indexOf(id)

                //from Stack overflow:
                if (index > -1) {
                    specificKeysArray.splice(index, 1);
                }
                finalKey = specificKeysArray;
                checkForMinor();
            })
        })
        finalKey = specificKeysArray;
        checkForMinor();
    }
})

//Number input
numberInput.addEventListener('input', function () {
    numberOfItems = Number(numberInput.value);
})

//Clear Button
clearButton.addEventListener('click', function () {
    checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    radio = document.querySelectorAll('input[type="radio"]:checked')
    checkboxes.forEach((box) => { resetBoxes(box) })
    radio.forEach((box) => { resetBoxes(box) })
    initialHidden.forEach((section) => { section.classList.add('hide') })
    let selectedKeys = document.querySelectorAll('.selectedKey');
    for (key of selectedKeys) {
        key.remove();
    }
    generatedList.classList.add('hide');
    if (visiblePair != undefined) { visiblePair.classList.remove('fadeIn'); }
    finalText.classList.remove('hide');
    error.classList.add('hide');
    specificKeysArray = finalKey = exercisesArray = [];
    arrow.src = './images/arrow-down.svg';
    inversions = false;
    checkPic.src = './images/checkbox-blank.svg';
    octaves = 1;
    keySelect.value = 'C';
    octaveSelect.value = '1';
    tonalitySelect.value = 'major';
    numberInput.value = '';
    numberOfItems = 0;
})

//exercise types
exerciseTypeChecks.forEach((exerciseCheck) => {
    exerciseCheck.addEventListener('click', function () {
        if (!exercisesArray.includes(exerciseCheck.value)) {
            exercisesArray.push(exerciseCheck.value);
        }
        else if (exercisesArray.includes(exerciseCheck.value)) {
            let index = exercisesArray.indexOf(exerciseCheck.value)

            //from Stack overflow:
            if (index > -1) {
                exercisesArray.splice(index, 1);
            }
        }
        // console.log(exercisesArray);
        checkForMinor();
    })
}
);

//generate Button
generateButton.addEventListener('click', function () {
    let minorTypes = document.querySelectorAll('input[type=checkbox]:checked.minorCheck')
    octaves = Number(octaveSelect.value);
    let generatedArray = []
    x = 0;

    //error checking
    if (finalKey.length == 0 || exercisesArray.length == 0 || numberInput.value == 0 || (includesMinors == true && minorTypes.length == 0)) {
        console.log('error')
        generatedList.classList.add('hide');
        finalText.classList.add('hide');
        error.classList.remove('hide');

    } else {
        generatedList.innerHTML = ''; //removes current generated list
        finalText.classList.add('hide');
        error.classList.add('hide');
        //gives desired output number
        while (x < numberOfItems) {
            //From stack overflow
            function randomInt(min, max) { // min and max included 
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            if (finalKey.some(e => e.includes("-"))) { //from stack overflow
                console.log('includes a dash');
                spacedKeys = [];
                for (key of finalKey) {
                    key = key.replace('-', ' ');
                    spacedKeys.push(key);
                }
                finalKey = spacedKeys;
            }
            let randomKeyNum = randomInt(0, finalKey.length - 1);
            let randomKey = finalKey[randomKeyNum];
            x++;
            let randomExerciseNum = randomInt(0, exercisesArray.length - 1)
            let randomExercise = exercisesArray[randomExerciseNum]
            let pair = `${randomKey} ${randomExercise}`

            //adds minor subtype if a minor scale is included
            if (pair.includes('minor scale')) {
                let checkedMinors = document.querySelectorAll('input[type=checkbox]:checked.minorCheck');
                let randomMinorNum = randomInt(0, (checkedMinors).length - 1)
                let randomMinor = checkedMinors[randomMinorNum].value
                let splitKey = randomKey.split(' ')
                pair = `${splitKey[0]} ${randomMinor} ${splitKey[1]} ${randomExercise}`;
            }

            if (pair.includes('chord') && inversions == true) {
                let randomInversionsNum = randomInt(0, 2)
                let randomInversion = inversionsArray[randomInversionsNum];
                pair += ` (${randomInversion})`;
            }

            if (octaves != 1 && !(pair.includes('chord'))) {
                let randomOctave = randomInt(1, octaves);
                if (randomOctave == 1) {
                    pair += ` (${randomOctave} octave)`
                }
                else {
                    pair += ` (${randomOctave} octaves)`
                }
            }
            console.log(pair);

            //making it visible
            visiblePair = document.createElement('li');
            visiblePair.innerText = pair;
            generatedList.appendChild(visiblePair);
            generatedList.classList.add('fadeIn');
            generatedList.classList.remove('hide');
        }
    }
})