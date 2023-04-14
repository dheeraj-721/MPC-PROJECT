import * as React from "react";

// importing material UI components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ addr, bal }) {
    return (
        <AppBar
            position="static"
            color="inherit"
            style={{ boxShadow: "none", borderBottom: "1px black solid" }}
        >
            <Toolbar style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                columnGap: "30px"
            }}>
                <Typography
                    component="div"
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        columnGap: "5px",
                    }}
                ><Typography style={{ fontSize: "20px", paddingBottom: "5px"}}>account:</Typography>
                    <Typography>{addr}</Typography>
                </Typography>
                <Typography
                    component="div"
                    color="inherit"
                    marginRight="6%"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        columnGap: "5px",
                    }}
                >
                    <Typography style={{ fontSize: "20px", paddingBottom: "5px" }}>balance:</Typography>
                    <Typography>{bal/10**18}</Typography>
                    <Typography>ETH</Typography>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
