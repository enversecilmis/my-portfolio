import { PrismaClient } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import { getToken } from "next-auth/jwt"



const prisma = new PrismaClient()





type PokeScore = {
	pokeId: number
    averageStar: number
    oneStarCount: number
    twoStarCount: number
    threeStarCount: number
    fourStarCount: number
    fiveStarCount: number
}

type PokeScores = PokeScore[]

const starKeys = [
	"",
	"oneStarCount",
	"twoStarCount",
	"threeStarCount",
	"fourStarCount",
	"fiveStarCount",
]

// TODO: Brain stopped, finish this later.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// const token = await getToken({ req })

	// if (!token || token?.email !== "enversecilmis1@gmail.com")
	// 	return

	// const votes = await prisma.pokerankVote.findMany()


	// for (const vote of votes){
	// 	vote
	// }



	res.status(200)
}