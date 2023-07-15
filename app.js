const express = require("express");
const hbs = require("hbs");
const path = require("path");
const app = express();
const multer = require('multer');


require("./src/db/conn");
const signup = require("./src/models/signups");
const submition = require("./src/models/submitions");
const { clearScreenDown } = require("readline");



// const static_path = path.join(__dirname, "/public");
app.use(express.static(__dirname + '/public'));
const template_path = path.join(__dirname, "/views");
const Partials_path = path.join(__dirname, "/Partials");


// app.use(express.static(static_path));

app.set("view engine", "hbs"); //engine for starting view hbs
app.set("views", template_path);

hbs.registerPartials(Partials_path);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



var storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});


var upload = multer({
    storage: storage,
    // fileFilter: function(req, file, callback) {
    //     if(
    //         file.mimetype == "image/png" ||
    //         file.mimetype == "image/jpg"
    //     ){
    //         callback(null, true)
    //     }else{
    //         console.log('only jpg and png file supports!')
    //         callback(null, false)
    //     }
    // },
    // limits: {
    //     fileSize: 1024 * 1024 * 2
    // }
})



app.get("/", (req, res) => {
    res.render("index")
});

app.get("/about", (req, res) => {
    res.render("about")
});

app.get("/contact", (req, res) => {
    res.render("contact")
});

app.get("/services", (req, res) => {
    res.render("services")
});


// app.get("/query", (req, res) => {
//     res.render("query")
// });

// app.get("/sucessfully", (req, res) => {
//     res.render("sucessfully")
// });

app.post("/signup", async (req, res) => {

    try {

        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {

            const registerEmployee = new signup({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                contact: req.body.contact,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword
            })

            const registered = await registerEmployee.save();
            res.status(201).render("signup");
            // res.send("successfully Registered")


        } else {
            // res.send("password are not matching")
            res.status(201).render("pwd");
        }

    } catch {
        // res.status(400).send(error);
        // res.send("email id OR contact number is already Registered")
        res.status(201).render("alreg");
    }

});


//Login Check

app.post("/query", async (req, res) => {
    try {
        const username = req.body.username;
        const userpassword = req.body.userpassword;

        const useremail = await signup.findOne({ email: username });

        if (useremail.password === userpassword) {
            res.status(201).render("query");
        } else {
            // res.send("password is wrong");
            res.status(201).render("wrongpwd");
        }

    } catch (error) {
        // res.status(400).send("invalid email");
        res.status(201).render("wrongeml");
    }
})


app.post("/sucessfully", upload.array('fileupl', 100), async (req, res) => {

    const recievedQueries = new submition({
        title: req.body.concern,
        discription: req.body.textbox,
        image: {
            data: req.files,
            contentType: req.files.filename,
        }
    })

    recievedQueries.save();
    res.status(201).render("sucessfully");

})



// app.post("/sucessfully", async (req, res) => {

//     const recievedQueries = new submition({
//         title: req.body.concern,
//         discription: req.body.textbox,
//         img: {
//             data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
//             contentType: 'image/png'
//         }
//     })

//     const queries = await recievedQueries.save();
//     res.status(201).render("sucessfully");

// })



const port = process.env.port || 8000;

app.listen(port, () => {
    console.log(`Server is running at port number ${port}`)
});