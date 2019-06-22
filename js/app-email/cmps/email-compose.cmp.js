import emailService from '../services/email-service.js'

export default {
    template: `
        <section class="sec-compose">
            <form class="form" @submit.prevent="sendEmail">
                <button class="btn-close" @click="closeModal">X</button>
                <h3>New Message</h3>
                <p><input type="text" placeholder="Enter Name" v-model="newEmail.name" autofocus required></p>
                <p><input type="email" placeholder="Email Address" v-model="newEmail.address" required></p>
                <p><input type="text" placeholder="Subject" v-model="newEmail.subject" required></p>
                <p><textarea cols="60" rows="17" v-model="newEmail.body"></textarea></p>
                <button>Send</button>
            </form>
        </section>
    `,
    data() {
        return {
            newEmail: { name: '', address: '', subject: '', body: '' }
        }
    },
    created() {
    },
    methods: {
        closeModal() {
            this.$emit('close-modal')
        },
        sendEmail() {
            emailService.createEmail(this.newEmail);
            this.$emit('close-modal')
        }
    }
}