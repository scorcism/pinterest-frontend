import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const parans = useParams();

  const username = parans.username;

  return <div>{username}</div>;
};

export default Profile;
