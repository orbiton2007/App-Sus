import storageService from "./../../global/services/storage.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `
    <section class="note note-txt"> 
        <h3>NOTE TXT</h3>
        <p>
           <!-- {{note.txt}} -->
           <!-- <input type="text" v-model="editable"  /> -->
           <textarea v-model="editable" cols="30" rows="10"></textarea>
        </p>
    </section>
    `,
    props: ['note','noteIdx'],
    data() {
        return {
            editable: this.note.txt
        }
    },
    created() {

    },
    watch: {
        editable(){
            noteService.getNotes()
                .then((notes)=>{
                    // console.log('saved');
                    notes[this.noteIdx].txt = this.editable;
                    //improve: is there an option to get and save only 1 params instead of all array?
                    storageService.store('notes',notes)
                })
        }
    },
    computed: {

    },
    methods: {

    },
    components: {

    }
};