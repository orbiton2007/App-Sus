import emailService from '../services/email-service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'

export default {
    template: `
    <section v-if="emails" class="emails-container">
        <h1>App Email</h1>
        <h3 class="unread-email">Not Read Yet => {{unReadEmails}} </h3>
        <email-filter @set-filter="setFilter"></email-filter>
        <email-list :emails="emailsToShow"></email-list>
        
    </section>
    `,
    data() {
        return {
            emails: null,
            filter: null
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails;
            })
    },
    computed:{
        unReadEmails(){
            return emailService.getEmailsUnreadedCount(this.emails)
        },
        emailsToShow(){
            if(!this.filter) return this.emails;
            let emails = this.emails.filter(email => {
                if(email.subject.toLowerCase().includes(this.filter.txt.toLowerCase()) || email.name.toLowerCase().includes(this.filter.txt.toLowerCase())) return email;
            })
            return emails;
        }
    },
    methods:{
        setFilter(filter){
            this.filter = filter;
        }
    },
    components:{
        emailList,
        emailFilter
    }
}