import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { suggestions } from "./suggestions.js";
import DisplayDiet from "./Components/DisplayDiet.jsx";

function App() {
  const [userData, setUserData] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [BMI, setBMI] = useState("N/A");
  const [mealPlan, setMealPlan] = useState({});

  const onSubmitData = (data) => {
    const { name, age, weight, height, goal } = data;
    const user = {
      name,
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      goal,
    };

    setUserData([user]); // Only store the latest user

    calculateBMI(user);
    reset();
  };

  const calculateBMI = (user) => {
    if (user) {
      const bmiValue = (user.weight / (user.height / 100) ** 2).toFixed(2);
      setBMI(bmiValue);
    } else {
      setBMI("N/A");
    }
  };

  const generateMealPlan = () => {
    if (userData.length > 0) {
      const lastUser = userData[0]; // Always take the latest user
      const Breakfast = suggestions.breakfast[Math.floor(Math.random() * suggestions.breakfast.length)];
      const Lunch = suggestions.healthylunch[Math.floor(Math.random() * suggestions.healthylunch.length)];
      const Dinner = suggestions.healthydinner[Math.floor(Math.random() * suggestions.healthydinner.length)];

      setMealPlan({
        name: lastUser.name,
        breakfast: Breakfast,
        lunch: Lunch,
        dinner: Dinner,
      });
    }
  };

  useEffect(() => {
    if (userData.length > 0) generateMealPlan();
  }, [userData]);

  return (
    <div className="w-full h-full bg-black fixed flex items-center justify-center">
      <div className="w-[90vw] h-[90vh] flex gap-10 items-center justify-evenly">
        <div className="flex flex-col gap-8 items-center w-[400px] text-white p-5 h-[600px] rounded-3xl shadow-lg shadow-white">
          <h1 className="font-bold text-3xl">Nutrilens</h1>
          <form onSubmit={handleSubmit(onSubmitData)} className="gap-6 flex text-black flex-col items-center">
            <input type="text" {...register("name", { required: true })} className="rounded-xl p-2 pl-4 w-[300px]" placeholder="Name" />
            <input type="number" {...register("age", { required: true })} className="rounded-xl p-2 pl-4 w-[300px]" placeholder="Age" />
            <input type="number" {...register("weight", { required: true })} className="rounded-xl p-2 pl-4 w-[300px]" placeholder="Weight in kg" />
            <input type="number" {...register("height", { required: true })} className="rounded-xl p-2 pl-4 w-[300px]" placeholder="Height in cm" />
            <select {...register("goal", { required: true })} className="rounded-2xl p-2 w-[300px]">
              <option value="gain">Weight Gain</option>
              <option value="loss">Weight Loss</option>
              <option value="maintain">Maintain</option>
            </select>
            <input type="submit" className="bg-blue-600 p-3 px-7 hover:bg-blue-800 rounded-2xl cursor-pointer text-white" />
          </form>
        </div>

        {userData.length > 0 && (
          <DisplayDiet name={userData[0].name} age={userData[0].age} weight={userData[0].weight} height={userData[0].height} goal={userData[0].goal} BMI={BMI} mealPlan={mealPlan} userData={userData} />
        )}
      </div>
    </div>
  );
}

export default App;
