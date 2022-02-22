import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'



const Home = () => {
    const [value, setValue] = React.useState('')
    const [weeks, setWeeks] = React.useState<string>('')
    const [results, setResults] = React.useState<string>('')

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value);
    };

    const handleWeekChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setWeeks(event.target.value);
    }

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
        curWeek.forEach(pair => {
            lastWeek.forEach(lastPair => {
                if (pair[0] === lastPair[0] && pair[1] === lastPair[1]) {
                    console.log('repeated')
                    return true
                }
            })
        })

        return false
    }

    const handleClick = () => {
        if (!value) {
            alert('Please enter names')
        }
        else {
            const names = value.split(' ')

            const pairings: string[][][] = []
            // print each week number
            for (let i = 1; i <= parseInt(weeks); i++) {
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

                // check if any of the pairings repeat
                if (i !== 1 && doesRepeat(weekPairings, pairings[pairings.length - 1])) {
                    i--
                    console.log('repeat')
                } else {
                    pairings.push(weekPairings)
                }
            }

            let results = ''

            pairings.forEach((pairing, index) => {
                results += `Week ${index + 1}: \n`
                pairing.forEach((pair) => {
                    results += `${pair[0]}: ${pair[1]}\n`
                })
                results += '\n'
            })

            setResults(results)
        }    
    }

    return (
        <div>
            <h1>Pair Generator</h1>
            <p>
                Please input a list of names, seperated by a space, as well as a number of desired weeks.
            </p>
            <p>
                Example:
                "A B C D"
            </p>
            <TextField
                id="outlined-multiline-flexible"
                label="Names"
                multiline
                maxRows={4}
                value={value}
                onChange={handleChange} 
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label"># of Weeks</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={weeks}
                        label="# of Weeks"
                        onChange={handleWeekChange}
                    >
                        {
                            // make a menu item for each value one to twenty
                            Array.from(Array(12).keys()).map(i => {
                                return <MenuItem key={i} value={i}>{i}</MenuItem>
                            })
                        }
                    </Select>
            </FormControl>
            <Button onClick={handleClick}>Generate</Button>
            <br />
            <p>
                Results:
            </p>
            <br />
            <TextField sx={{ m: 1, minWidth: '50vw' }}
                id="outlined-textarea"
                label="Results"
                placeholder="Results"
                value={results}
                multiline
            />
        </div>
    )
}

export default Home