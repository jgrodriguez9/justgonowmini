import React from 'react';
import { AiFillStar,AiOutlineStar } from "react-icons/ai";

function Stars(stars){
    const arr = [1,2,3,4,5]
    return(
        <>
            {
                (stars.stars!==null && stars.stars!==0 && stars.stars!=="0") ? 
                <ul className="list-inline">
                    {
                        arr.map((item, i)=>(
                            <li className="list-inline-item" key={i}>
                                {
                                    item <= parseInt(stars.stars) ? <AiFillStar className="stars-on"/> : <AiOutlineStar />
                                }                        
                            </li>
                        ))
                    }
                </ul> :
                <ul className="list-inline">
                    <li className="list-inline-item"><AiFillStar className="stars-off"/></li>
                    <li className="list-inline-item"><AiFillStar className="stars-off"/></li>
                    <li className="list-inline-item"><AiFillStar className="stars-off"/></li>
                    <li className="list-inline-item"><AiFillStar className="stars-off"/></li>
                    <li className="list-inline-item"><AiFillStar className="stars-off"/></li>
                </ul>
            }
        </>
        
    )

}

export default Stars