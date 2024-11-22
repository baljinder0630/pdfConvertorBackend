import express from 'express';
import upload from '../middleware/upload.js';
import convertFile from '../controller/convertFile.js';

const router = express.Router();
router.post('/convertFile', (req, res, next) => {
    upload.single('file')(req, res, (err) => {
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        next();
    });
}, convertFile);


export default router;