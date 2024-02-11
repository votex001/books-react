import React, { useState } from "react";
import Header from "./components/Header";
import "./app.css"
import Search from "./components/Search";
import Pagination from "./components/Pagination";
import Watchlist from "./components/watchlist";
import img from "./components/catbook.svg"





export default function App() {

    const [page, setPage] = useState(true) // changing to watchlist page
    const [search, setSearch] = useState("")  //searching value
    const [pageCount, setPageCount] = useState(0)  //pagination counting
    const [currentPage, setCurrentPage] = useState(1)  // changing page


    //all about pagination settings
    const objectsPerPage = 9 
    const lastObjectIndex = currentPage * objectsPerPage
    const firstObjectIndex = lastObjectIndex - objectsPerPage
    const newPage = (n) => { setCurrentPage(x => x = n) }
    const prevPage = () => { if (currentPage > 1) { setCurrentPage(x => x - 1) } }
    const nextPage = () => {
        if (currentPage < Math.ceil(pageCount / objectsPerPage)) {
            setCurrentPage(x => x + 1)
        }
    }

    

    if (page) {
        // main page
        return (
            <>
                <Header
                    setPage={() => setPage(!page)}
                    page={page}
                    search={setSearch}
                    resPage={() => newPage(1)}
                />

                <main>
                    {search && <Search
                        search={search}
                        pagination={setPageCount}
                        firstObjectIndex={firstObjectIndex}
                        lastObjectIndex={lastObjectIndex}
                    />}
                    {!search && 
                    <img className="book--cat" style={{ position: "absolute", left: "50%", top: "60%",maxWidth: "600px", transform: "translate(-50%, -50%)" }} src={img} alt="Some Cat"></img>}
                </main>
                <Pagination
                    objects={pageCount}
                    objectsPerPage={objectsPerPage}
                    setCurrentPage={newPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />

            </>
        )
    }
    else {
        // the watchlist
        return (
            <>
                <Header
                    setPage={() => setPage(!page)}
                    page={page}
                />

                <main>
                <Watchlist
                resPage={() => newPage(1)}
                pagination={setPageCount}
                firstObjectIndex={firstObjectIndex}
                lastObjectIndex={lastObjectIndex}
                 />
                </main>
                <Pagination
                    objects={pageCount}
                    objectsPerPage={objectsPerPage}
                    setCurrentPage={newPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                />

            </>
        )
    }
}