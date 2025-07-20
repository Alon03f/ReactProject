function CreateCardPage() {
    return (
        <main>
            <h1>CREATE CARD</h1>
            <form>
                <div className="card-form">
                    <input type="text" placeholder="Title*" required />
                    <input type="text" placeholder="Subtitle*" required />
                    <input type="text" placeholder="Description*" required />
                    <input type="email" placeholder="Email*" required />
                    <input type="text" placeholder="Phone*" required />
                    <input type="url" placeholder="Image url" />
                    <input type="url" placeholder="Image alt" />
                    <input type="text" placeholder="Web" />
                    <input type="text" placeholder="State" />
                    <input type="text" placeholder="Country*" required />
                    <input type="text" placeholder="City*" required />
                    <input type="text" placeholder="Street*" required />
                    <input type="text" placeholder="House number*" required />
                    <input type="text" placeholder="Zip" />
                </div>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <button type="button" className="cancel">CANCEL</button>
                    <button type="submit" className="success">SUBMIT</button>
                </div>
            </form>
        </main>
    );
}

export default CreateCardPage;