import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRobot,
  FaUniversity,
  FaSearch,
  FaArrowRight,
} from "react-icons/fa";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-cyan-500 text-white">

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center justify-between">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6 backdrop-blur-md">
              🇮🇳 AI Powered Government Platform
            </div>

            <h1 className="text-6xl font-extrabold leading-tight">
              Find Government Schemes
              <span className="block text-yellow-300">
                in Seconds
              </span>
            </h1>

            <p className="mt-8 text-xl text-blue-100 leading-9">
              SmartGov AI recommends Central and Tamil Nadu Government
              schemes based on your eligibility using an intelligent
              recommendation engine.
            </p>

            <div className="flex gap-5 mt-10 flex-wrap">

              <Link
                to="/recommend"
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition flex items-center gap-3"
              >
                Find Schemes
                <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition"
              >
                Login
              </Link>

            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 shadow-2xl w-full max-w-md">

              <h2 className="text-3xl font-bold mb-8">
                Platform Highlights
              </h2>

              <div className="space-y-6">

                <Feature
                  icon={<FaSearch />}
                  title="Smart Recommendations"
                />

                <Feature
                  icon={<FaRobot />}
                  title="AI Government Assistant"
                />

                <Feature
                  icon={<FaUniversity />}
                  title="Central + Tamil Nadu Schemes"
                />

              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-4 bg-white/10 rounded-xl p-5 hover:bg-white/20 transition">
      <div className="text-3xl">{icon}</div>
      <div className="font-semibold text-lg">{title}</div>
    </div>
  );
}

export default Home;