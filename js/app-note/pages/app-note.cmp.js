
import noteService from "../services/notes-service.js"
import noteTxt from "../cmps/note-txt.cmp.js"
import noteTodo from "../cmps/‏‏note-todo.cmp.js"
import noteImg from "../cmps/‏‏note-img.cmp.js"

export default {
    template: `
    <section>

        <h1>App Note</h1>
        <section v-for="(note,idx) in notes">
            <component :is="note.type" :note="note" :noteIdx="idx"/>
        </section>
    </section>
    `,
    props: [],
    data() {
        return {
            notes: null
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

    },
    components: {
        noteTxt,
        noteTodo,
        noteImg
    }
}