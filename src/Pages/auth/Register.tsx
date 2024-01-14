import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { MailCheck, PersonStanding, ShieldAlert } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import { useRegisterUserMutation } from "../../redux/services/AuthApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [registerUser, registerUserResult] = useRegisterUserMutation();

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
      toast.error("Account already exists with the email");
    }
  }, [registerUserResult.isLoading]);

  return (
    <AuthComponentWrapper>
      <Flex className="" direction="column" gap="4">
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
        <Flex direction="column" gap="4">
          <Box>
            <TextField.Root>
              <TextField.Slot>
                <PersonStanding height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                size="3"
                placeholder="Enter your name"
                type="text"
                {...register("name", { required: true, min: 2 })}
              />
            </TextField.Root>
            {errors.name && (
              <Text size="2" color="red" className="pl-1 font-extrabold">
                Name should be atleast 2 characters long.
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
              <Text size="2" color="red" className="pl-1 font-extrabold">
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
              <Text size="2" color="red" className="pl-1 font-extrabold">
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
        >
          Signup With Google
        </Text>
      </Flex>
    </AuthComponentWrapper>
  );
};

export default Register;
