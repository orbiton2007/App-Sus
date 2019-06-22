import emailService from '../services/email-service.js';
import emailDetails from './email-details.cmp.js'

export default {
    template: `
    <div class="div-email-preview-container flex column">
            <li :class="isEmailReaded">
                <div class="flex space-between">
                    <div class="div-star-details flex">
                        <span><img class="icon-star" @click="markFavorite(email)" :src="favorite"></span>
                        <div @click="getDetails(email)" class="preview-details flex space-between">
                            <span>{{email.name}}</span>
                            <span>{{email.subject}}</span>
                            <span class="date">{{email.sentAt}}</span>
                        </div>
                    </div>
                    <div class="flex email-imgs-preview">
                        <div><img class="icon-readed" @click="markReaded(email)" :src="image"></div>
                        <div><img class="icon-trash" src="css/email-css/images/trash.png" @click="removeEmail(email.id)"></div>
                    </div>
                </div>
            </li>
            <div>
                <email-details v-if="show" :emailId="emailId"></email-details>
            </div>
    </div>
    `,
    props: ['email'],
    data() {
        return {
            emailId: '',
            show: false
        }
    },
    created() {
    },
    computed: {
        isEmailReaded(){
            return this.email.isRead ? 'readed' : 'unread'
        },
        favorite(){
            return this.email.isFavorite ? 'css/email-css/images/favourites.png' : 'css/email-css/images/white-star.png'
        },
        image(){
            return this.email.isRead ? 'css/email-css/images/mail.png' : 'css/email-css/images/mail-unread.png'
        }
    },
    methods: {
        getDetails(email) {
                this.show = !this.show
                this.emailId = email.id 
                email.isRead = true;
                emailService.saveToStorage()
        },
        removeEmail(emailId) {
            emailService.removeEmail(emailId)
        },
        markReaded(email) {
            email.isRead = !email.isRead;
            emailService.saveToStorage()
        },
        markFavorite(email){
            email.isFavorite = !email.isFavorite;
            emailService.saveToStorage();
        }
    },
    components:{
        emailDetails
    }

}