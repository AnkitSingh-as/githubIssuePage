import React from 'react'
import { Octokit} from 'octokit'
import Pagination from '../components/Pagination'
import { useState, useEffect } from 'react'
import IssueTable from '../components/IssueTable'
import SearchForm from '../components/SearchForm'
import Directions from '../components/Directions'
import {Box} from '@mui/material'
import Loading from '../UI/Loading'
import RepoName from '../components/RepoName'

// Initializing octokit object with authentication token generated from github.
const octokit = new Octokit({
  auth : process.env.REACT_APP_TOKEN2
})

// const queryString =  "repo:Hashnode/merns-starter is:issue "

const pp = 20; // per_page limit;





const IssuePage = (props) => {

    // This method provides the issue, but not the total count of the issue 
    //  also it returns pull requests as well and there is no way to filter it at all.
    //  octokit.request("GET /repos/{owner}/{repo}/issues", {
    //     owner: "Hashnode",
    //     repo: "mern-starter",
    //     page : 1,
    //     per_page : 5,
    //     state : "all"
    //   }).then( response => {
    //     console.log(response.headers)
    //     for (const idx in response.data){
    //         const issue = response.data[idx] 
    //         console.log( "#",issue.number,"\n", issue.title, "\n", issue )
    //          // if(!issue.pull_request){
    //         // console.log( "#",issue.number,"\n", issue.title, "\n" )
    //         // }
    //     }
    //   } )

    const [currentPage, setCurrentPage ] = useState(1); // to manage the current page in application
    const [loading, setLoading] = useState(true);  
    const [data, setData] = useState([]);
    const[totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState('');
    
    // Initially, use a sample repo address to show some issues.
    const [queryString, setQueryString] = useState('repo:mastodon/mastodon is:issue'); 

    const [userDetails, setUserDetails] = useState({userName: 'mastodon', repoName: 'mastodon' })


    // Logical component to show whether to show error or IssueTable based on, error is there or not.
    const Display = () => {

        if(error){
          return <div style = {{border : 'red' , borderStyle : 'groove' , 
          background : '#FFCCCB'
        }} >
          <p>Something Went Wrong!</p>
          
          <p> It returned with the following error: </p>
          
          {error}</div>
        }
        else{
          return <IssueTable data = {data}/>
        }
      
    }


    // setting query string with respect to the fields entered in search form to fetch issues.
    const submitHandler = (username, repo) =>{
      const str = 'repo:'+ username + '/' + repo + ' is:issue'
      // console.log(str);
      setQueryString(str);
      setUserDetails({userName: username, repoName: repo});
    }

      // To fetch data, only when page Number changes, or when query string changes;
      // In the ocktokit.request  we are passing our query string , page number
      //  and number of records that need to be shown/fetched per page/query. 
      useEffect(() => {
        setLoading(true);
        const qStr = queryString;
        octokit.request("GET /search/issues", {
          q : qStr,
          page : currentPage,
          per_page : pp,
        }).then(
          response => {
            // console.log(response.data.items);
            // console.log(response.data.total_count);
            // console.log("qstr: ", qStr);
            setError(''); // If we get a response, this means no error, thus setting the error to empty string
            setTotalCount(response.data.total_count); 
            setData(response.data.items);
            setLoading(false); // Since, we have received the data, we set Loading to false to display the data.
            
          }
        )
        .catch(err=> {
          // console.log(err.message);
          setError(err.message); // setting error, if error is received after making request.
          setLoading(false);  // To display error message, we set loading false.
          setTotalCount(0);  // To hide the pagination component.
        }) 
        /* We see that , after changing page number, we do not go to the top of page, 
          which is a bad user experience, thus scrolling to the top*/
        window.scrollTo({ behavior: 'auto', top: '0px' }); 
      }, [currentPage, queryString])

    
      
  return (
    <>
    <Box sx={{display : 'flex', width:'100%'}}>
      <Directions />
      <SearchForm onSubmit={submitHandler} />
    </Box>
    <RepoName userName = {userDetails.userName} repoName = {userDetails.repoName} totalIssues={totalCount} />
    <div>
      {!loading ? <Display />  : <Loading />}
      
    </div>
    <Pagination 
      onPageChange = { (pageNumber) => {
        setCurrentPage(pageNumber);
      } }
      totalCount = { totalCount ? totalCount : 0}
      currentPage = {currentPage}
      pageSize = {pp}
    ></Pagination>
    </>
  )
}

export default IssuePage;