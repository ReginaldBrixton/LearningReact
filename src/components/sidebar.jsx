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
import './sidebar.css'; // Assuming you have a CSS file for styles

function MainSidebar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`main-sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-content">
                <Logo isOpen={isOpen} />
                <Menu isOpen={isOpen} />
                <ProfileImage />
            </div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="toggle-button"
                aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
                {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </button>
        </div>
    );
}

function ProfileImage() {
    return (
        <div className='profile-image-container'>
            <div className='profile-image'>
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
        <div className='menu'>
            {menuItems.map((item, index) => (
                <MenuItem key={index} icon={item.icon} tooltip={item.tooltip} isOpen={isOpen} />
            ))}
        </div>
    );
}

function MenuItem({ icon, tooltip, isOpen }) {
    return (
        <Tooltip title={isOpen ? '' : tooltip} placement="right">
            <div className={`menu-item ${isOpen ? 'open' : ''}`} role="button" aria-label={tooltip}>
                {React.cloneElement(icon, {
                    sx: { fontSize: "24px" },
                    className: 'menu-item-icon'
                })}
                {isOpen && <span className="menu-item-text">{tooltip}</span>}
            </div>
        </Tooltip>
    );
}

function Logo({ isOpen }) {
    return (
        <div className={`logo ${isOpen ? 'open' : ''}`}>
            <TaskAltIcon
                className='logo-icon'
                sx={{
                    fontSize: '40px',
                }}
            />
            {isOpen && <span className="logo-text">TaskMaster</span>}
        </div>
    );
}

export default MainSidebar;