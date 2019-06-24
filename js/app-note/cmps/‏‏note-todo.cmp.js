import storageService from "../services/storage.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `
        <div class="note" :id="note.id" @mousedown.nativ.stop="dragStart($event)" @mouseup.nativ.stop="dragEnd($event)"
            :style="getGrid">
            <img src="img/pin2.png" class="pin" v-if="this.note.isPinned"/>

            <img @click.stop="onChangeBcg()" class="bcg-btn" src="img/color.png"/>
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
                    @click.nativ.stop="toggleDone(idx)" 
                    :class="{'todo-done' : note.todos[idx].isDone}" 
                    :idx="idx">
                    {{todo.txt}}
                    <button class="todo-x-btn" @click.stop="deleteTodo(idx)">✗</button>
                </li>
            </ul>

            <input type="color" ref="bcgColorPicker" class="input-color" @change.nativ="changeBcg()"/>
        </div>
   
    `,
    props: ['note'],
    data() {
        return {
            clickedX: null,
            clickedY: null,
            diffX: null,
            diffY: null,
            el: null
        }
    },
    mounted() {
        this.$refs.bcgColorPicker.value = this.note.bcg
    },
    destroyed() {

    },
    computed: {
        getGrid() {
            return `grid-column-start: ${this.note.x}; grid-row-start: ${this.note.y};background-image: linear-gradient(${this.note.bcg}, rgba(173, 216, 230, 0.6));`
        },

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
        dragStart(ev) {
            // console.log('drag start', ev);

            this.el = document.getElementById(`${this.note.id}`);
            this.clickedX = ev.clientX;
            this.clickedY = ev.clientY;
            this.el.addEventListener('mousemove', this.move);
            this.el.style.zIndex='100';
            this.el.style.cursor='move';

        },
        move(ev) {
            this.diffX = (this.clickedX - ev.clientX);
            this.diffY = (this.clickedY - ev.clientY);

            if (this.diffX < 0 && this.diffY < 0) this.el.style.transform = `translate3d(${this.diffX * -1}px,${this.diffY * -1}px, 0)`;
            if (this.diffX < 0 && this.diffY > 0) this.el.style.transform = `translate3d(${this.diffX * -1}px,-${this.diffY}px, 0)`;
            if (this.diffX > 0 && this.diffY > 0) this.el.style.transform = `translate3d(-${this.diffX}px,-${this.diffY}px, 0)`;
            if (this.diffX > 0 && this.diffY < 0) this.el.style.transform = `translate3d(-${this.diffX}px,${this.diffY * -1}px, 0)`;
        },
        dragEnd(ev) {
            // console.log('drag end', ev);
            this.el.removeEventListener('mousemove', this.move);
            this.el.style.zIndex='unset';

            if (this.diffX == 0) return;

            if (this.diffX < 0) {
                let griddDiffX = Math.round(this.diffX / 10) * -1;
                let start = +this.el.style.gridColumnStart + griddDiffX;
                this.el.style.gridColumnStart = start;

                noteService.saveX(this.note.id, griddDiffX);
                this.el.style.transform = `translate3d(0px,0px, 0)`;
            } else if (this.diffX > 0) {
                let griddDiffX = Math.round(this.diffX / 10);
                let start = +this.el.style.gridColumnStart - griddDiffX;
                this.el.style.gridColumnStart = start;

                noteService.saveX2(this.note.id, griddDiffX);
                this.el.style.transform = `translate3d(0px,0px, 0)`;
            }

            if (this.diffY < 0) {
                let griddDiffY = Math.round(this.diffY / 10) * -1;

                let start = +this.el.style.gridRowStart + griddDiffY;
                this.el.style.gridRowStart = start;

                noteService.saveY(this.note.id, griddDiffY);
                this.el.style.transform = `translate3d(0px,0px, 0)`;
            } else if (this.diffY > 0) {
                let griddDiffY = Math.round(this.diffY / 10);
                let start = +this.el.style.gridRowStart - griddDiffY;
                this.el.style.gridRowStart = start;

                noteService.saveY2(this.note.id, griddDiffY);
                this.el.style.transform = `translate3d(0px,0px, 0)`;
            }
            this.clickedX = null;
            this.clickedY = null;
            this.diffX = 0;
            this.diffY = 0;
        }

    },
    components: {

    }
};