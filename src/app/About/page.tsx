"use client";
import { useState } from "react";
import { useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import Navbar from "../components/Navbar/page";
import BackgroundImg from "../components/Background/page";
import { db } from "../../../lib/firebase";
type Info = {
  id: string;
  AboutSub: string;
  AboutTopic: string;
  TrainTopic: string;
  TrainSub: string;
  TrainDate: string;
  EduTopic: string;
  EduSub: string;
  EduDate: string;
};

export default function AboutPage() {
  const [About, setAbout] = useState<Info[]>([]);
  const [Train, setTrain] = useState<Info[]>([]);
  const [Education, setEducation] = useState<Info[]>([]);

  // About Me sction
  useEffect(() => {
    const fetchAbout = async () => {
      const querySnapshot = await getDocs(collection(db, "About"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Info, "id">),
      }));
      setAbout(data); 
    };
    const fetchTrain = async () => {
      const querySnapshot = await getDocs(collection(db, "Train"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Info, "id">),
      }));
      setTrain(data); 
    };
    const fetchEducation = async () => {
      const querySnapshot = await getDocs(collection(db, "Education"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Info, "id">),
      }));
      setEducation(data); 
    };
    fetchAbout();
    fetchTrain();
    fetchEducation();
  }, []);

  return (
    <>
    <Navbar></Navbar>
      <div className="z-10 relative w-full h-screen">
        {/* Background image */}
        <BackgroundImg></BackgroundImg>

        {/* Overlay content */}
        <div className="relative h-screen">

          <div className="z-10 flex items-center justify-center mt-10">
              <div className="container mx-auto px-4 flex flex-col items-center justify-center gap-10">
                {/* Main Content */}
                <div className="z-10 w-full top-10 px-8">
                  {/* About Box */}
                  <div className="p-4 rounded-lg shadow-lg mb-4 content-center items-center flex flex-col border border-white backdrop-blur-3xl hover:bg-cyan-500/40 transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg">
                    <h1 className="text-3xl font-bold text-orange-500">About Me</h1>
                  </div>
                
                  <div className="w-full h-full">
                    <div className="grid grid-rows-1 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-[40px] text-white">
                    {About.map((about)=>(
                      <div className="flex flex-col border bg-amber-300/40 rounded-[4px] w-full transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg "  key={about.id}>
                        <div className=" text-2xl bg-amber-300/40 flex justify-center items-center p-[4px] rounded-t-[4px]">
                          <h1>{about.AboutTopic}</h1>
                        </div>
                        <div className="w-full h-full">
                          <p className="text-[25px] p-[30px]">{about.AboutSub}</p>
                        </div>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
                

                <div className="z-11 w-full top-10 px-8">
                  <div className="p-4 rounded-lg shadow-lg mb-4 content-center items-center flex flex-col border border-white backdrop-blur-3xl hover:bg-red-500/40 transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg mt-[100px]">
                    <h1 className="text-3xl font-bold text-blue-500">My Trainning</h1>
                  </div>
      
                  <div className="grid grid-rows-1 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-[40px] text-white">
                  {Train.map((train)=>(
                    <div className="flex flex-col border bg-blue-300/40 rounded-[4px] w-full  transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg " key={train.id}>
                      <div className=" text-2xl bg-blue-300/40 flex justify-center items-center p-[4px] rounded-t-[4px]">
                        <h1>{train.TrainTopic}</h1>
                      </div>
                      <div className="p-[30px] flex flex-col gap-4">
                        <p className="text-[25px]">{train.TrainSub}</p>
                        <p className="text-[16px]">Since: {train.TrainDate}</p>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>

                <div className="z-11 w-full top-10 px-8">
                  <div className="p-4 rounded-lg shadow-lg mb-4 content-center items-center flex flex-col border border-white backdrop-blur-3xl hover:bg-pink-500/40 transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg mt-[100px]">
                    <h1 className="text-3xl font-bold text-green-500">My Education</h1>
                  </div>
      
                  <div className="grid grid-rows-1 md:grid-cols-2 sm:grid-cols-1 gap-10 mt-[40px] text-white">
                  {Education.map((educatin)=>(
                    <div className="flex flex-col border bg-green-500/40 rounded-[4px] w-full  transition-transform duration-300 hover:translate-y-[-6px] hover:shadow-lg " key={educatin.id}>
                      <div className=" text-2xl bg-green-500/40 flex justify-center items-center p-[4px] rounded-t-[4px]">
                        <h1>{educatin.EduTopic}</h1>
                      </div>
                      <div className="p-[30px] flex flex-col gap-4">
                        <p className="text-[25px]">{educatin.EduSub}</p>
                        <p className="text-[16px]">Since: {educatin.EduDate}</p>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>

              </div>
          </div>
        </div>
      </div>
    </>
  );
}


