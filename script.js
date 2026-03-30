// Obtenir elements del html
let inputName = document.getElementById("nom");
let inputExam = document.getElementById("examen");
let inputPractices = document.getElementById("practiques");
let inputAttitude = document.getElementById("actitud");
let message = document.getElementById("missatge");


// Validació del formulari
function validateForm() {
    let name = inputName.value;
    let exam = parseFloat(inputExam.value); //convertir les notes en valors numerics flotants si no es tractarien com strings
    let practices = parseFloat(inputPractices.value);
    let attitude = parseFloat(inputAttitude.value);

    if (name === "") { //comprova que hi hagi algo escrit al camp de nom de alumne
        showError("El nom no pot estar buit");
        return false;
    }
 //comprova que les notes siguin un valor numeric i que estuiguin entre 0 y 10
    if (isNaN(exam) || exam < 0 || exam > 10) {
        showError("error");
        return false;
    }

    if (isNaN(practices) || practices < 0 || practices > 10) {
        showError("error");
        return false;
    }

    if (isNaN(attitude) || attitude < 0 || attitude > 10) {
        showError("error");
        return false;
    }

    return true;
}


// Missatge de error si el formulari no pasa la validacio
function showError(text) {
    message.textContent = text;
    message.className = "error"; 
}
