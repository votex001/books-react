
import React, { useEffect, useState } from "react";
import "./data.css";
import img from "./loading.svg"


const LS = localStorage
let watchList = []
if (LS.key('data')) {
    JSON.parse(LS.data).map(x => watchList.push(x))
    // console.log(watchList)
}


export default function Search(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setLoading] = useState(false)
    const [items, setItems] = useState([])
    
    const handleButtonClick = (id) => {
        watchList.push(items.filter(x => x?.id === id)[0])
        watchList.filter((first, second) => first?.id !== second?.id)
        const table = {};
        const res = watchList.filter(({ id }) => (!table[id] && (table[id] = 1)));
        LS.setItem('data', JSON.stringify(res))
    }

// grabs search value and put in fetch
    useEffect(() =>{
        setLoading(prev => prev = false)
        fetch(`https://gutendex.com/books/?search=${props.search}`)
            .then(res => res.json())
            .then(data => {
                setLoading(prev => prev = true)
                setItems(prev => prev = data.results)
                
            },
                (erorr) => {
                    setLoading(prev => prev = true)
                    setError(prev => prev = erorr)
                })}, [props.search]
    )

    if (error) { return <p>Error {error.message}</p> } //is have erros


    //loaging
    else if (!isLoaded) {
        return <h3 style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
            <img className="loading" src={img} alt="cat loading page">
            </img>
        </h3>
    }
    else {


        //takes "items" after fetch and maps them
        return (
            props.pagination(items.length),
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
                            <button className="Button" onClick={() => handleButtonClick(x?.id)}>Add to WatchList</button>
                            <span><a className="Button" href={x?.formats["text/html"]} target="_blank" rel="noreferrer noopener" >Read</a></span> 
                        </div>
                    </div>
                )
            })
        )

    }
}





