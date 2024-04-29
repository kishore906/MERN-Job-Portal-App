import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Header Section */}
      <header className="py-3">
        <nav className="navbar">
          <div className="container">
            <h2>
              <span className="me-3 px-3 py-1 rounded text-white bgColor">
                J
              </span>
              JobQuest
            </h2>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="container d-flex align-items-center flex-column flex-md-row text-center text-md-start pt-5">
        <div className="w-100 mw-60">
          <h1 className="hero_heading">
            Job <span className="textColor">Tracker</span> App
          </h1>
          <p className="my-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores,
            quasi assumenda aliquid fugit repellendus ratione, ipsam pariatur
            suscipit modi veniam deleniti vitae unde enim molestiae ullam
            possimus exercitationem fugiat aperiam!
          </p>
          <Link to="/register">
            <button className="bgColor border-0 rounded px-3 py-2 fs-6 me-2">
              Register
            </button>
          </Link>

          <Link to="/login">
            <button className="bgColor border-0 rounded px-4 py-2">
              Login
            </button>
          </Link>
        </div>
        <div className="w-100 mw-40">
          <img src="hero2.jpg" className="img-fluid" alt="hero_section_image" />
        </div>
      </div>
    </>
  );
}

export default Home;
