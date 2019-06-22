import utilService from "./../../global/services/util.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `
    <div class="note note-txt grid-stack-item-content" disableDrag ="true" :style="getStyle">
        <h3>NOTE TXT</h3>
        <!-- <textarea ref="area" v-model="editable" cols="30" rows="8" @input.nativ="save()" name="getName"></textarea> -->
        <img src="../../img/pin2.png" class="pin" v-if="this.note.isPinned"/>
        <!-- onclick='$(this).focus();' -->
        <p contenteditable="true" @input.nativ="saveTxt()" ref="content">
            {{note.txt}}
        </p>

        <input type="color" ref="bcgColorPicker" @change.nativ="changeBcg()"/>
        <button @click="onDelete()" class="del-btn">🗑️</button>
        <button @click="pinNote()" class="pin-btn">📌</button>
        

    </div>
    `,
    props: ['note'],
    data() {
        return {
        }
    },
    created(){
        // console.log('created emit');
        // this.$emit('x', 4)  
         
    },
    mounted() {
        this.$refs.bcgColorPicker.value = this.note.bcg;
        
    },
    computed: {
        getStyle(){
            return `background-image: linear-gradient(${this.note.bcg}, rgba(173, 216, 230, 0.6));`
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
