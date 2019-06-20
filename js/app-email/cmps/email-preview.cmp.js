import emailService from "../services/email-service.js";


export default {
    template:`
            <li :class="isEmailReaded">
                <div class="preview-details" @click="getDetails(email)">
                    <span>{{email.name}}</span>
                    <span>{{email.subject}}</span>
                    <span>{{email.sentAt}}</span>
                </div>
                <div class="icon-readed"><img @click="markReaded(email)" :src="image" width="20"></div>
                <div><button @click="removeEmail(email.id)">X</button></div>
            </li>
    `,
    props:['email'],
    data(){
        return{
            isEmailReaded: 'unread',
            image: 'css/email-css/images/envelope.png'
        }
    },
    created(){
        
    },
    computed:{
    },
    methods:{
        getDetails(email){
            console.log('readedddddd', email);
            email.isRead = true;
            this.isEmailReaded = 'readed'
            this.$router.push(`/email/${email.id}`)
        },
        removeEmail(emailId){
            emailService.removeEmail(emailId)
        },
        markReaded(email){
            this.image = 'css/email-css/images/email.png';
            email.isRead = true;
            this.isEmailReaded = 'readed'
        }
    }
    
}