
import noteService from "../services/notes-service.js"
import storageService from "./../../global/services/storage.service.js"
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
        <section v-for="(note,idx) in notes">
            <component :is="note.type" :note="note" :noteIdx="idx"/>
        </section>
    </section>
    `,
    props: [],
    data() {
        return {
            notes: null,
            counter: 1
        }
    },
    created() {
        // get notes from localStorage
        noteService.getNotes()
            .then((notes) => {
                this.notes = notes;
                console.log('notes from storage:', notes);
            })

    },
    destroyed() {

    },
    computed: {

    },
    methods: {
        addTxtNote(){
            console.log('txt');
            this.counter++;
            // let obj = {};
            // obj = { ...{ id: utilService.makeId() ,txt: 'this is my note!', type: 'note-txt', bcg: 'red' } };
            noteService.getNotes()
                .then((notes) => {
                    notes.unshift({ id: utilService.makeId() ,txt: 'this is my note!' + this.counter, type: 'note-txt', bcg: 'red' });
                    //improve: is there an option to get and save only 1 params instead of all array?
                    storageService.store('notes', notes)
            })
            
        },
        addTodoNote(){

        },
        addImgNote(){

        },
    },
    components: {
        noteTxt,
        noteTodo,
        noteImg
    }
}