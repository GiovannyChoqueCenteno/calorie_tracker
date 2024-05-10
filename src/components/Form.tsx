import { useState } from "react";
import { Activity } from "../types";
import { ActivityActions } from "../reducers/activity-reducer";

const categories = [
  { id: 1, name: "Comida" },
  { id: 2, name: "Ejercicio" },
];
type FormProps = {
  dispatch: React.Dispatch<ActivityActions>;
};

const Form: React.FC<FormProps> = ({ dispatch }) => {
  const [activity, setActivity] = useState<Activity>({
    category: 1,
    name: "",
    calories: 0,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    console.log("CAMBIE");
    setActivity((oldActivity) => ({
      ...oldActivity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    }));
  };
  const isValidityActivity = () => {
    const { name, calories } = activity;
    return name.trim() != "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({
      type: "save-activity",
      payload: {
        newActivity: activity,
      },
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="categorys">Categoria :</label>
        <select
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="activity">Actividad :</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Ej. Comida,Jugo de Naranja, Ensalada , Ejercicio ,Pesas ,Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calorie">Calorias : </label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
          placeholder="Calorías. ej. 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar comida" : "Guardar Ejercicio"}
        disabled={!isValidityActivity()}
      />
    </form>
  );
};

export default Form;
