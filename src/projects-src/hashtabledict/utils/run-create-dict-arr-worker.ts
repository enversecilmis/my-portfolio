import { DictionaryTypeError } from "../errors"
import { DictionaryArray } from "../types"
import { CreateDictArrWorkerReturnData } from "../workers/create-dict-arr-worker"




const runCreateDictArrWorker = (
	text: string,
	wordSeperator: string | RegExp,
	pairSeperator: string | RegExp,
) => {
	const workerData = {
		text,
		wordSeperator,
		pairSeperator,
	}

	return new Promise<DictionaryArray>((resolve, reject) => {
		const worker = new Worker(new URL("../workers/create-dict-arr-worker.ts", import.meta.url))

		worker.onmessage = ((ev: MessageEvent<CreateDictArrWorkerReturnData>) => {
			resolve(ev.data)
			worker.terminate()
		})

		worker.onerror = (ev: ErrorEvent) => {
			if (ev.message === `Uncaught ${DictionaryTypeError.name}`)
				reject(new DictionaryTypeError())
			else
				reject(new Error())
			worker.terminate()
		}

		worker.postMessage(workerData)
	})
}




export default runCreateDictArrWorker