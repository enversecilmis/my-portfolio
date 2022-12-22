import { TableSizeError } from "../errors"
import { DictionaryArray, FromDictArrOptions } from "../types"
import { CreateTableArrWorkerData, CreateTableArrWorkerReturnData } from "../workers/create-table-arr-worker"




const runCreateTableArrWorker = (
	dictArr: DictionaryArray,
	options: Required<FromDictArrOptions>,
) => {
	const workerData: CreateTableArrWorkerData = {
		dictArr,
		tableSize: options.tableSize,
		hFString: options.hashFunction.toString(),
		cFString: options.collisionHandler.toString(),
		throwCollisionLoopError: !!options.throwCollisionLoopError,
	}

	return new Promise<CreateTableArrWorkerReturnData>((resolve, reject) => {
		const worker = new Worker(new URL("../workers/create-table-arr-worker.ts", import.meta.url))

		worker.onmessage = ((ev: MessageEvent<CreateTableArrWorkerReturnData>) => {
			resolve(ev.data)
			worker.terminate()
		})

		worker.onerror = () => {
			reject(new TableSizeError())
			worker.terminate()
		}

		worker.postMessage(workerData)
	})
}




export default runCreateTableArrWorker