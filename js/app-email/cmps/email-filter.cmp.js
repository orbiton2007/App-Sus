

export default {
    template:`
        <section class="filter-container">
            <div class="filter-input">
                <input type="text" placeholder="Search Email..." v-model="filter.txt" @keyup="emitFilter">
            </div>
        </section>
    `,
    data(){
        return{
            filter: {txt: ''}
        }
    },
    created(){

    },
    computed:{

    },
    methods:{
        emitFilter(){
            this.$emit('set-filter', this.filter)
        }
    }
}