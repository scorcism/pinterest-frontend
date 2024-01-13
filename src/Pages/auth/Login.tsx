import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { MailCheck, ShieldAlert } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import { Link } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit
  } = useForm<Inputs>();

  const handleLogin: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <AuthComponentWrapper>
      <Flex className="" direction="column" gap="4">
        <Heading align="center">
          Login to{" "}
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
        <Flex direction="column" gap="4">
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
          </Box>
          <Box>
            <TextField.Root>
              <TextField.Slot>
                <ShieldAlert height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                size="3"
                placeholder="Enter you password"
                type="password"
                {...register("password", { required: true, min: 6 })}
              />
            </TextField.Root>
          </Box>
          <Text color="red" className="underline"><Link to="/forgot-password">Forgot Password</Link></Text>
        </Flex>
        <Button
          size="3"
          className="cursor-pointer"
          color="red"
          onClick={handleSubmit(handleLogin)}
        >
          Login
        </Button>
        <Heading align="center" as="h4" size="3">
          OR
        </Heading>
        <Text
          size="3"
          className="cursor-pointer border-2 border-blue-600 py-2 rounded-lg text-center font-bold text-blue-600"
        >
          Sign in With Google
        </Text>
      </Flex>
    </AuthComponentWrapper>
  );
};

export default Login;
