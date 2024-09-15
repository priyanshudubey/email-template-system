import React from "react";
import {
  FiMail,
  FiEdit2,
  FiTrash2,
  FiSend,
  FiArrowRight,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./LandingPageStyle.css";
import Footer from "./Footer";

const Button = ({ children, className, to, ...props }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`px-6 py-2 rounded-md font-semibold flex items-center justify-center ${className}`}
      {...props}>
      {children}
    </button>
  );
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Animation */}
      <header className="bg-teal-600 text-white overflow-hidden">
        <div className="container mx-auto px-6 py-16 text-center relative">
          <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            <span className="inline-block animate-typing overflow-hidden whitespace-nowrap border-r-4 border-white pr-1">
              Powerful Email Template System
            </span>
          </h1>
          <p className="mb-8 text-xl animate-gradient bg-gradient-to-r from-white via-teal-200 to-white bg-300% bg-clip-text text-transparent">
            Create, customize, and send dynamic email templates with ease
          </p>
          <div className="flex justify-center">
            <Button className="bg-white text-teal-600 hover:bg-gray-100 animate-bounce-in">
              Get Started
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-white opacity-10 rounded-full animate-float animation-delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-white opacity-10 rounded-full animate-float animation-delay-2000"></div>
          </div>
        </div>
      </header>

      {/* Feature Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-800">
            Key Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<FiMail className="h-10 w-10" />}
              title="Create Template"
              description={
                <p>
                  Start by creating your template using our easy-to-use editor.
                  Once done, click the <strong>Save</strong> button to store
                  your template.
                </p>
              }
            />
            <FeatureCard
              icon={<FiEdit2 className="h-10 w-10" />}
              title="Edit Template"
              description={
                <p>
                  Modify existing templates easily by selecting the template and
                  clicking the <strong>Edit</strong> button to make changes.
                </p>
              }
            />
            <FeatureCard
              icon={<FiTrash2 className="h-10 w-10" />}
              title="Delete Template"
              description={
                <p>
                  Remove unwanted templates by clicking the{" "}
                  <strong>Delete</strong> button. Your template will be deleted
                  permanently.
                </p>
              }
            />
            <FeatureCard
              icon={<FiSend className="h-10 w-10" />}
              title="Send Email"
              description={
                <p>
                  Once you're ready, you can send the template directly as an
                  email. Just click the <strong>Send</strong> button and you're
                  all set!
                </p>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-teal-600 py-20 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to revolutionize your email campaigns?
          </h2>
          <p className="mb-8 text-xl">
            Join thousands of satisfied users and start creating stunning email
            templates today.
          </p>
          <div className="flex justify-center">
            <Button
              to="/"
              className="bg-white text-teal-600 hover:bg-gray-100">
              Sign In Now
              <FiArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 text-teal-600">{icon}</div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <div className="text-gray-600">{description}</div>
    </div>
  );
}
