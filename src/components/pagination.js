import { useRouter } from "next/router";
import Link from "next/link";
export default function Pagination(props)
{
  const router = useRouter();
  const pages = [];
  for (let i = 1; i <=props.pageCount; i++){
    pages[i]=i
  }
  const onPrevPageChange =() => {
    router.push(`${props.name}?page=${props.currentPage - 1}`, undefined, { shallow: true })
    props.setCurrentPage(props.currentPage -1)
  }
  const onNextPageChange =() => {
    router.push(`${props.name}?page=${props.currentPage + 1}`, undefined, { shallow: true })
    props.setCurrentPage(props.currentPage + 1)
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