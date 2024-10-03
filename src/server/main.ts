import express from "express";
import ViteExpress from "vite-express";
import mongoose, {PassportLocalDocument} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

// @ts-ignore
import parseXLSX from "./parser/xlsxParser.js"

const app = express();

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/final-project?retryWrites=true&w=majority&appName=final-project`;
const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};

const userSchema = new mongoose.Schema({});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

// use static authenticate method of model in LocalStrategy
passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
// @ts-ignore
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function run() {
    // @ts-ignore
    await mongoose.connect(uri, clientOptions);
    if (mongoose.connection.db) {
        await mongoose.connection.db.admin().command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } else {
        throw new Error("Mongoose not connected");
    }

    app.post("/addUser", express.json(), async (req: express.Request, res: express.Response) => {
        const newUser: PassportLocalDocument = new User({username: req.body.username}) as PassportLocalDocument;
        await newUser.setPassword(req.body.password);
        await newUser.save();
        const user = await User.authenticate()(req.body.username, req.body.password);
        console.log(user);
        if (user.user === false) {
            res.sendStatus(403);
        } else {
            res.json(user.user._id);
        }
    });

    app.post("/login", express.json(), async (req: express.Request, res: express.Response) => {
        const user = await User.authenticate()(req.body.username, req.body.password);
        console.log(user);
        if (user.user === false) {
            res.sendStatus(403);
        } else {
            res.json(user.user._id);
        }
    });

    app.get("/hello", (_, res) => {
        res.send("Hello Vite + React + TypeScript!");
    });

    ViteExpress.listen(app, 3000, () =>
        console.log("Server is listening on port 3000..."),
    );
}

run().catch(async (err) => {
    console.error(err);
    await mongoose.disconnect();
});
