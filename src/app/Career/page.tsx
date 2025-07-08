"use client";
import { useState } from "react";
import Navbar from "../components/Navbar/page";
import BackgroundImg from "../components/Background/page";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../lib/firebase";
type Info = {
  id: string;
  Job: string;
  Title: string;
  date: string;
  subtitle: string;
};

export default function AboutPage() {
  const [Career, setCareer] = useState<Info[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

    
      // About Me sction
      useEffect(() => {
        const fetchCareer = async () => {
          const querySnapshot = await getDocs(collection(db, "Career"));
          const data = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Info, "id">),
          }));
          setCareer(data); 
        };
        fetchCareer();
      }, []);

  return (
    <>
      <Navbar />
      <div className="relative w-full h-screen">
        {/* Background image */}
        <BackgroundImg></BackgroundImg>

        {/* Overlay content */}
        <div className="relative h-screen">
          <div className="z-10 flex items-center justify-center mt-10">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-10">
              {/* Main Content */}
              <div className="z-10 w-full top-10 px-8">
                {/* About Box */}
                <div className="p-4 rounded-lg shadow-lg mb-4 content-center items-center flex flex-col border border-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-pink-500/40">
                  <h1 className="text-3xl font-bold text-yellow-500">My Career</h1>
                </div>

                <div className="grid grid-cols-1 gap-10 mt-[40px] text-white">
                  <div className="flex flex-col border border-purple-300/40 rounded-[4px] w-full">
                    <div className="w-full h-full">
                      <div className="flex flex-col p-[30px] justify-center items-center gap-[40px]">
                      {Career.map((career)=>(
                        <div className="p-4 rounded-lg shadow-lg mb-4 flex flex-col border border-white transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg w-full md:text-3xl text-xl justify-between hover:bg-pink-500/40" key={career.id}>
                          <div className="flex flex-row justify-between items-center">
                            <h1 className="font-bold text-yellow-500">{career.Title}</h1>
                            <button
                              className="text-[12px] text-amber-500 transition-transform transform hover:scale-110 hover:shadow-lg bg-black p-[10px] rounded-[8px]"
                              onClick={() => setExpandedId(expandedId === career.id ? null : career.id)}
                            >
                              {expandedId === career.id ? "hide details" : "more details"}
                            </button>
                          </div>

                          {/* This is the detail section that shows conditionally */}
                          <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                              expandedId === career.id ? "max-h-[1000px] opacity-100 mt-4" : "max-h-0 opacity-0"
                            }`}
                          >
                            <div className="text-white text-[18px] md:text-[25px] bg-black/30 p-4 rounded-lg border border-purple-300">
                              <div className="flex flex-col">
                                <p><strong>Job Title:</strong></p>
                                <p className="ml-4"> {career.Job}</p>
                              </div>
                              <div className="flex flex-col mt-4">
                                <p><strong>Description:</strong></p>
                                <p className="ml-4"> {career.subtitle}</p>
                              </div>
                              <div className="flex flex-col mt-4">
                                <p><strong>Since:</strong></p>
                                <p className="ml-4"> {career.date}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
