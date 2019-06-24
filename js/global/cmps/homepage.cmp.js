
export default {
    template:`
    <section class="sec-home-container">
       
        <div class="imgs-home flex space-around">
            <h1 class="hinge">AppSus</h1>
            <!-- <img class="img-mail" @click="goMail" src="css/email-css/images/emailmenu.png">
            <img class="img-note" @click="goNote" src="css/email-css/images/document.png"> -->
        </div>

    </section>
    `,
    methods:{
        goMail(){
            this.$router.push('/emails')
        },
        goNote(){
            this.$router.push('/notes')
        }
    }
}