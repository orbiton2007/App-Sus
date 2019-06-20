
import noteService from "../services/notes-service.js"
import storageService from "../services/storage.service.js"
import utilService from "./../../global/services/util.service.js"

import noteTxt from "../cmps/note-txt.cmp.js"
import noteTodo from "../cmps/‏‏note-todo.cmp.js"
import noteImg from "../cmps/‏‏note-img.cmp.js"

export default {
    template: `
    <section>

        <h1>App Note</h1>
        <button @click="addTxtNote()">+add TXT note</button>
        <button @click="addTodoNote()">+add TODO note</button>
        <button @click="addImgNote()">+add IMG note</button>

        <section v-for="(note,idx) in notesPinned" :key="render">
            <component :is="note.type" :note="note" @pinEv="pinned"/>
        </section>
        ----------------------------------------------------
        <section v-for="(note,idx) in notes" :key="render">
            <component :is="note.type" :note="note" @pinEv="pinned"/>
        </section>
    </section>
    `,
    props: [],
    data() {
        return {
            notes: null,
            notesPinned: null,
            counter: 1,
            render
        }
    },
    created() {
        // get notes from localStorage
        noteService.getNotes()
            .then((notes) => {
                console.log('notes from storage:', notes);
                this.notes = notes.filter((note)=>!note.isPinned);
                this.notesPinned = notes.filter((note)=>note.isPinned);
            })

    },
    destroyed() {

    },
    computed: {

    },
    methods: {
        pinned(id){
            console.log('pin event',id);
            noteService.togglePin(id);
             
        },
        addTxtNote(){
            // console.log('txt');
            this.counter++;
            // fix the bug! ps. its ok after refresh
            noteService.getNotes()
                .then((notes) => {
                    notes.unshift({ id: utilService.makeId() ,txt: 'this is my note!' + this.counter, type: 'note-txt', bcg: 'red' ,isPinned:false});
                    //improve: is there an option to get and save only 1 params instead of all array?
                    storageService.store('notes', notes)
            })
            
        },
        addTodoNote(){
            noteService.getNotes()
            .then((notes) => {
                notes.unshift({ id: utilService.makeId() ,txt: 'Hi! Im new list!', todos: [{ txt: 'todo number 1', isDone: false }, { txt: 'todo number 2', isDone: false }], type: 'note-todo', bcg: null ,isPinned:false});
                //improve: is there an option to get and save only 1 params instead of all array?
                storageService.store('notes', notes)
        })

        },
        addImgNote(){
            noteService.getNotes()
            .then((notes) => {
                notes.unshift({id: utilService.makeId() ,txt: 'Hi! Im new image note! :)', img: "./../../../img/milk.jpg", type: 'note-img', bcg: null ,isPinned:false});
                //improve: is there an option to get and save only 1 params instead of all array?
                storageService.store('notes', notes)
        })
        },
    },
    components: {
        noteTxt,
        noteTodo,
        noteImg
    }
}