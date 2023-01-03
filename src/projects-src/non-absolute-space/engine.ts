import { GameObject } from "./objects"

// Set up the game canvas and context
const canvas = document.getElementById("game") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D


// Set up the game objects
const objects: any[] = []



// Set up the game loop
function update() {
	// Update the positions and states of the objects in the game
	for (const object of objects) {
		object.update()
	}

	// Render the game to the screen
	render()

	// Request the next frame
	requestAnimationFrame(update)
}




// Render the game to the screen
function render() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	// Draw the objects to the screen
	for (const object of objects) {
		object.draw(ctx)
	}
}

// Start the game loop
update()


export {}