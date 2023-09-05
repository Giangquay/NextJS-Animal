'use client'

import { useState } from "react"
import { listApp } from "../pages/contants"
import { useRouter } from 'next/router';
import Link from 'next/link'
import { redirect, useSearchParams } from "next/navigation";
export default function Header()
{
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
      setIsOpen(!isOpen);
    };
    const handleClose = () => setIsOpen(false);
    return (
        <div className="header">
            <div className="header__top">
                <div className="header__logo"><Link href='/' className="logo"><img src="https://a-z-animals.com/wp-content/themes/aza-next/assets/images/logo/logo.png" /></Link></div>
                <div className="nav__menu">
                    <div className="nav">
                            <div className="nav-item"><Link href='/animals'>All Animal</Link></div>
                            <div onClick={handleClick} className="nav__menu--drop ">List Animal <i className="fa fa-caret-down"></i>
                                <div className="nav_child" >
                                    {isOpen ?
                                      listApp.map((value,index)=>{
                                        return (
                                            <Link href={`/${value.url}`||''} className="nav_child--link"
                                            key={index}>{value?.name}</Link>
                                        )
                                       })
                                    :''
                                    }
                                </div>
                            </div>
                            <div className="nav-item">Pets</div>
                            <div className="nav-item">Places</div>
                            <div className="nav-item">Reviews</div>
                            <div className="nav-item">Articles</div>
                            <div className="nav-item">Quizzes</div>
                    </div>
                    <div className="form__search--animal">
                    <form  action="/search"> 
                    <input type="text" className="form__input" name="searchKey" placeholder="Search here"/>
                    <button className="btn--green" type="submit">Search</button>
                    </form>                        
                    </div>
                </div>
            </div>
        </div>
    )
}