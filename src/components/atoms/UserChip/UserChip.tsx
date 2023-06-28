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
        bgcolor: "grey.100",
        height: "min-content",
      }}
    >
      <Typography sx={{ ml: "10px", mr: "5px" }}>username</Typography>
      <Avatar>U</Avatar>
    </Box>
  );
}
