'use client'
import { useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { tags, supervisors } from "@/utils/tagsAndRoles";

export default function Clubs() {
    const [currentClub, setCurrentClub] = useState(0);

    const handleChange = (event) => {
        const { value } = event.target;
        setCurrentClub(value)
    };

    return (
        <div>
            <Container>
                <Box className='mx-auto md:w-3/5 w-100'>
                    <FormControl variant="filled" sx={{ m: 1, width: '100%', maxWidth: '500px' }}>
                        <InputLabel id="demo-simple-select-standard-label">
                            باشگاه
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            className="bg-white"
                            value={currentClub}
                            onChange={handleChange}
                            label="Age"
                        >
                            {
                                tags.map((v, i) => {
                                    return <MenuItem key={i} className="mx-2" value={i}>
                                        {v}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>

                <br />

                <Box>
                    <div className="my-2">نام باشگاه: {tags[currentClub]}</div>
                    <div>نام سرپرست: {supervisors[currentClub]}</div>
                </Box>

                <br />

            </Container>
        </div>
    )
}
