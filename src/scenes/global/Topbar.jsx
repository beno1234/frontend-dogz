import React, { useContext, useEffect, useRef, useState } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Popper from "@material-ui/core/Popper";
import { api } from "../../services/api";
import { Link, redirect } from "react-router-dom";
import { AuthContext, AuthProvider } from "../../contexts/auth";
import { getUser } from "../../services/api";

const Topbar = () => {
    const { logout } = useContext(AuthContext);
    const theme = useTheme()
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext)
    const buttonRef = useRef(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const buttonStyle = {
        border: '0',
        color: '#f44336',
        backgroundColor: 'transparent',
        cursor: isHovered ? 'pointer' : 'none',
        fontWeight: '600',
    };


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await getUser();
            setUsers(response.data);
            setLoading(false);
        })();
    }, [])

    const handleLogout = () => {
        logout();
    }

    if (loading) {
        return <div className="loading">carregando dados</div>
    }


    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex" bgcolor={colors.primary[400]} borderRadius="3px">
                <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
                <IconButton type="button" sx={{ p: 1 }}>
                    <SearchIcon />
                </IconButton>
            </Box>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'dark' ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}

                </IconButton>
                <IconButton>
                    <NotificationsOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsOutlinedIcon />
                </IconButton>
                <IconButton ref={buttonRef} onClick={toggleDropdown}>
                    <PersonOutlinedIcon />
                    <Popper open={dropdownOpen} anchorEl={buttonRef.current}>
                        <div style={{ backgroundColor: '#3e4396', padding: '10px' }}>

                            <button style={buttonStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleLogout} >Logout</button>
                        </div>
                    </Popper>
                </IconButton>
            </Box>
        </Box>
    )
}

export default Topbar;