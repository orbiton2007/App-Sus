import utilService from "./../../global/services/util.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `
    <section class="note note-txt" :style="getStyle"> 
        <h3>NOTE TXT</h3>
        <!-- <textarea ref="area" v-model="editable" cols="30" rows="8" @input.nativ="save()" name="getName"></textarea> -->
        
        <p contenteditable="true" @input.nativ="saveTxt()" ref="content">
            {{note.txt}}
        </p>

        <input type="color" ref="bcgColorPicker" @change.nativ="changeBcg()"/>
        <button @click="onDelete()" class="del-btn">🗑️</button>
        <button @click="pinNote()" class="pin-btn">📌</button>

    </section>
    `,
    props: ['note'],
    data() {
        return {
        }
    },
    mounted() {
        this.$refs.bcgColorPicker.value = this.note.bcg
    },
    computed: {
        getStyle(){
            return `background-color:${this.note.bcg}`
        },

    },
    methods: {
        changeBcg() {
            let color = this.$refs.bcgColorPicker.value;
            noteService.changeNoteBcg(this.note.id,color)
        },
        onDelete(){
            console.log('emit');
            this.$emit('del', this.note.id)
        },
        pinNote(){
            console.log('emit');  
            this.$emit('pinEv', this.note.id)
        },
        saveTxt(){
            // console.log('save',this.$refs.content.innerText);
            noteService.editNoteTxt(this.note.id, this.$refs.content.innerText);
        },
       

    },
    components: {

    }
};