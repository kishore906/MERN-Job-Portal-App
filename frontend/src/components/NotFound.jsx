function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <h1>Oops, Error 404 Page Not Found</h1>
        <button
          type="button"
          className="btn btn-outline-info my-5 d-block mx-auto"
        >
          Go back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
