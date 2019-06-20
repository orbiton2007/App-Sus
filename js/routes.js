import homepageCmp from './global/cmps/homepage.cmp.js'
import appEmail from './app-email/pages/app-email.cmp.js'
import appNote from './app-note/pages/app-note.cmp.js'
import emailDetail from './app-email/pages/email-details.cmp.js'

export default [
    { path: '/', component: homepageCmp },
    { path: '/emails', component: appEmail },
    { path: '/notes', component: appNote },
    { path: '/email/:emailId', component: emailDetail },
]