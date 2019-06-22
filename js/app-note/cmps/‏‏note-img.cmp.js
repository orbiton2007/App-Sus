import storageService from "../services/storage.service.js"
import noteService from "../services/notes-service.js"

export default {

    template: `
    <section class="note note-img"  :style="getStyle"> 
        <h3>NOTE IMAGE</h3>
        
        <img :src="getImg" />
            {{note.txt}}
        
        <input type="color" ref="bcgColorPicker" @change.nativ="changeBcg()"/>
        <button @click="deleteNote()" class="del-btn">🗑️</button>
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
    created() {

    },
    destroyed() {

    },
    computed: {
        getImg() {
            return this.note.img;
        },
        getStyle(){
            return `background-color:${this.note.bcg}`
        }
    },
    methods: {

        changeBcg() {
            let color = this.$refs.bcgColorPicker.value;
            noteService.changeNoteBcg(this.note.id,color)
        },
        pinNote(){
            console.log('emit');  
            this.$emit('pinEv', this.note.id)
        },
        deleteNote(){
            this.$emit('del', this.note.id)
        },



    },
    components: {

    }
};

