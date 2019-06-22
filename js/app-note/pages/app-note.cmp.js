
import noteService from "../services/notes-service.js"
import storageService from "../services/storage.service.js"
import utilService from "./../../global/services/util.service.js"

import noteTxt from "../cmps/note-txt.cmp.js"
import noteTodo from "../cmps/‏‏note-todo.cmp.js"
import noteImg from "../cmps/‏‏note-img.cmp.js"
import noteVideo from "../cmps/‏‏‏‏note-video.cmp.js"

export default {
    template: `
    <section>

        <h1>App Note</h1>

        <input type="text" ref="search" placeholder="search here"  @input.nativ="search()"/>
        <button @click="addTxtNote()">+add TXT note</button>
        <button @click="addTodoNote()">+add TODO note</button>

        <button @click="showVideoInput()">+add VIDEO note</button>
        <input type="text" ref="videoInput" placeholder="Enter video URL" v-if="videoInput"/>
        <button v-if="videoInput" @click="addVideoNote()">upload</button>

        <button @click="showImgInput()">+add IMG note</button>
        <input type="text" ref="imgInput" placeholder="Enter img URL" v-if="imgInput"/>
        <button v-if="imgInput" @click="addImgNote()">upload</button>

        <section v-for="(note,idx) in notesPinned">
            <component :is="note.type" :note="note" @pinEv="pinned" @del="deleteNote"/>
        </section>
        <span v-if="pinLine"> ----------------------------------------------------</span>
        <section v-for="(note,idx) in notesUnpinned">
            <component :is="note.type" :note="note" @pinEv="pinned" @del="deleteNote"/>
        </section>
    </section>
    `,
    props: [],
    data() {
        return {
            notesAll: null,
            notesPinned: null,
            notesUnpinned: null,
            imgInput: false,
            videoInput:false
        }
    },
    created() {
        this.notesAll = noteService.getNotes()
            .then((notes) => {
                this.notesAll = notes;
                this.notesPinned = this.notesAll.filter(note => note.isPinned);
                this.notesUnpinned = this.notesAll.filter(note => !note.isPinned);
                console.log(this.notesAll);
            })
    },
    computed: {
        pinLine() {
            if (!this.notesPinned || !this.notesPinned.length) return false;
            else return true;
        }

    },
    methods: {
        pinned(id) {
            console.log('pin event', id);
            noteService.togglePin(id);

            noteService.getNotes()
                .then((notes) => {
                    this.notesAll = notes;
                    this.notesPinned = notes.filter(note => note.isPinned);
                    this.notesUnpinned = notes.filter(note => !note.isPinned);
                    console.log('pinned:', this.notesPinned, 'unpinned:', this.notesUnpinned);
                })
        },
        deleteNote(id) {
            console.log('delete event', id);
            noteService.del(id);

            noteService.getNotes()
                .then((notes) => {
                    this.notesAll = notes;
                    this.notesPinned = notes.filter(note => note.isPinned);
                    this.notesUnpinned = notes.filter(note => !note.isPinned);
                    console.log('pinned:', this.notesPinned, 'unpinned:', this.notesUnpinned);
                })
        },
        addTxtNote() {
            noteService.addTxtNote();

            noteService.getNotes()
                .then((notes) => {
                    //improve: is there an option to get and save only 1 params instead of all array?
                    this.notesAll = notes;
                    this.notesUnpinned = notes.filter(note => !note.isPinned);
                })
        },
        addTodoNote() {
            noteService.addTodoNote();
            noteService.getNotes()
                .then((notes) => {
                    //improve: is there an option to get and save only 1 params instead of all array?
                    this.notesUnpinned = notes
                    this.notesAll = notes;
                })
        },
        showImgInput(){
            this.imgInput = true
        },
        showVideoInput(){
            this.videoInput = true
        },
        addImgNote() {
            noteService.addImgNote(this.$refs.imgInput.value);

            noteService.getNotes()
                .then((notes) => {
                    //improve: is there an option to get and save only 1 params instead of all array?
                    this.notesUnpinned = notes
                    this.notesAll = notes;
                })

            this.imgInput=false
        },
        addVideoNote() {
            noteService.addVideoNote(this.$refs.videoInput.value);

            noteService.getNotes()
                .then((notes) => {
                    //improve: is there an option to get and save only 1 params instead of all array?
                    this.notesUnpinned = notes
                    this.notesAll = notes;
                })

            this.videoInput=false
        },
        search() {
            console.log('search:', this.$refs.search.value);
            let searchStr = this.$refs.search.value

            this.notesUnpinned = this.notesAll.filter(note => {
                if (note.type != 'note-todo')
                    return note.txt.includes(searchStr)
                else return note.todos.some((todo) => todo.txt == searchStr)
            });

            this.notesPinned = this.notesAll.filter(note => {
                if (note.type != 'note-todo')
                    return note.txt.includes(searchStr)
                else return note.todos.some((todo) => todo.txt == searchStr)
            });
        },

    },
    components: {
        noteTxt,
        noteTodo,
        noteImg,
        noteVideo
    }
}