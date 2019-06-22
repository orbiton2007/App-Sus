import storageService from '../../global/services/storage.service.js'
import utilService from '../../global/services/util.service.js'

export default {
    query,
    getEmailsUnreadedCount,
    getEmailById,
    removeEmail,
    saveToStorage,
    getEmailsStarred,
    createEmail
}

const EMAILS_KEY = 'emails';
var emailsDB;

function query() {
    var emails;
    return storageService.load(EMAILS_KEY)
        .then(res => {
            if (!res) {
                emails = generateEmails();
                emailsDB = emails;
                storageService.store(EMAILS_KEY, emailsDB)
                return emailsDB
            } else {
                emailsDB = res;
                storageService.store(EMAILS_KEY, emailsDB)
                return emailsDB
            }
        })
}

function generateEmails() {
    return [
        { id: utilService.makeId(), name: 'Ran', email: 'ran@blala.com', subject: 'Wassap with Vue?', body: 'fffffffff', isRead: false, isFavorite: false, sentAt: grtTime() },
        { id: utilService.makeId(), name: 'Vico', email: 'vico@blala.com',subject: 'Hey bro', body: 'ffffffffffff', isRead: false, isFavorite: false, sentAt: grtTime() },
        { id: utilService.makeId(), name: 'Yonatan', email: 'yonatan@blala.com',subject: 'Wassap with you?', body: 'fffffffffff', isRead: false, isFavorite: false, sentAt: grtTime() },
        { id: utilService.makeId(), name: 'Michael', email: 'michael@blala.com',subject: 'Hello my friend', body: 'ffffffffffffff', isRead: false, isFavorite: false, sentAt: grtTime() },
        { id: utilService.makeId(), name: 'Yaron', email: 'yaron@blala.com',subject: 'Hello my friend', body: 'ffffffffffff', isRead: false, isFavorite: false, sentAt: grtTime() },
        { id: utilService.makeId(), name: 'Tal', email: 'tal@blala.com',subject: 'Hello my friend', body: 'ffffffffffff', isRead: false, isFavorite: false, sentAt: grtTime() },
    ]
}

function createEmail(email){
   let newEmail = 
   { 
       id: utilService.makeId(), 
       name: email.name, 
       email: email.address, 
       subject: email.subject, 
       body: email.body, 
       isRead: false, 
       isFavorite: false, 
       sentAt: grtTime() 
    }
    emailsDB.unshift(newEmail);
    storageService.store(EMAILS_KEY, emailsDB);
}

function getEmailsUnreadedCount(emails) {
    let unreadedEmails = emails.filter(email => {
        if (!email.isRead) return email;
    })
    return unreadedEmails.length;
}

function getEmailById(emailId) {
    let email = emailsDB.find(email => {
        if (email.id === emailId) return email
    })
    return Promise.resolve(email)
}

function removeEmail(emailId) {
    let emailIdx = emailsDB.findIndex(email => {
        return email.id === emailId;
    })
    emailsDB.splice(emailIdx, 1);
    storageService.store(EMAILS_KEY, emailsDB);
}

function getEmailsStarred(){
    let emails = emailsDB.filter(email=>{
        if(email.isFavorite) return email;
    })
    return emails;
}

function grtTime(){
    let minutes = new Date().getMinutes();
    let hour = new Date().getHours();
    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let date = '\xa0\xa0' + day + '.' + month + '.' + year;
    let time = (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + date;
    return time;
}

function saveToStorage() {
    storageService.store(EMAILS_KEY, emailsDB);
}