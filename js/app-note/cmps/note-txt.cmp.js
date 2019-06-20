import utilService from "./../../global/services/util.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `
    <section class="note note-txt" :style="getStyle"> 
        <h3>NOTE TXT</h3>
        <p>
          
           <!-- <input type="text" v-model="editable"/> -->
           <textarea v-model="editable" cols="30" rows="8" @input.nativ="save()" name="getName"></textarea>
            ---
            {{note.txt}}
        </p>

        <input type="color" ref="bcgColorPicker" @change.nativ="changeBcg()"/>
        <button @click="deleteNote()" class="del-btn">X</button>
        <button @click="pinNote()" class="pin-btn">#</button>

    </section>
    `,
    props: ['note'],
    data() {
        return {
            editable: this.note.txt,
   
            
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
        },
        getName(){
            return utilService.makeId();
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
        pinNote(){
            console.log('emit');
            
            this.$emit('pinEv', this.note.id)

            //render??
        },
        save(){
            noteService.editNoteTxt(this.note.id, this.editable);
        }

    },
    components: {

    }
};