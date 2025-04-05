import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import SingleWord from "./SingleWord";

const DisplayDiet = ({ name, age, goal, BMI, userData,preference }) => {
  console.log("User Data:", userData);
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

  const getPlan = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro-exp-03-25:free",
          messages: [
            {
              role: "user",
              content: `name: ${name}, age: ${age}, BMI: ${BMI}, goal: weight ${goal},i am ${preference}. Suggest a short diet plan summary.`,
            },
          ],
        }),
      });

      const data = await response.json();
      console.log("Response data:", data);
      setPlan(data?.choices?.[0]?.message?.content || "No plan generated.");
    } catch (error) {
      setPlan("An error occurred while fetching the meal plan.");
      console.error("Error fetching meal plan:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(plan)
  useEffect(()=>{getPlan()},[userData])

  return (
    <div className="w-[800px] p-5 h-[600px] text-white rounded-3xl shadow-xl shadow-slate-500 scrollbar-hide overflow-y-auto">
      <h2 className="text-2xl font-bold text-purple-400">User Data:</h2>

      {userData.length === 0 ? (
        <p className="text-gray-400">No data submitted yet.</p>
      ) : (
        <>
          <ul className="mt-4">
            {userData.map((user, index) => (
              <li key={index} className="mb-4 p-3 bg-gray-800 rounded-lg">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Weight:</strong> {user.weight} kg</p>
                <p><strong>Height:</strong> {user.height} cm</p>
                <p><strong>Goal:</strong> {user.goal}</p>
                <p><strong>Preference:</strong> {user.preference}</p>

              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-purple-400">User BMI: {BMI}</h2>

          <div className="mt-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Meal Plan:</h2>
            <p className="text-gray-400">Based on your goal, here are some meal suggestions:</p>

            <button
              onClick={getPlan}
              disabled={loading}
              className="p-2 bg-purple-400 hover:bg-purple-500 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate Plan"}
            </button>

            {plan && <SingleWord text={plan} speed={100} />}
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayDiet;
