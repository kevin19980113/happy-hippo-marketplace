import { z } from "zod";

export const AuthCredentialsValidator = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});
//it holds a schema definition of authentication credentials
//which has email and password properties(string type)
//which are required
//and password must be at least 8 characters long otherwise it will throw an error(message)

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
//extract the type of AuthCredentialsValidator
