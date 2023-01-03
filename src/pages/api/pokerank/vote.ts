import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"



const prisma = new PrismaClient()



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = await getToken({ req })

	if (!token || !token?.email)
		return

	const { pokeId, vote } = JSON.parse(req.body)
	const voterEmail = token.email




	await prisma.pokerankVote.upsert({
		where: {
			voterEmail_pokeId: {
				pokeId,
				voterEmail,
			},
		},
		update: {
			pokeId,
			voterEmail,
			vote,
		},
		create: {
			pokeId,
			voterEmail,
			vote,
		},
	})

	res.status(200)
}