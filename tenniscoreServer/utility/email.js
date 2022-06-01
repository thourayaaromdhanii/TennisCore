const nodemailer = require ('nodemailer');
user :'postmaster@sandbox0a3f3e97bea24546948f82a7f084720e.mailgun.org'
pass:'f46b5c4275cc468f11399b517d1ad095-9a235412-c8d7746f'
const transport = nodemailer.createTransport({
    service: 'Mailgun',
    auth : {
        user: 'postmaster@cryptopetty.com',
        pass: '3e889345ec33e362f05032b26105d8f4-a2b91229-dea0e434'
    },
    tls: {
       rejectunauthorized: false
    }
});
module.exports = {
    sendEmail(from, to , subject, html) {
        return p = new Promise((resolve, reject ) => {
            transport.sendMail({from, to , subject, html}, (err, info) => {
                if (err) return reject(err);
                resolve(info);  
            });
        });
    }
}
