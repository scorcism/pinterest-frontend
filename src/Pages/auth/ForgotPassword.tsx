import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { MailCheck } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import { Link } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/services/AuthApi";
import { useEffect } from "react";
import toast from "react-hot-toast";

type Inputs = {
  email: string;
};

const ForgotPassword = () => {
  const [forgotPassword, forgotPasswordResult] = useForgotPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const handleResetPassword: SubmitHandler<Inputs> = async (data) => {
    await forgotPassword(data);
  };

  useEffect(() => {
    if (forgotPasswordResult.isSuccess) {
      toast.success("Reset Password Mail has been sent to your account");
    } else if (forgotPasswordResult.isError) {
      toast.error("Invalid Credentials");
    }
  }, [forgotPasswordResult.isLoading]);

  useEffect(() => {
    document.title = "Forgot Password🙃 | Memories";
  }, []);

  return (
    <AuthComponentWrapper>
      <Flex className="" direction="column" gap="4">
        <Heading align="center">
          Forgot Password -{" "}
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
          <Text>
            OR{" "}
            <Link className="text-red-800 underline" to="/login">
              Login
            </Link>
          </Text>
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
  );
};

export default ForgotPassword;
