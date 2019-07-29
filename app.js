const express = require ('express')
const bodyParser = require ('body-parser')
const path = require ('path');
const exphbs = require ('express-handlebars')
const nodemailer = require ('nodemailer')

const app = express();

//view engine - responsible for rendering the view from the 'views folder' (what we creats) into html form to the browser.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars'); //setting view engine as handlebars

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//static folder (public)
app.use(express.static("views")); //shows where the static files are located, (dirname - current folder)

app.post('/contact', (req, res)=>{
    //creating a string which will be passed along with the data in the fields to the specified email
    const output = `
    <p>you have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>`;

        // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.abhitheprogrammer.com",
        port: 465,
        secure: true,
        auth: {
        user: 'abhinav@abhitheprogrammer.com', // generated ethereal user
        pass: 'abhinav@reddy' // generated ethereal password
        }
    });

    // send mail with defined transport object
     transporter.sendMail({
        from: 'abhinav@abhitheprogrammer.com', // sender address
        to: "abhinav.edulakanti@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: output, // plain text body
        html: output
    }).then((info)=> console.log(info.messageId)).catch((err)=>console.log(err));
    res.send("success")
});

const port = process.env.PORT || 3000;

app.listen (port);