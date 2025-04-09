import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8, y: -30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    rotate: 10,
    x: 100,
    transition: { duration: 0.2 },
  },
};

function App() {
  const [names, setNames] = useState([]);
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const namesQuery = query(
    collection(db, "names"),
    orderBy("timestamp", "asc")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(namesQuery, (snapshot) => {
      const namesList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNames(namesList);
    });
    return () => unsubscribe();
  }, []);

  const handleAddName = async (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    await addDoc(collection(db, "names"), {
      name: newName,
      timestamp: serverTimestamp(),
    });

    setNewName("");
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "names", id));
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) return;

    await updateDoc(doc(db, "names", id), {
      name: editName,
      timestamp: serverTimestamp(),
    });

    setEditId(null);
    setEditName("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0d1117",
        color: "#c9d1d9",
        fontFamily: "Poppins, sans-serif",
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", marginBottom: 40, fontSize: "2rem" }}
        >
          ⚡ Glassy Realtime Names
        </motion.h1>

        <motion.form
          onSubmit={handleAddName}
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 30,
            background: "#161b22",
            padding: "10px 20px",
            borderRadius: 12,
            border: "1px solid #30363d",
          }}
        >
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter name"
            style={{
              flex: 1,
              padding: "10px",
              border: "1px solid #30363d",
              borderRadius: 8,
              background: "#0d1117",
              color: "#c9d1d9",
              outline: "none",
              fontSize: 16,
            }}
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            type="submit"
            style={{
              background: "#238636",
              border: "none",
              borderRadius: 8,
              padding: "10px 16px",
              color: "#fff",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Add
          </motion.button>
        </motion.form>

        <motion.ul
          style={{ listStyle: "none", padding: 0 }}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {names.map(({ id, name }) => (
              <motion.li
                key={id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                style={{
                  background: "#161b22",
                  border: "1px solid #30363d",
                  padding: "14px 20px",
                  marginBottom: 16,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                {editId === id ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleUpdate(id);
                    }}
                    style={{ display: "flex", flex: 1, gap: 10 }}
                  >
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      style={{
                        flex: 1,
                        padding: 8,
                        borderRadius: 8,
                        background: "#0d1117",
                        border: "1px solid #30363d",
                        color: "#c9d1d9",
                        outline: "none",
                      }}
                    />
                    <motion.button whileTap={{ scale: 0.9 }} type="submit">
                      ✅
                    </motion.button>
                    <motion.button
                      type="button"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setEditId(null)}
                    >
                      ❌
                    </motion.button>
                  </form>
                ) : (
                  <>
                    <span style={{ flex: 1 }}>{name}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setEditId(id);
                        setEditName(name);
                      }}
                    >
                      ✏️
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(id)}
                    >
                      🗑️
                    </motion.button>
                  </>
                )}
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
}

export default App;
