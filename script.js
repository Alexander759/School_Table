// Classes

class Teacher {
    constructor(firstName, lastName, subjects) {
        this.firstName = firstName
        this.lastName = lastName
        this.subjects = subjects
    }
}

class Subject {
    constructor(name, numberOfHours, hoursToBeTogether, neededTeachers, difficulty) {
        this.name = name
        this.numberOfHours = numberOfHours
        this.hoursToBeTogether = hoursToBeTogether
        this.neededTeachers = neededTeachers
        this.difficulty = difficulty
    }
}

class Group
{
    constructor() {
        this.numberOfGroups = 0
        this.maxhours = 0
        this.subjects = []
    }

    AddSubjects(newSubject) {
        this.subjects.push(newSubject)
    }

}

//Containers

const content = document.querySelector(".content")
const classesInput = document.getElementById("number-of-unique-classes")
const teachersInput = document.getElementById("number-of-teachers")
const btnContinue = document.querySelector(".continue-button")

//For creating forms for subjects

const formSubjectsClassesHolder = document.createElement("div")
formSubjectsClassesHolder.classList.add("holder")
formSubjectsClassesHolder.innerHTML = `
            <!-- Form for adding class' subjects -->
            <div class="login-box">
                <h2>Нов предмет</h2>
                <form class>
                    <div class="user-box"> 
                        <input list="possible-subjects" class="new-subject-add"/>
                        <label>Предмет</label>
                    </div>

                    <div class="user-box">
                        <input type="number" class="hours-the-subject"/>
                        <label>Брой часове за седмица</label>
                    </div>

                    <div class="user-box">
                        <input type="number" class="teachers-for-the-subject"/>
                        <label>Колко учители са нужни на класа</label>
                    </div>
                    
                    <div class="user-box">
                        <input list="yes-or-no" class="yes-or-no-input"/>
                        <label>По възможност часовете да са заедно</label>
                    </div>

                    <button class="add-subject-in-list-btn"> 
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Добави</button>
                </form>
            </div>

`

const formSubjectsTeachersHolder = document.createElement("div")
formSubjectsTeachersHolder.classList.add("holder")
formSubjectsTeachersHolder.innerHTML +=`
    <!-- Form for adding teachers' subject -->
    <div class="login-box">
        <h2>Нов предмет</h2>
        <form class>
            <div class="user-box"> 
                <input list="possible-subjects" class="new-subject-add"/>
                <label>Предмет</label>
            </div>

            <div class="user-box">
                <input type="number" class="hours-the-subject"/>
                <label>Брой часове за седмица</label>
            </div>

            <div class="user-box">
                <input class="classes-wanted-teacher"/>
                <label>Желани класове (за предмета)</label>
            </div>
            
            <div class="user-box">
                <input <input type="number" class="hours-the-subject"/>
                <label>Максимално брой часове за седмица (за предмета)</label>
            </div>

            <button class="add-subject-in-list-btn"> 
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Добави</button>
        </form>
    </div>
`
console.log(formSubjectsClassesHolder.querySelector(".add-subject-in-list-btn"))
console.log(formSubjectsTeachersHolder.querySelector(".add-subject-in-list-btn"))

const buttonAddSubjectForClass = formSubjectsClassesHolder.querySelector(".add-subject-in-list-btn");
const buttonAddSubjectForTeacher = formSubjectsTeachersHolder.querySelector(".add-subject-in-list-btn");

// Variables

let activelist = null
let btnsAddSubjects = null
let btnAddSubjectToList = null

// Functions

function btnContinueIsClicked() {
    let numberOfClasses = classesInput.value
    let numberOfTeachers = teachersInput.value

    let forms = ""

    for(let i = 0; i < numberOfClasses; i++)   {
        forms += `
            <!-- Example of shablon subjects -->
            
            <form class="form-of-class">
                <h2>Паралелка</h2>

                <label>Име на класовете в паралелката</label>
                <input class="name-class"/>

                <label>Предмети</label>
                <div>
                    <div class="subjects">

                    </div>
                    <button class="add-subject-btn add-subject-btn-class continue-button">
                        Добавете предмет
                    </button>
                </div>
            </form>
        `
    }

    if(numberOfClasses % 3 == 2) {
        forms += `
            <div></div>
        `
    } else if(numberOfClasses % 3 == 1) {
        forms += `
            <div></div>
            <div></div>
        `
    }

    for(let i = 0; i < numberOfTeachers; i++)   {
        forms += `
            <!-- Form for teacher -->
            <form class="form-of-teacher">
                <h2>Учител</h2>

                <label>Име</label>
                <input class="name-teacher"/>

                <label>Фамилия</label>
                <input class="last-name-teacher"/>

                <label>Преподавани предмети</label>
                <div>
                    <div class="subjects">

                    </div>
                    <button class="add-subject-btn add-subject-btn-teacher continue-button">
                        Добавете предмет
                    </button>
                </div>

            </form>
        `
    }

    content.innerHTML = forms;
    content.classList.remove("first-content")
    content.classList.add("second-content")

    btnsAddSubjectsClasses = content.querySelectorAll(".add-subject-btn-class")
    btnsAddSubjectsClassesTeachers = content.querySelectorAll(".add-subject-btn-teacher")

    btnsAddSubjectsClasses.forEach(item => {
        item.addEventListener("click", addBtnIsClickedClasses)
    })

    btnsAddSubjectsClassesTeachers.forEach(item => {
         item.addEventListener("click", addBtnIsClickedTeachers)
    })

}

function addBtnIsClickedClasses(target) {
    target.preventDefault()
    const btn = target.currentTarget
    activelist = btn.parentElement.querySelector(".subjects");
    content.appendChild(formSubjectsClassesHolder)
}

function addBtnIsClickedTeachers(target) {
    target.preventDefault()
    const btn = target.currentTarget
    activelist = btn.parentElement.querySelector(".subjects");
    content.appendChild(formSubjectsTeachersHolder)
}

function AddToClassList(item) {
    item.preventDefault()

    let subject = document.createElement("div")

    const newSubjectInput = item.currentTarget.parentElement.querySelector(".new-subject-add")

    if(newSubjectInput.value == "") {
        alert("Не сте въвели текст")
    } else {
        subject.classList.add("new-subject-in-list")
        subject.textContent += newSubjectInput.value
        activelist.appendChild(subject)
        newSubjectInput.value = ""
        content.removeChild(formSubjectsClassesHolder);
    }
}

function AddToTeacherList(item) {
    item.preventDefault()

    let subject = document.createElement("div")

    const newSubjectInput = item.currentTarget.parentElement.querySelector(".new-subject-add")

    if(newSubjectInput.value == "") {
        alert("Не сте въвели текст")
    } else {
        subject.classList.add("new-subject-in-list")
        subject.textContent += newSubjectInput.value
        activelist.appendChild(subject)
        newSubjectInput.value = ""
        content.removeChild(formSubjectsTeachersHolder);
    }
}

//Event listeners

btnContinue.addEventListener("click", btnContinueIsClicked)
buttonAddSubjectForClass.addEventListener("click", AddToClassList)
buttonAddSubjectForTeacher.addEventListener("click", AddToTeacherList)
