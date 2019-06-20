import storageService from "./../../global/services/storage.service.js"

export default {
    saveNotesToLocalStorage,
    getNotes
}

var gNotes = storageService.load('notes');

if (!gNotes) {
    gNotes = createNotes();
    saveNotesToLocalStorage(gNotes);
    console.log('gNotes was empty. added default notes.');
}

function getNotes() {
    return Promise.resolve(gNotes);
}

function createNotes() {
    let arr = [
        { txt: 'this is my note!', type: 'note-txt' },
        { txt: 'my second nice note',todos:[{txt:'todo number 1',isDone:false},{txt:'todo number 2',isDone:false}], type: 'note-todo' },
        { txt: 'this is my last note for now!!! :)', img: "./../../../img/milk.jpg", type: 'note-img' },
    ]

    return arr;
}

function saveNotesToLocalStorage(notes) {
    storageService.store('notes', notes);
}

function add() {

}

function del() {

}

function edit() {

}