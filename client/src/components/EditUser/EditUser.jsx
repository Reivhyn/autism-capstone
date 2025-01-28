/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "../zzztheme/themes"; 
import DualList from "../DualList/DualList";
import "./editUser.css";

// CONTEXT IMPORTS
import {
  ptdContext,
  userDataContext,
  editTargetContext,
} from "../zContextHooks/contextHooks";

// FETCH IMPORTS
import {
  getActivities,
  getAllChatTopics,
  editUser,
  deleteUser,
  addNewUser,
} from "../zzzFetches/fetches";

const EditUser = () => {
  //* USESTATE
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);
  const [userData, setUserData] = useContext(userDataContext);
  const [editTarget, setEditTarget] = useContext(editTargetContext);

  // State for form fields
  const [editFirstName, setEditFirstname] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editDateOfBirth, setEditDateOfBirth] = useState("");
  const [editUserName, setEditUserName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPassword, setEditPassword] = useState("");
  const [editDisableLogin, setEditDisableLogin] = useState(false);
  const [editDeleteUser, setEditDeleteUser] = useState(false);

  const [userType, setUserType] = useState("kid");
  const [checkedBox, setCheckedBox] = useState("kid");

  // State for dual list and data fetching
  const [allActivities, setAllActivities] = useState([]);
  const [gamesAccess, setGamesAccess] = useState([]);
  const [learningAccess, setLearningAccess] = useState([]);
  const [allChatTopics, setAllChatTopics] = useState([]);
  const [chatAccess, setChatAccess] = useState([]);
  const [activitiesAccess, setActivitiesAccess] = useState([]);

  //* FUNCTIONS
  // Fetch all required data
  const fetchAllData = async () => {
    setAllActivities(await getActivities());
    setAllChatTopics(await getAllChatTopics());
  };

  // Handle user type selection
  const handleCheck = (value) => {
    setCheckedBox(value);
    setUserType(value);
  };

  // Save changes to the user
  const callEditUser = () => {
    editUser(
      editTarget._id,
      editFirstName,
      editLastName,
      editDateOfBirth,
      editUserName,
      editPassword,
      editDisableLogin,
      [...gamesAccess, ...learningAccess],
      editEmail,
      chatAccess
    );
  };

  // Create a new user
  const callCreateNewUser = () => {
    addNewUser(
      editFirstName,
      editLastName,
      editDateOfBirth,
      editUserName,
      editPassword,
      editDisableLogin,
      [...gamesAccess, ...learningAccess],
      editEmail,
      userType,
      userData._id
    );
  };

  const handleSave = () => {
    if (editDeleteUser) {
      deleteUser(editTarget._id);
      return;
    }
    if (pageToDisplay === "addUser" || pageToDisplay === "addKid") {
      callCreateNewUser();
    } else {
      callEditUser();
    }
  };

  const handleCancel = () => {
    setPageToDisplay(userData.userType);
  };

  //* USEEFFECT
  useEffect(() => {
    if (
      pageToDisplay === "editUser" ||
      pageToDisplay === "addUser" ||
      pageToDisplay === "editKid" ||
      pageToDisplay === "addKid"
    ) {
      fetchAllData();
    }
  }, [pageToDisplay]);

  useEffect(() => {
    setActivitiesAccess([...gamesAccess, ...learningAccess]);
  }, [gamesAccess, learningAccess]);

  //* RENDER
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          maxWidth: 600,
          margin: "0 auto",
          padding: 4,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" color="text.primary" gutterBottom>
          {pageToDisplay === "editUser" || pageToDisplay === "editKid"
            ? `Editing ${editTarget.firstName} ${editTarget.lastName}`
            : pageToDisplay === "addUser"
            ? "Add New User"
            : "Add New Child"}
        </Typography>

        <form>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editFirstName}
            onChange={(e) => setEditFirstname(e.target.value)}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
          />

          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editDateOfBirth}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setEditDateOfBirth(e.target.value)}
          />

          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editUserName}
            onChange={(e) => setEditUserName(e.target.value)}
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={editDisableLogin}
                onChange={(e) => setEditDisableLogin(e.target.checked)}
              />
            }
            label="Disable Login"
          />

          {pageToDisplay === "editKid" || pageToDisplay === "editUser" ? (
            <FormControlLabel
              control={
                <Checkbox
                  checked={editDeleteUser}
                  onChange={(e) => setEditDeleteUser(e.target.checked)}
                />
              }
              label={`Delete ${editTarget.firstName} ${editTarget.lastName}`}
            />
          ) : null}
        </form>

        {pageToDisplay === "addUser" || pageToDisplay === "addKid" ? (
          <Box>
            <Typography>User Type</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedBox === "kid"}
                  onChange={() => handleCheck("kid")}
                />
              }
              label="Child"
            />
            {pageToDisplay === "addUser" && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedBox === "parent"}
                      onChange={() => handleCheck("parent")}
                    />
                  }
                  label="Parent"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkedBox === "admin"}
                      onChange={() => handleCheck("admin")}
                    />
                  }
                  label="Admin"
                />
              </>
            )}
          </Box>
        ) : null}

        {allActivities.length &&
        (pageToDisplay === "editKid" || pageToDisplay === "addKid") ? (
          <>
            <DualList
              dataToList={allActivities}
              listType="games"
              gamesAccess={gamesAccess}
              setGamesAccess={setGamesAccess}
            />
            <DualList
              dataToList={allActivities}
              listType="learning"
              learningAccess={learningAccess}
              setLearningAccess={setLearningAccess}
            />
            <DualList
              dataToList={allChatTopics}
              listType="chatTopics"
              chatAccess={chatAccess}
              setChatAccess={setChatAccess}
            />
          </>
        ) : null}

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default EditUser;