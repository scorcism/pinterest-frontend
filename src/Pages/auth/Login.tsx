import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { MailCheck, ShieldAlert } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/services/AuthApi";
import { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginUser, loginUserResult] = useLoginUserMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const handleLogin: SubmitHandler<Inputs> = async (data: Inputs) => {
    await loginUser(data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (loginUserResult.isSuccess) {
      // @ts-ignore
      Cookies.set("AUTH_TOKEN", loginUserResult.data.data.token);
      // @ts-ignore
      Cookies.set("AUTH_EMAIL", loginUserResult.data.data.email);
      // @ts-ignore
      Cookies.set("AUTH_USERNAME", loginUserResult.data.data.username);

      navigate("/");
    } else if (loginUserResult.isError) {
      // @ts-ignore
      toast.error(loginUserResult.error?.data.message);
    }
  }, [loginUserResult.isLoading]);

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
          <Text color="red" size="1" className="underline">
            <Link to="/forgot-password">Forgot Password</Link>
          </Text>
        </Flex>
        <Fragment>
          <Button
            disabled={loginUserResult.isLoading ? true : false}
            size="3"
            className="cursor-pointer"
            color="red"
            onClick={handleSubmit(handleLogin)}
          >
            Login
          </Button>
          {loginUserResult.isError && (
            <Text size="2" className="underline text-red-800">
              <Link to="/resent-verification-mail">
                Resend Verification Mail
              </Link>
            </Text>
          )}
        </Fragment>
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
