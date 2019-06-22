import emailService from '../services/email-service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailMenu from '../cmps/email-menu.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'


export default {
    template: `
    <section v-if="emails" class="app-emails-container">
        <section class="filter-list-status-container">

            <div class="menu-div-container">
                <email-menu :emails="emails" @all-emails="showAllEmails" @emails-starred="showEmailsStarred" @show-modal="showModal"></email-menu>
            </div>
<div class="filter-list">

    <div class="filter-div-container">
        <email-filter @set-filter="setFilter"></email-filter>
    </div>

    <div class="list-div-container">
        <email-list :emails="emailsToShow"></email-list>
    </div>
</div>

            <email-compose v-if="modal" @close-modal="closeModal"></email-compose>

        </section>
    </section>
    `,
    data() {
        return {
            emails: null,
            filter: null,
            modal: false
        }
    },
    created() {
        emailService.query()
            .then(emails => {
                this.emails = emails;
            })
    },
    computed: {
        emailsToShow() {
            if (this.filter) {
                if (Array.isArray(this.filter)) return this.filter
                else if (this.filter.txt) {
                    return this.emails.filter(email => {
                        if (email.subject.toLowerCase().includes(this.filter.txt.toLowerCase()) || email.name.toLowerCase().includes(this.filter.txt.toLowerCase())) return email;
                    })
                }
                else if (this.filter.readed) {
                    return this.emails.filter(email => {
                        if (email.isRead) return email;
                    })
                }
                else if (this.filter.unread) {
                    return this.emails.filter(email => {
                        if (!email.isRead) return email;
                    })
                }
                else if (this.filter.all) return this.emails;
                else return this.emails;
            }
            else return this.emails;
        }
    },
    methods: {
        setFilter(filter) {
            this.filter = filter;
        },
        showAllEmails() {
            this.filter = this.emails;
        },
        showEmailsStarred() {
            let emailsStarred = emailService.getEmailsStarred()
            this.filter = emailsStarred;
        },
        showModal() {
            this.modal = true;
        },
        closeModal(){
            this.modal = false;
        }
    },
    components: {
        emailList,
        emailFilter,
        emailMenu,
        emailCompose
    }
}