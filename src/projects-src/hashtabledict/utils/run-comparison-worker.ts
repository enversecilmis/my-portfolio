import { ArrayDictionary, HashTableDictionary } from "../hashtabledict"
import { ComparisonWorkerData, ComparisonWorkerReturnData } from "../workers/comparison-worker"




const runComparisonWorker = (
	hashDict: HashTableDictionary,
	arrDict: ArrayDictionary,
	iteration: number,
) => {
	const workerData: ComparisonWorkerData = {
		dictArr: arrDict.dictArray,
		hashDictInitData: {
			tableArray: hashDict.tableArray,
			hFString: hashDict.hashFunction.toString(),
			cFString: hashDict.collisionHandler.toString(),
			throwCollisionLoopError: hashDict.throwCollisionLoopError,
		},
		iteration,
	}

	return new Promise<ComparisonWorkerReturnData>((resolve, reject) => {
		const worker = new Worker(new URL("../workers/comparison-worker.ts", import.meta.url))

		worker.onmessage = ({ data }) => {
			resolve(data)
			worker.terminate()
		}

		worker.onerror = () => {
			reject(new Error())
			worker.terminate()
		}

		worker.postMessage(workerData)
	})
}




export default runComparisonWorker