import "dotenv/config.js";
import express, { response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import findOrCreate from "mongoose-findorcreate";
import multer from "multer";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/"); // Store uploaded files in the 'images' directory
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname); // Date.now() + path.extname(file.originalname)
  },
});
const image = multer({ storage: storage });

const saltRounds = 10;

const app = express();

app.use(express.static(__dirname + "/public"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET_ID,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
mongoose.connect("mongodb://127.0.0.1/menassaDB");

async function sendConfirmationEmail(email, token) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // 587 for TLS, 465 for SSL
    secure: true, // true for 465, false for other ports
    auth: {
      user: "mr.ehabelhattabchemitry@gmail.com",
      pass: "nbwm wkxl upym axpo",
    },
  });
  const mailOptions = {
    from: "Mr.EhabElhattabchemitry@gmail.com",
    to: email,
    subject: "Confirm your email",
    text: `Click the following link to confirm your email: http://ehab-elhattab.online/confirm/${token}`,
  };

  await transporter.sendMail(mailOptions);
}
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  image: String,
  token: String,
  phoneNumber: String,
  parentPhoneNum: String,
  centerName: String,
  yearOfStudy: String,
});

userSchema.plugin(passportLocalMongoose, { id: false });
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const cardSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, sparse: true, unique: false },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    videoID: { type: String },
    homeworkID: { type: String },
    workbookID: { type: String },
    chapter: String,
    cat: String,
    date: Date,
  },
  { strict: false }
);

const Card = mongoose.model("card", cardSchema);

const chapterSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  year: { type: String },
  courses: [{ type: cardSchema, unique: false, sparse: true }],
  cat: String,
  date: Date,
});

const Chapter = mongoose.model("chapter", chapterSchema);

app.post("/register", image.single("imageFile"), async (req, res) => {
  const data = req.body;
  let values;
  if (data.image) {
    values = { image: data?.image };
    values = Object.assign(JSON.parse(data.values), values);
  }

  if (values?.userID) {
    if (values?.password && values?.newPassword) {
      User.findById(values.userID).then((user) => {
        user.changePassword(values.password, values.newPassword).then(() => {
          req.logout(function (err) {
            if (err) {
              console.log(err);
            }
            res.status(200).json("تم تسجيل الخروج بنجاح");
          });
        });
      });
    }
    if (values.image === "undefined") delete values.image;
    delete values.username;
    User.findByIdAndUpdate(values.userID, values)
      .then(() => {
        console.log("update success");
      })
      .catch((err) => console.log(err));
  } else {
    // Generate a confirmation token
    let token = await bcrypt.hash(data.email, saltRounds);
    token = token.replaceAll("/", "");
    const user = new User({
      username: data.username,
      email: data.email,
      token: token,
    });
    User.register(user, data.password, function (err, user) {
      if (err) {
        console.log(err);
        res.status(409).json("حدثت مشكلة أثناء التسجيل");
      } else {
        sendConfirmationEmail(data.email, token);
        res.status(200).send("ستصلك رسالة بتفعيل الحساب");
      }
    });
  }
});

app.post("/login", async (req, res) => {
  const user = new User(req.body);
  req.login(user, (err) => {
    if (err) {
      console.log(err);
      res.status(409).json("حدثت مشكلة اثناء تسجيل الدخول");
    } else {
      User.find({ username: req.user.username }).then((data) => {
        if (data[0]) {
          if (data[0]?.token === "1") {
            passport.authenticate("local")(req, res, () => {
              res.send(user.username);
            });
          } else {
            req.logout(function (err) {
              if (err) {
                console.log(err);
              }
              res.status(401).send("يجب عليك تفعيل الحساب أولا");
            });
          }
        } else {
          res.status(404).send("اسم المستخدم أو كلمة المرور غير صحيحة");
        }
      });
    }
  });
});

app.post("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    res.status(200).json("تم تسجيل الخروج بنجاح");
  });
});

app.post("/auth", (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.user);
  } else {
    res.send(null);
  }
});

app.get("/confirm/confirm/:token", async (req, res) => {
  const { token } = req.params;
  // Find the user with the matching token in the database
  User.find({ token: token }).then((data) => {
    if (data[0]) {
      User.findByIdAndUpdate(data[0]._id, { token: "1" }).then((data) => {
        res.send(data.username);
      });
    }
  });
});

app.post(
  "/course/:year/:chapterId",
  image.single("imageFile"),
  async (req, res) => {
    const data = req.body;
    let values = { id: data?.Id, image: data?.image };
    values = Object.assign(JSON.parse(data.values), values);
    if (values.id) {
      if (values.image === "undefined") delete values.image;
      Chapter.findOneAndUpdate(
        { title: req.params.chapterId, "courses.id": values.id },
        { $set: { "courses.$": values } },
        { new: true, upsert: true }
      )
        .then((data) => {
          console.log("update success");
        })
        .catch((err) => console.log(err));
    } else {
      const card = new Card({
        id: Math.random() * 1000,
        title: values?.title,
        content: values?.content,
        image: values?.image,
        videoID: values?.videoID,
        chapter: values?.chapter,
      });
      await Chapter.findOneAndUpdate(
        { title: req.params.chapterId, year: req.params.year },
        { $push: { courses: card } },
        { new: true, upsert: true }
      )
        .then(() => {
          console.log("save success");
        })
        .catch((err) => console.log(err));
    }
  }
);
app.post("/chapter", image.single("imageFile"), async (req, res) => {
  const data = req.body;
  let values = { Id: data?.Id, image: data?.image };
  values = Object.assign(JSON.parse(data.values), values);
  console.log(values);
  if (values.Id) {
    if (values.image === "undefined") delete values.image;
    Chapter.findByIdAndUpdate(values.Id, values, { new: true, upsert: true })
      .then(() => {
        console.log("update success");
      })
      .catch((err) => console.log(err));
  } else {
    const chapter = new Chapter({
      id: Math.random() * 1000,
      title: values?.title,
      content: values?.content,
      image: values?.image,
      year: values?.year,
      courses: [],
    });
    chapter.save();
    console.log("save success");
  }
});

app.get("/chapter/:year", (req, res) => {
  Chapter.find({ year: req.params.year })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
app.get("/onechapter/:id", (req, res) => {
  Chapter.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});

app.get("/course", (req, res) => {
  (req.query.cat ? Card.find({ cat: req.query.cat }) : Card.find())
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
});
app.get("/course/:chapterid/:id", (req, res) => {
  Chapter.findById(req.params.chapterid)
    .then((data) => {
      res.send(data.courses[req.params.id]);
    })
    .catch((err) => console.log(err));
});

app.get("/write/course/:chapterId/:id", (req, res) => {
  Chapter.find({ _id: req.params.chapterId })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.get("/writechapter/chapter/:id", (req, res) => {
  Chapter.find({ _id: req.params.id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => console.log(err));
});
app.delete("/delete/:id", (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => console.log("delete success"))
    .catch((err) => console.log(err));
});
app.delete("/write/delete/:cardId/:chapterId", (req, res) => {
  Chapter.findOneAndUpdate(
    { _id: req.params.chapterId },
    { $pull: { courses: { id: req.params.cardId } } }
  )
    .then(() => {
      console.log("delete success");
    })
    .catch((err) => console.log(err));
});
app.delete("/writechapter/delete/:id", (req, res) => {
  Chapter.deleteOne({ _id: req.params.id })
    .then(() => console.log("success"))
    .catch((err) => console.log(err));
});
app.listen(8000, function () {
  console.log("Server started at port 8000");
});
