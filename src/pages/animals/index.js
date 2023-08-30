import { useRouter ,useSearchParams} from "next/navigation";

function AnimalList({animal})
{
    const search = useSearchParams();
   
    return (
        <div className="container">
        <div className="row">
                {
                    animal.datas.map((value)=>{
                        return (
                            <div className="col-lg-4 col-md-6" key={value.id}>
                            <div className="card">
                                <a href="" className="trackLink" >
                                    <img src={value.images[0]||value.images[1]} alt=""/>
                                </a>
                                <div className="card-body">
                                    <div className="card-caption-wrapper">
                                        <h5 className="card-title">
                                            <a href="" className="trackLink">
                                                {value.facts.commonName}
                                            </a>
                                        </h5>
                                        <p className="card-fun-face">
                                        {value.facts.funFact}
                                        </p>
                                    </div>
                                </div>
                            </div>
                  
                            </div>
                        )
                    })
                }
         </div>
     </div> 
    )
}

export default AnimalList;


export async function getStaticProps()
{
    const response = await fetch('https://bird.snapapps.online/api/v1/bird/list');
    const data =  await response.json();

    return {
        props:{
            animal: data
        }
    }
}