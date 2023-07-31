import * as React from "react";
import { Button } from '@mui/material';
import DenseTable from "./user.diary.js";
import '../css/userPage.css';
import UserDetails from "./userDetails.js";
import ViewUserDetails from "./viewUserDetails.js";
import { useState } from "react";

export function UserPage() {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <div className="user-details-main">
      <div className="div-show-details">
        {isEditMode ? <UserDetails isManagerPage={false} />
          :
          <ViewUserDetails />}
        <div style={{ display: 'flex', alignItems: 'center', backgroundColor:'#f2f2f2'}}>
          <Button className="btn-cancel" variant="info" onClick={() => setIsEditMode(!isEditMode)}>{!isEditMode ? "Edit" : "Cancel"}</Button>
        </div>
      </div>
      <div className="right-side-user-page">
        <DenseTable />
      </div>
    </div>
  );
}
