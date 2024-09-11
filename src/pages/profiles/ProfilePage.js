import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCurrentUser } from '../../contexts/CurrentUserContext';

const ProfilePage = () => {
  const { id } = useParams();
  const currentUser = useCurrentUser();
  const [userProfile, setUserProfile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (currentUser && currentUser.pk) {
        try {
          const { data } = await axios.get(`/profiles/${currentUser.pk}/`);
          setUserProfile(data);
          setUsername(data.owner);
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError('Error fetching user profile.');
        }
      } else {
        console.error('Profile ID is missing or currentUser is not defined.');
        setError('Profile ID is missing or currentUser is not defined.');
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert('Please select an image first!');
      return;
    }

    setUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append('image', selectedImage);
    const authToken = localStorage.getItem('authToken');
    const profileId = currentUser?.pk;
    if (!authToken || !profileId) {
      setError('Authentication token or profile ID is missing.');
      setUploading(false);
      return;
    }
    try {
      const response = await axios.patch(`/profiles/${profileId}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      setSuccess('Image uploaded successfully!');
      setUserProfile(prevProfile => ({
        ...prevProfile,
        image: response.data.image,
      }));
    } catch (err) {
      console.error('Upload error:', err.response || err);
      setError(`Error uploading image: ${err.response?.data?.detail || err.message}`);
    } finally {
      setUploading(false);
    }
  };
  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSave = async () => {
    if (!username.trim()) {
      alert('Username cannot be empty!');
      return;
    }
    setError(null);
    setSuccess(null);
    const authToken = localStorage.getItem('authToken');
    const profileId = currentUser?.pk;
    if (!authToken || !profileId) {
      setError('Authentication token or profile ID is missing.');
      return;
    }
    try {
      const response = await axios.patch(`/profiles/${profileId}/`, { owner: username }, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      setSuccess('Username updated successfully!');
      setUserProfile(prevProfile => ({
        ...prevProfile,
        owner: response.data.owner,
      }));
      setIsEditing(false);
    } catch (err) {
      console.error('Update error:', err.response || err);
      setError(`Error updating username: ${err.response?.data?.detail || err.message}`);
    }
  };
  if (!userProfile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div>
      <h1>{isEditing ? 'Edit Profile' : `${userProfile.owner}'s Profile`}</h1>
      <img src={userProfile.image || 'path/to/default/image.jpg'} alt="Profile" width="200" />
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
      <button onClick={handleButtonClick}>
        Select Image
      </button>
      <button onClick={handleImageUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <button onClick={handleSave}>
            Save
          </button>
          <button onClick={handleEditToggle}>
            Cancel
          </button>
        </div>
      ) : (
        <button onClick={handleEditToggle}>
          Edit Profile
        </button>
      )}
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </div>
  );
};

export default ProfilePage;
