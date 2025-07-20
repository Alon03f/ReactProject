import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        country: "",
        city: "",
        street: "",
        houseNumber: "",
        zip: "",
        isBusiness: false,
        ceoName: "",
        companyName: ""
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            name: formData.firstName + " " + formData.lastName,
            email: formData.email,
            password: formData.password,
            isBusiness: formData.isBusiness,
            ceoName: formData.ceoName,
            companyName: formData.companyName
        };

        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("user", JSON.stringify(newUser));


        navigate("/");
        window.location.reload();
    };

    return (
        <main>
            <h1>הרשמה</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <input name="firstName" placeholder="First name*" required onChange={handleChange} />
                <input name="lastName" placeholder="Last name*" required onChange={handleChange} />
                <input name="email" type="email" placeholder="Email*" required onChange={handleChange} />
                <input name="password" type="password" placeholder="Password*" required onChange={handleChange} />
                <input name="phone" placeholder="Phone*" required onChange={handleChange} />
                <input name="country" placeholder="Country*" required onChange={handleChange} />
                <input name="city" placeholder="City*" required onChange={handleChange} />
                <input name="street" placeholder="Street" onChange={handleChange} />
                <input name="houseNumber" placeholder="House Number" onChange={handleChange} />
                <input name="zip" placeholder="ZIP Code" onChange={handleChange} />

                <label>
                    <input
                        type="checkbox"
                        name="isBusiness"
                        checked={formData.isBusiness}
                        onChange={handleChange}
                    />
                    Register as a business user
                </label>

                {formData.isBusiness && (
                    <>
                        <input
                            name="ceoName"
                            placeholder="Full name of the company's CEO"
                            required
                            onChange={handleChange}
                        />
                        <input
                            name="companyName"
                            placeholder="company name*"
                            required
                            onChange={handleChange}
                        />
                    </>
                )}

                <button type="submit">Sign up</button>
            </form>
        </main>
    );
}

export default RegisterPage;
