import storageService from "./../../global/services/storage.service.js"
import utilService from "./../../global/services/util.service.js"

export default {
    saveNotesToLocalStorage,
    getNotes,
    editNoteTxt,
    changeNoteBcg,
    del
}

var gNotes = storageService.load('notes');

if (!gNotes|| !gNotes.length) {
    gNotes = createNotes();
    saveNotesToLocalStorage(gNotes);
    console.log('gNotes was empty. added default notes.');
}

function getNotes() {
    return Promise.resolve(gNotes);
}

function createNotes() {
    let arr = [
        { id: utilService.makeId() , txt: 'this is my note!', type: 'note-txt', bcg: null },
        { id: utilService.makeId() ,txt: 'my second nice note', todos: [{ txt: 'todo number 1', isDone: false }, { txt: 'todo number 2', isDone: false }], type: 'note-todo', bcg: null },
        { id: utilService.makeId() ,txt: 'this is my last note for now!!! :)', img: "./../../../img/milk.jpg", type: 'note-img', bcg: null },
    ]

    return arr;
}

function saveNotesToLocalStorage(notes) {
    storageService.store('notes', notes);
}

function editNoteTxt(id,newTxt){
    getNotes()
    .then((notes)=>{
        let idx = notes.findIndex(note=> note.id === id);
        notes[idx].txt = newTxt;
        //improve: is there an option to get and save only 1 params instead of all array?
        storageService.store('notes',notes)
    })
}

function changeNoteBcg(id,color){
    getNotes()
    .then((notes) => {
        let idx = notes.findIndex(note=> note.id === id);
        notes[idx].bcg = color;
        //improve: is there an option to get and save only 1 params instead of all array?
        storageService.store('notes', notes)
    })
}



function add() {

}

function del(id) {
    getNotes()
        .then((notes) => {
            let idx = notes.findIndex(note=> note.id === id);
            notes.splice(idx,1);
            //improve: is there an option to get and save only 1 params instead of all array?
            storageService.store('notes', notes)
        })

}

function edit() {

}