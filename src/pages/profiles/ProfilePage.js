import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Card, Col, Row, Image, Spinner as BootstrapSpinner, Alert } from 'react-bootstrap';
import { useUserProfile } from '../../contexts/ProfileDataContext';

function ProfilePage() {
  const { userProfile, loading, error } = useUserProfile();
  const history = useHistory();
  const location = useLocation();
  const [profileImage, setProfileImage] = useState(null);

  // Debugging logs
  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('User Profile:', userProfile);

  useEffect(() => {
    if (location.state?.updatedImage) {
      setProfileImage(location.state.updatedImage);
    }
  }, [location.state]);

  if (loading) {
    return <BootstrapSpinner animation="border" variant="primary" />;
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  if (!userProfile) {
    console.warn('UserProfile is null or undefined.');
    return <Alert variant="warning">No profile data available.</Alert>;
  }

  // Ensure userProfile has required properties
  if (!userProfile.image || !userProfile.owner) {
    console.warn('UserProfile is missing data:', userProfile);
    return <Alert variant="warning">Profile data is incomplete.</Alert>;
  }

  const handleUploadImage = () => history.push(`/profile-edit-form/${userProfile.id}/edit`);
  const handleChangeUsername = () => history.push('/change-username');
  const handleChangePassword = () => history.push(`/change-password/${userProfile.id}`);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Card style={{ width: '100%', maxWidth: '800px' }}>
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={12} md={4} className="text-center text-md-left mb-4 mb-md-0">
              <Image 
                src={profileImage || userProfile.image || 'https://via.placeholder.com/150'} 
                roundedCircle 
                style={{ width: '150px', height: '150px' }} 
              />
            </Col>
            <Col xs={12} md={8}>
              <Card.Title className="mb-3">{userProfile.owner}</Card.Title>
              <div className="d-flex flex-column">
                <Button className="mb-3" onClick={handleUploadImage}>
                  Upload Image
                </Button>
                <Button className="mb-3" onClick={handleChangeUsername}>
                  Change Username
                </Button>
                <Button className="mb-3" onClick={handleChangePassword}>
                  Change Password
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProfilePage;
