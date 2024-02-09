import React from "react";
import "./data.css";
import img from "./catbook.svg"
const LS = localStorage;
let items = [];





export default function Watchlist(props){
    props.pagination(0)
    
    const filter=()=>{
        if(LS.key('data')){
            items = []
            JSON.parse(LS.data).map(x=>items.push(x))
            props.pagination(items.length)
        }

    }
    filter()
    const remove= (id) =>{
        LS.data = JSON.stringify(JSON.parse(LS.data).filter(x=> {
            return x.id !== id
        }))
        filter()
    }
    if(items.length){
    return (

        items?.slice(props.firstObjectIndex, props.lastObjectIndex).map(x => {
            return (
                <div key={x.id} className="search--container">
                    <img className="cover" src={x?.formats['image/jpeg']} alt="Book Cover" />
                    <div className="search--content">
                        {/* slice title if it more then 5 words and ads "..." */}
                        <h3>{x?.title.split(" ").slice(0, 4).join(" ")}{x?.title.split(" ").length > 4 && <>...</>}</h3>
                        {x?.authors[0]?.name && <p>Authors: {x?.authors[0]?.name.split(",").slice(0, 2)}</p>}
                        <p>Languges: {x?.languages?.join(", ")}.</p>
                        <p>{x?.subjects[0]}.</p>
                        <button className="Button" onClick={()=>remove(x?.id)} >Remove from WatchList</button>
                        <span><a className="Button" href={x?.formats["text/html"]} target="_blank" rel="noreferrer noopener" >Read</a></span>
                    </div>
                </div>
            )
        })
    )
}
else{
    return(
        <img className="book--cat" style={{ position: "absolute", left: "50%", top: "60%",maxWidth: "600px", transform: "translate(-50%, -50%)" }} src={img} alt="Some Cat"></img>
    )
}

}