import storageService from "../services/storage.service.js"
import noteService from "../services/notes-service.js"

export default {

    template: `
    <div class="grid-stack-item ui-draggable ui-resizable ui-resizable-autohide"
            :id="note.id"
            :data-gs-x="note.x" :data-gs-y="note.y"
            :data-gs-width="note.w" :data-gs-height="note.h"
            @click.nativ="updateLayout()">

        <div class="note note-txt grid-stack-item-content" :style="getStyle">
        <img src="../../img/pin2.png" class="pin" v-if="this.note.isPinned"/>

        <img @click.stop="onChangeBcg()" class="bcg-btn" src="../../img/color.png"/>
        <span class="title">Video Note</span>
        <button @click.stop="deleteNote()" class="del-btn">🗑️</button>
        <button @click.stop="pinNote()" class="pin-btn">📌</button>
        <br><br>
            
        <!-- make editable -->
        {{note.txt}}
        <iframe width="320" height="240" ref="vid"></iframe>

        
        <input type="color" ref="bcgColorPicker" class="input-color" @change.nativ="changeBcg()"/>
        </div>
    </div>
    `,
    props: ['note', 'idx'],
    data() {
        return {
            x: this.note.x,
            y: this.note.y,
            w: this.note.w,
            h: this.note.h,
        }
    },
    mounted() {
        this.$refs.bcgColorPicker.value = this.note.bcg
        let url = this.note.video;
            if (url.includes('youtube')){
                // console.log('youtube');
                // https://www.youtube.com/watch?v=wNLbP45aTO8
                //"https://www.youtube.com/embed/tgbNymZ7vqY"
                let fixed = url.substring(0,24) + 'embed/' +url.substring(24);
                // console.log(fixed);
                this.$refs.vid.src = fixed
            }else  this.$refs.vid.src = url

    },
    created() {

    },
    destroyed() {

    },
    computed: {
        getStyle(){
            return `background-image: linear-gradient(${this.note.bcg}, rgba(173, 216, 230, 0.6));`
        },

    },
    methods: {
        onChangeBcg(){
            this.$refs.bcgColorPicker.click();
        },
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
        updateLayout() {
            let el = document.getElementById(`${this.note.id}`).dataset;
            if (+el.gsWidth != this.w) {
                console.log('w changed');
                this.w = +el.gsWidth;
                noteService.saveW(this.note.id, this.w)
            }

            if (+el.gsHeight != this.h) {
                console.log('h changed');
                this.h = +el.gsHeight;
                noteService.saveH(this.note.id, this.h)
            }

            if (+el.gsX != this.x) {
                console.log('x changed');
                this.x = +el.gsX;
                noteService.saveX(this.note.id, this.x)

            }

            if (+el.gsY != this.y) {
                console.log('y changed');
                this.y = +el.gsY;
                noteService.saveY(this.note.id, this.y)

            }

            this.$emit('saveLayoutAll', true)

        },
 
    },
    components: {

    }
};

