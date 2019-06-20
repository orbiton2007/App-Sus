import storageService from "./../../global/services/storage.service.js"
import noteService from "../services/notes-service.js"

export default {

    template: `
    <section class="note note-img"  :style="getStyle"> 
        <h3>NOTE IMAGE</h3>
        
        <img :src="getImg" />
            <!-- {{note.txt}} -->
        
        <!-- <input type="file" name="image"  @change.nativ="upload($event, noteIdx)"/>
        
        <canvas id="myCanvas" width="300" height="300"></canvas> -->
    <!-- <button @click="changeBcg()"></button> -->
    <input type="color" ref="bcgColorPicker" @change.nativ="changeBcg()"/>
    <button @click="deleteNote()" class="del-btn">X</button>
    </section>
    `,
    props: ['note'],
    data() {
        return {

        }
    },
    created() {

        // console.log(this.note.img);
        // let canvas = document.querySelector('#myCanvas');

        // let ctx = canvas.getContext("2d");
        // ctx.drawImage(this.note.img, 0, 0, 300,300);
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
        deleteNote(){
            noteService.del(this.note.id);
        },









        upload(ev, noteIdx) {
            let idx = noteIdx;
            this.isImg = true
            handleImageFromInput(ev, onImageUpload);

            function handleImageFromInput(ev, onImageReady) {
                var reader = new FileReader();

                reader.onload = function (event) {
                    var img = new Image();
                    img.onload = onImageReady.bind(null, img)
                    img.src = event.target.result;
                };
                reader.readAsDataURL(ev.target.files[0]);
            }

            function onImageUpload(img) {
                drawCanvas(img);

                noteService.getNotes()
                    .then((notes) => {

                        notes[idx].img = img;
                        console.log(notes[idx].img);

                        //improve: is there an option to get and save only 1 params instead of all array?
                        storageService.store('notes', notes)
                    })
            }

            function drawCanvas(img) {
                let canvas = document.querySelector('#myCanvas');

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, 300, 300);
            }
        },



    },
    components: {

    }
};

