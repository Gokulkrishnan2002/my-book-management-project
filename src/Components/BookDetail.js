import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const BookDetail = () => {
    const { bookid } = useParams();

    const [bookdata, bookdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/book/" + bookid).then((res) => {
            return res.json();
        }).then((resp) => {
            bookdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    return (
        <div>
            {/* <div className="row">
                <div className="offset-lg-3 col-lg-6"> */}

               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2><b>{bookdata.Title}</b></h2>
                </div>
                <div className="card-body"></div>

                {bookdata &&
                    <div>
                        <h5>Author: {bookdata.Author}</h5>
                        <h5>Publisher: {bookdata.Publisher}</h5>
                        <h5>No Of Copies: {bookdata.NoOfCopies}</h5>
                        <h5>Cost: {bookdata.Cost}</h5>
                        <Link className="btn btn-danger" to="/book">Back</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default BookDetail;