import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app = express();
import authRoute from './routes/auth.cjs';
import usersRoute from './routes/users.cjs';
import postsRoute from './routes/posts.cjs';
import commentsRoute from './routes/comments.cjs';
import conversationRoute from './routes/conversations.cjs';
import messagesRoute from './routes/messages.cjs'
import cors from 'cors';
import helmet from 'helmet'
import multer from 'multer';
import path from 'path';


import { fileURLToPath } from 'url';
import { dirname } from 'path';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(cors())
app.use(helmet())

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('connected to mongo'))
    .catch(err => console.log(err))


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
})
const upload = multer({ storage: storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.status(200).json('file uploaded.')
});
app.use('/api/auth', authRoute)
app.use('/api/users', usersRoute)
app.use('/api/posts', postsRoute)
app.use('/api/comments', commentsRoute)
app.use('/api/conversations', conversationRoute)
app.use('/api/messages', messagesRoute)

// app.use(express.static(path.join(__dirname, "/client/build")));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });



app.listen(process.env.PORT || 5000, () => {
    console.log('backend is running')
})

