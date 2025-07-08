"use client";
import Navbar from "../components/Navbar/page";
import Link from "next/link";
import BackgroundImg from "../components/Background/page";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../../../lib/firebase";
type Info = {
  id: string;
  Img: string;
  date: string;
  link: string;
  name: string;
  subtitle: string;
};

export default function AboutPage() {
  const [Project, setProject] = useState<Info[]>([]);
  
    // About Me sction
    useEffect(() => {
      const fetchProject = async () => {
        const querySnapshot = await getDocs(collection(db, "Project"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Omit<Info, "id">),
        }));
        setProject(data); 
      };
      fetchProject();
    }, []);

  return (
    <>
    <Navbar></Navbar>
      <div className="relative w-full h-screen">
        {/* Background image */}
        <BackgroundImg></BackgroundImg>

        {/* Overlay content */}
        <div className=" relative h-screen">
          <div className="z-10 flex items-center justify-center mt-10">
              <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-10">
                {/* Main Content */}
                <div className="z-10 w-full top-10 px-8">
                  {/* About Box */}
                  <div className="p-4 rounded-lg shadow-lg mb-4 content-center items-center flex flex-col border border-white transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg hover:bg-yellow-400/40">
                    <h1 className="text-3xl font-bold text-green-500">My Projects</h1>
                  </div>
      
                  <div className="grid grid-cols-1 gap-10 mt-[40px] text-white">
                    <div className="flex flex-col border border-purple-300/40 rounded-[4px] w-full">

                      <div className="w-full h-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-[50px] justify-center items-center gap-[60px] ">
                        {Project.map((project)=>(
                          <div className=" border-white border gap-2 p-[30px] items-center md:text-4xl sm:text-3xl text-2xl justify-center flex flex-col rounded-[8px] backdrop-blur-3xl transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg hover:bg-yellow-400/40" key={project.id}>
                            <div className="w-full h-50 md:w-full md:h-60 overflow-hidden shadow-lg rounded-[8px]">
                              <img
                                src={project.Img}
                                alt={project.name}
                                width={50}
                                height={50}
                                className="object-cover w-full h-full"
                              />
                            </div>
                            <div className="self-start flex flex-col w-full p-[10px] gap-1 text-[20px]">
                              <h1>{project.name}</h1>
                              <p>{project.subtitle}</p>
                              <div className="flex flex-row text-[10px] items-center gap-[10px] justify-between md:text-[14px]">
                                <h1>Date : {project.date}</h1>
                                <Link href={project.link} className="bg-green-500 p-[8px] rounded-2xl hover:bg-green-700 transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg">Check here</Link>
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


