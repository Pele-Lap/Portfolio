"use client";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";

export default function EditProgram() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [Icon, setIcon] = useState("");
  const [Program, setProgram] = useState("");

  const handleAddProgram = async () => {
  if (!Icon || !Program) {
    alert("⚠️ Please fill in both fields before submitting.");
    return;
  }

  try {
    await addDoc(collection(db, "Programming"), {
      Icon: Icon,
      ProgramLanguage: Program,
      createdAt: new Date().toISOString(), // Optional: Add timestamp
    });

    alert("✅ Info successfully added!");
    setIcon("");
    setProgram("");
    setMenuOpen(false);
  } catch (error) {
    console.error("Error adding document:", error);
    alert("❌ Failed to add. Check your connection.");
  }
};


  return (
    <nav className="sticky top-18 z-20">
      <div className="flex items-center justify-center bg-yellow-500 w-fit p-[20px]">

        {/* Mobile Toggle Button */}
        <button
          className="text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <h1>Close</h1> : <h1>Add Program Language</h1>}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 px-4 backdrop-blur-3xl">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 animate-fade-in">
              <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">
                ✏️ Update Your Info
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Icon Url"
                  className="border border-blue-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={Icon}
                  onChange={(e) => setIcon(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Name Program Language"
                  className="border border-blue-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={Program}
                  onChange={(e) => setProgram(e.target.value)}
                />
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                >
                  ❌ Cancel
                </button>
                <button
                  onClick={handleAddProgram}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  ✅ Yes, Add
                </button>
              </div>
            </div>
          </div>
      )}
    </nav>
  );
}