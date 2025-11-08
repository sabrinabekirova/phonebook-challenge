import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Contact from "./components/Contact/Contact";

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
        photo: "/assets/Stefan.png"
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
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(function(){ //fetches contacts from json file
        setLoading(true);

        fetch("/data/contacts.json")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                setContacts(data);
            })
            .catch(function() {
                setContacts(FALLBACK_CONTACTS);
            });
    }, []);


  const [query, setQuery] = useState("");

  let filteredContacts = contacts;
  if (query.trim() !== "") {
    const q = query.toLowerCase();
    // no case sensiticity
    filteredContacts = contacts.filter(function(contact) {
      const nameLower = contact.name.toLowerCase();

      const phoneLower = String(contact.phone).toLowerCase();
      const nameMatches = nameLower.includes(q);
      const phoneMatches = phoneLower.includes(q);

      //checks if match appears for number orname, wont work if number has dashes
      if (nameMatches || phoneMatches) {
        return true;
      }
      return false;
    });
  }

  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [validationErrors, setValidationErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const errors = {}; // reset errors

    // validate form fields, trim to remove whitespace
    if (!form.name.trim()) errors.name = "Enter a name!"; 
    if (!form.phone.trim()) errors.phone = "Enter a phone number!";
    if (form.email && !form.email.includes("@")) errors.email = "Email needs @!";

    //checks for duplicate phone numbers
    if (contacts.some(contact => contact.phone === form.phone.trim())) {
      errors.phone = "Phone number already exists!";
    }
    //if errors, says why and prevents submission
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    //creates new contacts object
    const newContact = {
      id: Date.now(), //unique ID using date to add contact (adding i tried adding 1 to last ID but got duplicate IDs)
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
    };

    setContacts([newContact, ...contacts]); //adds new contact to beginning of list
    setForm({ name: "", phone: "", email: "" }); //reset form fields
    setValidationErrors({}); //reset validation errors

    if (typeof setCurrentPage === "function") setCurrentPage(0);
  }

  const currentContact = filteredContacts[currentPage];

    return (
        <>
            <img src="/assets/blood.png" alt="" className="blood" />
            <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">Vampire Phone Book</h1>
                <p className="page__subtitle">Find your favorite Mystic Falls resident!</p>
            </header>
            <img src="/assets/divider.svg" alt="" className="header-divider" />

            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Search Contacts</h2>
                <div className="search__controls">
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name or phone"
                        value={query}
                        onChange={function(e) { setQuery(e.target.value); }}
                        data-testid="search-input"
                    />
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {filteredContacts.length}{" "}
                    {filteredContacts.length === 1
                        ? "result"
                        : "results"}
                    {loading
                        ? " (loading...)"
                        : ""}
                </p>
            </section>
            <section className="contacts">
                <div className="paging">
                    <button
                        className="arrow-left"
                        onClick={function() { setCurrentPage(currentPage - 1); }}
                        disabled={currentPage === 0}
                        aria-label="Previous contact"
                    >
                        <img src="/assets/arrow.png" alt="" />
                    </button>
                    <div className="page-content"> {/*displays current contact information*/}
                        {filteredContacts.length > 0
                            ? (
                                <>
                                    <ul className="contact-list">
                                        <li key={currentContact.id}>
                                            <Contact
                                                email={currentContact.email}
                                                name={currentContact.name}
                                                phone={currentContact.phone}
                                                photo={currentContact.photo}
                                            />
                                        </li>
                                    </ul>
                                    <p className="page-info">
                                        {currentPage + 1} of {filteredContacts.length}
                                    </p>
                                </>
                            )
                            :(
                                <p className="no-results">No contacts found</p>
                            )}
                    </div>
                    <button
                        className="arrow-right"
                        onClick={function() { setCurrentPage(currentPage + 1); }} //go to next contact
                        disabled={currentPage === filteredContacts.length - 1} //disable if on last contact
                        aria-label="Next contact"
                    >
                        <img src="/assets/arrow.png" alt="" />
                    </button>
                </div>
            </section>

                    {/* <ul className="contact-list">
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
                        <img src="/assets/Stefan.png" alt="Stefan Salvatore" />
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
            </section> */}

            <img src="/assets/divider2.svg" alt="" className="section-divider" />

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add a Contact</h2>
                <form className="form__body" onSubmit={handleSubmit} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                        {validationErrors.name && (
                            <span className="error-message">{validationErrors.name}</span> //displays error message if name validation fails
                        )}
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            placeholder="Phone Number: 222-222-2222"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                        />
                        {validationErrors.phone && (
                            <span className="error-message">{validationErrors.phone}</span> //displays error message if phone validation fails
                        )}
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />
                        {validationErrors.email && (
                            <span className="error-message">{validationErrors.email}</span> //displays error message if email validation fails
                        )}
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
        </>
    );
};

export default App;
