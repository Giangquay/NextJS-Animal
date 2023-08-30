"use client";
import { useState, useEffect } from "react";
import Pagination from "../../components/pagination";
import { useSearchParams, useRouter } from "next/navigation";

export default function AnimalName() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("name");
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState(parseInt(page) || 1);
  const pageSize = 100;

  const [data, setData] = useState({
    datas: [],
    meta: {},
  });

  async function getData() {
    const response = await fetch(
      `https://${search}.snapapps.online/api/v1/${search}/list?limit=${pageSize}&page=${currentPage}`
    );
    return response.json();
  }
  useEffect(() => {
    if (search) {
      setCurrentPage(1);
      const loadData = async () => {
        const res = await getData();
        setData(res);
      };
      loadData();
    }
  }, [search]);

  useEffect(() => {
    if (page) {
      setCurrentPage(currentPage);
      const loadData = async () => {
        const res = await getData();
        setData(res);
      };
      loadData();
    }
  }, [page]);

  const onPageChange = (page) => {
    router.push(`${search}?page=${page}`, undefined, { scroll: true });
    setCurrentPage(page ?? 1);
  };
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
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        name={search}
        pageCount={data?.meta?.pageCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
