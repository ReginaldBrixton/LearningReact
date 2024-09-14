"use client";

import React, { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import TaskIcon from '@mui/icons-material/Task';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import TimerIcon from '@mui/icons-material/Timer';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Tooltip } from '@mui/material';

function MainSidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div
            className={`bg-gray-900 text-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'w-64' : 'w-20'}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                zIndex: 1000,
            }}
        >
            <div className="flex flex-col h-full">
                <Logo isOpen={isOpen} />
                <Menu isOpen={isOpen} />
                <ProfileImage isOpen={isOpen} />
                <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    );
}

function ToggleButton({ isOpen, setIsOpen }) {
    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className={`absolute top-4 -right-3 bg-gray-800 text-white rounded-full p-1 shadow-lg transition-all duration-300 ease-in-out ${isOpen ? 'transform translate-x-0' : 'transform translate-x-1/2'}`}
        >
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>
    );
}

function ProfileImage({ isOpen }) {
    return (
        <div className='mt-auto mb-6 flex justify-center items-center'>
            <div className='w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg transition-all duration-300 hover:shadow-xl cursor-pointer'>
                S
            </div>
            {isOpen && <span className="ml-3 text-sm font-medium">Sam Smith</span>}
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
        <div className='flex flex-col gap-2 mt-8 px-4'>
            {menuItems.map((item, index) => (
                <MenuItem key={index} icon={item.icon} tooltip={item.tooltip} isOpen={isOpen} />
            ))}
        </div>
    );
}

function MenuItem({ icon, tooltip, isOpen }) {
    return (
        <Tooltip title={isOpen ? '' : tooltip} placement="right">
            <div className={`p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-gray-800 flex items-center ${isOpen ? 'justify-start' : 'justify-center'}`}>
                {React.cloneElement(icon, {
                    sx: { fontSize: "24px" },
                    className: 'text-gray-300'
                })}
                {isOpen && <span className="ml-3 text-sm">{tooltip}</span>}
            </div>
        </Tooltip>
    );
}

function Logo({ isOpen }) {
    return (
        <div className={`flex items-center ${isOpen ? 'justify-start px-6' : 'justify-center'} h-16 bg-gray-800`}>
            <TaskAltIcon
                className='text-blue-400'
                sx={{
                    fontSize: '32px',
                }}
            />
            {isOpen && <span className="ml-2 text-xl font-bold text-white">TaskMaster</span>}
        </div>
    );
}

export default MainSidebar;