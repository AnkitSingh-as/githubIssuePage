import React from 'react'
import styled from 'styled-components'
const Div = styled.div`
    display: flex; 
    flex : 1;
    justify-content : center;
    align-items : center;
    text-align: center;
    border-style : solid;
    border-right : 0;
`

const Directions = () => {
  return (
    <Div>
            Please, type in the username and the name of repository you want to get the issues.     
    </Div>
  )
}

export default Directions