import storageService from "../services/storage.service.js"
import noteService from "../services/notes-service.js"

export default {

    template: `

        <div class="note note-video" :id="note.id" @mousedown.nativ.stop.prevent="dragStart($event)" @mouseup.nativ.stop.prevent="dragEnd($event)"
            :style="getGrid">
        <img src="img/Pin2.png" class="pin" v-if="this.note.isPinned"/>

        <img @click.stop="onChangeBcg()" class="bcg-btn" src="img/color.png"/>
        <span class="title">Video Note</span>
        <button @click.stop="deleteNote()" class="del-btn">🗑️</button>
        <button @click.stop="pinNote()" class="pin-btn">📌</button>
        <br><br>
            
        <p contenteditable="true" :class="getClassP" @click.nativ.stop="focusP()" @focusout.nativ="saveTxt()" ref="content">
                {{note.txt}}
            </p> 
        <iframe width="320" height="240" ref="vid"></iframe>

        
        <input type="color" ref="bcgColorPicker" class="input-color" @change.nativ="changeBcg()"/>
        </div>
    `,
    props: ['note', 'idx'],
    data() {
        return {
            clickedX: null,
            clickedY: null,
            diffX: null,
            diffY: null,
            el: null
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
        getGrid() {
            return `grid-column-start: ${this.note.x}; grid-row-start: ${this.note.y};background-image: linear-gradient(${this.note.bcg}, rgba(173, 216, 230, 0.6));`
        },
        getClassP(){
            return `${this.note.id}p`
        }

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
        focusP(){
            document.querySelector(`.${this.note.id}p`).focus();
        },
        dragStart(ev) {
            // console.log('drag start', ev);

            this.el = document.getElementById(`${this.note.id}`);
            this.clickedX = ev.clientX;
            this.clickedY = ev.clientY;
            this.el.addEventListener('mousemove', this.move);
            this.el.style.zIndex='100';
            this.el.style.cursor='move';


        },
        move(ev) {
            this.diffX = (this.clickedX - ev.clientX);
            this.diffY = (this.clickedY - ev.clientY);

            if (this.diffX < 0 && this.diffY < 0) this.el.style.transform = `translate3d(${this.diffX * -1}px,${this.diffY * -1}px, 0)`;
            if (this.diffX < 0 && this.diffY > 0) this.el.style.transform = `translate3d(${this.diffX * -1}px,-${this.diffY}px, 0)`;
            if (this.diffX > 0 && this.diffY > 0) this.el.style.transform = `translate3d(-${this.diffX}px,-${this.diffY}px, 0)`;
            if (this.diffX > 0 && this.diffY < 0) this.el.style.transform = `translate3d(-${this.diffX}px,${this.diffY * -1}px, 0)`;
            let griddDiffY = Math.round(this.diffY / 15);
            let start = +this.el.style.gridRowStart + griddDiffY;
                if (start < 0) {
                    this.dragEnd();
                }
        },
        dragEnd(ev) {
              // console.log('drag end', ev);
              this.el.removeEventListener('mousemove', this.move);
              this.el.style.zIndex = 'unset';
              this.el.style.cursor = 'unset';
  
              if (this.diffX == 0) return;
  
              if (this.diffX < 0) {
                  let griddDiffX = Math.round(this.diffX / 15) * -1;
                  let start = +this.el.style.gridColumnStart + griddDiffX;
                  if (start < 0) {
                      start = 0;
                      griddDiffX=0
                  }
  
                  this.el.style.gridColumnStart = start;
                  noteService.saveX(this.note.id, griddDiffX);
                  this.el.style.transform = `translate3d(0px,0px, 0)`;
              } else if (this.diffX > 0) {
                  let griddDiffX = Math.round(this.diffX / 15);
                  let start = +this.el.style.gridColumnStart - griddDiffX;
                  if (start < 0) {
                      start = 0;
                      griddDiffX=0
                  }
  
                  this.el.style.gridColumnStart = start;
                  noteService.saveX2(this.note.id, griddDiffX);
                  this.el.style.transform = `translate3d(0px,0px, 0)`;
              }
  
              if (this.diffY < 0) {
                  let griddDiffY = Math.round(this.diffY / 15) * -1;
                  let start = +this.el.style.gridRowStart + griddDiffY;
                  if (start < 0) {
                      start = 0;
                      griddDiffY=0
                  }
  
                  this.el.style.gridRowStart = start;
                  noteService.saveY(this.note.id, griddDiffY);
                  this.el.style.transform = `translate3d(0px,0px, 0)`;
              } else if (this.diffY > 0) {
                  let griddDiffY = Math.round(this.diffY / 15);
                  let start = +this.el.style.gridRowStart - griddDiffY;
                  if (start < 0) {
                      start = 0;
                      griddDiffY=0
                  }
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

