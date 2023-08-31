'use client'

import Link from "next/link";
export default function Pagination(props)
{
  const pages = [];
  for (let i = props.currentPage - 2; i <=props.currentPage+1; i++){
    if (i < 1) {
      continue; 
    }else if(i > props.pageCount) break
    pages.push(i)
  }
    return (
        <nav aria-label="Page navigation text-center">
        <ul className="pagination">
        <li className={`${props.currentPage>1 ? "page-item":"page-item disabled"}`}  >
              <Link href={`${props.name}?page=${props.currentPage-1}`} class="page-link">Previous</Link>
          </li>  
              {
            pages.map((value) => {
              return (<li className={value===props.currentPage?"page-item active":"page-item"} key={value}>
               <Link href={`${props.name}?page=${value}`} className="page-link"  onClick={()=>props.setCurrentPage(value)}>{value}</Link>
              </li> )
                })
              } 
        <li className={`${props.currentPage<props.pageCount ? "page-item":"page-item disabled"}`} >
              <Link href={`${props.name}?page=${props.currentPage+1}`} className="page-link">Next</Link>
        </li>
        </ul>
        </nav>     
    )
}