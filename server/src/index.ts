import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

// [NOTE]: usually all configuration data are handled in .env file
const server = express();
const port = 8080;
const prisma = new PrismaClient();

server.use(cors());

// GET: jobs
server.get('/jobs', async (req: Request, res: Response) => {
    try {
        const jobs = await prisma.jobs.findMany({ include: { suburbs: true, categories: true } });
        return res.json(jobs);
    } catch (e) {
        return res.status(400).json(e);
    }
});

// PUT: jobs/:id
server.put('/jobs/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        //   const { status } = req.body;
        const { status } = req.query;
        console.log(id, status);

        if (!status) throw "Status is not set";

        const jobs = await prisma.jobs.update({
            where: {
                id,
            },
            data: {
                status: String(status)
            },
        });
        return res.json(jobs);
    } catch (e) {
        console.error(e);
        return res.status(400).json(e);
    }
});

server.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
