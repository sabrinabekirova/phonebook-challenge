import { useEffect, useMemo, useState } from "react";
import "./App.css";

const FALLBACK_CONTACTS = [
    {
        id: 1,
        name: "Elena Gilbert",
        phone: "555-847-2931",
        email: "elena@mysticfalls.com",
        photo: "/assets/Elena.png"
    },
    {
        id: 2,
        name: "Damon Salvatore",
        phone: "555-263-8147",
        email: "damon@salvatore.com",
        photo: "/assets/Damon.jpeg"
    },
    {
        id: 3,
        name: "Stefan Salvatore",
        phone: "555-491-6205",
        email: "stefan@salvatore.com",
        photo: "/assets/Stefan.jpeg"
    },
    {
        id: 4,
        name: "Caroline Forbes",
        phone: "555-738-4926",
        email: "caroline@mysticfalls.com",
        photo: "/assets/Caroline.png"
    },
    {
        id: 5,
        name: "Bonnie Bennett",
        phone: "555-582-1639",
        email: "bonnie@bennett.com",
        photo: "/assets/Bonnie.png"
    },
    {
        id: 6,
        name: "Klaus Mikaelson",
        phone: "555-916-3847",
        email: "klaus@mikaelson.com",
        photo: "/assets/Klaus.png"
    },
    {
        id: 7,
        name: "Elijah Mikaelson",
        phone: "555-372-5918",
        email: "elijah@mikaelson.com",
        photo: "/assets/Elijah.png"
    },
    {
        id: 8,
        name: "Rebekah Mikaelson",
        phone: "555-654-2083",
        email: "rebekah@mikaelson.com",
        photo: "/assets/Rebekah.png"
    },
    {
        id: 9,
        name: "Tyler Lockwood",
        phone: "555-129-7463",
        email: "tyler@lockwood.com",
        photo: "/assets/Tyler.png"
    },
    {
        id: 10,
        name: "Alaric Saltzman",
        phone: "555-845-3192",
        email: "alaric@mysticfalls.com",
        photo: "/assets/Alaric.png"
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
                <h1 className="page__title">Vampire Phone Book</h1>
                <p className="page__subtitle">Find your favorite Mystic Falls resident!</p>
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
                    <ul className="contact-list">
                        <li className="contact-card">
                        <img src="/assets/Elena.png" alt="Elena Gilbert" />
                        <h3>Elena Gilbert</h3>
                        <p>555-847-2931</p>
                        <p>elena@mysticfalls.com</p>
                    </li>
                    <li className="contact-card">
                        <img src="/assets/Damon.jpeg" alt="Damon Salvatore" />
                        <h3>Damon Salvatore</h3>
                        <p>555-263-8147</p>
                        <p>damon@salvatore.com</p>
                    </li>
                    <li className="contact-card">
                        <img src="/assets/Stefan.jpeg" alt="Stefan Salvatore" />
                        <h3>Stefan Salvatore</h3>
                        <p>555-491-6205</p>
                        <p>stefan@salvatore.com</p>
                    </li>
                    <li className="contact-card">
                        <img src="/assets/Caroline.png" alt="Caroline Forbes" />
                        <h3>Caroline Forbes</h3>
                        <p>555-738-4926</p>
                        <p>caroline@mysticfalls.com</p>
                    </li>
                    <li className="contact-card">
                        <img src="/assets/Bonnie.png" alt="Bonnie Bennett" />
                        <h3>Bonnie Bennett</h3>
                        <p>555-582-1639</p>
                        <p>bonnie@bennett.com</p>
                        </li>
                    <li className="contact-card">
                        <img src="/assets/Klaus.png" alt="Klaus Mikaelson" />
                        <h3>Klaus Mikaelson</h3>
                        <p>555-916-3847</p>
                        <p>klaus@mikaelson.com</p>
                    </li>
                    <li className="contact-card">
                        <img src="/assets/Elijah.png" alt="Elijah Mikaelson" />
                        <h3>Elijah Mikaelson</h3>
                        <p>555-372-5918</p>
                        <p>elijah@mikaelson.com</p>
                    </li>
                    <li className="contact-card">
                        <img src="/assets/Rebekah.png" alt="Rebekah Mikaelson" />
                        <h3>Rebekah Mikaelson</h3>
                        <p>555-654-2083</p>
                        <p>rebekah@mikaelson.com</p>
                    </li>
                    <li className="contact-card">
                        <img src="/assets/Tyler.png" alt="Tyler Lockwood" />
                        <h3>Tyler Lockwood</h3>
                        <p>555-129-7463</p>
                        <p>tyler@lockwood.com</p>
                    </li>
                    <li className="contact-card">
                        <img src="/assets/Alaric.png" alt="Alaric Saltzman" />
                        <h3>Alaric Saltzman</h3>
                        <p>555-845-3192</p>
                        <p>alaric@mysticfalls.com</p>
                    </li>
                </ul>
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
                            placeholder="000-000-0000"
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
                    &copy; 1-800-FINDAVAMP. The place to find your vampire needs.
                </small>
            </footer>
        </main>
    );
};

export default App;
