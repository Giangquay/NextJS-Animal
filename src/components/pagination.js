'use client'

import { useRouter } from "next/router";
export default function Pagination(props)
{
  console.log(props)
  const router = useRouter();
  const pages = [];
  for (let i = 1; i <=props.pageCount; i++){
    pages[i]=i
  }
  const onPrevPageChange =() => {
    if ((props.currentPage - 1)>0) {
    router.push(`${props.name}?page=${props.currentPage - 1}`)
    props.setCurrentPage(props.currentPage -1)
   }
  }
  const onNextPageChange = () => {
    if ((parseInt(props.currentPage) + 1) < props.pageCount+1) {
      router.push(`${props.name}?page=${parseInt(props.currentPage) + 1}`)
      props.setCurrentPage(parseInt(props.currentPage) + 1)
    }
  }
    return (
        <nav aria-label="Page navigation text-center">
        <ul className="pagination">
        <li className="page-item" onClick={onPrevPageChange}>
            <a className="page-link" aria-label="Previous" >
            <span aria-hidden="true">&laquo;</span>
            <span className="sr-only">Previous</span>
          </a>
          </li>  
              {
            pages.map((value) => {
              return (<li className={value===props.currentPage?"page-item active":"page-item"}>
                 <a className="page-link" onClick={()=>props.onPageChange(value)}>{value}</a>
              </li> )
                })
              } 
        <li className="page-item" onClick={onNextPageChange}  >
          <a className="page-link" aria-label="Next"  >
            <span aria-hidden="true">&raquo;</span>
            <span className="sr-only">Next</span>
          </a>
        </li>
        </ul>
        </nav>     
    )
}