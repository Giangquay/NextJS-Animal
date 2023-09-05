import { useState, useEffect } from "react";
import useSWR from "swr";
import Pagination from "../../components/pagination";
import { useSearchParams } from 'next/navigation'
import { fetcher } from '../../components/fetcher'
import NotFound from '../../components/NotFound'
export default function AnimalName() {
  //version 13
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  const page = searchParams.get('page')
  const searchKey = searchParams.get('searchKey');
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1)
  const limit = 100;
  useEffect(() => {
    if (name) setCurrentPage(1) 
  }, [name])  
  useEffect(() => {
    if (page) setCurrentPage(parseInt(page));
    else setCurrentPage(1)
    
  }, [page])
  useEffect(() => {
    setCurrentPage(currentPage)
  }, [setCurrentPage])
  console.log(searchParams.get('name'))
  console.log(searchParams.get('searchKey'))
  const { data, error, isloading } = useSWR(
    `https://${name}.snapapps.online/api/v1/${name}?limit=${limit}&page=${currentPage||1}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )
  // console.log(data?.datas.length===0)
  if (data?.datas.length === 0) {
    return (
       <NotFound></NotFound>
      )
  }
  return (
    <div className="container">
      <div className="row">
        {data?.datas.map((value) => {
          return (
            <div className="col-lg-4 col-md-6" key={value.id}>
              <div className="card">
                <a href="" className="trackLink">
                  <img src={value.images[0] ?? value.images[1]} alt="" />
                </a>
                <div className="card-body">
                  <div className="card-caption-wrapper">
                    <h5 className="card-title">
                      <a href="" className="trackLink">
                        {value.facts.commonName}
                      </a>
                    </h5>
                    <p className="card-fun-face">{value.facts.funFact}</p>
                  </div>
                </div>
              </div>
            </div>
          );
          //   }
        })}    
      </div>
      {data&& 
        <Pagination
        currentPage={currentPage}
        name={name}
        pageCount={data?.meta.pageCount}
        setCurrentPage={setCurrentPage}
      />
      }
    </div>
  );
}

