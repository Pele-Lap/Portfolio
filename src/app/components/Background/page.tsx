"use client";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

type Info = {
  id: string;
  Img: string;
  background: string;
};

export default function BackgroundImg() {
const [Img, setImg] = useState<Info[]>([]);

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

  return (
    <>
    {Img.length > 0 && (
      <>
        <img
          src={Img[0].background}
          className=" fixed inset-0 w-full h-full object-cover z-0 blur-[15px]"
        />
        <div className="inset-0 bg-black/40 z-9 flex items-center justify-center fixed w-screen h-screen"></div>
      </>
    )}
    </>
  );
}