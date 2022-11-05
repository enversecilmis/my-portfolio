import { useEffect, useState } from 'react'
import { getStats, Stats } from '../../utils/get-stats'
import styles from './StatDisplay.module.scss'



type Props = {
    array: number[]
    fractionDigits?: number
}

const StatDisplay: React.FC<Props> = ({
    array,
    fractionDigits
}) => {
    const [stats, setStats] = useState<Stats>()

    useEffect(() => {
        setStats(getStats(array, fractionDigits))
    }, [array, fractionDigits])
    

    return (
        <div  className={styles.container}>
            {stats?.average}
        </div>
    )
}






export default StatDisplay