"use client";

import React, { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import TaskIcon from '@mui/icons-material/Task';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tooltip } from '@mui/material';

function MainSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`bg-gradient-to-b from-gray-100 to-gray-200 shadow-xl rounded-r-3xl transition-all duration-300 overflow-y-auto`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                zIndex: 1000,
                width: isOpen ? '200px' : '80px',
            }}
        >
            <div className="p-6">
                <Logo isOpen={isOpen} />
                <Menu isOpen={isOpen} />
                <ProfileImage />
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute top-4 -right-3 bg-white rounded-full p-1 shadow-md"
            >
                {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </button>
        </div>
    );
}

function ProfileImage() {
    return (
        <div className='absolute bottom-6 left-0 right-0 flex justify-center'>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer'>
                S
            </div>
        </div>
    );
}

function Menu({ isOpen }) {
    const menuItems = [
        { icon: <WorkOutlineIcon />, tooltip: "Projects" },
        { icon: <TaskIcon />, tooltip: "Tasks" },
        { icon: <CalendarTodayIcon />, tooltip: "Calendar" },
        { icon: <NotificationsIcon />, tooltip: "Notifications" },
        { icon: <BarChartIcon />, tooltip: "Reports" },
        { icon: <DescriptionIcon />, tooltip: "Documents" },
        { icon: <TimerIcon />, tooltip: "Time Tracker" },
        { icon: <SettingsIcon />, tooltip: "Settings" },
        { icon: <HelpOutlineIcon />, tooltip: "Support" },
        { icon: <LogoutIcon />, tooltip: "Logout" },
    ];

    return (
        <div className='flex flex-col gap-4 items-center mt-8'>
            {menuItems.map((item, index) => (
                <MenuItem key={index} icon={item.icon} tooltip={item.tooltip} isOpen={isOpen} />
            ))}
        </div>
    );
}

function MenuItem({ icon, tooltip, isOpen }) {
    return (
        <Tooltip title={isOpen ? '' : tooltip} placement="right">
            <div className={`p-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:bg-blue-50 group ${isOpen ? 'w-full flex items-center' : ''}`}>
                {React.cloneElement(icon, {
                    sx: { fontSize: "24px" },
                    className: 'text-blue-600 group-hover:text-blue-800 transition-colors duration-300'
                })}
                {isOpen && <span className="ml-3 text-sm">{tooltip}</span>}
            </div>
        </Tooltip>
    );
}

function Logo({ isOpen }) {
    return (
        <div className={`flex items-center ${isOpen ? 'justify-start' : 'justify-center'} mb-8`}>
            <TaskAltIcon
                className='text-blue-600 hover:text-blue-800 transition-colors duration-300'
                sx={{
                    fontSize: '40px',
                }}
            />
            {isOpen && <span className="ml-2 text-xl font-bold text-blue-600">TaskMaster</span>}
        </div>
    );
}

export default MainSidebar;