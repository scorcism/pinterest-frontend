import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { ShieldAlert } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import { useResetPasswordMutation } from "../../redux/services/AuthApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

type Inputs = {
  password: string;
  cpassword: string;
};

const ResetPassword = () => {
  const [resetPassword, resetPasswordResult] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const params = useParams();
  const { id, token } = params;
  const handleSubmitForm: SubmitHandler<Inputs> = async (data) => {
    await resetPassword({ id, token, body: data });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (resetPasswordResult.isSuccess) {
      toast.success("Password reset Success, Please Login");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else if (resetPasswordResult.isError) {
      toast.error("Reset Password faild, Please try again");
    }
  }, [resetPasswordResult.isLoading]);

  document.title = "Reset Password🪸 | Memories";

  return (
    <AuthComponentWrapper>
      <Flex className="" direction="column" gap="4">
        <Heading align="center">
          Reset Password -{" "}
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
          <Box>
            <TextField.Root>
              <TextField.Slot>
                <ShieldAlert height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                size="3"
                placeholder="Confirm-Password"
                type="password"
                {...register("cpassword", { required: true, min: 6 })}
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
          disabled={resetPasswordResult.isLoading ? true : false}
          className="cursor-pointer"
          color="red"
          onClick={handleSubmit(handleSubmitForm)}
        >
          Submit
        </Button>
      </Flex>
    </AuthComponentWrapper>
  );
};

export default ResetPassword;
