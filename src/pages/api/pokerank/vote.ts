import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"



const prisma = new PrismaClient()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = await getToken({ req })

	// Check auth.
	if (!token || !token.email) {
		res.status(401).json({ succes: false, cause: "Unauthenticated" })
		return
	}


	const { pokeId, vote } = JSON.parse(req.body)
	const voterEmail = token.email


	// Update existing or insert new entry.
	await prisma.pokerankVote.upsert({
		create: {
			pokeId,
			voterEmail,
			vote,
		},
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
	})
		.then(() => res.status(200).json({
			succes: true,
		}))
		.catch((err) => res.status(409).json({
			succes: false,
			cause: "Problem on the Database",
			error: JSON.stringify(err),
		}))
}