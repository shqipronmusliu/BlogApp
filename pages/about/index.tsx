import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/shared/Header";
import React from 'react';

export default function About() {
  return (
    <div className="pt-14 bg-gradient-to-b from-blue-50 to-white min-h-screen">

      {/* Intro Section */}
      <motion.section
        id="about"
        className="w-full py-20 bg-blue-600 text-white text-center px-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Për Ne – Projekti ynë
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
          Ky projekt ka lindur nga dëshira për të krijuar një platformë ku çdo anëtar i komunitetit
          mund të ndanë njohuritë, idetë dhe përvojat e tyre me të tjerët, duke ndërtuar bashkëpunime
          të frytshme dhe duke nxitur inovacionin.
        </p>
      </motion.section>

      {/* Vision and Mission*/}
      <motion.section
        className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h2 className="text-3xl font-semibold text-blue-700 mb-3">Misioni Ynë</h2>
          <p className="text-gray-700 leading-relaxed">
            Të mundësojmë zhvillimin profesional dhe personal përmes përmbajtjeve edukative dhe bashkëpunimeve
            kreative midis përdoruesve.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-blue-700 mb-3">Vizioni Ynë</h2>
          <p className="text-gray-700 leading-relaxed">
            Një komunitet i çelur, ku krijuesit e përmbajtjes gjejnë mbështetje dhe frymëzim për të arritur
            qëllimet e tyre, duke përhapur njohuri në të gjithë rajonin dhe më gjerë.
          </p>
        </div>
      </motion.section>

      {/* Team / Contributors*/}
      <motion.section
        className="max-w-6xl mx-auto py-16 px-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-12">Ekipi Ynë</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Arlind Kurti</h3>
            <p className="text-blue-600 font-medium mb-4">Frontend Developer</p>
            <p className="text-gray-600 text-base leading-relaxed">
              Përgjegjës për ndërtimin e komponentëve React (p.sh., Header, About), krijimin e navigation sticky dhe smooth scroll me Next.js Link, si dhe animacione me Framer Motion.
              Objekton dhe optimizon figurat me Next.js Image, implementon stilim responsive me Tailwind CSS, dhe integron butonat CTA për ndërveprim të shpejtë.
            </p>
          </div>
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-semibold mb-2 text-gray-800">Shqipron Musliu</h3>
            <p className="text-blue-600 font-medium mb-4">Backend Developer</p>
            <p className="text-gray-600 text-base leading-relaxed">
              Përgjegjës për implementimin e funksioneve api, përfshirë hook-un `useFetch` për marrjen e të dhënave të postimeve.
              Menaxhon operacionet CRUD, përfshirë fshirjen e postimeve me `handleDelete`, dhe garanton që kërkesat HTTP të dërgohen dhe përpunohen si duhet.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        id="contact"
        className="w-full py-16 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-center px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Bashkohu me Ne</h2>
        <p className="mb-6">Na shkruani për të mësuar si të kontribuoni në këtë projekt!</p>
        <Link
          href="mailto:info@blogplatform.com"
          className="inline-block px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100 transition"
        >
          Kontaktoni Sot
        </Link>
      </motion.section>
    </div>
  );
}
