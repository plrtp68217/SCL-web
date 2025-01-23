/**
 * Находит наибольший общий делитель (НОД) двух чисел с помощью алгоритма Евклида.
 * 
 * @param short - Меньшее из двух чисел (положительное целое число).
 * @param long - Большее из двух чисел (положительное целое число).
 * @returns Наибольший общий делитель чисел `short` и `long`.
 */
function euclidAlg(short: number, long: number): number {
    if (long % short === 0) {
        return short;
    }
    else {
        return euclidAlg(long % short, short)
    }
}

export default euclidAlg;