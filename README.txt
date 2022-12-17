What does it does ?
   1) Initially, it renders issues of a random public repository from github.
   2) We can enter our required user name and repository name to get the corresponding issues.
   3) Displays the total Issues of the repository.
   4) Fetches data page wise and not entire data at once.
   5) if incorrect repo name is entered, it shows the relevant error on the screen or any other errors.

   
How ?
   1) we are making use of github search API , to get the list of issues.
      It requires the construction of queryString, where we can pass multiple parameters , 
      according to our needs and documentation.
   2) github API , lets us  fetch data , in a paginated way.
   3) we maintain, current Page in the dependency array of useEffect, and 
   4) maintain current Page using useState hook , so whenever the current page changes ,
      we fetch the data from github API and render it on our page.
   5) also we maintain, a queryString in the dependency of useEffect, so whenever
      it changes, we fetch the required data.
   6) Pagination is done , show as to show the first page , last page , prev and next buttons
      and only 1 sibling to the right and left of the current page , if it exists.
   7) we are calculating a range array, based on the current page, total page, first 
      and last page, which changes only when the dependencies such as current page, totalPageCount,etc changes.
   8) we are using useMemo hook to prevent unnecessary renders of usePagination Hook.
   9) project is divided on different folders, based on the work they do.
   10) Currently, the project majorly focuses on functionality and not much on UI.

Additional modules used : Octokit, styled-components, material-ui


