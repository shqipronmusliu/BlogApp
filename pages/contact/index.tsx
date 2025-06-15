import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-14 bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col items-center">
      {/* Hero */}
      <motion.section
        className="w-full py-20 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-center shadow-lg"
        initial={{ opacity: 0,}}
        animate={{ opacity: 1,}}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide">Na Kontaktoni</h1>
        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          Jemi gjithmonë të hapur për pyetje, sugjerime ose bashkëpunime të reja. Plotëso formularin më poshtë dhe ekipi ynë do të përgjigjet sa më shpejt!
        </p>
      </motion.section>

      {/* Form Section */}
      <motion.section
        className="max-w-3xl w-full py-16 px-4"
        initial={{ y: 100 }}
        whileInView={{  y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
            Formulari i Kontaktit
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-700 font-medium">Emri juaj</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none text-gray-900 placeholder-blue-400"
                placeholder="Shkruani emrin tuaj"
                required
              />
            </div>
            <div>
              <label className="block text-blue-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none text-gray-900 placeholder-blue-400"
                placeholder="Shkruani email-in tuaj"
                required
              />
            </div>
            <div>
              <label className="block text-blue-700 font-medium">Mesazhi</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none text-gray-900 placeholder-blue-400"
                placeholder="Shkruani mesazhin tuaj"
                required
                rows={4}
              />
            </div>
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mt-4 px-8 py-3 bg-blue-700 text-white rounded-xl font-semibold shadow hover:bg-sky-600 transition"
              >
                Dërgo Mesazhin
              </motion.button>
              {submitted && (
                <div className="text-green-600 text-sm mt-3">
                  Mesazhi u dërgua me sukses!
                </div>
              )}
            </div>
          </form>
        </div>
      </motion.section>

      {/* Contact Info */}
      <motion.section
        className="w-full py-14 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-center shadow-inner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold mb-4">Ose na kontaktoni direkt:</h2>
        <p className="mb-1">Email: info@blogplatform.com</p>
        <p className="mb-1">Tel: +383 44 123 456</p>
        <p>Adresa: Prishtinë, Kosovë</p>
      </motion.section>
    </div>
  );
}
