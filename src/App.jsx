import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import DisplayDiet from "./Components/DisplayDiet.jsx";

function App() {
  const [userData, setUserData] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [BMI, setBMI] = useState("N/A");


  const onSubmitData = (data) => {
    const { name, age, weight, height, goal,preference } = data;
    const user = {
      name,
      age: Number(age),
      weight: Number(weight),
      height: Number(height),
      goal,
      preference
    };

    setUserData([user]); 

    calculateBMI(user);
    reset();
  };
  console.log(userData)

  const calculateBMI = (user) => {
    if (user) {
      const bmiValue = (user.weight / (user.height / 100) ** 2).toFixed(2);
      setBMI(bmiValue);
    } else {
      setBMI("N/A");
    }
  };





  return (
    <div className="w-full h-full bg-black fixed flex items-center justify-center">
      <div className="w-[90vw] h-[90vh] flex gap-10 items-center justify-evenly">
        <div className="flex flex-col gap-8 items-center w-[450px] text-white p-5 h-[600px] rounded-3xl shadow-xl shadow-slate-500">
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
            <select {...register("preference", { required: true })} className="rounded-2xl p-2 w-[300px]">
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-vegetarian</option>
            </select>
            <input type="submit" className="bg-blue-600 p-3 px-7 hover:bg-blue-800 rounded-2xl cursor-pointer text-white" />
          </form>
        </div>

        {userData.length > 0 && (
          <DisplayDiet name={userData[0].name} age={userData[0].age} weight={userData[0].weight} height={userData[0].height} goal={userData[0].goal} BMI={BMI}  userData={userData} preference={userData[0].preference} />
        )}
      </div>
    </div>
  );
}

export default App;
