import { Box, Typography, Avatar } from "@mui/material";
import type { SxProps } from "@mui/material";

interface Props {
  sx?: SxProps;
}

export default function UserChip(props: Props) {
  const { sx } = props;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mx: "10px",
        borderRadius: "50px",
        bgcolor: "primary.light",
        height: "min-content",
        ...sx,
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
