const shuffleArray = (array: string[]) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array
}

const doesRepeat = (curWeek: string[][], lastWeek: string[][]): boolean => {

    for (let i = 0; i < curWeek.length; i++) {
        const curPair = curWeek[i]
        const lastPair = lastWeek[i]

        if (curPair[1] === lastPair[1]) {
            return true
        }
    }
    return false
}

const generateNames = (names: string[], weeks: number, asString=true) => {

    const pairings: string[][][] = []
    // print each week number
    for (let i = 1; i <= weeks; i++) {
        // randomly shuffle the names
        const shuffledNames = shuffleArray(names)

        // add each pairing to pairings
        const weekPairings: string[][] = []
        shuffledNames.forEach((name, index) => {
            if (index !== shuffledNames.length - 1) {
                weekPairings.push([name, shuffledNames[index + 1]])
            }
            else {
                weekPairings.push([name, shuffledNames[0]])
            }
        })

        weekPairings.sort()

        // check if any of the pairings repeat

        // week 0 always valid
        if (i === 1) {
            pairings.push(weekPairings)
        }
        // week 1 compares just to week 0
        else if (i === 2) {
            if (!doesRepeat(weekPairings, pairings[0])) {
                pairings.push(weekPairings)
            }
            else {
                console.log('repeat 1')
                i--
            }
        }
        // week i compares to week i - 1 and week i - 2
        else {
            if (!doesRepeat(weekPairings, pairings[pairings.length - 1]) && !doesRepeat(weekPairings, pairings[pairings.length - 2])) {
                pairings.push(weekPairings)
            }
            else {
                i--
                console.log('repeat double')
            }
        }


        // if (i !== 1 && doesRepeat(weekPairings, pairings[pairings.length - 1])) {
        //     i--
        //     console.log('repeat')
        // } else {
        //     pairings.push(weekPairings)
        // }
    }

    let results = ''

    pairings.forEach((pairing, index) => {
        results += `Week ${index + 1}: \n`
        pairing.forEach((pair) => {
            results += `${pair[0]}: ${pair[1]}\n`
        })
        results += '\n'
    })

    return results
}

export default generateNames