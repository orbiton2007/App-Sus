
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
        <div v-if="imgInput" class="hidden-btns-cont">
                <input type="text" ref="imgInput" placeholder="Enter img URL"/>
                <button @click="addImgNote()">upload</button>
        </div>

        <div class="note-header">
            <input type="text" ref="search" placeholder="search here"  @input.nativ="search()"/>
            
        
            <!-- <button @click="addTxtNote()">+add TXT note</button> -->
            <!-- <button @click="addTodoNote()">+add TODO note</button> -->
            <img class="img-btn" :class="{'text-btn': isShowBtns}" @click.nativ="addTxtNote()" src="../../img/txt.png"/>
            <img class="img-btn" :class="{'list-btn': isShowBtns}" @click.nativ="addTodoNote()" src="../../img/list.png"/>
            
            
            <!-- <button @click="showVideoInput()">+add VIDEO note</button> -->
            <img class="img-btn" :class="{'video-btn': isShowBtns}" @click.nativ="showVideoInput()" src="../../img/video.png"/>
            <input type="text" ref="videoInput" placeholder="Enter video URL" v-if="videoInput"/>
            <button v-if="videoInput" @click="addVideoNote()">upload</button>
            
            <!-- <button @click="showImgInput()">+add IMG note</button> -->
            <img class="img-btn" :class="{'image-btn': isShowBtns}" @click.nativ="showImgInput()" src="../../img/img.png"/>
         

            <img class="plus-btn" @click.nativ="showBtns()" src="../../img/plus1.png"/>
        </div>
        
        <div class="pinned-cont">

            <section v-for="(note,idx) in notesPinned" class="pinned-note">
                <component :is="note.type" :note="note" @pinEv="pinned" @del="deleteNote" />
            </section>

        </div>

            <!-- <span v-if="pinLine">  ***************************</span> -->

        <div ref="grid" data-gs-animate="yes">
        <!-- :id="idx" -->
            <div v-for="(note,idx) in notesUnpinned" class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide"
            data-gs-x="0" data-gs-y="0"
            data-gs-width="4" data-gs-height="4">
                <component :is="note.type" :note="note" @x="getX" @pinEv="pinned" @del="deleteNote"/>
            </div>
        
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
            isShowBtns:false,
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
        // console.log(document.getElementById('0'));
        // document.querySelector('#0');
        // document.getElementById('0')
        this.$refs.grid.classList.add("grid-stack");
        this.render = true;
    },
    computed: {
        // pinLine() {
        //     if (!this.notesPinned || !this.notesPinned.length) return false;
        //     else return true;
        // },

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
                    this.notesAll = notes;
                    this.notesUnpinned = notes.filter(note => !note.isPinned);
                })
        },
        showImgInput() {
            this.imgInput = true
        },
        showVideoInput() {
            this.videoInput = true
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
            console.log('search:', this.$refs.search.value);
            let searchStr = this.$refs.search.value;

            if (!searchStr) {
                console.log('empty search');

                this.notesUnpinned = this.notesAll.filter(note => !note.isPinned);
                this.notesPinned = this.notesAll.filter(note => note.isPinned);
                console.log(this.notesUnpinned);
                console.log(this.notesPinned);

            } else {
                this.notesUnpinned = this.notesAll.filter(note => {
                    if (!note.isPinned) {
                        if (note.type != 'note-todo') {
                            return note.txt.includes(searchStr);
                        } else return note.todos.some((todo) => todo.txt.includes(searchStr))
                    }
                });
                console.log(this.notesUnpinned);

                this.notesPinned = this.notesAll.filter(note => {
                    if (note.isPinned) {
                        if (note.type != 'note-todo') {
                            return note.txt.includes(searchStr);
                        } else return note.todos.some((todo) => todo.txt.includes(searchStr))
                    }
                });
                console.log(this.notesPinned);
            }
        },
        showBtns(){
            this.isShowBtns=!this.isShowBtns
        },
        getX(x) {
            // console.log('getx',x);
            // console.log('this note',note);


        }

    },
    components: {
        noteTxt,
        noteTodo,
        noteImg,
        noteVideo
    }
}