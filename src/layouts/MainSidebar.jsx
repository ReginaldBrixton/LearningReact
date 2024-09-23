import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import BorderAllIcon from '@mui/icons-material/BorderAll';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import LogoutIcon from '@mui/icons-material/Logout';
import { Tooltip } from '@mui/material';
import './MainSidebar.css'; // Assuming you have a CSS file for styles
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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

// Profile Image
function ProfileImage() {
    return (
        <div className='profile-image-container'>
            <div className='profile-image'>
                S
            </div>
        </div>
    );
}

// Menu
function Menu({ isOpen }) {
    const menuItems = [
        { icon: <BorderAllIcon />, tooltip: "Dashboard" },
        { icon: <SplitscreenIcon />, tooltip: "Split View" },
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

// MenuItem
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

MenuItem.propTypes = {
    icon: PropTypes.element.isRequired,
    tooltip: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

// Logo
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

Logo.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};

export default MainSidebar;