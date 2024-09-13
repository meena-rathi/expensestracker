// import React, { useEffect, useRef, useState } from 'react';
// import { InfoCircle } from 'react-bootstrap-icons';

// import { axiosReq, axiosRes } from '../../api/axiosDefaults';
// import { useCurrentUser } from '../../contexts/CurrentUserContext'; // Ensure this is imported correctly
// import Avatar from '../../components/Avatar';
// import Spinner from '../../components/Spinner';
// function ProfilePage() {
//   // Current user
//   const currentUser = useCurrentUser();

//   // Reference to the form file upload element
//   const imageInput = useRef(null);

//   // State for editable profile data;
//   const [profileData, setProfileData] = useState({
   
//     image: '',
//   });
//   const {  image } = profileData;

//   // State for HTTP errors from the API
//   const [errors, setErrors] = useState({});

//   // State to confirm the profile change request was successful
//   const [actionSucceeded, setActionSucceeded] = useState(false);

//   // State to confirm whether data has loaded;
//   const [hasLoaded, setHasLoaded] = useState(false);

//   // Change handler for profile form
//   const handleChange = (event) => {
//     setProfileData({
//       ...profileData,
//       [event.target.name]: event.target.value
//     });
//   };

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
//     // formData.append('display_name', display_name);

//     if (imageInput?.current?.files[0]) {
//       formData.append('image', imageInput.current.files[0]);
//     }

//     try {
//       setHasLoaded(false);
//       await axiosReq.put(`/profiles/${currentUser.pk}/`, formData);
//       setHasLoaded(true);
//       setActionSucceeded(true);
//       setErrors({});
//     } catch (error) {
//       if (error.response?.status !== 401) {
//         setErrors(error.response?.data);
//         setHasLoaded(true);
//         setActionSucceeded(false);
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
//       if (!currentUser) return; // Add this line to ensure currentUser is available
//       try {
//         const { data } = await axiosRes.get(`profiles/${currentUser.pk}/`);
//         const { display_name, image } = data;
//         setProfileData({ display_name, image });
//         setHasLoaded(true);
//       } catch (error) {
//         if (error.response?.status !== 401) {
//           setErrors(error.response?.data);
//           setHasLoaded(true);
//         }
//       }
//     };
//     fetchProfile();
//   }, [currentUser]);

//   useEffect(() => {
//     const hideSuccess = setTimeout(() => {
//       setActionSucceeded('');
//     }, 5000);
//     return () => clearTimeout(hideSuccess);
//   }, [actionSucceeded]);

//   // Check if currentUser or profileData are loaded before rendering the form
//   if (!currentUser || !hasLoaded) {
//     return <Spinner />;
//   }

//   return (
//     <div className="justify-self-center basis-full mx-2">
//       <form onSubmit={handleSubmit}>
//         {/* Profile image */}
//         <label className="input-group max-lg:input-group-vertical mb-4" htmlFor="image">
//           <span>Select Image:</span>
//           <input
//             id="image"
//             type="file"
//             className="file-input file-input-bordered w-full"
//             onChange={handleImageChange}
//             accept="image/*"
//             ref={imageInput}
//           />
//         </label>
     
//         <div className="flex justify-center">
//           <Avatar src={image} large />
//         </div>

//         {/* Display alert with any image field errors */}
//         {errors.image && (
//           <div className="alert alert-warning justify-start mt-4 mb-2 w-3/4 md:w-1/2 lg:w-1/2 mx-auto">
//             <div>
//               <InfoCircle size="32" />
//             </div>
//             <div>
//               <p>{errors.image}</p>
//             </div>
//           </div>
//         )}

//         <button className="btn btn-primary btn-wide" type="submit" id="profile-submit-btn">
//           Submit
//         </button>

//         {/* Display alert with any non-field errors */}
//         {errors.non_field_errors?.map((error, i) => (
//           <div className="alert alert-warning justify-start mt-4 mb-2 w-3/4 md:w-1/2 lg:w-1/2 mx-auto" key={`profile_form_non-field_err${i}`}>
//             <div>
//               <InfoCircle size="32" />
//             </div>
//             <div>
//               <p>{error}</p>
//             </div>
//           </div>
//         ))}

//         {/* Display alert if there was a 500 error */}
//         {errors.server_error && (
//           <div className="alert alert-warning justify-start mt-4 mb-2 w-3/4 md:w-1/2 lg:w-1/2 mx-auto">
//             <div>
//               <InfoCircle size="32" />
//             </div>
//             <div>
//               <p>The server experienced an internal error. A common cause of this is uploading a file that is not an image.</p>
//               <br />
//               <p>If you attempted to upload a profile image, please check your file format and try again.</p>
//             </div>
//           </div>
//         )}

//         {/* Display alert with success message if request succeeded */}
//         {actionSucceeded && (
//           <div className="fixed min-h-fit min-w-full top-0 left-0 z-10">
//             <div className="alert alert-success justify-start w-3/4 md:w-1/2 lg:w-1/2 mx-auto mt-14">
//               <div>
//                 <InfoCircle size="32" />
//               </div>
//               <div>
//                 <p>Profile updated</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// }

// export default ProfilePage;
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import Spinner from '../../components/Spinner';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

function ProfilePage() {
  const currentUser = useCurrentUser();
  const history = useHistory();

  // Navigate to the respective forms
  const handleUploadImage = () => history.push(`/profile-edit-form/${currentUser?.profile_id}/edit`); // Use the correct route
  const handleChangeUsername = () => history.push('/change-username');


  const handleChangePassword = () => history.push(`/change-password/${currentUser?.profile_id}`);


  // if (!currentUser) {
  //   return <Spinner />;
  // }

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <h1 className="mb-4">Profile</h1>
      <div className="d-flex flex-column align-items-center">
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
    </div>
  );
}

export default ProfilePage;
