import React from 'react'


const IssueTable = (props) => {

    const {data} = props;

    // console.log(data);

    return (
        <>
        <div style={{borderStyle: 'solid' , borderTop: '0'}} >
          <table style = { {width : "100%"} }>
            <thead style= {{ width: "100%", alignItems : "center" , justifyContent : "center" }}>
              <tr>
                <th style={{padding : '10px'}}>NUMBER</th>
                <th>TITLE</th>
                <th>STATE</th>
               
              </tr>
            </thead>
            <tbody>
              {data.map(item => {
                return (
                  <tr key ={item.number} >
                    <td style={{textAlign:"center", padding : '10px'}}>{item.number}</td>
                    <td style={{textAlign: 'left'}}>{item.title}</td>
                    <td style={{textAlign:"center"}}>{item.state}</td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </>
      );
}

export default IssueTable