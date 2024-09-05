import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useUserProfile } from "../../contexts/ProfileDataContext";
import ProfileEditForm from "./ProfileEditForm";
import UsernameForm from "./UsernameForm";
import UserPasswordForm from "./UserPasswordForm";
import { useRedirect } from '../../Hooks/useRedirect';
import Assets from "../../components/Asset";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

function ProfilePage() {
    useRedirect('loggedOut');
    const [hasLoaded, setHasLoaded] = useState(false);
    const { id } = useParams();
    const { setUserProfile } = useUserProfile();
    const [showProfileEditForm, setShowProfileEditForm] = useState(false);
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [showUserPasswordForm, setShowUserPasswordForm] = useState(false);

    console.log(id, "<===id")
    useEffect(() => {
        const fetchData = async () => {
            try {
               
                const { data: userProfile } = await axiosReq.get('/profiles/?owner=current');
                // const { data: userProfile } = await axiosReq.get(`/profiles/${id}/`);
                console.log(userProfile, "<=== Fetched user profile data");
                if (userProfile) {
                    console.log(userProfile, "<=== Fetched user profile data");
                    setUserProfile(userProfile);
                } else {
                    console.error("No profile data returned");
                }
                setHasLoaded(true);
            } catch (err) {
                console.error("Fetching failed:", err);
                // Optionally handle specific error statuses or messages here
            }
        };
        fetchData();
    }, [id, setUserProfile]);

    const userProfile = useUserProfile().userProfile;

    const handleEditProfileClick = () => setShowProfileEditForm(true);
    const handleCancelEdit = () => setShowProfileEditForm(false);
    const handleUsernameFormClick = () => setShowUsernameForm(true);
    const handleCloseUsernameForm = () => setShowUsernameForm(false);
    const handleUserPasswordFormClick = () => setShowUserPasswordForm(true);
    const handleCloseUserPasswordForm = () => setShowUserPasswordForm(false);

    const defaultAvatar = '/path/to/default/avatar.png'; // Ensure this path is correct
    const avatarSrc = userProfile?.avatar || defaultAvatar;

    const mainProfile = (
        <>
            {userProfile && (
                <Row noGutters className="px-3 text-center">
                    <Col lg={3} className="text-lg-left">
                        <Image className={styles.ProfileImage} src={avatarSrc} roundedCircle />
                    </Col>
                    <Col lg={6}>
                        <h3 className="m-2">{userProfile?.user}</h3>
                    </Col>
                    <Col className="p-3">Content: {userProfile?.bio}</Col>
                </Row>
            )}

            <div className={`${styles.BtnDiv}`}>
                <div className={`${styles.BtnPair}`}>
                    <Button className={`${styles.EditProfileBtn}`} onClick={handleEditProfileClick}>
                        Edit Profile
                    </Button>
                    {showProfileEditForm && (
                        <Button className={`${styles.CloseFormBtn}`} onClick={handleCancelEdit}>
                            Close Edit Profile
                        </Button>
                    )}
                </div>
                <div className={`${styles.BtnPair}`}>
                    <Button className={`${styles.EditUsernameBtn}`} onClick={handleUsernameFormClick}>
                        Edit Username
                    </Button>
                    {showUsernameForm && (
                        <Button className={`${styles.CloseFormBtn}`} onClick={handleCloseUsernameForm}>
                            Close Edit Username
                        </Button>
                    )}
                </div>
                <div className={`${styles.BtnPair}`}>
                    <Button className={`${styles.EditUserPasswordBtn}`} onClick={handleUserPasswordFormClick}>
                        Edit Password
                    </Button>
                    {showUserPasswordForm && (
                        <Button className={`${styles.CloseFormBtn}`} onClick={handleCloseUserPasswordForm}>
                            Close Edit Password
                        </Button>
                    )}
                </div>
            </div>
        </>
    );

    return (
        <Row>
            <Container className={appStyles.Content}>
                {hasLoaded ? (
                    <>
                        {mainProfile}
                        {showProfileEditForm && <ProfileEditForm onCancel={handleCancelEdit} />}
                        {showUsernameForm && <UsernameForm onCancel={handleCloseUsernameForm} />}
                        {showUserPasswordForm && <UserPasswordForm onCancel={handleCloseUserPasswordForm} />}
                    </>
                ) : (
                    <Assets spinner />
                )}
            </Container>
        </Row>
    );
}

export default ProfilePage;