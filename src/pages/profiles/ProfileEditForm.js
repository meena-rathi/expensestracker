import React, { useEffect, useRef, useState } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { axiosReq, axiosRes } from '../../api/axiosDefaults';
import { useCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { useHistory } from 'react-router-dom'; // useNavigate

function ProfileEditForm() {
  const history = useHistory(); // Hook for navigation
  const currentUser = useCurrentUser();
  const imageInput = useRef(null);

  const [profileData, setProfileData] = useState({
    image: '',
  });
  const { image } = profileData;

  const [errors, setErrors] = useState({});
  const [actionSucceeded, setActionSucceeded] = useState(false);
  // const [hasLoaded, setHasLoaded] = useState(false);

  // const handleChange = (event) => {
  //   setProfileData({
  //     ...profileData,
  //     [event.target.name]: event.target.value
  //   });
  // };

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image); // Clean up previous image URL
      setProfileData({
        ...profileData,
        image: URL.createObjectURL(event.target.files[0])
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    if (imageInput?.current?.files[0]) {
      formData.append('image', imageInput.current.files[0]);
    }

    try {
      // setHasLoaded(false);
      await axiosReq.put(`/profiles/${currentUser.pk}/`, formData);
      // setHasLoaded(true);
      setActionSucceeded(true); // Indicate success
      setErrors({});
      // Redirect to profiles page after showing the success message
      setTimeout(() => history.push("/profiles"), 3000);
    } catch (error) {
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
        // setHasLoaded(true);
        setActionSucceeded(false); // Indicate failure
      }
      if (error.response?.status === 500) {
        setErrors({
          server_error: 'The server experienced an internal error'
        });
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) return;
      try {
        const { data } = await axiosRes.get(`profiles/${currentUser.pk}/`);
        const { display_name, image } = data;
        setProfileData({ display_name, image });
        // setHasLoaded(true);
      } catch (error) {
        if (error.response?.status !== 401) {
          setErrors(error.response?.data);
          // setHasLoaded(true);
        }
      }
    };
    fetchProfile();
  }, [currentUser]);

  useEffect(() => {
    // Automatically hide success message after 5 seconds
    const hideSuccess = setTimeout(() => {
      setActionSucceeded(false);
    }, 5000);
    return () => clearTimeout(hideSuccess);
  }, [actionSucceeded]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <div className="bg-light p-4 rounded shadow">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
              {/* Profile image */}
              <label className="form-label font-weight-bold mb-2" htmlFor="image">
                Select Image:
              </label>
              <input
                id="image"
                type="file"
                className="form-control mb-3"
                onChange={handleImageChange}
                accept="image/*"
                ref={imageInput}
              />

              <div className="mb-4">
                <Avatar src={image} large />
              </div>

              {/* Display alert with any image field errors */}
              {errors.image && (
                <Alert variant="warning" className="w-100 text-center mb-2">
                  <InfoCircle size="32" />
                  <p>{errors.image}</p>
                </Alert>
              )}

              <Button
                className="btn btn-primary mb-2"
                type="submit"
              >
                Submit
              </Button>

              {/* Display alert with any non-field errors */}
              {errors.non_field_errors?.map((error, i) => (
                <Alert key={`profile_form_non-field_err${i}`} variant="warning" className="w-100 text-center mb-2">
                  <InfoCircle size="32" />
                  <p>{error}</p>
                </Alert>
              ))}

              {/* Display alert if there was a 500 error */}
              {errors.server_error && (
                <Alert variant="warning" className="w-100 text-center mb-2">
                  <InfoCircle size="32" />
                  <p>The server experienced an internal error. A common cause of this is uploading a file that is not an image.</p>
                  <p>If you attempted to upload a profile image, please check your file format and try again.</p>
                </Alert>
              )}

              {/* Display alert with success message if request succeeded */}
              {actionSucceeded && (
                <Alert variant="success" className="w-100 text-center mt-2">
                  <InfoCircle size="32" />
                  <p>Profile image updated successfully!</p>
                </Alert>
              )}
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileEditForm;
