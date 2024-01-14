import { Link, useNavigate, useParams } from "react-router-dom";
import { useVerifyAccountMutation } from "../../redux/services/AuthApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Box, Heading } from "@radix-ui/themes";

const VerifyAccount = () => {
  const params = useParams();
  const userId = params.id;

  const [verifyAccount, verifyAccountResult] = useVerifyAccountMutation();

  const verifyUser = async () => {
    await verifyAccount({ id: userId });
  };

  useEffect(() => {
    verifyUser();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    if (verifyAccountResult.isSuccess) {
      toast.success("Account verification complete, Please Login");
    } else if (verifyAccountResult.isError) {
      toast.error("Account verification failed, please use this function");
      setTimeout(() => {
        navigate("/resent-verification-mail");
      }, 3000);
    }
  }, [verifyAccountResult.isLoading]);

  return (  
    <>
      {verifyAccountResult.isSuccess && <AccountVerificationComplete />}
      {verifyAccountResult.isError && (
        <Heading>Redirecting to Resend Verification Page</Heading>
      )}
    </>
  );
};

const AccountVerificationComplete = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/login");
  }, 5000);

  return (
    <Box className="flex flex-row ">
      <Heading as="h3" className="underline text-red-600">
        <Link to="/login">Login</Link>
      </Heading>
    </Box>
  );
};

export default VerifyAccount;
