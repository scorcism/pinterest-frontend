import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { MailCheck, ShieldAlert } from "lucide-react";
import { Fragment, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import {
  useGoogleAuthMutation,
  useLoginUserMutation,
} from "../../redux/services/AuthApi";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [loginUser, loginUserResult] = useLoginUserMutation();
  const [googleAuth, googleAuthResult] = useGoogleAuthMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const handleLogin: SubmitHandler<Inputs> = async (data: Inputs) => {
    await loginUser(data);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (loginUserResult.isSuccess) {
      // @ts-expect-error : Define Type
      Cookies.set("AUTH_TOKEN", loginUserResult.data.data.token);
      // @ts-expect-error : Define Type
      Cookies.set("AUTH_EMAIL", loginUserResult.data.data.email);
      // @ts-expect-error : Define Type
      Cookies.set("AUTH_USERNAME", loginUserResult.data.data.username);

      navigate("/");
    } else if (loginUserResult.isError) {
      // @ts-expect-error: Define Type
      toast.error(loginUserResult.error?.data.message);
    }
  }, [loginUserResult.isLoading]);

  const googleAuthFnc = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const code = tokenResponse.code;
      await googleAuth({ code });
    },
    onError: () => {
      toast.error("Erro while Google Auth, Try Later");
      // console.log("google auth error: ", error);
    },
    flow: "auth-code",
  });

  useEffect(() => {
    if (googleAuthResult.isSuccess) {
      //@ts-expect-error: Define Type
      Cookies.set("AUTH_TOKEN", googleAuthResult.data.data.token);
      // @ts-expect-error: Define Type
      Cookies.set("AUTH_EMAIL", googleAuthResult.data.data.email);
      // @ts-expect-error: Define Type
      Cookies.set("AUTH_USERNAME", googleAuthResult.data.data.username);

      navigate("/");
    } else if (googleAuthResult.isError) {
      // @ts-expect-error: Define Type
      toast(googleAuthResult.error.data.message);
    }
  }, [googleAuthResult.isLoading]);

  document.title = "Login🪖 | Memories";

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
          onClick={googleAuthFnc}
        >
          Signup With Google
        </Text>
      </Flex>
    </AuthComponentWrapper>
  );
};

export default Login;
