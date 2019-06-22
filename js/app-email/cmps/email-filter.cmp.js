

export default {
    template:`
        <section class="email-filter-container flex">
            <div class="filter-btns">
                <button @click="emitFilterAll">All</button>
                <button @click="emitFilterReaded">Readed</button>
                <button @click="emitFilterUnreaded">Unread</button>
            </div>
            <div class="filter-input">
                <input type="text" placeholder="Search Email..." v-model="filter.txt" @keyup="emitFilter">
            </div>
        </section>
    `,
    data(){
        return{
            filter: {txt: '', readed: false, unread: false, all: false}
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
            this.filter.unread = false;
            this.filter.all = false;
            this.$emit('set-filter', this.filter)
        },
        emitFilterUnreaded(){
            this.filter.unread = true;
            this.filter.readed = false;
            this.filter.all = false;
            this.$emit('set-filter', this.filter)
        },
        emitFilterAll(){
            this.filter.all = true;
            this.filter.readed = false;
            this.filter.unread = false;
            this.$emit('set-filter', this.filter)
        }
    }
}