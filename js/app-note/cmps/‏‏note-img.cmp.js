export default {

    template: `
    <section class="note note-img"> 
        <h3>NOTE IMAGE</h3>
        <p>
            <img :src="getImg"/>
            <!-- {{note.txt}} -->
        </p>
    </section>
    `,
    props: ['note'],
    data() {
        return {
            noteData: null
        }
    },
    created() {
        // noteData = note;
    },
    destroyed() {

    },
    computed: {
        getImg(){
            return this.note.img
        }
    },
    methods: {

    },
    components: {

    }
};