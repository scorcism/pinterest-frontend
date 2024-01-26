import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { useGoogleLogin } from "@react-oauth/google";
import Cookies from "js-cookie";
import { MailCheck, ShieldAlert, User } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import {
  useGoogleAuthMutation,
  useRegisterUserMutation,
} from "../../redux/services/AuthApi";

type Inputs = {
  username: string;
  email: string;
  password: string;
};

const Register = () => {
  const [registerUser, registerUserResult] = useRegisterUserMutation();
  const [googleAuth, googleAuthResult] = useGoogleAuthMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleRegister: SubmitHandler<Inputs> = async (data: Inputs) => {
    await registerUser(data);
  };

  useEffect(() => {
    if (registerUserResult.isSuccess) {
      toast("Registration comple, Please verify your account", {
        icon: "🎶",
      });
    } else if (registerUserResult.isError) {
      // @ts-expect-error : Define Type
      toast.error(registerUserResult.error.data.message);
    }
  }, [registerUserResult.isLoading]);

  const googleAuthFnc = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const code = tokenResponse.code;
      await googleAuth({ code });
    },
    onError: () => {
      toast.error("Error While google Auth");
      // console.log("google auth error: ", error);
    },
    flow: "auth-code",
  });

  useEffect(() => {
    if (googleAuthResult.isSuccess) {
      // @ts-expect-error : Define Type
      Cookies.set("AUTH_TOKEN", googleAuthResult.data.data.token);
      // @ts-expect-error : Define Type
      Cookies.set("AUTH_EMAIL", googleAuthResult.data.data.email);
      // @ts-expect-error : Define Type
      Cookies.set("AUTH_USERNAME", googleAuthResult.data.data.username);
      navigate("/");
    } else if (googleAuthResult.isError) {
      // @ts-expect-error : Define Type
      toast(googleAuthResult.error.data.message);
    }
  }, [googleAuthResult.isLoading]);

  document.title = "Register🏋️‍♀️ | Memories";

  return (
    <AuthComponentWrapper>
      <Flex className="" direction="column" gap="2">
        <Heading align="center">
          Register to{" "}
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
        <Flex direction="column" gap="3">
          <Box>
            <TextField.Root>
              <TextField.Slot>
                <User height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                size="3"
                placeholder="Enter your username"
                type="text"
                {...register("username", { required: true, min: 6 })}
              />
            </TextField.Root>
            {errors.username && (
              <Text size="2" color="red" className="pl-1 ">
                Username should be atleast 6 characters long.
              </Text>
            )}
          </Box>
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
              <Text size="2" color="red" className="pl-1 ">
                Enter valid email.
              </Text>
            )}
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
            {!errors.password ? (
              <Text size="2" color="red" className="pl-1">
                Password should be atleast 6 characters long.
              </Text>
            ) : (
              <Text size="2" color="red" className="pl-1 ">
                Password should be atleast 6 characters long.
              </Text>
            )}
          </Box>
        </Flex>
        <Button
          size="3"
          disabled={registerUserResult.isLoading ? true : false}
          className="cursor-pointer"
          color="red"
          onClick={handleSubmit(handleRegister)}
        >
          {"Register"}
        </Button>
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

export default Register;
