function Alert({ type = "success", message }) {
    if (!message) return null;
    return (
        <div className={`alert${type === "error" ? " error" : ""}`}>
            {message}
        </div>
    );
}

export default Alert;