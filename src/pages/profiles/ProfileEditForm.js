// import React, { useEffect, useRef, useState } from 'react';
// import { InfoCircle } from 'react-bootstrap-icons';
// import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
// import { axiosReq } from '../../api/axiosDefaults';
// import { useCurrentUser } from '../../contexts/CurrentUserContext';
// import Avatar from '../../components/Avatar';
// import { useHistory } from 'react-router-dom';

// function ProfileEditForm() {
//   const history = useHistory();
//   const currentUser = useCurrentUser();
//   const imageInput = useRef(null);

//   const [profileData, setProfileData] = useState({
//     image: '',
//   });
//   const { image } = profileData;

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState(""); // For success message

//   const handleImageChange = (event) => {
//     if (event.target.files.length) {
//       URL.revokeObjectURL(image);
//       setProfileData({
//         ...profileData,
//         image: URL.createObjectURL(event.target.files[0])
//       });
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();

//     if (imageInput?.current?.files[0]) {
//       formData.append('image', imageInput.current.files[0]);
//     }

//     try {
//       const { data } = await axiosReq.put(`/profiles/${currentUser.pk}/`, formData);
//       setSuccess("Profile image updated successfully!"); // Set success message

//       // Redirect to Profile Page and pass the updated image via history state
//       setTimeout(() => {
//         history.push({
//           pathname: `/profiles/${currentUser.pk}/`,
//           state: { 
//             updatedImage: data.image, 
//             successMessage: "Profile image updated successfully!" 
//           },
//         });
//       }, 2000); // Redirect after 2 seconds
//     } catch (error) {
//       if (error.response?.status !== 401) {
//         setErrors(error.response?.data);
//       }
//       if (error.response?.status === 500) {
//         setErrors({
//           server_error: 'The server experienced an internal error'
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!currentUser) return;
//       try {
//         const { data } = await axiosReq.get(`/profiles/${currentUser.pk}/`);
//         const { image } = data;
//         setProfileData({ image });
//       } catch (error) {
//         if (error.response?.status !== 401) {
//           setErrors(error.response?.data);
//         }
//       }
//     };
//     fetchProfile();
//   }, [currentUser]);

//   return (
//     <Container className="d-flex justify-content-center align-items-center min-vh-100">
//       <Row className="w-100">
//         <Col md={8} lg={6} className="mx-auto">
//           <div className="bg-light p-4 rounded shadow">
//             <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
//               <label className="form-label font-weight-bold mb-2" htmlFor="image">
//                 Select Image:
//               </label>
//               <input
//                 id="image"
//                 type="file"
//                 className="form-control mb-3"
//                 onChange={handleImageChange}
//                 accept="image/*"
//                 ref={imageInput}
//               />

//               <div className="mb-4">
//                 <Avatar src={image} large />
//               </div>

//               {errors.image && (
//                 <Alert variant="warning" className="w-100 text-center mb-2">
//                   <InfoCircle size="32" />
//                   <p>{errors.image}</p>
//                 </Alert>
//               )}

//               {errors.server_error && (
//                 <Alert variant="warning" className="w-100 text-center mb-2">
//                   <InfoCircle size="32" />
//                   <p>The server experienced an internal error. A common cause of this is uploading a file that is not an image.</p>
//                   <p>If you attempted to upload a profile image, please check your file format and try again.</p>
//                 </Alert>
//               )}

//               {success && (
//                 <Alert variant="success" className="w-100 text-center mt-2">
//                   <InfoCircle size="32" />
//                   <p>{success}</p>
//                 </Alert>
//               )}

//               <Button
//                 className="btn btn-primary mb-2"
//                 type="submit"
//               >
//                 Submit
//               </Button>
//             </form>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default ProfileEditForm;


import React, { useEffect, useRef, useState } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { axiosReq } from '../../api/axiosDefaults';
import { useCurrentUser, useSetCurrentUser } from '../../contexts/CurrentUserContext';
import Avatar from '../../components/Avatar';
import { useHistory } from 'react-router-dom';

function ProfileEditForm() {
  const history = useHistory();
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser(); 
  const imageInput = useRef(null);

  const [profileData, setProfileData] = useState({
    image: '',
  });
  const { image } = profileData;

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const handleImageChange = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
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
      const { data } = await axiosReq.put(`/profiles/${currentUser.pk}/`, formData);
      setSuccess("Profile image updated successfully!");

      // Update current user state with the new image URL and other user data if needed
      setCurrentUser({
        ...currentUser,
        profile_image: data.image // Use the new image URL
      });

      // Optionally redirect to the profile page
      history.push(`/profiles/${currentUser.pk}/`);
    } catch (error) {
      if (error.response?.status !== 401) {
        setErrors(error.response?.data);
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
        const { data } = await axiosReq.get(`/profiles/${currentUser.pk}/`);
        const { image } = data;
        setProfileData({ image });
      } catch (error) {
        if (error.response?.status !== 401) {
          setErrors(error.response?.data);
        }
      }
    };
    fetchProfile();
  }, [currentUser]);

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <div className="bg-light p-4 rounded shadow">
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
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

              {errors.image && (
                <Alert variant="warning" className="w-100 text-center mb-2">
                  <InfoCircle size="32" />
                  <p>{errors.image}</p>
                </Alert>
              )}

              {errors.server_error && (
                <Alert variant="warning" className="w-100 text-center mb-2">
                  <InfoCircle size="32" />
                  <p>The server experienced an internal error. A common cause of this is uploading a file that is not an image.</p>
                  <p>If you attempted to upload a profile image, please check your file format and try again.</p>
                </Alert>
              )}

              {success && (
                <Alert variant="success" className="w-100 text-center mt-2">
                  <InfoCircle size="32" />
                  <p>{success}</p>
                </Alert>
              )}

              <Button
                className="btn btn-primary mb-2"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileEditForm;
