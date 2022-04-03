// Classes

class Teacher {
    constructor(firstName, lastName, subjects, maxHours) {
        this.firstName = firstName
        this.lastName = lastName
        this.subjects = subjects
        this.maxHours = maxHours
    }
}

class SubjectForClasses {
    constructor(name, numberOfHours, hoursToBeTogether, neededTeachers, needComputerRoom) {
        this.name = name
        this.numberOfHours = numberOfHours
        this.hoursToBeTogether = hoursToBeTogether
        this.neededTeachers = neededTeachers
        this.needComputerRoom = needComputerRoom
        this.dificulty = 0;
    }

    AddDificulty() {
        switch(this.name) {
            case "Математика":
                this.dificulty = 1;
                break;
            case "Информационни технологии":
                this.dificulty = 1;
                break;
            case "Биология":
                this.dificulty = 1;
                break;
            case "Физика":
                this.dificulty = 1;
                break;
            case "Химия":
                this.dificulty = 1;
                break;
            case "История":
                this.dificulty = 1;
                break;
            case "Музика":
                this.dificulty = 1;
                break;
            case "Изобразително изкуство":
                this.dificulty = 1;
                break;
            case "Час на класа":
                this.dificulty = 0;
                break;
            default:
                this.dificulty = 1;
        };
    }

}

class SubjectForTeachers {
    constructor(name, classes, needComputerRoom) {
        this.name = name
        this.classes= classes
        this.needComputerRoom = needComputerRoom
    }
}

class ClassInSchool {
    constructor(name, subjects) {
        this.name = name
        this.subjects = subjects
    }

    AddSubjects(newSubject) {
        this.subjects.push(newSubject)
    }

}

class Classrooms {
    constructor() {

    }
}

//Containers

const content = document.querySelector(".content")
const classesInput = document.getElementById("number-of-unique-classes")
const teachersInput = document.getElementById("number-of-teachers")
const classroomsInput = document.getElementById("number-of-classrooms")
const btnContinue = document.querySelector(".continue-button")

//For creating forms for subjects

