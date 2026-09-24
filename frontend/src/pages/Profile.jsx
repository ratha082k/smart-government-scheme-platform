import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  User,
  Mail,
  Phone,
  Briefcase,
  MapPin,
 Users,
} from "lucide-react";

function Profile() {
  const existingUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [user, setUser] = useState({
    name: existingUser.name || "",
    email: existingUser.email || "",
    phone: existingUser.phone || "",
    occupation: existingUser.occupation || "",
    state: existingUser.state || "",
    district: existingUser.district || "",
    category: existingUser.category || "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const saveProfile = () => {
    localStorage.setItem("user", JSON.stringify(user));

    toast.success("Profile updated successfully");
  };

  const fields = Object.values(user);
  const completed = fields.filter(Boolean).length;
  const percentage = Math.round(
    (completed / fields.length) * 100
  );

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">

        <div className="max-w-5xl mx-auto px-6 py-10">

          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-3xl shadow-xl">

              <CardContent className="p-8">

                <div className="flex items-center justify-between mb-8">

                  <div>

                    <h1 className="text-4xl font-bold">
                      My Profile
                    </h1>

                    <p className="text-slate-500 mt-2">
                      Manage your personal information.
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-slate-500">
                      Profile Completion
                    </p>

                    <h2 className="text-3xl font-bold text-blue-600">
                      {percentage}%
                    </h2>

                  </div>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                  <ProfileInput
                    icon={<User size={18} />}
                    placeholder="Full Name"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                  />

                  <ProfileInput
                    icon={<Mail size={18} />}
                    placeholder="Email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                  />

                  <ProfileInput
                    icon={<Phone size={18} />}
                    placeholder="Phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                  />

                  <ProfileInput
                    icon={<Briefcase size={18} />}
                    placeholder="Occupation"
                    name="occupation"
                    value={user.occupation}
                    onChange={handleChange}
                  />

                  <ProfileInput
                    icon={<MapPin size={18} />}
                    placeholder="State"
                    name="state"
                    value={user.state}
                    onChange={handleChange}
                  />

                  <ProfileInput
                    icon={<MapPin size={18} />}
                    placeholder="District"
                    name="district"
                    value={user.district}
                    onChange={handleChange}
                  />

                  <ProfileInput
                    icon={<Users size={18} />}
                    placeholder="Category"
                    name="category"
                    value={user.category}
                    onChange={handleChange}
                  />

                </div>

                <Button
                  onClick={saveProfile}
                  className="mt-8 w-full h-12"
                >
                  Save Changes
                </Button>

              </CardContent>

            </Card>
          </motion.div>

        </div>

      </div>
    </>
  );
}

function ProfileInput({
  icon,
  placeholder,
  ...props
}) {
  return (
    <div>

      <label className="text-sm font-medium text-slate-600 flex items-center gap-2 mb-2">

        {icon}

        {placeholder}

      </label>

      <Input {...props} />

    </div>
  );
}

export default Profile;