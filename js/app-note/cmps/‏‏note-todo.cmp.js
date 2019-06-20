import storageService from "./../../global/services/storage.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `
    <section class="note note-todo"> 
        <h3>NOTE TO-DO</h3>
        <p>
            {{note.txt}}
        </p>

        <input type="text" id="input" placeholder="Enter todo here"/> <button @click.stop="addTodo()">+</button>
        <ul>
            <li v-for="(todo,idx) in note.todos"
                @click.nativ="toggleDone(idx)" 
                :class="{'todo-done' : note.todos[idx].isDone}" 
                :idx="idx">
                {{todo.txt}}
                <button @click.stop="deleteTodo(idx)">x</button>
            </li>
        </ul>
    </section>
    `,
    props: ['note', 'noteIdx'],
    data() {
        return {
        }
    },
    created() {

    },
    destroyed() {

    },
    computed: {

    },
    methods: {
        toggleDone(idx) {
            // console.log(this.note.todos[idx].isDone);
            noteService.getNotes()
                .then((notes) => {
                    // console.log('saved');
                    notes[this.noteIdx].todos[idx].isDone = !this.note.todos[idx].isDone;
                    //improve: is there an option to get and save only 1 params instead of all array?
                    storageService.store('notes', notes)
                })
        },
        deleteTodo(idx) {
            noteService.getNotes()
                .then((notes) => {
                    // console.log('saved');
                    notes[this.noteIdx].todos.splice(idx, 1);
                    //improve: is there an option to get and save only 1 params instead of all array?
                    storageService.store('notes', notes)
                })
        },
        addTodo() {
            // dont use dqs use ref
            let newTxt = document.querySelector('#input').value;
            // console.log(newTxt);

            noteService.getNotes()
                .then((notes) => {
                    // console.log('saved');
                    notes[this.noteIdx].todos.unshift({ txt: newTxt, isDone: false });
                    //improve: is there an option to get and save only 1 params instead of all array?
                    storageService.store('notes', notes)
                })
                
            document.querySelector('#input').value = '';
        }
    },
    components: {

    }
};