import emailPreview from '../cmps/email-preview.cmp.js'

export default {
    template:`
        <section class="list-emails">
            <ul v-for="email in emails">
                <email-preview :email="email"></email-preview>
            </ul>
        </section>
    `,
    props:['emails'],
    components:{
        emailPreview
    }

}