

export default {
    template:`
        <section class="filter-container">
            <div class="filter-input">
                <input type="text" placeholder="Search Email..." v-model="filter.txt" @keyup="emitFilter">
            </div>
            <div class="read-unread-btns">
                <button @click="emitFilterReaded">Readed</button>
                <button @click="emitFilterUnreaded">Unread</button>
            </div>
        </section>
    `,
    data(){
        return{
            filter: {txt: '', readed: false, unread: false}
        }
    },
    created(){

    },
    computed:{

    },
    methods:{
        emitFilter(){
            this.$emit('set-filter', this.filter)
        },
        emitFilterReaded(){
            this.filter.readed = true;
            this.$emit('set-filter', this.filter)
            this.filter.unread = false;
        },
        emitFilterUnreaded(){
            this.filter.unread = true;
            this.$emit('set-filter', this.filter)
            this.filter.readed = false;
        }
    }
}