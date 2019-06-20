'use strict'
import emailService from '../services/email-service.js'

export default {
    template:`
        <section v-if="email" class="details-container">
            <h2>{{email.name}}</h2>
            <p>{{email.subject}} <span>{{email.sentAt}}</span></p>
            <p>{{email.body}}</p>
        </section>
    `,
    data(){
        return{
            email: null
        }
    },
    created(){
        let emailId = this.$route.params.emailId;
        this.email = emailService.getEmailById(emailId)
    },
    computed:{

    },
    methods:{

    }

}