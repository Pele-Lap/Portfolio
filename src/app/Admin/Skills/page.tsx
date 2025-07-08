"use client";
import AdminNavbar from "../components/AdminNav/page";
import CheckAdmin from "../components/CheckAdmin/page";
import EditProgram from "../components/ProgamEd/page";
import EditFrameWork from "../components/FrameEd/page";
import BackgroundImg from "../../components/Background/page";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../../lib/firebase";
type Info = {
  id: string;
  Icon: string;
  ProgramLanguage: string;
  Framework: string;
};

export default function AboutPage() {
  CheckAdmin();
    const [Program, setProgram] = useState<Info[]>([]);
  const [Framework, setFramework] = useState<Info[]>([]);

  // About Me sction
  useEffect(() => {
    const fetchProgram = async () => {
      const querySnapshot = await getDocs(collection(db, "Programming"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Info, "id">),
      }));
      setProgram(data); 
    };
    const fetchFramework = async () => {
      const querySnapshot = await getDocs(collection(db, "Framework"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Info, "id">),
      }));
      setFramework(data); 
    };
    fetchProgram();
    fetchFramework();
  }, []);

  return (
    <>
    <AdminNavbar></AdminNavbar>
      <div className="relative w-full h-screen">
        <div className="flex flex-row gap-4">
          <EditProgram></EditProgram>
          <EditFrameWork></EditFrameWork>
        </div>
        {/* Background image */}
        <BackgroundImg></BackgroundImg>

        {/* Overlay content */}
        <div className=" relative h-screen">
          <div className="z-10 flex items-center justify-center mt-10">
              <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-10">
                {/* Main Content */}
                <div className="z-10 w-full top-10 px-8">
                  {/* About Box */}
                  <div className="p-4 rounded-lg shadow-lg mb-4 content-center items-center flex flex-col border border-white hover:bg-cyan-500/40 transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg">
                    <h1 className="text-3xl font-bold text-red-500">My Skills</h1>
                  </div>
      
                  <div className="grid grid-cols-1 gap-10 mt-[40px] text-white">
                    <div className="flex flex-col border border-purple-300/40 rounded-[4px] w-full">
                      <div className=" text-2xl sm:text-2xl bg-purple-300/40 flex justify-center items-center p-[4px] rounded-t-[4px] ">
                        <h1>Programming Language</h1>
                      </div>

                      <div className="w-full h-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-[20px] justify-center items-center gap-[20px] ">
                        {Program.map((program)=>(
                          <div className=" border-gray-400 border flex flex-row gap-4 p-[10px] rounded-[4px]  items-center md:text-4xl sm:text-3xl text-2xl justify-center hover:bg-cyan-500/40 transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg" key={program.id}>
                            <div className="w-10 h-10 md:w-15 md:h-15 rounded-full overflow-hidden border-2 border-white shadow-lg">
                              <img
                                src={program.Icon} //profile image
                                alt={program.ProgramLanguage}
                                width={50}
                                height={50}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <h1>{program.ProgramLanguage}</h1>
                          </div>
                        ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col border border-orange-500/70 rounded-[4px] w-full">
                      <div className=" text-2xl sm:text-2xl bg-orange-500/70 flex justify-center items-center p-[4px] rounded-t-[4px] ">
                        <h1>FrameWork</h1>
                      </div>

                      <div className="w-full h-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-[20px] justify-center items-center gap-[20px]">
                        {Framework.map((framwork)=>(
                          <div className=" border-gray-400 border flex flex-row gap-4 p-[10px] rounded-[4px]  items-center md:text-4xl sm:text-3xl text-2xl justify-center hover:bg-cyan-500/40 transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg" key={framwork.id}>
                            <div className="w-10 h-10 md:w-15 md:h-15 rounded-full overflow-hidden border-2 border-white shadow-lg">
                              <img
                                src={framwork.Icon}
                                alt={framwork.Framework}
                                width={50}
                                height={50}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <h1>{framwork.Framework}</h1>
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


