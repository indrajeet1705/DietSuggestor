import React from "react";

const DisplayDiet = ({ name, age, weight, height, goal, BMI, mealPlan, userData }) => {
  return (
    <div className="w-[750px] p-5 h-[600px] text-white rounded-3xl shadow-lg shadow-white scrollbar-hide overflow-y-auto">
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
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold text-purple-400">User BMI: {BMI}</h2>
          <div className="mt-4 flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Meal Plan for {mealPlan.name}:</h2>
            <p className="text-gray-400">Based on your goal, here are some meal suggestions:</p>

            {["breakfast", "lunch", "dinner"].map((mealType) => (
              mealPlan[mealType] && (
                <div key={mealType}>
                  <h1 className="text-xl font-semibold text-purple-400 capitalize">{mealType}:</h1>
                  <h2>{mealPlan[mealType].name}</h2>
                  <h2>{mealPlan[mealType].description}</h2>
                  <h2>It has {mealPlan[mealType].calories} calories</h2>
                  <h2>
                    Ingredients:{" "}
                    {mealPlan[mealType].ingredients?.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </h2>
                </div>
              )
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayDiet;
