import storageService from "../services/storage.service.js"
import noteService from "../services/notes-service.js"

export default {

    template: `
    <div class="note note-img grid-stack-item-content" :style="getStyle"> 
        <h3>NOTE IMAGE</h3>
        
        <img src="../../img/pin2.png" class="pin" v-if="this.note.isPinned"/>
        <img :src="getImg" />
            <!-- {{note.txt}} -->
        <br>
        
        <input type="color" ref="bcgColorPicker" @change.nativ="changeBcg()"/>
        <button @click="deleteNote()" class="del-btn">🗑️</button>
        <button @click="pinNote()" class="pin-btn">📌</button>

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
    created() {

    },
    destroyed() {

    },
    computed: {
        getImg() {
            return this.note.img;
        },
        getStyle(){
            // console.log(this.note.bcg);
            // background-color:${this.note.bcg}; 
            return `background-image: linear-gradient(${this.note.bcg}, rgba(173, 216, 230, 0.6));`
        }
    },
    methods: {

        changeBcg() {
            let color = this.$refs.bcgColorPicker.value;
            noteService.changeNoteBcg(this.note.id,color)
        },
        pinNote(){
            console.log('emit');  
            this.$emit('pinEv', this.note.id);

        },
        deleteNote(){
            this.$emit('del', this.note.id)
        },



    },
    components: {

    }
};

