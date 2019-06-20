import storageService from '../../global/services/storage.service.js'
import utilService from '../../global/services/util.service.js'

export default {
    query,
    getEmailsUnreadedCount,
    getEmailById,
    removeEmail
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
    let minutes = new Date().getMinutes()
    let hour = new Date().getHours()
    let time = (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes);
    return [
        { id: utilService.makeId(), name: 'Ran', subject: 'Wassap with Vue?', body: 'fffffffffffffffffffffffffffffffff', isRead: false, sentAt: time },
        { id: utilService.makeId(), name: 'Vico', subject: 'Hey bro', body: 'fffffffffffffffffffffffffffffffff', isRead: false, sentAt: time },
        { id: utilService.makeId(), name: 'Yonatan', subject: 'Wassap with you?', body: 'fffffffffffffffffffffffffffffffff', isRead: false, sentAt: time },
        { id: utilService.makeId(), name: 'Michael', subject: 'Hello my friend', body: 'fffffffffffffffffffffffffffffffff', isRead: false, sentAt: time },
    ]
}

function getEmailsUnreadedCount(emails) {
    let unreadedEmails = emails.filter(email => {
        if (!email.isRead) return email;
    })
    return unreadedEmails.length;
}

function getEmailById(emailId) {
    return emailsDB.find(email => {
        if (email.id === emailId) return email
    })
}

function removeEmail(emailId) {
    let emailIdx = emailsDB.findIndex(email => {
        return email.id === emailId;
    })
    emailsDB.splice(emailIdx, 1);
    storageService.store(EMAILS_KEY, emailsDB);
}