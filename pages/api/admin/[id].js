import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {

    const userId = req.query.id;
    if (req.method === "DELETE") {
        console.log(`Deleting User with ID: ${userId}`);
        await prisma.user.delete({
            where: {
                id: Number(userId),
            }
        })
        res.json({message: `User ${userId} deleted`});
    } else {
        throw new Error(
            `The method ${req.method} is not supported`
        );
    }



    res.status(200).json({ name: 'John Doe' })
  }