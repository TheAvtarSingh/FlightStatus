import { useState } from "react";
import "./App.css";

function App() {
  const [data, setdata] = useState({
    Source: "",
    Destination: "",
    Date: "",
  });

  const onChange = (event) => {
    setdata({ ...data, [event.target.name]: [event.target.value] });
  };

  const [output, setOutput] = useState([]);

  const loadData = async () => {
    let response = await fetch(
      "https://flight-status-backend.vercel.app/api/getStatus",
      // "http://localhost:5000/api/getStatus",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Source: data.Source,
          Destination: data.Destination,
          Date: data.Date,
        }),
      }
    );
    response = await response.json();
    setOutput(response);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    loadData();
    console.log(output);
  };

  return (
    <>
      <div className="row d-flex bg-dark text-light ">
        <h1 className="d-flex justify-content-end align-items-end me-3">
          <button className="btn btn-success m-2">
            <strong>Login</strong>
          </button>
        </h1>
      </div>
      <div className="row">
        <div className="col full-height-container bg-info-subtle row input-background">
          <div className="d-flex justify-content-center align-items-center bg-info-subtle">
            <div className="container">
              <form
                method="post"
                onSubmit={handleForm}
                className="d-flex flex-column align-items-center m-2"
              >
                <h1 className="mb-3 fw-bold">Check Flights Status </h1>
                <label htmlFor="Source" className="m-2 form-label">
                  <strong>Source</strong>
                </label>
                <input
                  type="text"
                  className="form-control input-background input-width m-2"
                  name="Source"
                  value={data.Source}
                  required
                  onChange={onChange}
                />
                <label htmlFor="Destination" className="m-2 form-label">
                  <strong>Destination</strong>
                </label>
                <input
                  type="text"
                  name="Destination"
                  className="form-control input-background mb-3 input-width m-2"
                  required
                  value={data.Destination}
                  onChange={onChange}
                />
                <label htmlFor="Date" className="m-2 form-label">
                  <strong>Date</strong>
                </label>
                <input
                  type="date"
                  name="Date"
                  className="form-control input-background mb-3 input-width m-2"
                  required
                  min="2023-06-05"
                  value={data.Date}
                  onChange={onChange}
                />
                <button
                  type="submit"
                  className="btn btn-primary input-width m-2"
                >
                  Check Flights
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="col full-height-container bg-info-subtle row input-background">
          <div className="d-flex justify-content-center align-items-center bg-info-subtle">
            <div className="container">
              <form
                method="post"
                className="d-flex flex-column align-items-center m-2"
              >
                <label htmlFor="from" className="m-2 form-label">
                  <strong> from</strong>
                </label>
                <input
                  type="text"
                  className="form-control input-background input-width m-2"
                  name="from"
                  id="from"
                  required
                />
                <label htmlFor="to" className="m-2 form-label">
                  to
                </label>
                <input
                  type="text"
                  name="to"
                  id="to"
                  className="form-control input-background mb-3 input-width m-2"
                  required
                />
                <button
                  type="submit"
                  className="btn btn-primary input-width m-2"
                >
                  Check Flights
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
