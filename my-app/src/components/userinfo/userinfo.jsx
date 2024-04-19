import React, { useState, useEffect } from "react";
import "./userinfo.css";
import { Dashboard, Person, Message, Task, AccountBalance, Assignment, Settings, Logout } from "@mui/icons-material";

const Userinfo = () => {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8800/Backend/user/getUser");
            if (!response.ok) {
                throw new Error("Failed to fetch user data");
            }
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (
        <div className="main">
            <div className="sidebar">
                <div className="sidebarWrapper">
                    <div className="sidebarMenu">
                        <h3 className="sidebarTitle"></h3>
                        <ul className="sidebarlist">
                            <li className="sidebarListItem active">
                                <Dashboard className="s" />
                                Dashboard
                            </li>

                            <li className="sidebarListItem">
                                <Person className="sidebarIcon" />
                                Users
                            </li>
                            <li className="sidebarListItem">
                                <Message className="sidebarIcon" />
                                Messages
                            </li>
                            <li className="sidebarListItem">
                                <Task className="sidebarIcon" />
                                Tasks
                            </li>
                            <li className="sidebarListItem">
                                <Assignment className="sidebarIcon" />
                                Documents
                            </li>
                            <li className="sidebarListItem">
                                <AccountBalance className="sidebarIcon" />
                                Finances
                            </li>
                            <li className="sidebarListItem">
                                <Settings className="sidebarIcon" />
                                Settings
                            </li>
                            <li className="sidebarListItem">
                                <Logout className="sidebarIcon" />
                                Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mainbar">
                <div className="ur">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">loginid</th>
                                <th scope="col">usernamefull</th>
                                <th scope="col">userdob</th>
                                <th scope="col">useredu</th>
                                <th scope="col">useradd</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.loginid}</td>
                                    <td>{user.usernamefull}</td>
                                    <td>{user.userdob}</td>
                                    <td>{user.useredu}</td>
                                    <td>{user.useradd}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Userinfo;
