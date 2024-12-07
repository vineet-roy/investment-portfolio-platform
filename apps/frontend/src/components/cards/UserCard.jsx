// components/UserCard.jsx
import React from "react";
import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

function UserCard({ firstName, lastName, email }) {
  return (
    <Card 
      sx={{ display: "flex", alignItems: "center", padding: 2, borderRadius: 2 }}
      elevation={3}
    >
      {/* Profile Dummy Icon */}
      <Avatar 
        sx={{ bgcolor: "primary.main", width: 72, height: 72, marginRight: 2 }}
      >
        <PersonIcon sx={{ fontSize: 36 }} />
      </Avatar>

      {/* User Details */}
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="h6" color="text.primary">
          {firstName} {lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {email}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default UserCard;
