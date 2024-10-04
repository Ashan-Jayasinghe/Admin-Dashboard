// import React, { useState, useEffect } from 'react';
// import { toast } from 'react-hot-toast'; // Import toast
// import axios from 'axios'; // Import axios for API calls
// import './Profile.css';

// function Profile() {
//   const [userData, setUserData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     profilePic: 'default-profile.jpg', // Default profile picture
//   });

//   const [editMode, setEditMode] = useState({
//     name: false,
//     email: false,
//     password: false,
//   });

//   const [newProfilePic, setNewProfilePic] = useState(null);

//   useEffect(() => {
//     // On component mount, fetch the user profile from the backend
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem('token'); // Get token from localStorage
//       try {
//         const response = await axios.get('/api/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`, // Send token in the header
//           },
//         });
//         setUserData(response.data);
//       } catch (error) {
//         toast.error('Error fetching profile.');
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleEdit = (field) => {
//     setEditMode({ ...editMode, [field]: true });
//   };

//   const handleSave = async (field) => {
//     const token = localStorage.getItem('token'); // Get JWT token

//     // Validation for empty fields before proceeding
//     if (field === 'name' && userData.name.trim() === '') {
//       toast.error('Name cannot be empty');
//       return; // Prevent further execution if invalid
//     }

//     if (field === 'email' && userData.email.trim() === '') {
//       toast.error('Email cannot be empty');
//       return;
//     }

//     if (field === 'password' && userData.password.trim() === '') {
//       toast.error('Password cannot be empty');
//       return;
//     }

//     // Make API call to save updated data if validation passes
//     try {
//       const response = await axios.post(
//         '/api/update-profile',
//         { field, value: userData[field] },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Attach token for authentication
//           },
//         }
//       );

//       if (response.status === 200) {
//         toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
//       } else {
//         toast.error('Error updating profile.');
//       }
//     } catch (error) {
//       toast.error('Error updating profile.');
//     }

//     setEditMode({ ...editMode, [field]: false }); // Exit edit mode after saving
//   };

//   const handleChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   const handleProfilePicChange = (e) => {
//     const file = e.target.files[0];
//     setNewProfilePic(URL.createObjectURL(file));
//   };

//   const handleProfilePicSave = async () => {
//     const token = localStorage.getItem('token'); // Get JWT token

//     // Logic to save profile picture to the backend
//     try {
//       const formData = new FormData();
//       formData.append('profilePic', newProfilePic);

//       const response = await axios.post('/api/update-profile-pic', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Bearer ${token}`, // Attach token for authentication
//         },
//       });

//       if (response.status === 200) {
//         setUserData({ ...userData, profilePic: newProfilePic });
//         setNewProfilePic(null);
//         toast.success('Profile picture updated successfully!');
//       } else {
//         toast.error('Error updating profile picture.');
//       }
//     } catch (error) {
//       toast.error('Error updating profile picture.');
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-form">
//         <h2 className="heading">User Profile Update</h2>

//         {/* Profile Picture Section */}
//         <div className="profile-pic-section">
//           <img
//             src={newProfilePic || userData.profilePic}
//             alt="Profile"
//             className="profile-pic-preview"
//           />
//           <input type="file" onChange={handleProfilePicChange} />
//           {newProfilePic && (
//             <button className="button" onClick={handleProfilePicSave}>
//               Save Picture
//             </button>
//           )}
//         </div>

//         {/* Name Section */}
//         <div className="profile-section">
//           <label className="profile-label">Name:</label>
//           {!editMode.name ? (
//             <>
//               <p>{userData.name}</p>
//               <button onClick={() => handleEdit('name')} className="edit-btn">
//                 Edit
//               </button>
//             </>
//           ) : (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 value={userData.name}
//                 onChange={handleChange}
//                 className="input"
//               />
//               <button onClick={() => handleSave('name')} className="save-btn">
//                 Save
//               </button>
//             </>
//           )}
//         </div>

//         {/* Email Section */}
//         <div className="profile-section">
//           <label className="profile-label">Email:</label>
//           {!editMode.email ? (
//             <>
//               <p>{userData.email}</p>
//               <button onClick={() => handleEdit('email')} className="edit-btn">
//                 Edit
//               </button>
//             </>
//           ) : (
//             <>
//               <input
//                 type="email"
//                 name="email"
//                 value={userData.email}
//                 onChange={handleChange}
//                 className="input"
//               />
//               <button onClick={() => handleSave('email')} className="save-btn">
//                 Save
//               </button>
//             </>
//           )}
//         </div>

//         {/* Password Section */}
//         <div className="profile-section">
//           <label className="profile-label">Password:</label>
//           {!editMode.password ? (
//             <>
//               <p>********</p>
//               <button
//                 onClick={() => handleEdit('password')}
//                 className="edit-btn"
//               >
//                 Edit
//               </button>
//             </>
//           ) : (
//             <>
//               <input
//                 type="password"
//                 name="password"
//                 value={userData.password}
//                 onChange={handleChange}
//                 className="input"
//               />
//               <button
//                 onClick={() => handleSave('password')}
//                 className="save-btn"
//               >
//                 Save
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Profile;

import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast'; // Import toast
import axios from 'axios'; // Import axios for API calls
import './Profile.css';

function Profile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: 'default-profile.jpg', // Default profile picture
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [newProfilePic, setNewProfilePic] = useState(null);

  useEffect(() => {
    // On component mount, fetch the user profile from the backend
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token'); // Get token from localStorage
      try {
        const response = await axios.get('/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the header
          },
        });
        setUserData(response.data);
      } catch (error) {
        toast.error('Error fetching profile.');
      }
    };

    fetchUserProfile();
  }, []);

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSave = async (field) => {
    const token = localStorage.getItem('token'); // Get JWT token

    // Validation for empty fields before proceeding
    if (field === 'name' && userData.name.trim() === '') {
      toast.error('Name cannot be empty');
      return; // Prevent further execution if invalid
    }

    if (field === 'email' && userData.email.trim() === '') {
      toast.error('Email cannot be empty');
      return;
    }

    if (field === 'password' && userData.password.trim() === '') {
      toast.error('Password cannot be empty');
      return;
    }

    // Make API call to save updated data if validation passes
    try {
      const response = await axios.post(
        '/api/update-profile',
        { field, value: userData[field] },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token for authentication
          },
        }
      );

      if (response.status === 200) {
        toast.success(`${field.charAt(0).toUpperCase() + field.slice(1)} updated successfully!`);
      } else {
        toast.error('Error updating profile.');
      }
    } catch (error) {
      toast.error('Error updating profile.');
    }

    setEditMode({ ...editMode, [field]: false }); // Exit edit mode after saving
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(URL.createObjectURL(file));
  };

  const handleProfilePicSave = async () => {
    const token = localStorage.getItem('token'); // Get JWT token

    // Logic to save profile picture to the backend
    try {
      const formData = new FormData();
      formData.append('profilePic', newProfilePic);

      const response = await axios.post('/api/update-profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
      });

      if (response.status === 200) {
        setUserData({ ...userData, profilePic: newProfilePic });
        setNewProfilePic(null);
        toast.success('Profile picture updated successfully!');
      } else {
        toast.error('Error updating profile picture.');
      }
    } catch (error) {
      toast.error('Error updating profile picture.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2 className="heading">User Profile Update</h2>

        {/* Profile Picture Section */}
        <div className="profile-pic-section">
          <img
            src={newProfilePic || userData.profilePic}
            alt="Profile"
            className="profile-pic-preview"
          />
          <input type="file" onChange={handleProfilePicChange} className="input" />
          {newProfilePic && (
            <button className="button" onClick={handleProfilePicSave}>
              Save Picture
            </button>
          )}
        </div>

        {/* Name Section */}
        <div className="profile-section">
          <label className="profile-label">Name:</label>
          {!editMode.name ? (
            <>
              <p>{userData.name}</p>
              <button onClick={() => handleEdit('name')} className="edit-btn">
                Edit
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="input"
              />
              <button onClick={() => handleSave('name')} className="save-btn">
                Save
              </button>
            </>
          )}
        </div>

        {/* Email Section */}
        <div className="profile-section">
          <label className="profile-label">Email:</label>
          {!editMode.email ? (
            <>
              <p>{userData.email}</p>
              <button onClick={() => handleEdit('email')} className="edit-btn">
                Edit
              </button>
            </>
          ) : (
            <>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="input"
              />
              <button onClick={() => handleSave('email')} className="save-btn">
                Save
              </button>
            </>
          )}
        </div>

        {/* Password Section */}
        <div className="profile-section">
          <label className="profile-label">Password:</label>
          {!editMode.password ? (
            <>
              <p>********</p>
              <button
                onClick={() => handleEdit('password')}
                className="edit-btn"
              >
                Edit
              </button>
            </>
          ) : (
            <>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="input"
              />
              <button
                onClick={() => handleSave('password')}
                className="save-btn"
              >
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;