import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'

import React from 'react'
import generateNames from '../util'

const Home = () => {
    const [value, setValue] = React.useState('')
    const [weeksVal, setWeeks] = React.useState<string>('')
    const [results, setResults] = React.useState<string>('')

    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value);
    };

    const handleWeekChange = (event: { target: { value: React.SetStateAction<string> } }) => {
        setWeeks(event.target.value);
    }

    const handleClick = () => {
        if (!value) {
            alert('Please enter names')
        }
        else {
            const names = value.split(' ')
            const weeks = parseInt(weeksVal)
            const res = generateNames(names, weeks)

            setResults(res)
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
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label"># of Weeks</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={weeksVal}
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
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 1 }}>
                <Button onClick={handleClick}>Generate</Button>
            </Box>
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