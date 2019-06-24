import utilService from "./../../global/services/util.service.js"
import noteService from "../services/notes-service.js"


export default {

    template: `

        <div class="note note-txt" :id="note.id" @mousedown.nativ.stop="dragStart($event)" @mouseup.nativ.stop="dragEnd($event)"
            :style="getGrid">
            <img src="img/pin2.png" class="pin" v-if="this.note.isPinned"/>

            <img @click.stop="onChangeBcg()" class="bcg-btn" src="img/color.png"/>
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
   

    `,
    props: ['note'],
    data() {
        return {
            clickedX: null,
            clickedY: null,
            diffX: null,
            diffY: null,
            el: null
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
        getGrid() {
            return `grid-column-start: ${this.note.x}; grid-row-start: ${this.note.y};background-image: linear-gradient(${this.note.bcg}, rgba(173, 216, 230, 0.6)); `
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
        dragStart(ev) {
            console.log('drag start', ev);

            this.el = document.getElementById(`${this.note.id}`);
            this.clickedX = ev.clientX;
            this.clickedY = ev.clientY;
            this.el.addEventListener('mousemove', this.move);
            this.el.style.zIndex='100';

        },
        move(ev) {
            this.diffX = (this.clickedX - ev.clientX);
            this.diffY = (this.clickedY - ev.clientY);

            if (this.diffX < 0 && this.diffY < 0) this.el.style.transform = `translate3d(${this.diffX * -1}px,${this.diffY * -1}px, 0)`;
            if (this.diffX < 0 && this.diffY > 0) this.el.style.transform = `translate3d(${this.diffX * -1}px,-${this.diffY}px, 0)`;
            if (this.diffX > 0 && this.diffY > 0) this.el.style.transform = `translate3d(-${this.diffX}px,-${this.diffY}px, 0)`;
            if (this.diffX > 0 && this.diffY < 0) this.el.style.transform = `translate3d(-${this.diffX}px,${this.diffY * -1}px, 0)`;
        },
        dragEnd(ev) {
            console.log('drag end', ev);
            this.el.removeEventListener('mousemove', this.move)
            this.el.style.zIndex='unset';

            if (this.diffX == 0) return;

            if (this.diffX < 0) {
                let griddDiffX = Math.round(this.diffX / 10) * -1;
                let start = +this.el.style.gridColumnStart + griddDiffX;
                this.el.style.gridColumnStart = start;

                noteService.saveX(this.note.id, griddDiffX);
                this.el.style.transform = `translate3d(0px,0px, 0)`;
            } else if (this.diffX > 0) {
                let griddDiffX = Math.round(this.diffX / 10);
                let start = +this.el.style.gridColumnStart - griddDiffX;
                this.el.style.gridColumnStart = start;

                noteService.saveX2(this.note.id, griddDiffX);
                this.el.style.transform = `translate3d(0px,0px, 0)`;
            }

            if (this.diffY < 0) {
                let griddDiffY = Math.round(this.diffY / 10) * -1;

                let start = +this.el.style.gridRowStart + griddDiffY;
                this.el.style.gridRowStart = start;

                noteService.saveY(this.note.id, griddDiffY);
                this.el.style.transform = `translate3d(0px,0px, 0)`;
            } else if (this.diffY > 0) {
                let griddDiffY = Math.round(this.diffY / 10);
                let start = +this.el.style.gridRowStart - griddDiffY;
                this.el.style.gridRowStart = start;

                noteService.saveY2(this.note.id, griddDiffY);
                this.el.style.transform = `translate3d(0px,0px, 0)`;
            }
            this.clickedX = null;
            this.clickedY = null;
            this.diffX = 0;
            this.diffY = 0;
        }

    },
    components: {

    }
};
