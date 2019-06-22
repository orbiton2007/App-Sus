import emailService from '../services/email-service.js'

export default {
    template: `
    <section class=status-container> 
        <div class="compose-link" @click="goCompose">
            <h2 >+Compose</h2>
        </div>
        <div @click="goInbox" class="div-unread-email">
            <h3 class="unread-email"> Inbox <span class="unread-count">{{unReadEmails}} Unread</span></h3>
        </div>
        <div @click="showFavorites" class="div-starred">
            <h3 class="starred" > Starred <img class="icon-star" src="css/email-css/images/favourites.png"></h3>
        </div>
    </section>
`,
    props: ['emails'],
    data() {
        return {};
    },
    created() {

    },
    computed: {
        unReadEmails() {
            return emailService.getEmailsUnreadedCount(this.emails)
        },
    },
    methods: {
        goInbox(){
            this.$emit('all-emails');
        },
        showFavorites(){
            this.$emit('emails-starred')
        },
        goCompose(){
            this.$emit('show-modal')
        }
    },
};