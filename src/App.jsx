import { useEffect, useMemo, useState } from "react";
import "./App.css";

const FALLBACK_CONTACTS = [
    {
        id: 1,
        name: "Elena Gilbert",
        phone: "(555) 847-2931",
        email: "elena@mysticfalls.com",
        photo: src/assets/Elena.png
    },
    {
        id: 2,
        name: "Damon Salvatore",
        phone: "(555) 263-8147",
        email: "damon@salvatore.com",
        photo: src/assets/Damon.jpeg
    },
    {
        id: 3,
        name: "Stefan Salvatore",
        phone: "(555) 491-6205",
        email: "stefan@salvatore.com",
        photo: src/assets/Stefan.jpeg
    },
    {
        id: 4,
        name: "Caroline Forbes",
        phone: "(555) 738-4926",
        email: "caroline@mysticfalls.com",
        photo: src/assets/Caroline.png
    },
    {
        id: 5,
        name: "Bonnie Bennett",
        phone: "(555) 582-1639",
        email: "bonnie@bennett.com",
        photo: src/assets/Bonnie.png
    },
    {
        id: 6,
        name: "Klaus Mikaelson",
        phone: "(555) 916-3847",
        email: "klaus@mikaelson.com",
        photo: src/assets/Klaus.png
    },
    {
        id: 7,
        name: "Elijah Mikaelson",
        phone: "(555) 372-5918",
        email: "elijah@mikaelson.com",
        photo: src/assets/Elijah.png
    },
    {
        id: 8,
        name: "Rebekah Mikaelson",
        phone: "(555) 654-2083",
        email: "rebekah@mikaelson.com",
        photo: src/assets/Rebekah.png
    },
    {
        id: 9,
        name: "Tyler Lockwood",
        phone: "(555) 129-7463",
        email: "tyler@lockwood.com",
        photo: src/assets/Tyler.png
    },
    {
        id: 10,
        name: "Alaric Saltzman",
        phone: "(555) 845-3192",
        email: "alaric@mysticfalls.com",
        photo: src/assets/Alaric.jpg
    }
];

const App = () => {
    const [contacts, setContacts] = useState(FALLBACK_CONTACTS);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {}, []);

    const [query, setQuery] = useState("");

    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }

    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">Phonebook Challenge</h1>
                <p className="page__subtitle">Build a simple contact directory</p>
            </header>

            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Search Contacts</h2>
                <div className="search__controls">
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name or phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {contacts.length}{" "}
                    {contacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contacts</h2>
            </section>

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add a Contact</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            placeholder="(555) 555-5555"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                    </div>
                    <div className="form__actions">
                        <button className="btn" type="submit" data-testid="btn-add">
                            Add Contact
                        </button>
                    </div>
                </form>
            </section>

            <footer className="page__footer">
                <small>
                    Starter provided. Complete tasks per README and make this page
                    shine.
                </small>
            </footer>
        </main>
    );
};

export default App;
