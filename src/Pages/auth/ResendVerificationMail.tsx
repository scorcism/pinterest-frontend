import { Fragment, useEffect } from "react";
import toast from "react-hot-toast";
import { Box, Heading } from "@radix-ui/themes";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import { MailCheck } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResendVerifyAccountMailMutation } from "../../redux/services/AuthApi";
import { Link } from "react-router-dom";

const ResendVerificationMail = () => {
  const [resendVerifyAccountMail, resendVerifyAccountMailResult] =
    useResendVerifyAccountMailMutation();

  type Inputs = {
    email: string;
  };

  const handleResendVerificationLink: SubmitHandler<Inputs> = async (data) => {
    await resendVerifyAccountMail(data);
  };

  useEffect(() => {
    if (resendVerifyAccountMailResult.isSuccess) {
      toast("Verification Mail has been sent");
    } else if (resendVerifyAccountMailResult.isError) {
      toast.error("Internal server error");
    }
  }, [resendVerifyAccountMailResult.isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  return (
    <AuthComponentWrapper>
      <Flex className="" direction="column" gap="4">
        <Heading align="center">
          Resend Verification Mail -{" "}
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
        </Flex>
        <Fragment>
          <Button
            size="3"
            disabled={resendVerifyAccountMailResult.isLoading ? true : false}
            className="cursor-pointer"
            color="red"
            onClick={handleSubmit(handleResendVerificationLink)}
          >
            Send Reset Password Link
          </Button>
        </Fragment>
      </Flex>
    </AuthComponentWrapper>
  );
};

export default ResendVerificationMail;
