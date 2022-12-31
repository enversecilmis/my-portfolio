import { Poke } from "../types"



const pokeFetch = async (pokeId: number) => {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
	const pokemon = await res.json()

	const poke = {
		name: pokemon.name,
		image: pokemon.sprites.front_default,
	}

	return poke as Poke
}



export default pokeFetch