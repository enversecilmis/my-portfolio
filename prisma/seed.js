/* eslint-disable @typescript-eslint/no-var-requires */
const { PrismaClient } = require("@prisma/client")
const fs = require("fs")
const { z } = require("zod")



let rawdata = fs.readFileSync("./prisma/MOCK_DATA.json")
let data = JSON.parse(rawdata)

const zData = z.array(
	z.object({
		pokeId: z.number(),
		voterEmail: z.string().email(),
		vote: z.number().min(1).max(5),
	}),
)

if (zData.safeParse(data).error){
	throw new Error("Invalid Data.")
}

const prisma = new PrismaClient()

const load = async () => {
	try {
		await prisma.pokerankVote.createMany({ data: data, skipDuplicates: true })
	}
	catch (e) {
		console.error(e)
		process.exit(1)
	}
	finally {
		await prisma.$disconnect()
	}
}
load()