import { FiArrowUpRight, FiCheckCircle, FiFileText, FiExternalLink } from "react-icons/fi";

export default function SchemeCard({ scheme }) {
  const score = Number(scheme.eligibilityScore || 0);
  const reasons = scheme.matchReasons || [];

  return (
    <article className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="mb-2 flex flex-wrap gap-2">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">{scheme.schemeType || "Government Scheme"}</span>
            {scheme.ministry && <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">{scheme.ministry}</span>}
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">{scheme.name}</h3>
          <p className="mt-2 leading-6 text-slate-600">{scheme.description}</p>
        </div>
        <div className="shrink-0 rounded-2xl bg-emerald-50 px-4 py-3 text-center">
          <div className="text-2xl font-black text-emerald-700">{score}%</div>
          <div className="text-xs font-semibold text-emerald-700">profile match</div>
        </div>
      </div>

      {reasons.length > 0 && (
        <div className="mt-5 rounded-2xl bg-slate-50 p-4">
          <h4 className="mb-2 text-sm font-bold text-slate-800">Why this appeared</h4>
          <div className="grid gap-2 md:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="flex gap-2 text-sm text-slate-600"><FiCheckCircle className="mt-0.5 shrink-0 text-emerald-600" />{reason}</div>
            ))}
          </div>
        </div>
      )}

      {Array.isArray(scheme.benefits) && scheme.benefits.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-2 text-sm font-bold text-slate-800">Benefits</h4>
          <ul className="grid gap-2 md:grid-cols-2">
            {scheme.benefits.map((benefit) => <li key={benefit} className="text-sm text-slate-600">• {benefit}</li>)}
          </ul>
        </div>
      )}

      {Array.isArray(scheme.documentsRequired) && scheme.documentsRequired.length > 0 && (
        <div className="mt-5 flex gap-2 text-sm text-slate-600"><FiFileText className="mt-0.5 shrink-0" /><span><b>Documents:</b> {scheme.documentsRequired.join(", ")}</span></div>
      )}

      <div className="mt-6 flex flex-wrap gap-3 border-t border-slate-100 pt-5">
        {scheme.officialApplyLink && (
          <a href={scheme.officialApplyLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-bold text-white hover:bg-indigo-700">Apply / Learn More <FiArrowUpRight /></a>
        )}
        {scheme.officialWebsite && scheme.officialWebsite !== scheme.officialApplyLink && (
          <a href={scheme.officialWebsite} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 font-bold text-slate-700 hover:bg-slate-50">Official Website <FiExternalLink /></a>
        )}
      </div>
    </article>
  );
}
