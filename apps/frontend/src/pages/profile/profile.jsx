import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Avatar, Card, CardContent, Box } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../context/AuthContext";
import SideButtons from "../../components/sideButtons/SideButtons";
import { getUserDetails } from "../../api/userApis";

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

  // Fetch profile details based on userId
  useEffect(() => {
    if (user && user.userId) {
      const fetchProfile = async () => {
        try {
            const profileData = await getUserDetails(user.userId);
            setProfile(profileData);
        } catch (error) {
          console.error("Failed to fetch profile details", error);
        }
      };
      fetchProfile();
    }
  }, [user]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="bg-colorBgPrimary md:px-32 profilePage">
      <div className="flex">
        <SideButtons />
        <div className="pageContent w-full">
          <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }} color="text.primary">
              User Profile
            </Typography>

            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8} md={6}>
                <Card elevation={3} sx={{ padding: 4, borderRadius: 2 }}>
                  <Grid container spacing={3} alignItems="center">
                    {/* Profile Picture */}
                    <Grid item>
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 96,
                          height: 96,
                          fontSize: 48,
                          marginRight: 3,
                        }}
                      >
                        {profile.profilePicture ? (
                          <img src={profile.profilePicture} alt="User Profile" style={{ width: "100%", height: "100%" }} />
                        ) : (
                          <PersonIcon sx={{ fontSize: 48 }} />
                        )}
                      </Avatar>
                    </Grid>

                    {/* User Details */}
                    <Grid item>
                      <CardContent sx={{ padding: 0 }}>
                        <Typography variant="h6" color="text.primary">
                          {profile.firstName} {profile.lastName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {profile.email}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
