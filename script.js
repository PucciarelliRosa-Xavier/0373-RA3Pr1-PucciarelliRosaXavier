// Obtenir elements del html
let inputName = document.getElementById("nom");
let inputExam = document.getElementById("examen");
let inputPractices = document.getElementById("practiques");
let inputAttitude = document.getElementById("actitud");
let message = document.getElementById("missatge");
let form = document.getElementById("formulariAlumne");

//Array per guardarels alumnes
let students = [];

// Validació del formulari
function validateForm() {
    let name = inputName.value.trim(); //trim elimina espais en blabnc
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
// Missatge si el form es correcte
function showSuccess(text) {
    message.textContent = text;
    message.className = "correcte";
}
// Calcular nota final
function calculateFinalGrade(exam, practices, attitude) {
    return (exam * 0.6) + (practices * 0.3) + (attitude * 0.1);
}
// Crear objecte alumne per a que es pogui mostrar en la taula mes endavant
function createStudent() {
    let name = inputName.value.trim();
    let exam = parseFloat(inputExam.value);
    let practices = parseFloat(inputPractices.value);
    let attitude = parseFloat(inputAttitude.value);

    let finalGrade = calculateFinalGrade(exam, practices, attitude);

    return {
        name: name,
        exam: exam,
        practices: practices,
        attitude: attitude,
        finalGrade: finalGrade
    };
}
//quan l'usuari envii el formulari es valida i si pasa la validacio es crea l-alumne i s'afegeix a l'array
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (validateForm() == false) {
        return;
    }

    let student = createStudent();
    students.push(student);

    showSuccess("Alumne afegit correctament");

    form.reset();
});
