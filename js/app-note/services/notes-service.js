import storageService from "./storage.service.js"
import utilService from "./../../global/services/util.service.js"

export default {
    saveNotesToLocalStorage,
    getNotes,
    editNoteTxt,
    changeNoteBcg,
    del,
    togglePin,
    addTxtNote,
    addTodoNote,
    addImgNote,
    addVideoNote,
    saveX,
    saveX2,
    saveY,
    saveY2,
    saveH,
    saveW
}


var gNotes = storageService.load('notes');

if (!gNotes || !gNotes.length) {
    gNotes = createNotes();
    saveNotesToLocalStorage(gNotes);
    console.log('gNotes was empty. added default notes.');
}

function getNotes() {
    return Promise.resolve(gNotes);
}


function createNotes() {
    let arr = [
        { id: utilService.makeId(), txt: 'This is my note! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, aut ipsam optio mollitia temp ', type: 'note-txt', bcg:  utilService.getRandomColor(), isPinned: false, x: 0, y: 0, w: 4, h: 4 },
        { id: utilService.makeId(), txt: 'My shopping list', todos: [{ txt: 'buy milk', isDone: false }, { txt: 'buy ugi', isDone: false }], type: 'note-todo', bcg:  utilService.getRandomColor(), isPinned: false, x: 5, y: 5, w: 4, h: 4 },
        { id: utilService.makeId(), txt: 'Tommorow is another day :)', img: "./../../../img/sunrise.jpg", type: 'note-img', bcg:  utilService.getRandomColor(), isPinned: false, x: 10, y: 10, w: 4, h: 4 },
        { id: utilService.makeId(), txt: 'Watch it when you have time', video: "https://www.youtube.com/watch?v=N_ZDvdczO6I", type: 'note-video', bcg:  utilService.getRandomColor(), isPinned: false, x: 15, y: 15, w: 4, h: 4 },
    ]

    return arr;
}

function saveNotesToLocalStorage(notes) {
    storageService.store('notes', notes);
}

function editNoteTxt(id, newTxt) {
    getNotes()
        .then((notes) => {
            let idx = notes.findIndex(note => note.id === id);
            notes[idx].txt = newTxt;
            //improve: is there an option to get and save only 1 params instead of all array?
            storageService.store('notes', notes)
        })
}

function changeNoteBcg(id, color) {
    getNotes()
        .then((notes) => {
            let idx = notes.findIndex(note => note.id === id);
            notes[idx].bcg = color;
            //improve: is there an option to get and save only 1 params instead of all array?
            storageService.store('notes', notes)
        })
}


function del(id) {
    getNotes()
        .then((notes) => {
            let idx = notes.findIndex(note => note.id === id);
            notes.splice(idx, 1);
            //improve: is there an option to get and save only 1 params instead of all array?
            storageService.store('notes', notes)
        })
}


function togglePin(id) {
    getNotes()
        .then((notes) => {
            let idx = notes.findIndex(note => note.id === id);
            notes[idx].isPinned = !notes[idx].isPinned;
            //improve: is there an option to get and save only 1 params instead of all array?
            storageService.store('notes', notes)
        })

}

function addTxtNote() {
    getNotes()
        .then((notes) => {
            notes.unshift({ id: utilService.makeId(), txt: 'this is my note!', type: 'note-txt', bcg: utilService.getRandomColor(), isPinned: false, x: 0, y: 0, w: 4, h: 4 });
            //improve: is there an option to get and save only 1 params instead of all array?
            storageService.store('notes', notes)
        })
}

function addTodoNote() {
    getNotes()
        .then((notes) => {
            notes.unshift({ id: utilService.makeId(), txt: 'Hi! Im new list!', todos: [{ txt: 'todo number 1', isDone: false }, { txt: 'todo number 2', isDone: false }], type: 'note-todo', bcg: utilService.getRandomColor(), isPinned: false, x: 0, y: 0, w: 4, h: 4 });
            //improve: is there an option to get and save only 1 params instead of all array?
            storageService.store('notes', notes)
        })
}

function addImgNote(url) {
    getNotes()
        .then((notes) => {
            notes.unshift({ id: utilService.makeId(), txt: 'Hi! Im new image note! :)', img: url, type: 'note-img', bcg: utilService.getRandomColor(), isPinned: false, x: 0, y: 0, w: 4, h: 4 });
            //improve: is there an option to get and save only 1 params instead of all array?
            storageService.store('notes', notes)
        })
}

function addVideoNote(url) {
    getNotes()
        .then((notes) => {
            notes.unshift({ id: utilService.makeId(), txt: 'Hi! Im new Video note! :)', video: url, type: 'note-video', bcg: utilService.getRandomColor(), isPinned: false, x: 0, y: 0, w: 4, h: 4});
            //improve: is there an option to get and save only 1 params instead of all array?
            storageService.store('notes', notes)
        })
}

function saveX(id,x){
    getNotes()
    .then((notes) => {
        let idx = notes.findIndex(note => note.id === id);
        notes[idx].x += x;
        //improve: is there an option to get and save only 1 params instead of all array?
        storageService.store('notes', notes)
    })
}

function saveX2(id,x){
    getNotes()
    .then((notes) => {
        let idx = notes.findIndex(note => note.id === id);
        notes[idx].x -= x;
        //improve: is there an option to get and save only 1 params instead of all array?
        storageService.store('notes', notes)
    })
}



function saveY(id,y){
    getNotes()
    .then((notes) => {
        let idx = notes.findIndex(note => note.id === id);
        notes[idx].y += y;
        //improve: is there an option to get and save only 1 params instead of all array?
        storageService.store('notes', notes)
    })
}

function saveY2(id,y){
    getNotes()
    .then((notes) => {
        let idx = notes.findIndex(note => note.id === id);
        notes[idx].y -= y;
        //improve: is there an option to get and save only 1 params instead of all array?
        storageService.store('notes', notes)
    })
}




function saveH(id,h){
    getNotes()
    .then((notes) => {
        let idx = notes.findIndex(note => note.id === id);
        notes[idx].h = h;
        //improve: is there an option to get and save only 1 params instead of all array?
        storageService.store('notes', notes)
    })
}

function saveW(id,w){
    getNotes()
    .then((notes) => {
        let idx = notes.findIndex(note => note.id === id);
        notes[idx].w = w;
        //improve: is there an option to get and save only 1 params instead of all array?
        storageService.store('notes', notes)
    })
}