const formSubjectsClassesHolder = document.createElement("div")
formSubjectsClassesHolder.classList.add("holder")
formSubjectsClassesHolder.innerHTML = `
            <!-- Form for adding class' subjects -->
                <div class="login-box">
                <p class="close-btn">&times</p>

                <h2>Нов предмет</h2>
                <form class>
                    <div class="user-box"> 
                        <input list="possible-subjects" class="new-subject-add" id="class-subject-name"/>
                        <label>Предмет</label>
                    </div>

                    <div class="user-box">
                        <input type="number" class="hours-the-subject" id="class-number-of-hours-of-subject"/>
                        <label>Брой часове за седмица</label>
                    </div>

                    <div class="user-box">
                        <input type="number" class="teachers-for-the-subject" id="class-needed-teachers"/>
                        <label>Колко учители са нужни на класа</label>
                    </div>
                    
                    <div class="user-box">
                        <input type="number" id="class-how-many-classes-together"/>
                        <label>По възможност колко от часовете да са заедно</label>
                    </div>

                    <div class="user-box">
                        <input list="yes-or-no" id="class-need-computer-room"/>
                        <label>Предметът нуждае ли се от компютърен кабинет</label>
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
        <p class="close-btn">&times</p>

        <h2>Нов предмет</h2>
        <form class>
            <div class="user-box"> 
                <input list="possible-subjects" class="new-subject-add" id="teacher-subject-name"/>
                <label>Предмет</label>
            </div>2


            <div class="user-box">
                <input class="classes-wanted-teacher" id="teacher-wanted-classes"/>
                <label>Желани класове (за предмета)</label>
            </div>

            <div class="user-box">
                    <input list="yes-or-no" id="teacher-need-computer-room"/>
                    <label>Предметът нуждае ли се от компютърен кабинет</label>
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

const buttonAddSubjectForClass = formSubjectsClassesHolder.querySelector(".add-subject-in-list-btn");
const closeBtnFormClass = formSubjectsClassesHolder.querySelector(".close-btn")
const subjectNameFormForClass = formSubjectsClassesHolder.querySelector("#class-subject-name")
const numberOfHoursPerSubjectClassHolder = formSubjectsClassesHolder.querySelector("#class-number-of-hours-of-subject")
const neededTeachersClassHolder = formSubjectsClassesHolder.querySelector("#class-needed-teachers")
const classesTogether = formSubjectsClassesHolder.querySelector("#class-how-many-classes-together")
const needComputerRoomClass = formSubjectsClassesHolder.querySelector("#class-need-computer-room")

const buttonAddSubjectForTeacher = formSubjectsTeachersHolder.querySelector(".add-subject-in-list-btn");
const closeBtnFormTeacher = formSubjectsTeachersHolder.querySelector(".close-btn")
const subjectNameFormForTeacher = formSubjectsTeachersHolder.querySelector("#teacher-subject-name")
const teacherWantedClasses = formSubjectsTeachersHolder.querySelector("#teacher-wanted-classes")
const needComputerRoomTeacher = formSubjectsClassesHolder.querySelector("#teacher-need-computer-room")


// Variables
let activelist = null
let btnsAddSubjects = null
let btnAddSubjectToList = null

// Functions

function btnContinueIsClicked() {
    let numberOfClasses = classesInput.value
    let numberOfTeachers = teachersInput.value
    let numberOfClassrooms = classroomsInput.value

    const datalist = document.createElement("datalist")
    let valuesForDataList = ""

    for(let i = 1; i < numberOfClassrooms; i++) {
        valuesForDataList += `<option>${i}</option>`
    }

    datalist.innerHTML = valuesForDataList;
    datalist.setAttribute("id", "possible-classrooms-names")
    document.body.appendChild(datalist)

    let formsAndBtn = ""

    for(let i = 0; i < numberOfClasses; i++)   {
        formsAndBtn += `
            <!-- Example of shablon subjects -->
            
            <form class="form-of-class">
                <h2>Паралелка</h2>

                <label>Имена на класовете в паралелката</label>
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
        formsAndBtn += `
            <div></div>
        `
    } else if(numberOfClasses % 3 == 1) {
        formsAndBtn += `
            <div></div>
            <div></div>
        `
    }

    for(let i = 0; i < numberOfTeachers; i++)   {
        formsAndBtn += `
            <!-- Form for teacher -->
            <form class="form-of-teacher">
                <h2>Учител</h2>

                <label>Име</label>
                <input class="first-name-teacher"/>

                <label>Фамилия</label>
                <input class="last-name-teacher"/>

                <label>Максимален брой часове за седмица</label>
                <input <input type="number" class="hours-the-subject"/>

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

    if(numberOfClasses % 3 == 2) {
        formsAndBtn += `
            <div></div>
        `
    } else if(numberOfClasses % 3 == 1) {
        formsAndBtn += `
            <div></div>
            <div></div>
        `
    }

    for(let i = 0; i < numberOfClassrooms; i++)   {
        formsAndBtn += `
            <!-- Form for classroom -->
            <form class="form-of-classroom">
                <h2>Стая</h2>

                <label>Име (номер)</label>
                <input class="classroon-name" list="possible-classrooms-names"/>

                <label>Клас</label>
                <input/>

                <label>Използва се с друг кабинет</label>
                <input class="other-classroom-use" />

            </form>
        `
    }

    if(numberOfClasses % 3 == 2) {
        formsAndBtn += `
            <div></div>
        `
    } else if(numberOfClasses % 3 == 1) {
        formsAndBtn += `
            <div></div>
            <div></div>
        `
    }

    formsAndBtn += `
            <div></div>
        `

    formsAndBtn += `
            <button class="button-create">Създай</button>
        `

    formsAndBtn += `
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    `

    content.innerHTML = formsAndBtn;
    content.classList.remove("first-content")
    content.classList.add("second-content")

    const btnsAddSubjectsClasses = content.querySelectorAll(".add-subject-btn-class")
    const btnsAddSubjectsClassesTeachers = content.querySelectorAll(".add-subject-btn-teacher")
    const btnCreate = content.querySelector(".button-create")

    btnsAddSubjectsClasses.forEach(item => {
        item.addEventListener("click", addBtnIsClickedClasses)
    })

    btnsAddSubjectsClassesTeachers.forEach(item => {
         item.addEventListener("click", addBtnIsClickedTeachers)
    })

    btnCreate.addEventListener("click", createtheSchedule)
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

function AddToClassSubjectList(item) {
    item.preventDefault()

    const subject = document.createElement("div")
    subject.setAttribute("class", "subject-box-in-lists")


    if(subjectNameFormForClass.value == "") {
        alert("Не сте избрали предмет")
        return
    }
    if(numberOfHoursPerSubjectClassHolder.value == ""){
        alert("Не сте въвели брой часове")
        return
    } 
    
    if(neededTeachersClassHolder.value == "") {
        alert("Не сте избрали брой учители")
        return
    }

    if(classesTogether.value == "" ) {
        alert("Не сте избрали колко от часовете да са заедно")
        return
    }

    if(needComputerRoomClass.value == "Да" && needComputerRoomClass.value == "Не") {
        alert("Не сте избрали дали предметът се нуждае от компютърна зала")
        return
    }

    subject.classList.add("new-subject-in-list")
    subject.innerHTML += `<p>${subjectNameFormForClass.value}</p>`
    subject.info = new SubjectForClasses(subjectNameFormForClass.value, parseInt(numberOfHoursPerSubjectClassHolder.value), 
        parseInt(classesTogether.value), parseInt(neededTeachersClassHolder.value, needComputerRoomClass.value == "Да"))
    activelist.appendChild(subject)
    content.removeChild(formSubjectsClassesHolder);
    DefaultFormForClasses()
    
}

function AddToTeacherSubjectList(item) {
    item.preventDefault()

    const subject = document.createElement("div")
    subject.setAttribute("class", "subject-box-in-lists")

    const newSubjectInput = item.currentTarget.parentElement.querySelector(".new-subject-add")
    
    if(subjectNameFormForTeacher.value == "") {
        alert("Не сте избрали предмет")
        return
    } 

    if(needComputerRoomTeacher.value == "Да" && needComputerRoomTeacher.value == "Не") {
        alert("Не сте избрали дали предметът се нуждае от компютърна зала")
        return
    }

    subject.classList.add("new-subject-in-list")
    subject.textContent += newSubjectInput.value
    subject.info = new SubjectForTeachers(subjectNameFormForTeacher.value, 
        SeparateWords(teacherWantedClasses.value), needComputerRoomTeacher.value == "Да")
    activelist.appendChild(subject)
    content.removeChild(formSubjectsTeachersHolder);
    DefaultFormForTeachers()
    
}

function DefaultFormForClasses() {
    subjectNameFormForClass.value = ""
    numberOfHoursPerSubjectClassHolder.value = ""
    neededTeachersClassHolder.value = ""
    classesTogether.value = ""
    needComputerRoomClass.value = ""
}

function DefaultFormForTeachers() {
    subjectNameFormForTeacher.value = ""
    teacherWantedClasses.value = ""
    needComputerRoomTeacher.value = ""
}

function createtheSchedule() {
    const AllCLasses = document.querySelectorAll(".form-of-class")
    const AllTeachers = document.querySelectorAll(".form-of-teacher")
    const AllClassrooms = document.querySelectorAll(".form-of-classroom")

    let ClassesInSchool = []
    let TeachersInSchool = []
    // let ClassroomsInSchool = []

    AllCLasses.forEach(function(classForm) {
        let classes = SeparateWords(classForm.querySelector(".name-class").value)
        let subjects = classForm.querySelectorAll(".subject-box-in-lists")
        let subjectsInfo = []

        for(let i = 0; i < subjects.length; i++) {
            subjectsInfo.push(subjects[i].info)
        }

        for(let i = 0; i < classes.length; i++) {
            ClassesInSchool.push(new ClassInSchool(classes[i], subjectsInfo))
        }
    })

    AllTeachers.forEach(function(teacherForm) {
        let firstName = teacherForm.querySelector(".first-name-teacher").value
        let lastName = teacherForm.querySelector(".last-name-teacher").value
        let maxHours= parseInt(teacherForm.querySelector(".hours-the-subject").value)
        let subjects = teacherForm.querySelectorAll(".subject-box-in-lists")
        
        let subjectsInfo = []

        for(let i = 0; i < subjects.length; i++) {
            subjectsInfo.push(subjects[i].info)
        }

        TeachersInSchool.push(new Teacher(firstName, lastName, subjectsInfo, maxHours))

    })

    // AllClassrooms.forEach(function(classroomForm) {
    //     let name = classroomForm.querySelector(".classroon-name").value
    //     let otherRoomsUsedWithIt =  SeparateWords(classroomForm.querySelector(".other-classroom-use").value)
    // })

}

function SeparateWords(words, seperators = [' ', ',']) {
    let result = []
    let newWord = ""

    for(let i = 0; i < words.length; i++) {
        if(seperators.includes(words[i])) {
            if(newWord.length > 0) {
                result.push(newWord)
                newWord = ""
            }
        } else {
            newWord += words[i]
        }
    }

    if(newWord.length > 0) {
        result.push(newWord)
    }

    return result
}

//Event listeners

btnContinue.addEventListener("click", btnContinueIsClicked)
buttonAddSubjectForClass.addEventListener("click", AddToClassSubjectList)
buttonAddSubjectForTeacher.addEventListener("click", AddToTeacherSubjectList)

closeBtnFormClass.addEventListener("click", function() { 
    content.removeChild(formSubjectsClassesHolder)
    DefaultFormForClasses()
})
closeBtnFormTeacher.addEventListener("click", function() { 
    content.removeChild(formSubjectsTeachersHolder)
    DefaultFormForTeachers()
})
