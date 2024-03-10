import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BookEdit: React.FC = () => {
    const { bookid } = useParams<{ bookid: string }>();

    const [id, setId] = useState("");
    const [Title, setTitle] = useState("");
    const [Author, setAuthor] = useState("");
    const [Publisher, setPublisher] = useState("");
    const [NoOfCopies, setCopies] = useState("");
    const [Cost, setCost] = useState("");
    const [active, setActive] = useState(true);
    const [validation, setValidation] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8000/book/${bookid}`)
            .then((res) => res.json())
            .then((resp) => {
                setId(resp.id);
                setTitle(resp.Title);
                setAuthor(resp.Author);
                setPublisher(resp.Publisher);
                setCopies(resp.NoOfCopies);
                setCost(resp.Cost);
                setActive(resp.isactive);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [bookid]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const bookdata = { Title, Author, Publisher, NoOfCopies, Cost, active };

        fetch(`http://localhost:8000/book/${bookid}`, {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(bookdata)
        })
        .then((res) => {
            alert('Saved successfully.');
            navigate('/');
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card" style={{ "textAlign": "left" }}>
                        <div className="card-title">
                            <h2>Book Edit</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Book ID</label>
                                        <input value={id} disabled={true} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Book Title</label>
                                        <input required value={Title} onMouseDown={() => setValidation(true)} onChange={(e) => setTitle(e.target.value)} className="form-control"></input>
                                        {Title.length === 0 && validation && <span className="text-danger">Enter the Title</span>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Author Name</label>
                                        <input value={Author} onChange={(e) => setAuthor(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Publisher Name</label>
                                        <input value={Publisher} onChange={(e) => setPublisher(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>No Of Copies</label>
                                        <input value={NoOfCopies} onChange={(e) => setCopies(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Cost</label>
                                        <input value={Cost} onChange={(e) => setCost(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-check">
                                        <input checked={active} onChange={(e) => setActive(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        <label className="form-check-label">Is Active</label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit">Save</button>
                                        <Link to="/book" className="btn btn-danger">Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BookEdit;
