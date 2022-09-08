import { useState, useEffect } from "react";
import { Avatar } from "brainly-style-guide";

import _API from "@brainly/index";
import getUserId from "../../getUserId";

type UserDataType = {
  avatar: { url: string };
  nick: string;
  profileLink: string;
};

const encodeUserId = (id: number) => btoa(`user:${id}`);

export default function ModeratorAvatar() {
  const [userData, setUserData] = useState<UserDataType>(null);

  useEffect(() => {
    const userId = getUserId();

    _API.GQL(`query {
      user(id: "${encodeUserId(userId)}") {
        avatar {url} nick id
      }
    }`).then(data =>
      setUserData({ 
        ...data.data.user, 
        profileLink: `/users/redirect_user/${userId}`
      })
    );
  }, []);

  return (
    <Avatar 
      imgSrc={userData?.avatar?.url} 
      title={userData?.nick}
      size="m"
      onClick={() => window.open(userData.profileLink)}
    />
  );
}