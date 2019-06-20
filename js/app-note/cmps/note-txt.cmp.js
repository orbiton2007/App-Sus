import storageService from "./../../global/services/storage.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `
    <section class="note note-txt" :style="getStyle"> 
        <h3>NOTE TXT</h3>
        <p>
          
           <!-- <input type="text" v-model="editable"/> -->
           <textarea v-model="editable" cols="30" rows="8" @input.nativ="save()"></textarea>
            ---
            {{note.txt}}
        </p>

        <input type="color" ref="bcgColorPicker" @change.nativ="changeBcg()"/>
        <button @click="deleteNote()" class="del-btn">X</button>
    </section>
    `,
    props: ['note'],
    data() {
        return {
            editable: this.note.txt
        }
    },
    created() {

    },
    // watch: {
    //     editable(){

    //         // noteService.editNoteTxt(this.note.id, this.editable);
    //     }
    // },
    computed: {
        getStyle(){
            return `background-color:${this.note.bcg}`
        }

    },
    methods: {
        changeBcg() {
            let color = this.$refs.bcgColorPicker.value;
            noteService.changeNoteBcg(this.note.id,color)
        },
        deleteNote(){
            noteService.del(this.note.id);
        },
        save(){
            noteService.editNoteTxt(this.note.id, this.editable);
        }

    },
    components: {

    }
};