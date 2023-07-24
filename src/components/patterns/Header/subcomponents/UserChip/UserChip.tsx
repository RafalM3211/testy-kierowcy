import { Box, Typography, Avatar } from "@mui/material";

export default function UserChip() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mx: "10px",
        ml: "30px",
        borderRadius: "50px",
        bgcolor: "primary.light",
        height: "min-content",
      }}
    >
      <Typography
        sx={(theme) => ({
          ml: "10px",
          mr: "5px",
          color: "common.white",
          textShadow: `1px 1px 2px ${theme.palette.grey[400]}`,
        })}
      >
        username
      </Typography>
      <Avatar sx={{ bgcolor: "primary.main" }}>U</Avatar>
    </Box>
  );
}
