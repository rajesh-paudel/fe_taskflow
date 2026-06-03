import React, { useState } from "react";
import { Zap, CheckCircle2, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContactSales() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    workEmail: "",
    jobTitle: "",
    companyName: "",
    companySize: "",
    country: "",
    phone: "",
    reason: "",
    details: "",
    marketingConsent: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    <section className="bg-white text-gray-900 py-24 px-6 md:px-12 min-h-screen flex items-center justify-center font-sans antialiased selection:bg-blue-100">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-5">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.1]">
              Contact our sales team
            </h1>
            <p className="text-gray-500 text-xl leading-relaxed max-w-md">
              Get help with custom scale pricing, schedule a detailed technical
              demo, or explore specific security use-cases for your team.
            </p>
          </div>

          <div className="space-y-6 border-t border-gray-200 pt-10">
            <h2 className="text-sm font-bold tracking-wider text-gray-400 uppercase">
              Why scaling teams choose TaskFlow
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 flex-shrink-0">
                  <CheckCircle2 size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900">
                    Dedicated Enterprise Clusters
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Isolate data workflows with customized regional SLA and
                    continuous up-time guarantees.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-0.5 w-6 h-6 rounded-md bg-purple-50 flex items-center justify-center text-purple-600 border border-purple-100 flex-shrink-0">
                  <Zap size={16} strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-900">
                    Advanced Admin Controls
                  </h4>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    Granular SAML SSO, user provisioning, audit logging
                    capabilities, and workspace restrictions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Rajesh"
                  required
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded-md shadow-3xs placeholder-gray-300 focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Paudel"
                  required
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded-md shadow-3xs placeholder-gray-300 focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Work email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded-md shadow-3xs focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all"
                  value={formData.workEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, workEmail: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Job title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded-md shadow-3xs focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Company name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="TaskFlow Inc."
                  required
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded-md shadow-3xs placeholder-gray-300 focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Company size <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 text-base text-gray-600 bg-white border border-gray-200 rounded-md shadow-3xs focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[size:0.75rem_auto] bg-[position:right_1rem_center] bg-no-repeat"
                  value={formData.companySize}
                  onChange={(e) =>
                    setFormData({ ...formData, companySize: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="1-10">1 - 10 employees</option>
                  <option value="11-50">11 - 50 employees</option>
                  <option value="51-200">51 - 200 employees</option>
                  <option value="201-500">201 - 500 employees</option>
                  <option value="501+">501+ employees</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Country or region <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded-md shadow-3xs focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[size:0.75rem_auto] bg-[position:right_1rem_center] bg-no-repeat"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                >
                  <option value="Nepal">Nepal</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="India">India</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Phone number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="(123) 456-7891"
                  required
                  className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded-md shadow-3xs placeholder-gray-300 focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Reason for contact <span className="text-red-500">*</span>
              </label>
              <select
                required
                className="w-full px-4 py-3 text-base text-gray-600 bg-white border border-gray-200 rounded-md shadow-3xs focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[size:0.75rem_auto] bg-[position:right_1rem_center] bg-no-repeat"
                value={formData.reason}
                onChange={(e) =>
                  setFormData({ ...formData, reason: e.target.value })
                }
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="pricing">
                  I want to discuss enterprise pricing plans
                </option>
                <option value="demo">
                  I would like a product demo requested
                </option>
                <option value="security">
                  Security & Compliance evaluation parameters
                </option>
                <option value="other">Other institutional requirements</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Provide more details <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="How are you looking to use TaskFlow?"
                required
                className="w-full px-4 py-3 text-base text-gray-900 bg-white border border-gray-200 rounded-md shadow-3xs placeholder-gray-400 focus:outline-hidden focus:border-gray-400 focus:ring-1 focus:ring-gray-400/20 transition-all resize-y min-h-[110px]"
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="marketingConsent"
                className="mt-1 w-4 h-4 rounded-sm accent-primary border-gray-300 focus:ring-0 cursor-pointer"
                checked={formData.marketingConsent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    marketingConsent: e.target.checked,
                  })
                }
              />
              <label
                htmlFor="marketingConsent"
                className="text-sm text-gray-700 leading-normal select-none cursor-pointer"
              >
                I agree to TaskFlow sending marketing communications about
                productivity resources.
              </label>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-3 text-base font-semibold text-primary-text bg-primary hover:bg-primary-hover active:scale-[0.99] rounded-md transition-all shadow-sm duration-300 ease-in-out cursor-pointer"
              >
                Contact sales
              </button>
            </div>

            <p className="text-[13px] leading-relaxed text-gray-500">
              You may unsubscribe from receiving marketing communications any
              time. TaskFlow's websites and communication pipelines are strictly
              subject to our{" "}
              <Link
                to="/privacy-policy"
                className="underline hover:text-gray-600"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>

          <div className="mt-8  text-[16px] text-gray-500">
            <p>
              For technical or product support, email us at{" "}
              <a
                href="mailto:support@taskflow.com"
                className="text-blue-600 hover:text-gray-700 underline "
              >
                support@taskflow.com
              </a>{" "}
              or visit our{" "}
              <Link
                to="/help"
                className="text-blue-600 hover:text-gray-700 underline"
              >
                Help Center
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
