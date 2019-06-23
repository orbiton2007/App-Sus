import utilService from "./../../global/services/util.service.js"
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
            <span class="title">Text Note</span>
            <button @click.stop="onDelete()" class="del-btn">🗑️</button>
            <button @click.stop="pinNote()" class="pin-btn">📌</button>
            <br>
            <br>

            <!-- <textarea ref="area" v-model="editable" cols="30" rows="8" @input.nativ="save()" name="getName"></textarea> -->
            <!-- onclick='$(this).focus();' -->
            <p contenteditable="true" @input.nativ="saveTxt()" ref="content">
                {{note.txt}}
            </p>        

            <input type="color" ref="bcgColorPicker" class="input-color" @change.nativ="changeBcg()"/>
        </div>
    </div>

    `,
    props: ['note'],
    data() {
        return {
            x: this.note.x,
            y: this.note.y,
            w: this.note.w,
            h: this.note.h,
        }
    },
    created() {
        // console.log('created emit');
        // this.$emit('x', 4)  

    },
    mounted() {
        this.$refs.bcgColorPicker.value = this.note.bcg;

    },
    computed: {
        getStyle() {
            return `background-image: linear-gradient(${this.note.bcg}, rgba(173, 216, 230, 0.6));`
        },

    },
    methods: {
        onChangeBcg(){
            this.$refs.bcgColorPicker.click();
        },
        changeBcg() {
            let color = this.$refs.bcgColorPicker.value;
            noteService.changeNoteBcg(this.note.id, color)
        },
        onDelete() {
            console.log('emit');
            this.$emit('del', this.note.id)
        },
        pinNote() {
            console.log('emit');
            this.$emit('pinEv', this.note.id)
        },
        saveTxt() {
            // console.log('save',this.$refs.content.innerText);
            console.log(this.$refs.content.innerText);
            
            noteService.editNoteTxt(this.note.id, this.$refs.content.innerText);
        },
        updateLayout() {

            let el = document.getElementById(`${this.note.id}`).dataset;
            console.log('layout', +el.gsX, this.x);

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
