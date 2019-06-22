'use strict'
import emailService from '../services/email-service.js'

export default {
    template: `
        <section v-if="email && show" class="email-details-container">
                <h2>{{email.name}}</h2>
            <div class="adress-date-img flex space-between">
                <div class="adress-date flex">
                    <span class="email">{{email.email}}</span>
                    <span class="date">{{email.sentAt}}</span>
                </div>
                <img class="icon-trash" @click="removeEmail(email.id)" src="css/email-css/images/trash.png">
            </div>

                <div class="subject-body">
                    <h3>{{email.subject}}</h3>
                    <p>{{email.body}}</p>
                </div>
                <button class="btn-close" @click="closeDetails">Close</button>
        </section>
    `,
    props: ['emailId'],
    data() {
        return {
            email: null,
            show: null
        }
    },
    created() {
        this.show = true
        emailService.getEmailById(this.emailId)
            .then(email => {
                this.email = email;
            })
    },
    computed: {

    },
    methods: {
        removeEmail(emailId) {
            emailService.removeEmail(emailId);
            this.email = null
        },
        closeDetails() {
            this.show = false
        }
    },
    components: {
    }
}