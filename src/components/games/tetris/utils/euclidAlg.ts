function euclidAlg(short: number, long: number) {
    if (long % short === 0) {
        return short;
    }
    else {
        return euclidAlg(long % short, short)
    }
}

export default euclidAlg;