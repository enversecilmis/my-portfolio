import { PrismaClient } from "@prisma/client"
import bayesianAverage from "@utils/bayesian-average"
import unique from "@utils/unique-filter"
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
	voteCount: number
}

type Scores = PokeScore[]

const starKeys = [
	"oneStarCount",
	"twoStarCount",
	"threeStarCount",
	"fourStarCount",
	"fiveStarCount",
] as const

// TODO: Brain stopped, finish this later.
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const token = await getToken({ req })

	// Check auth.
	if (!token || token.email !== "enversecilmis1@gmail.com"){
		res
			.status(401)
			.json({
				succes: false,
				cause: "Unautorized",
			})
		return
	}


	const scores: Scores = []
	const allVotes = await prisma.pokerankVote.findMany()


	const uniqueIds = allVotes
		.map(v => v.pokeId)
		.filter(unique)


	for (const id of uniqueIds){
		const score: PokeScore = {
			pokeId: id,
			averageStar: 0,
			oneStarCount: 0,
			twoStarCount: 0,
			threeStarCount: 0,
			fourStarCount: 0,
			fiveStarCount: 0,
			voteCount: 0,
		}

		const pokeVotes = allVotes.filter(v => v.pokeId === id)
		const totalStars = allVotes.reduce((p, c) => ({ ...p, vote: p.vote + c.vote }))
		const meanStar = totalStars.vote / allVotes.length

		const ratings = pokeVotes.map(v => v.vote)
		let totalStar = 0

		const baScore = bayesianAverage(ratings, meanStar, allVotes.length )

		for (const { vote } of pokeVotes) {
			const starKey = starKeys[vote-1]
			score[starKey] += 1
			totalStar += vote
		}
		score.voteCount = pokeVotes.length
		// score.averageStar = totalStar / pokeVotes.length
		score.averageStar = baScore

		scores.push(score)
	}


	await prisma.$transaction([
		prisma.pokerankScore.deleteMany({}),
		prisma.pokerankScore.createMany({ data: scores }),
	])
		.then(bp => res
			.status(200)
			.json({
				succes: true,
				changed: bp[1].count,
			}))
		.catch((err) => {
			res.status(409).json({
				succes: false,
				error: "Problem on the Database",
			})
			console.log(err)
		})
}