import { Link, useNavigate, useParams } from "react-router-dom";
import { useVerifyAccountMutation } from "../../redux/services/AuthApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Box, Heading, Text } from "@radix-ui/themes";

const VerifyAccount = () => {
  const params = useParams();
  const userId = params.id;

  const [verifyAccount, verifyAccountResult] = useVerifyAccountMutation();

  const verifyUser = async () => {
    await verifyAccount({ id: userId });
  };

  useEffect(() => {
    document.title = "Verify Account⚓ | Memories";
    verifyUser();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (verifyAccountResult.isSuccess) {
      toast.success("Account verification complete, Please Login");
    } else if (verifyAccountResult.isError) {
      toast.error("Account verification failed, please use this function");
      setTimeout(() => {
        navigate("/resend-verification-mail");
      }, 3000);
    }
  }, [verifyAccountResult.isLoading]);

  return (
    <>
      {verifyAccountResult.isSuccess && <AccountVerificationComplete />}
      {verifyAccountResult.isError && <AccountVerificationFail />}
    </>
  );
};

const AccountVerificationComplete = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/login");
  }, 3000);

  return (
    <Box className="flex flex-row items-center">
      <Heading as="h3" className="underline text-red-600">
        <Link to="/login">Login</Link>
      </Heading>
    </Box>
  );
};

const AccountVerificationFail = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/forgot-password");
  }, 3000);
  return (
    <>
      <Box className="flex flex-row items-center">
        <Heading>Account Verification Fail</Heading>
        <Text>Please Try again later</Text>
      </Box>
    </>
  );
};

export default VerifyAccount;
