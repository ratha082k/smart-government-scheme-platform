import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiSearch } from "react-icons/fi";

const Field = ({ label, name, value, onChange, type = "text", required = false, children, placeholder }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-semibold text-slate-700">{label}{required && <span className="text-red-500"> *</span>}</span>
    {children || (
      <input
        name={name}
        value={value ?? ""}
        onChange={onChange}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />
    )}
  </label>
);

const Select = ({ label, name, value, onChange, options, required = false }) => (
  <Field label={label} name={name} value={value} onChange={onChange} required={required}>
    <select
      name={name}
      value={value ?? ""}
      onChange={onChange}
      required={required}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
    >
      <option value="">Select</option>
      {options.map((item) => <option key={item.value ?? item} value={item.value ?? item}>{item.label ?? item}</option>)}
    </select>
  </Field>
);

const YesNo = ({ label, name, value, onChange }) => (
  <Select
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    options={[
      { value: "true", label: "Yes" },
      { value: "false", label: "No" }
    ]}
  />
);

export default function RecommendationForm({ form, handleChange, handleSubmit, loading }) {
  const [advanced, setAdvanced] = useState(true);

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-7 text-white md:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/15 p-3"><FiSearch size={24} /></div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Find Government Schemes</h1>
            <p className="mt-1 text-sm text-indigo-100">Enter your profile. The system checks eligibility first, then ranks the most relevant schemes.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3 md:p-8">
        <Field label="Age" name="age" value={form.age} onChange={handleChange} type="number" required placeholder="e.g. 22" />
        <Field label="Annual Income (₹)" name="income" value={form.income} onChange={handleChange} type="number" required placeholder="e.g. 245000" />
        <Select label="Gender" name="gender" value={form.gender} onChange={handleChange} required options={["Male", "Female", "Other"]} />
        <Select label="Occupation" name="occupation" value={form.occupation} onChange={handleChange} required options={["Student", "Farmer", "Business", "Self Employed", "Employee", "Unemployed"]} />
        <Select label="Social Category" name="category" value={form.category} onChange={handleChange} required options={["General", "OBC", "MBC", "BC", "SC", "ST"]} />
        <Select label="State" name="state" value={form.state} onChange={handleChange} required options={["Tamil Nadu", "Andhra Pradesh", "Karnataka", "Kerala", "Telangana", "Maharashtra", "Other"]} />
        <Field label="District" name="district" value={form.district} onChange={handleChange} required placeholder="e.g. Thanjavur" />
        <Select label="Education" name="education" value={form.education} onChange={handleChange} options={["8th", "10th", "12th", "Diploma", "Undergraduate", "Postgraduate"]} />
        <Select label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={handleChange} options={["Single", "Married", "Widow", "Divorced"]} />
      </div>

      <div className="mx-6 mb-6 rounded-2xl border border-indigo-100 bg-indigo-50 md:mx-8">
        <button type="button" onClick={() => setAdvanced((v) => !v)} className="flex w-full items-center justify-between px-5 py-4 text-left font-bold text-indigo-900">
          <span>Additional eligibility information</span>
          {advanced ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        {advanced && (
          <div className="grid gap-5 border-t border-indigo-100 p-5 md:grid-cols-2 lg:grid-cols-3">
            <YesNo label="Bank Account" name="bankAccount" value={form.bankAccount} onChange={handleChange} />
            <YesNo label="Income Tax Payer" name="incomeTaxPayer" value={form.incomeTaxPayer} onChange={handleChange} />
            <YesNo label="BPL" name="bpl" value={form.bpl} onChange={handleChange} />
            <YesNo label="Person with Disability" name="disability" value={form.disability} onChange={handleChange} />
            <YesNo label="Minority" name="minority" value={form.minority} onChange={handleChange} />
            <YesNo label="Land Owner" name="landOwner" value={form.landOwner} onChange={handleChange} />
            <YesNo label="Electricity Connection" name="electricityConnection" value={form.electricityConnection} onChange={handleChange} />
          </div>
        )}
      </div>

      <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-5 md:px-8">
        <button disabled={loading} className="rounded-xl bg-indigo-600 px-7 py-3 font-bold text-white shadow-lg transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Finding schemes..." : "Find My Schemes"}
        </button>
      </div>
    </form>
  );
}
