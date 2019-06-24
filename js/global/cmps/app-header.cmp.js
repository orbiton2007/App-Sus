

export default {
    template: `
        <section class="header-container">
            <div>
                <img class="icon-burger" src="css/email-css/images/burger.png" @click="toggleMenu">
                <img class="header-btn-burger" :class="{'icon-homepage': showMenu}" @click="goHome" src="css/email-css/images/homepage.png">
                <img class="header-btn-burger" :class="{'icon-email': showMenu}" @click="goMail" src="css/email-css/images/emailmenu.png">
                <img class="header-btn-burger" :class="{'icon-note': showMenu}" @click="goNote" src="css/email-css/images/document.png">
            </div>
        </section>
    `,
    data() {
        return {
            showMenu: false
        }
    },computed:{
        
    },
    methods:{
        toggleMenu(){
            this.showMenu = !this.showMenu;
        },
        goHome(){
            this.$router.push('/')
        },
        goMail(){
            this.$router.push('/emails')
        },
        goNote(){
            this.$router.push('/notes')
        }
    }
}