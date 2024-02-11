import React from "react";
import "./header.css"
import { FaSearch } from "react-icons/fa";


export default function Header(props) {
    const { page, setPage, search, resPage } = props;
    const getSearch = () => {
        if(document.getElementById("search").value){
        search(document.getElementById("search").value)
        resPage()
    }
        
    }
    // Page with Search
    if (page) {
        return (
            <>
                <header className="header--search">
                    <h1>Books Search</h1>
                    <p onClick={setPage}>My Books</p>
                    <form onSubmit={(e) => { e.preventDefault(); getSearch() }} className="custom--search">
                        <label htmlFor="search"> <FaSearch className="search--icon" /> </label>
                        <input id="search" ></input>
                        <button type="button" onClick={() => getSearch()}>Search</button>
                    </form>
                </header>
            </>

        )
    }
    // page with "My books"
    else {
        return (
            <>
                <header className="header--search">
                    <h1>My Books</h1>
                    <p onClick={setPage}>Go to Search</p>
                </header>
            </>

        )
    }

}