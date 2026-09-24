import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  Trash2,
  ExternalLink,
  Building2,
  FileText,
  Bookmark,
} from "lucide-react";

import Navbar from "../components/Navbar";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function SavedSchemes() {
  const [savedSchemes, setSavedSchemes] = useState([]);

  useEffect(() => {
    loadSchemes();

    const update = () => loadSchemes();

    window.addEventListener("storage", update);

    return () => window.removeEventListener("storage", update);
  }, []);

  const loadSchemes = () => {
    const data =
      JSON.parse(localStorage.getItem("savedSchemes")) || [];

    setSavedSchemes(data);
  };

  const removeScheme = (id) => {
    const updated = savedSchemes.filter(
      (scheme) => scheme._id !== id
    );

    localStorage.setItem(
      "savedSchemes",
      JSON.stringify(updated)
    );

    setSavedSchemes(updated);

    window.dispatchEvent(new Event("storage"));

    toast.success("Scheme removed successfully");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50">

        <div className="max-w-7xl mx-auto px-6 py-10">

          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h1 className="text-4xl font-bold text-slate-800">
              ⭐ Saved Government Schemes
            </h1>

            <p className="text-slate-500 mt-2">
              Access all your bookmarked government schemes in one place.
            </p>
          </motion.div>

          {savedSchemes.length === 0 ? (
            <Card className="rounded-2xl shadow-md">

              <CardContent className="py-20 flex flex-col items-center">

                <Bookmark
                  className="text-slate-400 mb-5"
                  size={60}
                />

                <h2 className="text-2xl font-bold mb-2">
                  No Saved Schemes
                </h2>

                <p className="text-slate-500">
                  Save schemes from the recommendation page.
                </p>

              </CardContent>

            </Card>
          ) : (
            <div className="grid gap-6">

              {savedSchemes.map((scheme) => (
                <motion.div
                  key={scheme._id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all">

                    <CardContent className="p-6">

                      <div className="flex justify-between items-start gap-5">

                        <div>

                          <h2 className="text-2xl font-bold text-slate-800">
                            {scheme.name}
                          </h2>

                          <p className="mt-3 text-slate-600">
                            {scheme.description}
                          </p>

                        </div>

                        <Badge>
                          {scheme.category || "Scheme"}
                        </Badge>

                      </div>

                      {scheme.ministry && (
                        <div className="flex items-center gap-2 mt-5 text-slate-700">

                          <Building2 size={18} />

                          {scheme.ministry}

                        </div>
                      )}

                      {scheme.benefits?.length > 0 && (
                        <div className="mt-6">

                          <h3 className="font-semibold mb-3">
                            Benefits
                          </h3>

                          <div className="flex flex-wrap gap-2">

                            {scheme.benefits.map((benefit, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                              >
                                {benefit}
                              </Badge>
                            ))}

                          </div>

                        </div>
                      )}

                      {scheme.documentsRequired?.length > 0 && (
                        <div className="mt-6">

                          <h3 className="font-semibold flex items-center gap-2 mb-3">

                            <FileText size={18} />

                            Documents Required

                          </h3>

                          <div className="flex flex-wrap gap-2">

                            {scheme.documentsRequired.map(
                              (doc, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                >
                                  {doc}
                                </Badge>
                              )
                            )}

                          </div>

                        </div>
                      )}

                      <div className="flex flex-wrap gap-3 mt-8">

                        {scheme.officialApplyLink && (
                          <Button asChild>
                            <a
                              href={scheme.officialApplyLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Apply Now

                              <ExternalLink
                                className="ml-2"
                                size={18}
                              />
                            </a>
                          </Button>
                        )}

                        {scheme.officialWebsite && (
                          <Button variant="outline" asChild>
                            <a
                              href={scheme.officialWebsite}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Official Website
                            </a>
                          </Button>
                        )}

                        <Button
                          variant="destructive"
                          onClick={() =>
                            removeScheme(scheme._id)
                          }
                        >
                          <Trash2
                            className="mr-2"
                            size={18}
                          />

                          Remove

                        </Button>

                      </div>

                    </CardContent>

                  </Card>
                </motion.div>
              ))}

            </div>
          )}

        </div>

      </div>
    </>
  );
}

export default SavedSchemes;