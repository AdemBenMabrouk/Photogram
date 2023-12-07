import { Models } from "appwrite"
import Loader from "./Loader"
import GridPostList from "./GridPostList"


type SearchedResultsProps={
  issearchfetching:boolean,
  searchedposts:Models.Document
}

const SearchResults = ({issearchfetching,searchedposts}:SearchedResultsProps) => {
  if(issearchfetching) return <Loader/>

  if(searchedposts && searchedposts.documents.length>0){
    return (<GridPostList posts={searchedposts.documents}/>)
  } 


  return (
   <p className="text-light-4 mt-10 text-center w-full">No results found</p>
  )
}

export default SearchResults