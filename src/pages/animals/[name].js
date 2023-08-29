'use client'

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import useSWR from "swr";
import Pagination from "../../components/pagination";

export default function AnimalName({birdData}) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page) || 1)
  let { name, page: pagecurrent } = router?.query
  const pageSize = 100;
  const onPageChange = (page) => {
    setCurrentPage(page);
    router.push(`${name}?page=${page}`, undefined, { scroll: true })
  };


  const fetcher = async (url) => await fetch(url).then((res) => res.json());
  const { data, error, isloading } = useSWR(
    `https://${name}.snapapps.online/api/v1/${name}/list?limit=${pageSize}&page=${pagecurrent ?? 1}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  if (error) return <div>Error Server</div>;
  if (isloading) return <div>Is Loading</div>;
  return (
    <div className="container">
      <div className="row">
        {data?.datas.map((value) => {
          //   if (value.facts.type === capitalizeFirstLetter(name)) {
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
        onPageChange={onPageChange}
        name={name}
        pageCount={data?.meta.pageCount}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
    const { name } = context.query;

    const url = `https://${name}.snapapps.online/api/v1/${name}/list?limit=100`;

    try {
        const response = await fetch(url)
        const birdData = await response.json();
          return {
            props: {
              birdData,
            },
          };
        } catch (error) {
          console.error('Lỗi:', error);
          return {
            props: {},
          };
        }
    }
// export async function getStaticPaths()
// {
//     // const name = context.params.name
//     // const res = await fetch(`https://${name}.snapapps.online/api/v1/${name}/list?limit=100`);
//     // const data = await res.json();

//     // const paths = data.map((item) => {
//     //     return {
//     //         params: {name: item.facts.type.toString()}
//     //     }
//     // })

//     // return {
//     //     paths,
//     //     fallback:false// Nếu fallback là false, các đường dẫn không khớp sẽ trả về 404
//     // }
//     return {
//         paths: [
//           {
//             params: {
//               name: 'bird',
//             },
//             params :{
//              name:'fish'
//             }
//           }, // See the "paths" section below
//         ],
//         fallback: true, // false or "blocking"
//       }
// }

// export async function getStaticProps(context) {
//     const name = context.params.name;
//     console.log(name)
//     const res = await fetch(`https://${name}.snapapps.online/api/v1/${name}/list?limit=100`);
//     const data = await res.json();
//     return {
//         props: {
//             birdData:data
//         }
//     }
// }
