import React from 'react'
import styled from 'styled-components'
const Div = styled.div`
    border-style:solid;
    border-top: 0;
`

const RepoName = (props) => {
  return (
    <Div>
         User Name : {props.userName}
         <br /> 
         Repo Name : {props.repoName}
         <br />
         Total Issues: {props.totalIssues}
    </Div>


  )
}

export default RepoName