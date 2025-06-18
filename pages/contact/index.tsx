import { useState } from "react";
import { motion } from "framer-motion";
import useFetch from "hooks/useFetch";
import React from 'react';

export default function Contact() {
  const { error, post } = useFetch("/api/contact");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Emri është i detyrueshëm.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email-i është i detyrueshëm.";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = "Email i pavlefshëm.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mesazhi është i detyrueshëm.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await post({
        name: formData.name,
        email: formData.email,
        message: formData.message,
        
      });
      if (response && !error) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setErrors({ message: "Gabim gjatë dërgimit të mesazhit." });
      }
      } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Gabim i panjohur";
      setErrors({ message });
    }
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
    setErrors({});
  };

  return (
    <div className="pt-14 bg-gradient-to-b from-blue-50 to-white min-h-screen flex flex-col items-center">
      {/* Hero */}
      <motion.section
        className="w-full py-20 bg-gradient-to-r from-blue-700 to-sky-500 text-white text-center shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
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
        whileInView={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
            Formulari i Kontaktit
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Emri */}
            <div>
              <label className="block text-blue-700 font-medium">Emri juaj</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none text-gray-900 placeholder-blue-400"
                placeholder="Shkruani emrin tuaj"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-blue-700 font-medium">Email</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none text-gray-900 placeholder-blue-400"
                placeholder="Shkruani email-in tuaj"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Mesazhi */}
            <div>
              <label className="block text-blue-700 font-medium">Mesazhi</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-3 border-2 border-gray-200 rounded-xl focus:border-gray-400 focus:outline-none text-gray-900 placeholder-blue-400"
                placeholder="Shkruani mesazhin tuaj"
                rows={4}
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>

            {/* Submit + Sukses */}
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
                <div className="text-green-600 text-sm mt-3 bg-green-100 border border-green-400 px-4 py-2 rounded">
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
