import { Request, Response } from 'express';
import crypto from 'crypto';
import { caches } from '../../central.config.js';

/**
 * notes:
 * - 256kb chunks: <= 256mb files
 * - 512kb chunks: > 200mb files
 */

export default function initialise(req: Request, res: Response) {
    try {
        const size = req.body.stat as number;
        const chunk = size <= 256 * 1024 * 1024 ? 256 * 1024 : 512 * 1024;
        const incomingUploadID = `incoming_${crypto.randomBytes(16).toString('hex')}`
        caches.incoming.set(incomingUploadID, Math.ceil(size / chunk));
        res.send({
            type: "success",
            hash: incomingUploadID,
            chunk,
        })
    } catch (error) {
        res.send({
            type: "error",
            message: "Error initialising upload",
        })
    }
}