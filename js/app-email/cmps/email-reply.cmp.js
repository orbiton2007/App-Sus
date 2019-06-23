

export default {
    template:`
    <section>  
        <div class="replies-container">
            <ul v-if="replies" v-for="(reply, idx) in replies">
                <li>Reply {{idx+1}}: {{reply}}</li>
            </ul>
        </div>
        <div class="reply-container">
            <form class="form-reply flex column" @submit.prevent="sendReply">
                <label>Reply to: {{email.email}}</label>
                <textarea v-model="txt" cols="40" rows="12"></textarea>
                <button>Send</button>
            </form>
        </div>
    </section>
    `,
    data(){
        return{
            replies: [],
            txt: ''
        }
    },
    props:['email'],
    methods:{
        sendReply(){
            this.replies.push(this.txt)
            this.txt = ''
        }
    }
}