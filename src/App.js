import { useEffect, useState } from "react";
import "./App.css";
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const [status, setstatus] = useState([]);
  const { loginWithRedirect } = useAuth0();
  const [data, setdata] = useState({
    Source: "",
    Destination: "",
    Date: "",
  });
  const { user, isAuthenticated, logout } = useAuth0();

  const onChange = (event) => {
    setdata({ ...data, [event.target.name]: [event.target.value] });
  };
  const handleForm = (e) => {
    e.preventDefault();
    loadData();
  };

  const loadData = async () => {
    let response = await fetch(
      // "https://flight-status-backend.vercel.app/api/getStatus",
      "http://localhost:5000/api/getStatus",

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
    const opts = await response.json();

    setstatus(opts);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="row d-flex bg-dark text-light ">
        <h1 className="d-flex justify-content-end align-items-end me-3">
          {isAuthenticated ? (
            <button
              className="btn btn-success m-2"
              onClick={() => loginWithRedirect()}
            >
              <strong>Login</strong>
            </button>
          ) : (
            <div>
              <button
                className="btn btn-success m-2"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                <strong>Logout</strong>
              </button>
            </div>
          )}
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
            <div className="container container-double-border">
              {" "}
              <h2 className="mb-2 fw-bold">Current Flights Status </h2>
              <div className="row  container-border m-1">
                <div className="col">
                  <h4>Sno.</h4>
                </div>
                <div className="col">
                  <h4>Source</h4>
                </div>
                <div className="col">
                  <h4>Destination</h4>
                </div>
                <div className="col">
                  <h4>Flight</h4>
                </div>
                <div className="col">
                  <h4>Date</h4>
                </div>
              </div>
              <div className="row  container-double-border m-1">
                <div className="row">
                  <div className="col text-center container-border m-1">
                    <h4 className="text-center">
                      {status.map((status, index) => (
                        <p>{index + 1}</p>
                      ))}
                    </h4>
                  </div>
                  <div className="col text-center">
                    <h4 className="text-center  container-border m-1">
                      {status.map((status) => (
                        <p>{status.Source}</p>
                      ))}
                    </h4>
                  </div>
                  <div className="col text-center">
                    <h4 className="text-center  container-border m-1">
                      {status.map((status) => (
                        <p>{status.Destination}</p>
                      ))}
                    </h4>
                  </div>
                  <div className="col text-center">
                    <h4 className="text-center  container-border m-1">
                      {status.map((status) => (
                        <p>{status.Flight}</p>
                      ))}
                    </h4>
                  </div>
                  <div className="col text-center">
                    <h4 className="text-center  container-border m-1">
                      {status.map((status) => (
                        <p>{status.Price}</p>
                      ))}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
