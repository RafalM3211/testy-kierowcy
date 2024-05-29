import { Box, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { useRef, useState } from "react";
import type { SxProps } from "@mui/material";
import ButtonLink from "../../../atoms/ButtonLink/ButtonLink";
import { userMenuStructure } from "../../../../Router";
import { useUserContext } from "../../../../context/user/user";

interface Props {
  sx?: SxProps;
}

export default function UserChip(props: Props) {
  const { user } = useUserContext();
  const menuRef = useRef();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { sx } = props;

  return (
    <>
      {user && (
        <Box
          ref={menuRef}
          onClick={() => setMenuOpen(true)}
          sx={{
            display: "flex",
            alignItems: "center",
            mx: "10px",
            borderRadius: "50px",
            bgcolor: "primary.light",
            height: "40px",
            cursor: "pointer",
            transition: "all 0.2s",

            "&:hover": {
              bgcolor: "primary.main",
            },

            "&:hover .MuiAvatar-root ": {
              bgcolor: "primary.light",
            },
            ...sx,
          }}
        >
          <Typography
            sx={(theme) => ({
              ml: "10px",
              mr: "5px",
              minWidth: "70px",
              textAlign: "center",
              color: "common.white",
              textShadow: `1px 1px 2px ${theme.palette.grey[400]}`,
              userSelect: "none",
            })}
          >
            {user.name}
          </Typography>
          <Avatar
            sx={{
              bgcolor: "primary.main",
              transition: "all 0.2s",
              textTransform: "uppercase",
            }}
          >
            {user.name[0]}
          </Avatar>
        </Box>
      )}
      <Menu
        onClose={() => setMenuOpen(false)}
        open={menuRef.current ? isMenuOpen : false}
        anchorEl={menuRef.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ fontSize: "2em" }}
      >
        {userMenuStructure.map((item, index) => {
          return (
            <MenuItem
              key={index}
              onClick={() => setMenuOpen(false)}
              sx={{
                pr: "8px",
                pt: "0px",
                justifyContent: "center",
              }}
            >
              <ButtonLink
                size="small"
                sx={{ color: "grey.700", fontSize: "1em" }}
                to={item.to}
              >
                {item.title}
              </ButtonLink>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
