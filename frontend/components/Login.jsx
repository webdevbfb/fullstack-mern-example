import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        fetch('http://localhost:3000/login', {
            method: 'POST', // HTTP-Methode
            headers: {
              'Content-Type': 'application/json' // Header, der den Inhaltstyp angibt
            },
            body: JSON.stringify({ // Daten, die im Anfrage-Body gesendet werden
              email: email,
              password: password
            })
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Login failed");
            }
            // leite den User weiter (auf seine Profilseite zbsp)
        })
        .catch(() => setMessage("Bitte kontrolliere deine Daten"))
    }

    return (
        <section className="form-wrapper">
            <h1>Login</h1>
            <p className="form-info">{message}</p>
            <form onSubmit={onSubmit}>
                <div className="input-section">
                    <label htmlFor="email">E-Mail-Adresse</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="input-section">
                    <label htmlFor="password">Passwort</label>
                    <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button>Anmelden</button>
            </form>
        </section>
    )
}