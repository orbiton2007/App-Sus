import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    template:`
        <section class="list-emails">
            <ul>
                <email-preview :email="email" v-for="email in emails"></email-preview>
            </ul>
        </section>
    `,
    props:['emails'],
    components:{
        emailPreview
    }
}