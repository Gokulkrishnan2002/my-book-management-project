import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './BookListing.css'

const BookListing = () => {
  const [bookdata, setBookdata] = useState(null);
  const [searchText, setSearchText] = useState(""); // State for search term
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/book/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/book/edit/" + id);
  };
  const Removefunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/book/" + id, {
        method: "DELETE",
      })
        .then((res) => {
          alert("Removed successfully.");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch("http://localhost:8000/book")
      .then((res) => res.json())
      .then((resp) => {
        setBookdata(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const filteredData = bookdata?.filter((item) =>
    // Filter logic based on search text
    item.Title.toLowerCase().includes(searchText.toLowerCase()) ||
    item.Author.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Book List</h2>
          <br></br>
          <input
            type="text"
            placeholder="Search Books..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="/book/create" className="btn btn-success">
              Add New Book(+)
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr class="heading">
                <td>ID</td>
                <td>Title</td>
                <td>Author</td>
                <td>Publisher</td>
                <td>No Of Copies</td>
                <td>Cost</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {/* Display filtered data */}
              {filteredData &&
                filteredData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.Title}</td>
                    <td>{item.Author}</td>
                    <td>{item.Publisher}</td>
                    <td>{item.NoOfCopies}</td>
                    <td>{item.Cost}</td>
                    <td>
                      <a
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Edit
                      </a>
                      <a
                        onClick={() => {
                          Removefunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </a>
                      <a
                        onClick={() => {
                          LoadDetail(item.id);
                        }}
                        className="btn btn-primary"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookListing;
