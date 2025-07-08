"use client";
import { useState } from "react";
import { useEffect } from "react";
import { doc, getDocs, updateDoc, collection } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";

type Info = {
  data: string,
  id: string,
  Img: string,
  background: string,
  profile: string,
}

export default function EditHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [Img, setImg] = useState<Info[]>([]);
  const [updateProfile, setUpdateProfile] = useState("");
  const [updateBackground, setUpdateBackground] = useState("");

  useEffect(() => {
    const fetchImg = async () => {
      const querySnapshot = await getDocs(collection(db, "Img"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Info, "id">),
      }));
      setImg(data);
    };
    fetchImg();
  }, []);

  const handleUpdate = async () => {
  if (!updateProfile || !updateBackground) {
    alert("⚠️ Please fill in all fields.");
    return;
  }

  try {
    // Example: update the first document in Img collection
    const targetDocId = Img[0]?.id;

    if (!targetDocId) {
      alert("❌ No document found to update.");
      return;
    }

    const docRef = doc(db, "Img", targetDocId);
    await updateDoc(docRef, {
      profile: updateProfile,
      background: updateBackground,
    });

    alert("✅ Info successfully updated!");
    setMenuOpen(false);
    setUpdateProfile("");
    setUpdateBackground("");
  } catch (error) {
    console.error("Error updating document:", error);
    alert("❌ Failed to update. Check your connection.");
  }
};

  return (
    <nav className="sticky top-18 z-49">
      <div className="flex items-center justify-center bg-yellow-500 w-1/4 p-[20px]">

        {/* Mobile Toggle Button */}
        <button
          className="text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <h1>Close Edit</h1> : <h1>Edit</h1>}
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
                  placeholder="Profile"
                  className="border border-blue-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={updateProfile}
                  onChange={(e) => setUpdateProfile(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Background"
                  className="border border-blue-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={updateBackground}
                  onChange={(e) => setUpdateBackground(e.target.value)}
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
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                  ✅ Yes, Update
                </button>
              </div>
            </div>
          </div>
      )}
    </nav>
  );
}