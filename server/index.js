// dependencies
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const PORT = process.env.PORT;
const express = require('express');
const app = express();
const fs = require('fs');
const querystring = require('querystring');

// mongodb
const mongoose = require('mongoose');
const User = require('./user')
const Level = require('./level')

const challenges = {
    "cryptography": 4,
    "steganography": 4,
    "web": 4,
    "programming": 4
};

// connecting to mongodb
mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.ffmynhi.mongodb.net/CTF?retryWrites=true&w=majority`).then(() => { console.log("Connected to mongodb"); }).catch((error) => { console.error(error) });

// middle ware
const auth = require('./auth.js')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session')
const upload = require("./upload.js")

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../build/')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(cookieParser())
app.use(passport.initialize())
app.use(passport.session())

// routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "home.html"));
});

app.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "about.html"));
});

app.get("/challengeSelect", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "select.html"));
});

app.get("/challenge",auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "challenge.html"));
});

app.get("/tutorial", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "tutorial.html"));
});

app.get("/downloads/usb_from_jane.zip",auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/usb_from_jane.zip"));
});

app.get("/downloads/corrupted.png", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/corrupted.png"));
});

app.get("/downloads/possible_keys.txt", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/possible_keys.txt"));
});

app.get("/downloads/street.png", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/street.png"));
});

app.get("/downloads/mountains.png", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/mountains.png"));
});

app.get("/downloads/beach.png", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/beach.png"));
});

app.get("/downloads/waterfall.png", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/waterfall.png"));
});

app.get("/downloads/capybaras.png", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/capybaras.png"));
});

app.get("/downloads/sky.png", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/sky.png"));
});

app.get("/downloads/cows.png", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/cows.png"));
});

app.get("/downloads/anagrams.txt", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/anagrams.txt"));
});

app.get("/downloads/toronto.png", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "/challenges/downloads/toronto.png"));
});

app.get("/robots.txt", auth.isLoggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "robots.txt"));
});

normalArray = ["4B", "22"]

app.get("/dashboard", auth.isLoggedIn, (req, res) => {
    User.findOne({ id: req.user.id }).then((usr) => {
        if (!usr) {

            var givenName = req.user.name.givenName;
            var familyName = req.user.name.familyName;

            if (givenName == undefined) {
                givenName = "";
            }

            if (familyName == undefined) {
                familyName = "";
            }
            
            const username = `${givenName.charAt(0).toLowerCase()}${familyName.charAt(0).toLowerCase()}.${Math.round(Math.random() * 999999)}`;
            const user = new User({
                id: req.user.id,
                username: username,
                display: `${req.user.name.givenName} ${req.user.name.familyName}`,
                picture: req.user.picture,
                points: 0
            });
            user.save();
        }
    });

    res.sendFile(path.join(__dirname, "../build", "dashboard.html"));
})


//enter flag
app.post("/enterFlag", auth.isLoggedIn, (req, res) => {
    let url = "/"+req.body.url.split(".com/")[1]
    Level.findOne({ url: url}).then((level) => {
        if (level) {
            User.find({ id: req.user.id }).then((usr) => {
                if (usr) {

                    if (usr[0]["solvedChallenges"].includes(req.body.url)) {
                        res.json({ msg: `You did this challenge already! Click <a href="/dashboard">here</a> to go back to the dashboard`, success: true })
                        return;
                    }
                    if (req.body.flag == level.flag) {
                        User.findOneAndUpdate(
                            { id: req.user.id },
                            { $inc: { points: level.points }, $push: { solvedChallenges: url } },
                            { new: true }
                        ).then((error, success) => {
                            if (error) {
                                console.log(error);
                            }
                        });
                        res.json({ msg: `Bullsye! You got it! Click <a href="/dashboard">here</a> to go back to the dashboard`, success: true })
                    }
                    else {
                        res.json({ msg: "Incorrect, try again!", success: false })
                    }
                }
            });

        }
        else {
            res.json({ msg: "Something went wrong!", success: false })
        }
    })
})

app.get("/getLeaderboard", (req, res) => {
    var userData = {}
    User.find().sort({ points: -1 }).limit(100).exec().then((users) => {
        users.forEach(user => {
            userData[user["username"]] = [user["display"], user["points"]];
        });
        res.json(userData)
    }).catch(error => {
        console.error("Error retrieving leaderboard:", error);
    });
})

app.post("/getLevels", auth.isLoggedIn, (req, res) => {
    Level.find({ "category": req.body["category"] }).then((levels) => {
        levelData = {}
        names = []
        i = 1
        User.findOne({ "id": req.user.id }).then((user) => {
            if (user) {
                user["solvedChallenges"].forEach(element => {
                    names.push(element.toString())
                });
            }
            completion = 0

            levels.forEach(element => {
                let solved = false
                if (names.includes(element.url)) {
                    solved = true
                    completion += 1;
                }
                levelData[`C${i}`] = { name: element["name"], points: element["points"], solved: solved }
                i += 1
            });
            levelData["completion"] = (completion / levels.length) * 100
            res.json(levelData)
        })
    })
})

app.post("/getLevelData", auth.isLoggedIn, (req, res) => {
    Level.find({ "category": req.body["category"], "challId": req.body["challId"] }).then((levels) => {
        levels[0].flag = undefined;
        res.json(levels[0]);
    })
});

app.post("/getLevelHtml", auth.isLoggedIn, (req, res) => {
    const {board, chall} = req.body;
    res.sendFile(path.join(__dirname, "../build", `/challenges/${board}${chall}.html`));
})

app.post('/editProfile', auth.isLoggedIn, upload.single("file"), (req, res) => {
    
    let update = {}
    if (req.file) {
        update.picture = "../" + req.file.path
    }
    if (req.body.username.length > 1) {
        update.display = req.body.username
    }

    User.findOne({ "id": req.user.id }).then((user) => {
        if (user) {
            // Check if the user's profile picture exists before attempting to delete it
            const filePath = path.join(__dirname, '..', 'uploads', user.picture);

            if (Object.keys(update).includes("picture") && fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }

            User.findOneAndUpdate({ id: req.user.id }, update, { new: true }).then(updatedUser => {
                if (updatedUser) {
                    res.redirect("/dashboard")
                }
            }).catch(error => {
                console.error("Error:", error);
                res.status(500).send("Internal Server Error");
            });
        } else {
            res.status(404).send("User not found");
        }
    }).catch(error => {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    });
});

app.get('/getLoginInfo', auth.isLoggedIn, (req, res) => {
    User.findOne({ id: req.user.id }).then((user) => {
        var points = 0;
        if (user) {
            points = user["points"];
        }
        res.json({ "username": user["username"], "display": user["display"], "picture": user["picture"], "points": points, "username": user["username"] });
    });

})

app.use("/crypto2pwd", auth.isLoggedIn, (req, res) => {
    if (req.body.password == "niagrafalls17") {
        Level.find({"category": "crypto", "challId": 2}).then(levels => {
            res.json({
                "flag": levels[0].flag
            })
        })
    }

    else {
        res.json({
            "flag": null
        })
    }
})

app.use("/crypto3pin", auth.isLoggedIn, (req, res) => {
    if (parseInt(req.body.pin) == 10131) {
        Level.find({"category": "crypto", "challId": 3}).then(levels => {
            res.json({
                "flag": levels[0].flag
            })
        })
    }
    else {
        res.json({
            "flag": null
        })
    }
})

app.use("/nellsCargo", auth.isLoggedIn, (req, res) => {

    if (querystring.parse(req.body.cookieStr).bankUser == 0) {

        Level.find({"category": "web", "challId": 5}).then(levels => {
            res.json({
                "flag": levels[0].flag
            })
        })
    }
    else {
        res.json({
            "flag": null
        })
    }

})

// google auth
app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/loggedIn', (req, res) => {
    req.user ? res.json({ "loggedIn": true }) : res.json({ "loggedIn": false });
});

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/home'
    }));

app.use('/auth/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/home")
})


const createLevels = () => {
    Level.create({ url: "/challengeSelect/programming/c2", name: "black", flag: "flag", category: "programming", points: "1231" })
    Level.create({ url: "/challengeSelect/programming/c3", name: "black", flag: "flag", category: "programming", points: "1231" })
    Level.create({ url: "/challengeSelect/programming/c4", name: "black", flag: "flag", category: "programming", points: "1231" })
    Level.create({ url: "/challengeSelect/programming/c5", name: "black", flag: "flag", category: "programming", points: "1231" })
}

// running app
app.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on port ${PORT}`);
    //createLevels()
});

