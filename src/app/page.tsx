"use client";
import Navbar from "./components/Navbar/page";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaEnvelope, FaWhatsapp, FaGithub } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/firebase";

type Info = {
  id: string;
  Img: string;
  background: string;
  profile: string;
};

export default function Home() {
const [Img, setImg] = useState<Info[]>([]);

  useEffect(() => {
    const fetchImg = async () => {
      const querySnapshot = await getDocs(collection(db, "Img"));
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Info, "id">),
      }));
      setImg(data); // ✅ Now this works
    };
    fetchImg();
  }, []);

  return (
    <>
    <Navbar></Navbar>
    {Img.map((image)=>(
      <div className="relative w-full h-screen" key={image.id}>
        {/* Background image */}
        <img
          src={image.background}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay content */}
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-10">

            {/* Profile Circle Image */}
            <div className="flex-shrink-0">
              <div className="w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={image.profile} //profile image
                  alt="Profile"
                  width={208}
                  height={208}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            {/* Personal Info */}
            <div className="text-white text-center md:text-left max-w-xl">
              <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Hello My name is</h1>
              <div className="flex gap-2 flex-col md:flex-row text-4xl md:text-4xl font-bold mb-4 text-orange-300">
                <h1>Xokananh</h1>
                <h1>Khamsomphou</h1>
              </div>
              </div>
              <div className="flex flex-col gap-5">
                <p className="text-lg md:text-xl leading-relaxed">
                  I am a Junior developer. Wellcome to my site, You can know me more in this site...
                </p>
                <p className="text-[12px] md:text-[14px] leading-relaxed"> Thanks you for visiting.</p>
              <div className=" flex flex-col text-white mt-4">
                <h1 className="text-[12px]">Contact me</h1>
                <div className="flex flex-row gap-10 text-white text-[20px] self-center md:self-start mt-4">
                  <Link href="https://www.facebook.com/share/1FpBn9x7Q2/" target="_blank">
                    <FaFacebook className="hover:text-blue-500 transition-transform duration-300 hover:translate-y-[-3px] hover:shadow-lg" />
                  </Link>
                  <Link href="https://www.instagram.com/p_pele.ksp?igsh=ajlkOTVzdHpvaGdm" target="_blank">
                    <FaInstagram className="hover:text-pink-500 transition-transform duration-300 hover:translate-y-[-3px] hover:shadow-lg" />
                  </Link>
                  <Link href="https://wa.me/8562078401131" target="_blank">
                    <FaWhatsapp className="hover:text-green-500 transition-transform duration-300 hover:translate-y-[-3px] hover:shadow-lg" />
                  </Link>
                  <Link
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=m.saved2005.svk@gmail.com"
                    target="_blank">
                    <FaEnvelope className="hover:text-yellow-300 transition-transform duration-300 hover:translate-y-[-3px] hover:shadow-lg" />
                  </Link>
                  <Link href="https://github.com/Pele-Lap" target="_blank">
                    <FaGithub className="hover:text-gray-400 transition-transform duration-300 hover:translate-y-[-3px] hover:shadow-lg" />
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      ))}
    </>
  );
}