import Image from "next/image";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/image.jpg";

export default function About() {
  return (
    <div className="pt-14 bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col items-center">
      {/* HERO */}
      <motion.section
        className="w-full py-16 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-center shadow-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide">Rreth Platformës</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed font-light">
          Platforma jonë është ndërtuar për të frymëzuar, ndarë dhe zhvilluar ide të reja përmes blogjeve të krijuara nga përdoruesit tanë.
        </p>
      </motion.section>

      {/* MISIONI, VIZIONI & FOTOJA */}
      <motion.section
        className="w-full py-14 bg-white text-center shadow-inner"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center mb-8 md:mb-0">
            <Image
              src={CustomImage}
              alt="Platforma"
              width={440}
              height={290}
              className="rounded-2xl shadow-2xl object-cover border-4 border-sky-200"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div className="p-6 bg-blue-700 rounded-xl shadow-lg text-white text-lg">
              <h2 className="text-2xl font-bold mb-2 text-white">Misioni Ynë</h2>
              <p>
                Të frymëzojmë dhe fuqizojmë përdoruesit që të shpalosin historitë e tyre përmes një platforme të thjeshtë, moderne dhe të qasshme.
              </p>
            </div>
            <div className="p-6 bg-sky-100 rounded-xl shadow-lg text-blue-800 text-lg">
              <h2 className="text-2xl font-bold mb-2 text-blue-700">Vizioni Ynë</h2>
              <p>
                Të ndërtojmë komunitetin më kreativ dhe mbështetës për shkrim dhe ndarje idesh në Ballkan dhe më gjerë.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* VLERAT */}
      <motion.section
        className="max-w-6xl py-14 px-6 text-center"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold mb-10 text-blue-600">
          Vlerat Që Na Udheheqin
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-xl shadow-md border-2 border-blue-200 text-blue-800 font-semibold text-lg">
            Liria e Shprehjes
          </div>
          <div className="p-8 bg-white rounded-xl shadow-md border-2 border-sky-200 text-blue-800 font-semibold text-lg">
            Diversitet & Respekt
          </div>
          <div className="p-8 bg-white rounded-xl shadow-md border-2 border-blue-200 text-blue-800 font-semibold text-lg">
            Inovacioni & Edukimi
          </div>
        </div>
      </motion.section>

      {/* KONTAKTI */}
      <motion.section
        className="w-full py-10 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col items-center justify-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-2">Na Kontaktoni</h3>
          <p className="mb-1">Email: <a href="mailto:info@blogplatform.com" className="underline">info@blogplatform.com</a></p>
          <p className="mb-1">Tel: +383 44 123 456</p>
          <p>Adresa: Prishtinë, Kosovë</p>
        </div>
      </motion.section>
    </div>
  );
}
