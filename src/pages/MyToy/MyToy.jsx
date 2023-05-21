import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const MyToy = () => {
  const { user } = useContext(AuthContext);
  const [toys, setToys] = useState([]);
  const uri = `http://localhost:5000/mytoy?email=${user?.email}`;
  useEffect(() => {
    fetch(uri)
      .then((res) => res.json())
      .then((data) => setToys(data))
      .catch((err) => console.log(err));
  }, []);

  // handle delete
  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover the data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        // deleting from database
        fetch(`http://localhost:5000/toys/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              swal("Your toys has been deleted!", {
                icon: "success",
              });

              // updating the state
              const remaining = toys.filter((toy) => toy._id !== id);
              setToys(remaining);
            }
          });
      }
    });
  };

  return (
    <>
      <div className="container table-responsive py-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Picture</th>
              <th>Toy Name</th>
              <th>Seller Name</th>
              <th>Seller Email</th>
              <th>Sub-Category</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {toys?.map((toy, index) => (
              <tr key={toy?._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={toy?.picture}
                    style={{ maxHeight: "2rem" }}
                    alt=""
                  />
                </td>
                <td>{toy?.toyName}</td>
                <td>{toy?.sellerName}</td>
                <td>{toy?.sellerEmail}</td>
                <td>{toy?.subCategory}</td>
                <td>${toy?.price}</td>
                <td>{toy?.rating}stars</td>
                <td>{toy?.quantity}</td>
                <td>
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/details/${toy?._id}`}
                  >
                    Details
                  </Link>
                  <Link
                    className="btn btn-warning btn-sm mx-1"
                    to={`/updateToy/${toy?._id}`}
                  >
                    Update
                  </Link>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => handleDelete(toy?._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default MyToy;
