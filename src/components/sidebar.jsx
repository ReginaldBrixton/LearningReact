import React from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';

function Sidebar() {
    return (
        <div
            className="bg-gradient-to-b from-gray-100 to-gray-200 shadow-xl rounded-r-3xl p-6 w-20 transition-all duration-300 "
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                zIndex: 1000,
            }}
        > 
            <Logo />
            <Menu />
            <ProfileImage />
        </div>
    );
}

// Profile Image
function ProfileImage() {
    return (
        <div className='absolute bottom-6 left-0 right-0 flex justify-center'>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'>
                S
            </div>
        </div>
    );
}

// Menu
function Menu() {
    return (
        <div className='flex flex-col gap-8 items-center mt-12'>
            <MenuItem icon={<BorderAllIcon />} tooltip="Dashboard" />
            <MenuItem icon={<SplitscreenIcon />} tooltip="Split View" />
            <MenuItem icon={<LogoutIcon />} tooltip="Logout" />
        </div>
    );
}

// MenuItem
function MenuItem({ icon, tooltip }) {
    return (
        <Tooltip title={tooltip} placement="right">
            <div className='p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-blue-50 group'>
                {React.cloneElement(icon, { 
                    sx: { fontSize: "24px" },
                    className: 'text-blue-600 group-hover:text-blue-800 transition-colors duration-300'
                })}
            </div>
        </Tooltip>
    );
}

// Logo
function Logo() {
    return (
        <div className='flex items-center justify-center mb-8'>
            <TaskAltIcon 
                className='text-blue-600 hover:text-blue-800 transition-colors duration-300'
                sx={{
                    fontSize: '40px',
                }}
            />
        </div>
    );
}

export default Sidebar;