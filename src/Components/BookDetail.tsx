import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Book {
    Title: string;
    Author: string;
    Publisher: string;
    NoOfCopies: number;
    Cost: number;
}

const BookDetail: React.FC = () => {
    const { bookid } = useParams<{ bookid: string }>();

    const [bookdata, setBookData] = useState<Book | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8000/book/${bookid}`)
            .then((res) => res.json())
            .then((resp: Book) => {
                setBookData(resp);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [bookid]);

    return (
        <div className="container">
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2><b>{bookdata?.Title}</b></h2>
                </div>
                <div className="card-body">
                    {bookdata && (
                        <div>
                            <h5>Author: {bookdata.Author}</h5>
                            <h5>Publisher: {bookdata.Publisher}</h5>
                            <h5>No Of Copies: {bookdata.NoOfCopies}</h5>
                            <h5>Cost: {bookdata.Cost}</h5>
                            <Link className="btn btn-danger" to="/book">Back</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default BookDetail;
