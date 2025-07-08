import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [entries, setEntries] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate("/");
      return;
    }

    axios.get(`http://localhost:8080/api/user/${username}`)
      .then(res => setUserId(res.data.id))
      .catch(err => console.error("Failed to fetch user info", err));

    axios.get(`http://localhost:8080/api/dairy/getentries/${username}`)
      .then(res => setEntries(res.data))
      .catch(err => console.error("Error fetching entries:", err));
  }, [username, navigate]);

  const refreshEntries = async () => {
    const res = await axios.get(`http://localhost:8080/api/dairy/getentries/${username}`);
    setEntries(res.data);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    if (!userId) return setMessage("User ID not loaded yet.");

    try {
      if (editMode) {
        await axios.put("http://localhost:8080/api/dairy/update", {
          id: selectedEntry.id,
          title,
          description,
          userId,
        });
        setMessage("Entry updated.");
      } else {
        await axios.post("http://localhost:8080/api/dairy/addentry", {
          title,
          description,
          userId,
        });
        setMessage("Entry added.");
      }

      setTitle("");
      setDescription("");
      setEditMode(false);
      setSelectedEntry(null);
      await refreshEntries();
    } catch (error) {
      console.error("Submit error", error);
      setMessage("Failed to submit.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/dairy/delete/${id}`);
      setMessage("Entry deleted.");
      setSelectedEntry(null);
      await refreshEntries();
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const handleSelectEntry = (entry) => {
    setSelectedEntry(entry);
    setEditMode(false);
    setTitle(entry.title);
    setDescription(entry.description);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };


  return (
  <div className="dashboard-wrapper">
    {/* Top Bar */}
    <div className="dashboard-header">
      <h2>Welcome, {username}</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>

    {/* Main Content */}
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="dashboard-sidebar">
        <h3>Entries</h3>
        <button
          className="add-entry-btn"
          onClick={() => {
            setSelectedEntry(null);
            setEditMode(false);
            setTitle("");
            setDescription("");
            setShowForm(true);
          }}
        >
          + Add New Entry
        </button>

        <ul className="entry-list">
          {entries.map(entry => (
            <li key={entry.id}>
              <button
                className="entry-button"
                onClick={() => {
                  handleSelectEntry(entry);
                  setShowForm(false);
                  setEditMode(false);
                }}
              >
                <strong>{entry.title}</strong><br />
                <small>{entry.date}</small>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Panel */}
      <div className="dashboard-main">
        {showForm ? (
          <form onSubmit={handleAddOrUpdate}>
            <h3>{editMode ? "Edit Entry" : "New Entry"}</h3>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">{editMode ? "Update" : "Add"}</button>
          </form>
        ) : selectedEntry ? (
          <div>
            <h3>{selectedEntry.title}</h3>
            <p>{selectedEntry.description}</p>
            <small>{selectedEntry.date}</small>
            <br /><br />
            <button className="edit-btn" onClick={() => {
              setEditMode(true);
              setShowForm(true);
              setTitle(selectedEntry.title);
              setDescription(selectedEntry.description);
            }}>
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(selectedEntry.id)}
            >
              Delete
            </button>
          </div>
        ) : (
          <p>Select or add an entry to view.</p>
        )}
      </div>
    </div>

    {/* Message */}
    {message && <div className="message-bar">{message}</div>}
  </div>
);
}

export default Dashboard;
