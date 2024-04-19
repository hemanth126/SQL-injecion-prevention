// backend/controllers/userController.js

import { db } from "../connect.js";

export const getUser = (req, res) => {
    const query = 'SELECT * FROM login';
    db.query(query, (err, data) => {
        if (err) {
            console.error("Error fetching user data:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        res.json(data);
    });
};
