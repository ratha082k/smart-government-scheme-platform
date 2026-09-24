import { useState } from "react";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import RecommendationForm from "../components/recommendation/RecommendationForm";
import SchemeCard from "../components/recommendation/SchemeCard";
import api from "../services/api";

const initialForm = {
  age: "",
  income: "",
  gender: "",
  occupation: "",
  category: "",
  state: "",
  district: "",
  education: "",
  maritalStatus: "",
  bankAccount: "",
  incomeTaxPayer: "",
  bpl: "",
  disability: "",
  minority: "",
  landOwner: "",
  electricityConnection: "",
};

export default function Recommendation() {
  const [form, setForm] = useState(initialForm);
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSearched(true);

    try {
      const payload = {
        ...form,

        age: Number(form.age),

        income: Number(form.income),

        bankAccount:
          form.bankAccount === ""
            ? null
            : form.bankAccount === "true",

        incomeTaxPayer:
          form.incomeTaxPayer === ""
            ? null
            : form.incomeTaxPayer === "true",

        bpl:
          form.bpl === ""
            ? null
            : form.bpl === "true",

        disability:
          form.disability === ""
            ? null
            : form.disability === "true",

        minority:
          form.minority === ""
            ? null
            : form.minority === "true",

        landOwner:
          form.landOwner === ""
            ? null
            : form.landOwner === "true",

        electricityConnection:
          form.electricityConnection === ""
            ? null
            : form.electricityConnection === "true",
      };

      const { data } = await api.post(
        "/recommend",
        payload
      );

      setSchemes(
        Array.isArray(data)
          ? data
          : []
      );

      if (!data?.length) {
        toast(
          "No schemes matched all the supplied eligibility conditions."
        );
      } else {
        toast.success(
          `${data.length} relevant schemes found`
        );
      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to generate recommendations"
      );

      setSchemes([]);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 md:py-10">

        <div className="mx-auto max-w-7xl">

          <RecommendationForm
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
          />

          {loading && (
            <div className="mt-8 rounded-2xl bg-white p-6 text-center font-semibold text-slate-600 shadow-sm">
              Checking eligibility and ranking schemes for your profile...
            </div>
          )}

          {!loading && searched && (
            <section className="mt-10">

              <div className="mb-6">

                <h2 className="text-2xl font-extrabold text-slate-900">
                  Your Recommended Schemes
                </h2>

                <p className="mt-1 text-slate-500">
                  Only schemes that passed the eligibility checks are shown,
                  ranked by profile relevance.
                </p>

              </div>

              {schemes.length === 0 ? (

                <div className="rounded-3xl bg-white p-10 text-center shadow-sm">

                  <h3 className="text-xl font-bold text-slate-800">
                    No matching schemes found
                  </h3>

                  <p className="mt-2 text-slate-500">
                    Try checking your profile details and eligibility information.
                  </p>

                </div>

              ) : (

                <div className="grid gap-6">

                  {schemes.map((scheme) => (
                    <SchemeCard
                      key={scheme._id || scheme.name}
                      scheme={scheme}
                    />
                  ))}

                </div>

              )}

            </section>
          )}

        </div>

      </main>
    </>
  );
}