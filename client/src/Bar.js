import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { AppBar, Button, Menu, MenuItem, Toolbar } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
export default function Bar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open1 = Boolean(anchorEl1);
    const handleClick1 = (event) => {
        setAnchorEl1(event.currentTarget);
    };
    const handleClose1 = () => {
        setAnchorEl1(null);
    };
    return (
        <div className="toolbar">
            <AppBar position="sticky">
                <Toolbar style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <Button onClick={handleClick}>
                        <CreateIcon style={{ color: '#2196f3', fontSize: "27.35px", cursor: 'pointer' }} />
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={()=>{handleClose();props.setBold(4)}}>Light</MenuItem>
                        <MenuItem onClick={()=>{handleClose();props.setBold(6)}}>Bold</MenuItem>
                    </Menu>
                    <Button onClick={handleClick1}>
                        <ColorLensIcon style={{ color: '#ffff', fontSize: "27.35px" }} />
                    </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open1}
                        onClose={handleClose1}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={()=>{handleClose1();props.setSelectedColor('red')}}><CircleIcon style={{marginRight:'9px',color:'red'}} />Red</MenuItem>
                        <MenuItem onClick={()=>{handleClose1();props.setSelectedColor('green')}}><CircleIcon style={{marginRight:'9px',color:'green'}} />Green</MenuItem>
                        <MenuItem onClick={()=>{handleClose1();props.setSelectedColor('yellow')}}><CircleIcon style={{marginRight:'9px',color:'yellow'}} />Yellow</MenuItem>
                        <MenuItem onClick={()=>{handleClose1();props.setSelectedColor('black')}}><CircleIcon style={{marginRight:'9px',color:'black'}} />Black</MenuItem>
                        <MenuItem onClick={()=>{handleClose1();props.setSelectedColor('blue')}}><CircleIcon style={{marginRight:'9px',color:'blue'}} />Blue</MenuItem>
                    </Menu>
                    <Button onClick={()=>{props.clear()}}>
                        <ClearIcon style={{ color: 'red', fontSize: "35px" }} />
                    </Button>
                    <Button onClick={()=>{props.download()}}>
                        <DownloadIcon style={{ color: '#92A8D1', fontSize: "30px" }} />
                    </Button>
                </Toolbar>
            </AppBar>

        </div>
    )
}
