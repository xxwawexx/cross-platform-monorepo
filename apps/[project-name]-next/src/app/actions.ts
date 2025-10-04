"use server";

export async function handleFormSubmit(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");

  console.log("--- SERVER ACTION RECEIVED ---");
  console.log("This log is from the SERVER terminal where `pnpm dev` is running.");
  console.log(`Name: ${name}, Email: ${email}`);
  console.log("----------------------------");
}