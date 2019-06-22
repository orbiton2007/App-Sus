import emailService from '../services/email-service.js'
import emailList from '../cmps/email-list.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import emailMenu from '../cmps/email-menu.cmp.js'
import emailCompose from '../cmps/email-compose.cmp.js'


export default {
    template: `
    <section v-if="emails" class="app-emails-container">
        <section class="filter-list-status-container">

            <button class="btn-menu-modal" @click="openMenu"><img class="icon-menu" src="css/email-css/images/menu.png"></button>
            <div v-if="modalMenu" class="moal-menu-div-container">
                <email-menu :emails="emails" @all-emails="showAllEmails" @emails-starred="showEmailsStarred" @show-modal="showModal" @emails-sent="showSent"></email-menu>
            </div>
            
            <div class="menu-div-container">
                <email-menu :emails="emails" @all-emails="showAllEmails" @emails-starred="showEmailsStarred" @show-modal="showModal" @emails-sent="showSent"></email-menu>
            </div>
            
            <div class="filter-list">
                
                <div class="filter-div-container">
                    <email-filter @set-filter="setFilter"></email-filter>
                </div>

                <div class="list-div-container">
                    <email-list :emails="emailsToShow"></email-list>
                </div>
            </div>

            <email-compose v-if="modalCompose" @close-modal="closeModal"></email-compose>

        </section>
    </section>
    `,
    data() {
        return {
            emails: null,
            filter: null,
            modalCompose: false,
            modalMenu: false
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
            this.modalMenu = false;
        },
        showEmailsStarred() {
            let emailsStarred = emailService.getEmailsStarred()
            this.filter = emailsStarred;
            this.modalMenu = false;
        },
        showModal() {
            this.modalCompose = true;
            this.modalMenu = false;
        },
        closeModal(){
            this.modalCompose = false;
        },
        showSent(){
           let emailsSent = emailService.getEmailsSent()
           this.filter = emailsSent;
           this.modalMenu = false;
        },
        openMenu(){
            this.modalMenu = !this.modalMenu;
        }
    },
    components: {
        emailList,
        emailFilter,
        emailMenu,
        emailCompose
    }
}