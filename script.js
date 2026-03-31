// Obtenir elements del html
let inputName = document.getElementById("nom");
let inputExam = document.getElementById("examen");
let inputPractices = document.getElementById("practiques");
let inputAttitude = document.getElementById("actitud");
let message = document.getElementById("missatge");
let form = document.getElementById("formulariAlumne");
let tableBody = document.getElementById("cosTaula");
let btnAsc = document.getElementById("ordenarAsc");
let btnDesc = document.getElementById("ordenarDesc");


//Array per guardar els alumnes
let students = [];

// Validació del formulari
function validateForm() {
    let name = inputName.value.trim(); //trim elimina espais en blabnc
    let exam = parseFloat(inputExam.value); //convertir les notes en valors numerics flotants, si no es tractarien com strings
    let practices = parseFloat(inputPractices.value);
    let attitude = parseFloat(inputAttitude.value);

    if (name === "") { //comprova que hi hagi algo escrit al camp de nom d'alumne
        showError("El nom no pot estar buit");
        return false;
    }
 //comprova que les notes siguin un valor numeric i que estiguin entre 0 i 10
    if (isNaN(exam) || exam < 0 || exam > 10) {
        showError("Error. La nota ha de ser un valor entre 0 i 10");
        return false;
    }

    if (isNaN(practices) || practices < 0 || practices > 10) {
        showError("Error. La nota ha de ser un valor entre 0 i 10");
        return false;
    }

    if (isNaN(attitude) || attitude < 0 || attitude > 10) {
        showError("Error. La nota ha de ser un valor entre 0 i 10");
        return false;
    }

    return true;
}


// Missatge de error si el formulari no pasa la validació
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
//Quan l'usuari envii el formulari es valida i si pasa la validacio es crea l-alumne i s'afegeix a l'array
form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (validateForm() == false) {
        return;
    }

    let student = createStudent();
    students.push(student);

    showSuccess("Alumne afegit correctament");
    showStudents();

    form.reset();
});

//Mostar alumnes en la taula
function showStudents() {
    tableBody.innerHTML = "";

    students.forEach(function(student) { //Si la nota es igual o major a 5, s'apliquen la classe i el text Aprovat, si no el text i la classe serà suspès
        let status = student.finalGrade >= 5 ? "Aprovat" : "Suspès";
        let cssClass = student.finalGrade >= 5 ? "aprovat" : "suspes";
        //creació d'una nova fila per l'alumne amb diferents columnes per a cada valor (nom, nota examen, nota pràctiques, nota actitud i nota final.
        let row = ` 
            <tr>
                <td>${student.name}</td>
                <td>${student.exam.toFixed(2)}</td>
                <td>${student.practices.toFixed(2)}</td>
                <td>${student.attitude.toFixed(2)}</td>
                <td>${student.finalGrade.toFixed(2)}</td>
                <td class="${cssClass}">${status}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// Ordenar alumnes per nota 
btnAsc.addEventListener("click", function() {
    students.sort(function(a, b) {
        return a.finalGrade - b.finalGrade;
    });
    showStudents();
});

btnDesc.addEventListener("click", function() {
    students.sort(function(a, b) {
        return b.finalGrade - a.finalGrade;
    });
    showStudents();
});
