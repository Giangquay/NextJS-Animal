import Link from "next/link";
import { useSearchParams } from "next/navigation"
import { fetcher } from "../components/fetcher";
import useSWR from 'swr'
function searchAnimal() {
    const searchParams = useSearchParams();
    const searchResult = searchParams.get('searchKey');
    
    const { data, isloading, error } = useSWR(`https://bird.snapapps.online/api/v1/bird?searchKey=${searchResult}&limit=100`,
            fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        })
    console.log(data)
    if (isloading) return <div>is Loading</div>
    if (error) return <div>Error</div>
    return (
        <div className="container">
            {
                data?.datas.map((value) => { 
                    return (
                        <><div className="entry-content row" key={value.id}
                        style={{boxShadow: 'rgba(0, 0, 0, 0.4) 0px 30px 90px',height:'400px'}}>
                            <div className="col-12 mt-2"><Link href={'#'} style={{color:'#06a10b'}}><h3>{value.facts.commonName}</h3></Link></div>
                            <div className="col-lg-4 col-md-12">
                                <Link href={'#'}> <img src={value.images[0] ?? value.images[1]} alt="" className="blog_listing_image" /></Link>
                            </div>
                            <div className="col">
                                <span>{value.facts.funFact}prey:  {value.facts.prey} habitat: {value.facts.habitat} </span>
                            </div>
                        </div><hr /></>
                   )
             })
            }
        </div>
    )
}

export default searchAnimal