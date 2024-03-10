import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BookEdit = () => {
    const { bookid } = useParams();

    //const [empdata, empdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/book/" + bookid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            titlechange(resp.Title);
            authorchange(resp.Author);
            publisherchange(resp.Publisher);
            copieschange(resp.NoOfCopies);
            costchange(resp.Cost);
            activechange(resp.isactive);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

    const[id,idchange]=useState("");
    const[Title,titlechange]=useState("");
    const[Author,authorchange]=useState("");
    const[Publisher,publisherchange]=useState("");
    const[NoOfCopies,copieschange]=useState("");
    const[Cost,costchange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);


    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const bookdata={Title,Author,Publisher,NoOfCopies,Cost,active};
      

      fetch("http://localhost:8000/book/"+bookid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(bookdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Book Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Book ID</label>
                                        <input value={id} disabled="disabled" className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Book Title</label>
                                        <input required value={Title} onMouseDown={e=>valchange(true)} onChange={e=>titlechange(e.target.value)} className="form-control"></input>
                                    {Title.length==0 && validation && <span className="text-danger">Enter the Title</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Author Name</label>
                                            <input value={Author} onChange={e=>authorchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Publisher Name</label>
                                            <input value={Publisher} onChange={e=>publisherchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>No Of Copies</label>
                                            <input value={NoOfCopies} onChange={e=>copieschange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Cost</label>
                                            <input value={Cost} onChange={e=>costchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                <div className="col-lg-12">
                                    <div className="form-check">
                                    <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        <label  className="form-check-label">Is Active</label>
                                        
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
    </div>
    );
}
 
export default BookEdit;