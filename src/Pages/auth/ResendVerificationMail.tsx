import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import { MailCheck } from "lucide-react";
import { Fragment, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AuthComponentWrapper from "../../Components/AuthComponentWrapper";
import { useResendVerifyAccountMailMutation } from "../../redux/services/AuthApi";

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
    // console.log(resendVerifyAccountMailResult);
    if (resendVerifyAccountMailResult.isSuccess) {
      toast("Verification Mail has been sent");
    } else if (resendVerifyAccountMailResult.isError) {
      // @ts-expect-error: Define Type
      toast.error(`${resendVerifyAccountMailResult.error.data.message}`);
    }
  }, [resendVerifyAccountMailResult.isLoading]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  document.title = "Resend Verification🐪 | Memories";

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
            Submit
          </Button>
        </Fragment>
      </Flex>
    </AuthComponentWrapper>
  );
};

export default ResendVerificationMail;
