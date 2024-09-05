import { useForm } from "react-hook-form";

export default function UseForm() {
  const { clearErrors } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
    },
  });
  return (
    <form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100vh",
        gap: "0.5rem",
      }}
    >
      <label>First Name</label>
      <input />
      <label>Last Name</label>
      <input />
      <label>age</label>
      <input type="number" />
      <label>Gender Selection</label>
      <select>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  );
}
