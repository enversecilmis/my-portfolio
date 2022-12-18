import { ArrayDictionary, HashTableDictionary } from "../../hashtabledict"
import { ComparisonWorkerData, ComparisonWorkerReturnData } from "../comparison-worker"



const runComparisonWorker = (
	hashDict: HashTableDictionary,
	arrDict: ArrayDictionary,
	iteration: number,
) => {
	const workerData: ComparisonWorkerData = {
		dictArr: arrDict.dictArray,
		hashDictInitData: {
			hFString: hashDict.hashFunction.toString(),
			cFString: hashDict.collisionHandler.toString(),
			tableSize: hashDict.tableArray.length,
			throwCollisionLoopError: hashDict.throwCollisionLoopError,
		},
		iteration,
	}

	return new Promise<ComparisonWorkerReturnData>((resolve) => {
		const worker = new Worker(new URL("../comparison-worker.ts", import.meta.url))

		worker.onmessage = ({ data }) => {
			resolve(data)
			worker.terminate()
		}

		worker.postMessage(workerData)
	})
}



export default runComparisonWorker