import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  User,
  Bookmark,
  Search,
  CheckCircle2,
  MapPin,
  Briefcase,
  Mail,
  IndianRupee,
  Calendar,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const [eligibleCount, setEligibleCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        // Saved Schemes
        const saved =
          JSON.parse(localStorage.getItem("savedSchemes")) || [];

        setSavedCount(saved.length);

        // Eligible Schemes
        const res = await axios.post(
          "http://localhost:5000/api/recommend",
          {
            age: user?.age,
            gender: user?.gender,
            occupation: user?.occupation,
            income: user?.income,
            state: user?.state,
            district: user?.district,
            category: user?.category,
          }
        );

        setEligibleCount(res.data.length);
      } catch (err) {
        console.log(err);
      }
    };

    loadDashboard();
  }, []);

  const profileFields = [
    user.name,
    user.email,
    user.gender,
    user.age,
    user.income,
    user.occupation,
    user.state,
    user.district,
    user.category,
  ];

  const completedFields = profileFields.filter(Boolean).length;

  const profileCompletion = Math.round(
    (completedFields / profileFields.length) * 100
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100">

        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Hero Section */}

          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl bg-gradient-to-r from-blue-700 to-cyan-600 p-10 text-white shadow-xl"
          >
            <h1 className="text-4xl font-bold">
              Welcome, {user?.name || "Citizen"} 👋
            </h1>

            <p className="mt-4 text-lg text-blue-100">
              AI-powered platform that recommends Central and Tamil Nadu
              Government Schemes based on your eligibility.
            </p>

            <div className="flex gap-12 mt-8">

              <div>
                <h2 className="text-4xl font-bold">
                  {eligibleCount}
                </h2>

                <p className="text-blue-100">
                  Eligible Schemes
                </p>
              </div>

              <div>
                <h2 className="text-4xl font-bold">
                  {savedCount}
                </h2>

                <p className="text-blue-100">
                  Saved Schemes
                </p>
              </div>

            </div>

          </motion.div>

          {/* Statistics */}

          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <StatCard
              title="Eligible Schemes"
              value={eligibleCount}
              icon={<Search size={30} />}
            />

            <StatCard
              title="Saved Schemes"
              value={savedCount}
              icon={<Bookmark size={30} />}
            />

            <StatCard
              title="Profile Completion"
              value={`${profileCompletion}%`}
              icon={<CheckCircle2 size={30} />}
            />

          </div>

          {/* Quick Actions */}

          <h2 className="text-3xl font-bold mt-14 mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <ActionCard
              title="Find Schemes"
              description="Get personalised recommendations instantly."
              icon={<Search />}
              link="/recommend"
            />

            <ActionCard
              title="Saved Schemes"
              description="View your bookmarked schemes."
              icon={<Bookmark />}
              link="/saved"
            />

            <ActionCard
              title="My Profile"
              description="Update your personal information."
              icon={<User />}
              link="/profile"
            />

          </div>

          {/* Profile */}

          <Card className="mt-12 rounded-3xl shadow-lg">

            <CardContent className="p-8">

              <h2 className="text-2xl font-bold mb-8">
                Profile Summary
              </h2>

              <div className="grid md:grid-cols-2 gap-5">

                <ProfileItem
                  icon={<User />}
                  label="Full Name"
                  value={user?.name}
                />

                <ProfileItem
                  icon={<Mail />}
                  label="Email"
                  value={user?.email}
                />

                <ProfileItem
                  icon={<User />}
                  label="Gender"
                  value={user?.gender}
                />

                <ProfileItem
                  icon={<Calendar />}
                  label="Age"
                  value={user?.age}
                />

                <ProfileItem
                  icon={<IndianRupee />}
                  label="Annual Income"
                  value={
                    user?.income
                      ? `₹${user.income}`
                      : "Not Updated"
                  }
                />

                <ProfileItem
                  icon={<Briefcase />}
                  label="Occupation"
                  value={user?.occupation}
                />

                <ProfileItem
                  icon={<MapPin />}
                  label="State"
                  value={user?.state}
                />

                <ProfileItem
                  icon={<MapPin />}
                  label="District"
                  value={user?.district}
                />

                <ProfileItem
                  icon={<User />}
                  label="Category"
                  value={user?.category}
                />

              </div>

            </CardContent>

          </Card>

        </div>

      </div>
    </>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <Card className="rounded-2xl shadow-md hover:shadow-xl transition duration-300">

      <CardContent className="p-6 flex justify-between items-center">

        <div>

          <p className="text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>

        </div>

        <div className="text-blue-600">
          {icon}
        </div>

      </CardContent>

    </Card>
  );
}

function ActionCard({ title, description, icon, link }) {
  return (
    <Card className="rounded-2xl hover:shadow-xl transition duration-300">

      <CardContent className="p-6">

        <div className="text-blue-600 mb-4">
          {icon}
        </div>

        <h2 className="text-xl font-bold">
          {title}
        </h2>

        <p className="text-slate-500 mt-3">
          {description}
        </p>

        <Button
          asChild
          className="mt-6 w-full"
        >
          <Link to={link}>
            Open
          </Link>
        </Button>

      </CardContent>

    </Card>
  );
}

function ProfileItem({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 bg-slate-100 rounded-xl p-4">

      <div className="text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-slate-500 text-sm">
          {label}
        </p>

        <p className="font-semibold">
          {value || "Not Updated"}
        </p>

      </div>

    </div>
  );
}

export default Dashboard;