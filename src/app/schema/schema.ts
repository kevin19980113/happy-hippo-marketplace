import { z } from "zod";

export const CreateAccountSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});
//it holds a schema definition of authentication credentials
//which has email and password properties(string type)
//which are required
//and password must be at least 8 characters long otherwise it will throw an error(message)

export type CreateAccountSchemaType = z.infer<typeof CreateAccountSchema>;
//extract the type of AuthCredentialsValidator

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
