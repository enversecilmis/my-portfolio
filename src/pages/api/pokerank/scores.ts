import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"



const prisma = new PrismaClient()



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const scores = await prisma.pokerankScore.findMany({
		orderBy: {
			averageStar: "desc",
		},
		take: 10,
	})


	res.status(200).json(scores)
}