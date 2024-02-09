import React from "react";
import "./pagination.css"




export default function Pagination(props) {


    const pageNum = []
    for (let i = 1; i <= Math.ceil(props.objects / props.objectsPerPage); i++) {
        pageNum.push(i)
    }
    if (pageNum.length > 1) {
        return (

            <ul className="pagination">
                <button onClick={() => props.prevPage()}>Prev Page</button>
                {pageNum.map(x => <li key={x} onClick={() => props.setCurrentPage(x)}>{x}</li>)}
                <button onClick={() => props.nextPage()}>Next Page</button>
            </ul>
        )
    }
}




