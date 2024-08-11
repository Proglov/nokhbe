'use client'
import LastNews from '../../components/events/LastNews'
import { useState } from "react";
import { Box, Container, Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { tags, supervisors, workingGroups } from "@/utils/tagsAndRoles";

export default function Clubs() {
    const [currentClub, setCurrentClub] = useState(0);

    const handleChange = (event) => {
        const { value } = event.target;
        setCurrentClub(value)
    };

    return (
        <section className='mt-5' >
            <Container>
                <Grid container spacing={8} className="p-3">
                    <Grid item xs={12} sm={7} md={8} className="grid-item">
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
                        {
                            workingGroups[currentClub].length > 0 &&
                            <>
                                <h3 className='mb-2'>کارگروه های باشگاه</h3>
                                <Box>
                                    {
                                        workingGroups[currentClub].map((member, index) => (
                                            <Box className='flex gap-x-2' key={index}>
                                                <div >{member.name}:</div>
                                                <div>{member.position}</div>
                                            </Box>
                                        ))
                                    }
                                </Box>
                            </>
                        }

                    </Grid>
                    <Grid item xs={12} sm={5} md={4} className="grid-item">
                        <LastNews type='news' />
                    </Grid>
                </Grid>

                <br />

            </Container>
        </section>
    )
}
