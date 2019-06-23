import storageService from "../services/storage.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `
    <div class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide"
            :id="note.id"
            :data-gs-x="note.x" :data-gs-y="note.y"
            :data-gs-width="note.w" :data-gs-height="note.h"
            @click.nativ="updateLayout()">

        <div class="note grid-stack-item-content" :style="getStyle">
            <img src="../../img/pin2.png" class="pin" v-if="this.note.isPinned"/>

            <img @click.stop="onChangeBcg()" class="bcg-btn" src="../../img/color.png"/>
            <span class="title">Todo Note</span>
            <button @click.stop="deleteNote()" class="del-btn">🗑️</button>
            <button @click.stop="pinNote()" class="pin-btn">📌</button>
            <br>
          

            <p>
                {{note.txt}}
            </p>

            <input type="text" class="todo-input" ref="input" placeholder="Enter todo here"/> <button @click.stop="addTodo()">➕</button>
            <ul>
                <li v-for="(todo,idx) in note.todos"
                    @click.nativ="toggleDone(idx)" 
                    :class="{'todo-done' : note.todos[idx].isDone}" 
                    :idx="idx">
                    {{todo.txt}}
                    <button class="todo-x-btn" @click.stop="deleteTodo(idx)">✗</button>
                </li>
            </ul>

            <input type="color" ref="bcgColorPicker" class="input-color" @change.nativ="changeBcg()"/>
        </div>
    </div>
    `,
    props: ['note'],
    data() {
        return {
            x: this.note.x,
            y: this.note.y,
            w: this.note.w,
            h: this.note.h,
        }
    },
    mounted() {
        this.$refs.bcgColorPicker.value = this.note.bcg
    },
    destroyed() {

    },
    computed: {
        getStyle(){
            return `background-image: linear-gradient(${this.note.bcg}, rgba(173, 216, 230, 0.6));`
        }

    },
    methods: {
        toggleDone(todoIdx) {
            // console.log(this.note.todos[idx].isDone);
            noteService.getNotes()
                .then((notes) => {
                    // console.log('saved');
                    let idx = notes.findIndex(note=> note.id === this.note.id);
                    notes[idx].todos[todoIdx].isDone = !this.note.todos[todoIdx].isDone;
                    //improve: is there an option to get and save only 1 params instead of all array?
                    storageService.store('notes', notes)
                })
        },
        deleteTodo(todoIdx) {
            noteService.getNotes()
                .then((notes) => {
                    // console.log('saved');
                    let idx = notes.findIndex(note=> note.id === this.note.id);
                    notes[idx].todos.splice(todoIdx, 1);
                    //improve: is there an option to get and save only 1 params instead of all array?
                    storageService.store('notes', notes)
                })
        },
        addTodo() {
            let newTxt = this.$refs.input.value;
            // console.log(newTxt);

            noteService.getNotes()
                .then((notes) => {
                    // console.log('saved');
                    let idx = notes.findIndex(note=> note.id === this.note.id);
                    notes[idx].todos.unshift({ txt: newTxt, isDone: false });
                    //improve: is there an option to get and save only 1 params instead of all array?
                    storageService.store('notes', notes)
                })
                
                this.$refs.input.value = '';
        },
        onChangeBcg(){
            this.$refs.bcgColorPicker.click();
        },
        changeBcg() {    
            let color = this.$refs.bcgColorPicker.value;
            noteService.changeNoteBcg(this.note.id,color)
        },
        pinNote(){
            console.log('emit');  
            this.$emit('pinEv', this.note.id)
        },
        deleteNote(){
            console.log('emit');
            this.$emit('del', this.note.id)
        },
        updateLayout() {
            let el = document.getElementById(`${this.note.id}`).dataset;

            if (+el.gsWidth != this.w) {
                console.log('w changed');
                this.w = +el.gsWidth;
                noteService.saveW(this.note.id, this.w)
            }

            if (+el.gsHeight != this.h) {
                console.log('h changed');
                this.h = +el.gsHeight;
                noteService.saveH(this.note.id, this.h)
            }

            if (+el.gsX != this.x) {
                console.log('x changed');
                this.x = +el.gsX;
                noteService.saveX(this.note.id, this.x)
            }

            if (+el.gsY != this.y) {
                console.log('y changed');
                this.y = +el.gsY;
                noteService.saveY(this.note.id, this.y)

            }
            this.$emit('saveLayoutAll', true)

        },


    },
    components: {

    }
};