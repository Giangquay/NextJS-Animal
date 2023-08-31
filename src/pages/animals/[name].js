import { useState, useEffect } from "react";
import useSWR from "swr";
import Pagination from "../../components/pagination";
import { useSearchParams} from 'next/navigation'
export default function AnimalName() {
  //version 13
  const searchParams = useSearchParams()
  const search = searchParams.get('name')
  const page = searchParams.get('page')
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1)
  const pageSize = 100;
  useEffect(() => {
    if (search) setCurrentPage(1) 
  }, [search])  
  useEffect(() => {
    if (page) setCurrentPage(parseInt(page));
  }, [page])
  useEffect(() => {
    setCurrentPage(currentPage)
  }, [setCurrentPage])

  const { data, error, isloading } = useSWR(
    `https://${search}.snapapps.online/api/v1/${search}/list?limit=${pageSize}&page=${currentPage||1}`,
    async (url) => await fetch(url).then((res) => res.json()),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )
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
      <Pagination
        currentPage={currentPage}
        name={search}
        pageCount={data?.meta.pageCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

