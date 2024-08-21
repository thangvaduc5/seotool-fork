export const SpinnerLoading = () => {
    return(
        <div className="container d-flex justify-content-center mx-auto mt-4"
            data-bs-toggle="tooltip" 
            data-bs-placement="top" 
            title="Loading..."
        >
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>
        </div>
    );
}

export default SpinnerLoading;