import React from 'react'
import {Box, Button, TextField} from '@mui/material'

const SearchForm = (props) => {

    const formSubmitHandler = (event ) => {
        event.preventDefault();
        const {Username, Repository} = event.target;
        // console.log(Username.value, Repository.value);

        props.onSubmit(Username.value.trim(), Repository.value.trim());
    }

return (
    <Box sx = {{display:'flex' , alignItems:'center', justifyContent:'center' , flex :'1', borderStyle:'solid'}}>
        <form onSubmit={formSubmitHandler} >
            <Box sx={{display:'flex', alignItems:'center', justifyContent : 'center'}}>
                <Box  sx = {{
                    // margin : '10px' ,
                    padding : '5px',
                    
                }}>
                    <TextField
                        id="outlined-name"
                        label="Username"
                        name = 'Username'
                        type = 'string'
                    />
                </Box>
                <Box  sx = {{
                    // margin : '10px' ,
                    padding : '5px',
                    
                }}>
                    <TextField
                        id="outlined-name"
                        label="Repository"
                        name = 'Repository'
                        type = 'string'
                    />
                </Box>
                <Box  sx = {{
                    // margin : '10px' ,
                    padding : '5px',
                    
                }}>
                    <Button type='submit' variant='contained'>Get Issues</Button>
                </Box>
            </Box>
        
        </form>
       
    </Box>
  )
}

export default SearchForm