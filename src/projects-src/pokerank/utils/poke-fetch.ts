import { Poke } from "../types"


const imgUrlBase = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon"
const fetchUrlBase = "https://pokeapi.co/api/v2/pokemon-species"


const pokeFetch = async (pokeId: number) => {
	// const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
	const res = await fetch(`${fetchUrlBase}/${pokeId}`)
	const pokemon = await res.json()

	const poke = {
		name: pokemon.name,
		image: `${imgUrlBase}/${pokeId}.png`,
		text: pokemon.flavor_text_entries[0].flavor_text,
	}

	return poke as Poke
}



export default pokeFetch