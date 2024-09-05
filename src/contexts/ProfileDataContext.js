import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { useCurrentUser } from "./CurrentUserContext";

const ProfileDataContext = createContext();

export const useUserProfile = () => useContext(ProfileDataContext);

export const UserProfileProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const currentUser = useCurrentUser();

  useEffect(() => {
    
    const fetchUserProfile = async () => {
      try {
        if (currentUser) {
        const { data } = await axiosReq.get(`/profiles/?owner=current`);
        //const { data } = await axiosReq.get(`/Profiles/${currentUser.pk}/`);
        setUserProfile(data);
        }
      } catch (err) {
        // console.log(err);
      }
    };

    
      fetchUserProfile();
}, [currentUser]);


  return (
    <ProfileDataContext.Provider value={{ userProfile, setUserProfile}}>
      {children}
    </ProfileDataContext.Provider>
  );
};