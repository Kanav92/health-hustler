import { useState } from "react";
import axios from "axios";

function Group3a() {
  const [formData, setFormData] = useState({
    Challenge: {
      steps: "",
      caloriesBurned: "",
      caloriesRunning: "",
      caloriesCycling: "",
    },
    Quote: "",
    Tips: {
      waterIntake: "",
      calorieIntake: "",
      sleepHours: "",
      foodRecommendation: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e, section = null) => {
    const { name, value, type } = e.target;
    const parsedValue = type === "number" ? parseFloat(value) || "" : value;

    if (section === "Challenge") {
      setFormData((prev) => ({
        ...prev,
        Challenge: {
          ...prev.Challenge,
          [name]: parsedValue,
        },
      }));
    } else if (section === "Tips") {
      setFormData((prev) => ({
        ...prev,
        Tips: {
          ...prev.Tips,
          [name]: parsedValue,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    
    try {
      await axios.post("http://localhost:5000/api/v1/chall", formData);
      setSubmitMessage({ text: "Data submitted successfully!", isError: false });
      setFormData({
        Challenge: {
          steps: "",
          caloriesBurned: "",
          caloriesRunning: "",
          caloriesCycling: "",
        },
        Quote: "",
        Tips: {
          waterIntake: "",
          calorieIntake: "",
          sleepHours: "",
          foodRecommendation: "",
        },
      });
    } catch (error) {
      console.error("Error submitting form", error);
      setSubmitMessage({ text: "Failed to submit data", isError: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Fitness Tracker</h1>
          <p className="text-indigo-100">Track your daily fitness metrics and get personalized tips</p>
        </div>

        <div className="p-6 md:p-8">
          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg ${submitMessage.isError ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
              <div className="flex items-center">
                {submitMessage.isError ? (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
                {submitMessage.text}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Challenge Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Daily Challenge Metrics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Steps</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="steps"
                      placeholder="e.g. 10000"
                      value={formData.Challenge.steps}
                      onChange={(e) => handleChange(e, "Challenge")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">steps</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Calories Burned</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="caloriesBurned"
                      placeholder="e.g. 500"
                      value={formData.Challenge.caloriesBurned}
                      onChange={(e) => handleChange(e, "Challenge")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">kcal</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories Burned Running</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="caloriesRunning"
                      placeholder="e.g. 300"
                      value={formData.Challenge.caloriesRunning}
                      onChange={(e) => handleChange(e, "Challenge")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">kcal</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories Burned Cycling</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="caloriesCycling"
                      placeholder="e.g. 200"
                      value={formData.Challenge.caloriesCycling}
                      onChange={(e) => handleChange(e, "Challenge")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">kcal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Motivational Quote
              </h2>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Inspire yourself and others</label>
                <textarea
                  name="Quote"
                  placeholder="e.g. 'The only bad workout is the one that didn't happen'"
                  value={formData.Quote}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-200 focus:border-yellow-500 transition-all"
                />
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Health & Wellness Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Water Intake</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="waterIntake"
                      placeholder="e.g. 2.5"
                      step="0.1"
                      value={formData.Tips.waterIntake}
                      onChange={(e) => handleChange(e, "Tips")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">liters</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Calories to Intake</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="calorieIntake"
                      placeholder="e.g. 2000"
                      value={formData.Tips.calorieIntake}
                      onChange={(e) => handleChange(e, "Tips")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">kcal</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hours of Sleep</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="sleepHours"
                      placeholder="e.g. 7.5"
                      step="0.5"
                      value={formData.Tips.sleepHours}
                      onChange={(e) => handleChange(e, "Tips")}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                    />
                    <span className="absolute right-3 top-3 text-gray-400 text-sm">hours</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Food Recommendation</label>
                  <input
                    type="text"
                    name="foodRecommendation"
                    placeholder="e.g. Salmon with quinoa"
                    value={formData.Tips.foodRecommendation}
                    onChange={(e) => handleChange(e, "Tips")}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-200 focus:border-green-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg text-white font-medium text-lg ${isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'} shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:scale-105`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Submit Data
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Group3a;    