import storageService from "../services/storage.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `
    <div class="note note-txt grid-stack-item-content" :style="getStyle">
        <img src="../../img/pin2.png" class="pin" v-if="this.note.isPinned"/>
        <input type="color" ref="bcgColorPicker" @change.nativ="changeBcg()"/>
        <button @click="deleteNote()" class="del-btn">🗑️</button>
        <button @click="pinNote()" class="pin-btn">📌</button>
        <h3>NOTE TO-DO</h3>

        <p>
            {{note.txt}}
        </p>

        <input type="text" ref="input" placeholder="Enter todo here"/> <button @click.stop="addTodo()">➕</button>
        <ul>
            <li v-for="(todo,idx) in note.todos"
                @click.nativ="toggleDone(idx)" 
                :class="{'todo-done' : note.todos[idx].isDone}" 
                :idx="idx">
                {{todo.txt}}
                <button @click.stop="deleteTodo(idx)">x</button>
            </li>
        </ul>

     

    </div>
    `,
    props: ['note'],
    data() {
        return {
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
    },
    components: {

    }
};