import React from "react";
import { motion } from "framer-motion";
import { LiaEditSolid } from "react-icons/lia";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegSave } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./Home.css";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-teal-600 mt-4">
      {/* Hero Section */}
      <motion.div
        className="relative text-center mb-10 p-8 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 rounded-lg shadow-lg overflow-hidden shadow-black"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 3.2 }}>
        <h1 className="text-5xl font-extrabold mb-6 text-white drop-shadow-lg">
          Welcome to the <span className="text-yellow-400">eTemp Store!</span>
        </h1>
        <p className="text-lg text-white tracking-wide leading-relaxed max-w-2xl mx-auto relative z-10 drop-shadow-2xl">
          Easily <span className="font-semibold text-yellow-400">Create</span>,
          <span className="font-semibold text-yellow-400"> Edit</span>,
          <span className="font-semibold text-yellow-400"> Save</span>,
          <span className="font-semibold text-yellow-400"> Delete</span>, and
          <span className="font-semibold text-yellow-400"> Send</span> your
          email templates.
        </p>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-teal-400 opacity-20 blur-3xl"></div>
          <div className="absolute inset-0 bg-teal-600 opacity-10 blur-2xl rounded-full transform scale-150"></div>
        </div>
      </motion.div>

      {/* Instruction Section */}
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.2 }}>
          {/* Step 1: Create Template */}
          <div className="relative p-6 bg-teal-500 rounded-lg shadow-lg text-black shadow-black transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <FaRegSave className="text-white text-3xl" />
              <h2 className="text-2xl font-semibold">Create & Save</h2>
            </div>
            <p>
              Start by creating your template using our easy-to-use editor. Once
              done, click the <strong>Save</strong> button to store your
              template.
            </p>
          </div>

          {/* Step 2: Edit Template */}
          <div className="relative p-6 bg-teal-500 rounded-lg shadow-lg text-black shadow-black transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <LiaEditSolid className="text-blue-600 text-3xl" />
              <h2 className="text-2xl font-semibold">Edit Templates</h2>
            </div>
            <p>
              Modify existing templates easily by selecting the template and
              clicking the <strong>Edit</strong> button to make changes.
            </p>
          </div>

          {/* Step 3: Delete Template */}
          <div className="relative p-6 bg-teal-500 rounded-lg shadow-lg text-black shadow-black transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <RiDeleteBin5Line className="text-red-600 text-3xl" />
              <h2 className="text-2xl font-semibold">Delete Templates</h2>
            </div>
            <p>
              Remove unwanted templates by clicking the <strong>Delete</strong>{" "}
              button. Your template will be deleted permanently.
            </p>
          </div>

          {/* Step 4: Send Template */}
          <div className="relative p-6 bg-teal-500 rounded-lg shadow-lg text-black shadow-black transition-transform duration-300 hover:scale-110 hover:shadow-2xl">
            <div className="flex items-center space-x-4 mb-4">
              <MdEmail className="text-yellow-600 text-3xl" />
              <h2 className="text-2xl font-semibold">Send Emails</h2>
            </div>
            <p>
              Once you're ready, you can send the template directly as an email.
              Just click the <strong>Send</strong> button and you're all set!
            </p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <div className="mt-12 text-center">
          <motion.button
            className="bg-teal-500 hover:bg-teal-800 px-8 py-4 rounded-full text-xl font-semibold shadow-lg text-white"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            Get Started with Your First Template!
          </motion.button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-sm text-black/80">
        <p>&copy; 2024 eTemp Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Home;
