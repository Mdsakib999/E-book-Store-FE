import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+$/i.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject) newErrors.subject = "Please select a subject";
    if (!formData.message) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // console.log(formData);
    setIsLoading(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 py-6 sm:py-8 md:py-12 px-2 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-300 via-gray-600 to-gray-900 bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 px-2">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Have questions about our e-books or need support? We'd love to hear
            from you! Our team is here to help make your reading journey
            amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 md:gap-12">
          {/* Contact Information - Left Side */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            {/* Contact Cards */}
            <div className="space-y-4 sm:space-y-6">
              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:transform hover:scale-105">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 sm:p-4 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
                      <svg
                        className="text-white text-lg sm:text-xl w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1">
                        Email Us
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base break-all">
                        support@readify.com
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        We reply within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:transform hover:scale-105">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-3 sm:p-4 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
                      <svg
                        className="text-white text-lg sm:text-xl w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1">
                        Call Us
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        +1 (555) 123-4567
                      </p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Mon-Fri, 9AM-6PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group">
                <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 hover:transform hover:scale-105">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 sm:p-4 rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 flex-shrink-0">
                      <svg
                        className="text-white text-lg sm:text-xl w-5 h-5 sm:w-6 sm:h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-1">
                        Visit Us
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        123 Book Street
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Reading City, RC 12345
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-white/20">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                Follow Us
              </h3>
              <div className="grid grid-cols-4 gap-4">
                <a
                  href="#"
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:scale-110 flex items-center justify-center "
                >
                  <svg
                    className="text-base sm:text-lg w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:scale-110 flex items-center justify-center "
                >
                  <svg
                    className="text-base sm:text-lg w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:scale-110 flex items-center justify-center "
                >
                  <svg
                    className="text-base sm:text-lg w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="bg-blue-800 text-white p-2 rounded-full hover:bg-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl hover:transform hover:scale-110 flex items-center justify-center "
                >
                  <svg
                    className="text-base sm:text-lg w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <div className="bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  Send us a Message
                </h2>
                <p className="text-gray-600 text-sm sm:text-base px-2">
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </p>
              </div>

              {isSubmitted && (
                <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl sm:rounded-2xl animate-pulse">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-green-500 p-1.5 sm:p-2 rounded-full flex-shrink-0">
                      <svg
                        className="text-white text-base sm:text-lg w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-green-800 text-sm sm:text-base">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-green-600 text-xs sm:text-sm">
                        Thank you for reaching out. We'll respond within 24
                        hours.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white text-sm sm:text-base"
                      placeholder="Enter your first name"
                    />
                    {errors.firstName && (
                      <p className="text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.firstName}</span>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 sm:space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-xs sm:text-sm font-semibold text-gray-700"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white text-sm sm:text-base"
                      placeholder="Enter your last name"
                    />
                    {errors.lastName && (
                      <p className="text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                        <span>⚠️</span>
                        <span>{errors.lastName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-semibold text-gray-700"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white text-sm sm:text-base"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="phone"
                    className="block text-xs sm:text-sm font-semibold text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white text-sm sm:text-base"
                    placeholder="Enter your phone number (optional)"
                  />
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="subject"
                    className="block text-xs sm:text-sm font-semibold text-gray-700"
                  >
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white text-sm sm:text-base"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && (
                    <p className="text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.subject}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-xs sm:text-sm font-semibold text-gray-700"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white resize-none text-sm sm:text-base"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  {errors.message && (
                    <p className="text-xs sm:text-sm text-red-500 flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className={`w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl font-semibold text-white text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-gray-400 to-gray-600 hover:from-gray-500 hover:to-black cursor-pointer"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg
                        className="transform group-hover:translate-x-1 transition-transform duration-300 text-sm sm:text-base w-4 h-4 sm:w-5 sm:h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                      <span>Send Message</span>
                    </div>
                  )}
                </button>
              </div>

              <div className="mt-4 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
                <p className="px-2">
                  By submitting this form, you agree to our Privacy Policy and
                  Terms of Service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
