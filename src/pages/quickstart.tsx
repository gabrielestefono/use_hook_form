import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  gender: GenderEnum;
  firstName: string;
  lastName: string;
  age: number;
}

export default function Quickstart() {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) =>
    alert(
      `Hi, ${data.firstName} ${data.lastName}, you're ${data.gender} and is ${data.age} years old`
    );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
      <input {...register("firstName", { required: true, maxLength: 20 })} />
      <label>Last Name</label>
      <input
        {...register("lastName", { pattern: /^[A-Za-z]+$/i, required: true })}
      />
      <label>age</label>
      <input
        type="number"
        {...register("age", { min: 18, max: 99, required: true })}
      />
      <label>Gender Selection</label>
      <select {...register("gender")}>
        <option value="female">female</option>
        <option value="male">male</option>
        <option value="other">other</option>
      </select>
      <input type="submit" />
    </form>
  );
}
