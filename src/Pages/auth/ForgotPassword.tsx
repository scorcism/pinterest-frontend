import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import {
    MailCheck
} from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import { Link } from "react-router-dom";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const ForgotPassword = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleResetPassword: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };


  return (
    <AuthComponentWrapper>
    <Flex className="" direction="column" gap="4">
      <Heading align="center">
        Forgot Password - {" "}
        <span
          style={{
            backgroundClip: "text",
            backgroundImage: "linear-gradient(90deg, red, blue)",
            color: "transparent",
          }}
        >
          Memories
        </span>
      </Heading>
      <Flex direction="column" gap="2">
        <Box>
          <TextField.Root>
            <TextField.Slot>
              <MailCheck height="16" width="16" />
            </TextField.Slot>
            <TextField.Input
              size="3"
              placeholder="Enter you email"
              type="email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
          </TextField.Root>
          {errors.email && (
            <Text size="2" color="red" className="pl-1 font-extrabold">
              Enter valid email.
            </Text>
          )}
        </Box>
        <Text>OR <Link className="text-red-800 underline font-bold" to="/login">Login</Link></Text>
      </Flex>
      <Button
        size="3"
        className="cursor-pointer"
        color="red"
        onClick={handleSubmit(handleResetPassword)}
      >
        Send Reset Password Link
      </Button>
    </Flex>
  </AuthComponentWrapper>
  )
}

export default ForgotPassword