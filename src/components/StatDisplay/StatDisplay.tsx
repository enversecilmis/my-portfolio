import { useMemo } from 'react'
import { getStats } from '../../utils/get-stats'
import styles from './StatDisplay.module.scss'
import { XAxis, Tooltip, YAxis, BarChart, Bar, Legend, CartesianGrid } from 'recharts'

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'


type Props = {
    array: number[]
    fractionDigits?: number
}

const StatDisplay: React.FC<Props> = ({
    array,
    fractionDigits
}) => {
    const stats = useMemo(() => getStats(array, fractionDigits), [array, fractionDigits])
    const histData = stats.histogram.map((val,idx) => ({
        collisions: idx,
        occurence: val
    }))
    const tableData = [{
        Max: stats.max,
        min: stats.min,
        average: stats.average,
        total: stats.total,
        standardDeviation: stats.standardDeviation,

    }]
    const columnHelper = createColumnHelper()

    return (
        <div className={styles.container}>
            <div className={styles.basicStatistics}>
                <div className={styles.tableTitle}>
                    Basic Statistics
                </div>
                <div className={styles.statTable}>
                    <div className={styles.labelColumn}>
                        <span className={styles.statLabel}>Average Collision</span>
                        <span className={styles.statLabel}>Maximum Collisions</span>
                        <span className={styles.statLabel}>Minimum Collisions</span>
                        <span className={styles.statLabel}>Standard Deviation</span>
                        <span className={styles.statLabel}>Total Collision Count</span>
                    </div>
                    <div className={styles.valueColumn}>
                        <span className={styles.statValue}>{stats.average}</span>
                        <span className={styles.statValue}>{stats.max}</span>
                        <span className={styles.statValue}>{stats.min}</span>
                        <span className={styles.statValue}>{stats.standardDeviation}</span>
                        <span className={styles.statValue}>{stats.total}</span>
                    </div>
                </div>

            </div>
            <div className={styles.histogram}>
                <div className={styles.chartTitle}>
                    Collisions Histogram
                </div>
                <div className={styles.barChart}>
                    <BarChart
                        width={120*histData.length}
                        height={300}
                        data={histData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                    >
                        <XAxis dataKey="collisions" />
                        <YAxis dataKey="occurence"/>
                        <Legend/>
                        <Tooltip cursor={{fill: "var(--color-overlay-2)"}}/>
                        <Bar dataKey="occurence" fill="#8884d8" background={{fill: "var(--color-overlay)"}}/>
                    </BarChart>
                </div>
            </div>

        </div>
    )
}






export default StatDisplay