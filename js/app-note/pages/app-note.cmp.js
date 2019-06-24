
import noteService from "../services/notes-service.js"
import storageService from "../services/storage.service.js"
import utilService from "./../../global/services/util.service.js"

import noteTxt from "../cmps/note-txt.cmp.js"
import noteTodo from "../cmps/‏‏note-todo.cmp.js"
import noteImg from "../cmps/‏‏note-img.cmp.js"
import noteVideo from "../cmps/‏‏‏‏note-video.cmp.js"

export default {
    template: `
    <section class="appNote">
        <!-- image modal -->
        <div v-if="imgInput" class="upload-modal">
                <input type="text" ref="imgInput" placeholder="Enter img URL"/>
                <img class="upload-btn" @click="addImgNote()" src="img/upload.png" />
                <img @click.nativ="closeModal()" class="close-modal" src="img/Close.png" />
        </div>

        <!-- image modal -->
        <div v-if="videoInput" class="upload-modal">
                <input type="text" ref="videoInput" placeholder="Enter video URL"/>
                <img class="upload-btn" @click="addVideoNote()" src="img/upload.png" />
                <img @click.nativ="closeModal()" class="close-modal" src="img/Close.png" />
        </div>

        <div class="note-header">
            <input type="text" ref="search" placeholder="🔎 search here"  @input.nativ="search()"/>
            
            <img class="header-btn" :class="{'text-btn': isShowBtns}" @click.nativ="addTxtNote()" src="img/txt.png"/>
            <img class="header-btn" :class="{'list-btn': isShowBtns}" @click.nativ="addTodoNote()" src="img/list.png"/>
            <img class="header-btn" :class="{'video-btn': isShowBtns}" @click.nativ="showVideoInput()" src="img/video.png"/>
            <img class="header-btn" :class="{'image-btn': isShowBtns}" @click.nativ="showImgInput()" src="img/img.png"/>
         
            <img class="plus-btn" @click.nativ="showBtns()" src="img/plus1.png"/>
        </div>
        
        <!-- pinned render -->
        <div class="pinned-cont">

        <section v-for="(note,idx) in notesPinned" class="pinned-note">
            <component :is="note.type" :note="note" @pinEv="pinned" @del="deleteNote" />
        </section>

        </div>

        <!-- unpinned render -->
        <div class="unpinned-cont">
                <component v-for="(note,idx) in notesUnpinned"
                :is="note.type" :note="note" @pinEv="pinned"
                @del="deleteNote"/>
        </div>

    </section>
    `,
    props: [],
    data() {
        return {
            notesAll: null,
            notesPinned: null,
            notesUnpinned: null,
            imgInput: false,
            videoInput: false,
            isShowBtns: false,
            render: false
        }
    },
    created() {
        this.notesAll = noteService.getNotes()
            .then((notes) => {
                this.notesAll = notes;
                this.notesPinned = this.notesAll.filter(note => note.isPinned);
                this.notesUnpinned = this.notesAll.filter(note => !note.isPinned);
                console.log(this.notesAll);
            });

    },
    mounted() {

    },
    computed: {

    },
    methods: {
        pinned(id) {
            // console.log('pin event', id);
            noteService.togglePin(id);

            noteService.getNotes()
                .then((notes) => {
                    this.notesAll = notes;
                    this.notesPinned = notes.filter(note => note.isPinned);
                    this.notesUnpinned = notes.filter(note => !note.isPinned);
                    // console.log('pinned:', this.notesPinned, 'unpinned:', this.notesUnpinned);
                })
        },
        deleteNote(id) {
            // console.log('delete event', id);
            noteService.del(id);

            noteService.getNotes()
                .then((notes) => {
                    this.notesAll = notes;
                    this.notesPinned = notes.filter(note => note.isPinned);
                    this.notesUnpinned = notes.filter(note => !note.isPinned);
                    // console.log('pinned:', this.notesPinned, 'unpinned:', this.notesUnpinned);
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
            this.isShowBtns = false;
        },
        addTodoNote() {
            noteService.addTodoNote();
            noteService.getNotes()
                .then((notes) => {
                    //improve: is there an option to get and save only 1 params instead of all array?
                    this.notesAll = notes;
                    this.notesUnpinned = notes.filter(note => !note.isPinned);
                })
            this.isShowBtns = false;            
        },
        showImgInput() {
            this.imgInput = true
            this.isShowBtns = false;
        },
        showVideoInput() {
            this.videoInput = true
            this.isShowBtns = false;
        },
        addImgNote() {
            noteService.addImgNote(this.$refs.imgInput.value);

            noteService.getNotes()
                .then((notes) => {
                    //improve: is there an option to get and save only 1 params instead of all array?
                    this.notesAll = notes;
                    this.notesUnpinned = notes.filter(note => !note.isPinned);
                })

            this.imgInput = false
            

        },
        addVideoNote() {
            noteService.addVideoNote(this.$refs.videoInput.value);

            noteService.getNotes()
                .then((notes) => {
                    //improve: is there an option to get and save only 1 params instead of all array?
                    this.notesAll = notes;
                    this.notesUnpinned = notes.filter(note => !note.isPinned);
                })

            this.videoInput = false;
       

        },
        search() {
            // console.log('search:', this.$refs.search.value);
            let searchStr = this.$refs.search.value;

            if (!searchStr) {
                // console.log('empty search');

                this.notesUnpinned = this.notesAll.filter(note => !note.isPinned);
                this.notesPinned = this.notesAll.filter(note => note.isPinned);

            } else {
                this.notesUnpinned = this.notesAll.filter(note => {
                    if (!note.isPinned) {
                        if (note.type != 'note-todo') {
                            return note.txt.includes(searchStr);
                        } else return note.todos.some((todo) => todo.txt.includes(searchStr))
                    }
                });

                this.notesPinned = this.notesAll.filter(note => {
                    if (note.isPinned) {
                        if (note.type != 'note-todo') {
                            return note.txt.includes(searchStr);
                        } else return note.todos.some((todo) => todo.txt.includes(searchStr))
                    }
                });
            }
        },
        showBtns() {
            this.isShowBtns = !this.isShowBtns
        },
        closeModal() {
            this.imgInput = false
            this.videoInput = false
        },

    },
    components: {
        noteTxt,
        noteTodo,
        noteImg,
        noteVideo
    }
}