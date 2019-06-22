import storageService from "../services/storage.service.js"
import noteService from "../services/notes-service.js"

export default {

    template: `
    <section class="note note-video"  :style="getStyle"> 
        <h3>NOTE VIDEO</h3>
        
        <iframe width="320" height="240" ref="vid"></iframe>
            {{note.txt}}
        
        <input type="color" ref="bcgColorPicker" @change.nativ="changeBcg()"/>
        <button @click="deleteNote()" class="del-btn">🗑️</button>
        <button @click="pinNote()" class="pin-btn">📌</button>

    </section>
    `,
    props: ['note', 'idx'],
    data() {
        return {

        }
    },
    mounted() {
        this.$refs.bcgColorPicker.value = this.note.bcg
        let url = this.note.video;
            if (url.includes('youtube')){
                console.log('youtube');
                // https://www.youtube.com/watch?v=wNLbP45aTO8
                //"https://www.youtube.com/embed/tgbNymZ7vqY"
                let fixed = url.substring(0,24) + 'embed/' +url.substring(24);
                console.log(fixed);
                this.$refs.vid.src = fixed
            }else  this.$refs.vid.src = url

    },
    created() {

    },
    destroyed() {

    },
    computed: {
        getStyle(){
            return `background-color:${this.note.bcg}`
        },
        // getId(){
        //     console.log('id:',this.note.id);
            
        //     return this.note.id
        // }
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
        getVideo() {
            let url = this.note.video;
            if (url.includes('youtube')){
                console.log('youtube');
                // https://www.youtube.com/watch?v=wNLbP45aTO8
                //"https://www.youtube.com/embed/tgbNymZ7vqY"
                let fixed = url.substring(0,24) + 'embed/' +url.substring(24);
                console.log(fixed);
                return fixed
            }else return url

            // return this.note.video;
        },


    },
    components: {

    }
};

