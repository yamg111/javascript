
let task = document.getElementById("input1");
let date = document.getElementById("input2");
let time = document.getElementById("input3");
let confirm = document.getElementById("one");
let reset = document.getElementById("two");
let nextId
// כותרת

$('.skew-title').children('span').hover((function () {
    let $el, n;
    $el = $(this);
    n = $el.index() + 1;
    $el.addClass('flat');
    if (n % 2 === 0) {
        return $el.prev().addClass('flat');
    } else {
        if (!$el.hasClass('last')) {
            return $el.next().addClass('flat');
        }
    }
}), function () {
    return $('.flat').removeClass('flat');
});

// פונקציה ליצירת פתקים 

function notes() {

    if (date.value == "" || task.value == "") {
        return alert("there are still empty text areas")
    }
    let note = document.createElement("div");
    let divTask = document.createElement("span");
    let divDate = document.createElement("span");
    let divTime = document.createElement("span");
    let divX = document.createElement("span");

    // localstorage

    let noteObj = {
        task: task.value,
        date: date.value,
        time: time.value,
    }

    note.setAttribute("id", nextId)
    localStorage.setItem(nextId, JSON.stringify(noteObj))
    nextId++
    localStorage.setItem("nextId", nextId)

    // פתק
    note.setAttribute("class", "note");
    divTask.setAttribute("class", "divTask");
    divDate.setAttribute("class", "divDate");
    divTime.setAttribute("class", "divTime");
    divX.setAttribute("class", "divX");
    fadeIn(note);
    divTask.textContent = task.value;
    divDate.textContent = date.value;
    divTime.textContent = time.value;

    document.getElementById("diVnotes").appendChild(note);
    note.appendChild(divTask);
    note.appendChild(divDate);
    note.appendChild(divTime);
    note.appendChild(divX);
    divX.addEventListener("click", function () {
        localStorage.removeItem(note.id)
        document.getElementById("diVnotes").removeChild(note);
    })


}


// פונקציה לכפתור הוספת הפתקים

confirm.addEventListener("click", function () {
    notes()

})


// פונקציה לריסט


reset.addEventListener("click", function () {
    task.value = ""
    date.value = ""
    time.value = ""
})

// פונקציה לפייד אין

function fadeIn(element) {
    let op = 0;
    element.style.opacity = 0
    let timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        op += 0.03;
    }, 30);
}

// פונקציה לטעינת העמוד 

function reload() {

    // localstorage

    if (localStorage.getItem("nextId") == null) {
        localStorage.setItem("nextId", 0)
    }
    nextId = parseInt(localStorage.getItem("nextId"))
    for (let i = 0; i <= nextId; i++) {
        if (localStorage.getItem(i)!=null) {

            let noteObj = JSON.parse(localStorage.getItem(i))
            let note = document.createElement("div");
            let divTask = document.createElement("span");
            let divDate = document.createElement("span");
            let divTime = document.createElement("span");
            let divX = document.createElement("span");

            // פתק
            note.setAttribute("id", i);
            note.setAttribute("class", "note");
            divTask.setAttribute("class", "divTask");
            divDate.setAttribute("class", "divDate");
            divTime.setAttribute("class", "divTime");
            divX.setAttribute("class", "divX");
            fadeIn(note);
            divTask.textContent = noteObj.task;
            divDate.textContent = noteObj.date;
            divTime.textContent = noteObj.time;
        
            document.getElementById("diVnotes").appendChild(note);
            note.appendChild(divTask);
            note.appendChild(divDate);
            note.appendChild(divTime);
            note.appendChild(divX);
            divX.addEventListener("click", function () {
                localStorage.removeItem(note.id)
                document.getElementById("diVnotes").removeChild(note);
            })
        
        }
    }
}


reload()