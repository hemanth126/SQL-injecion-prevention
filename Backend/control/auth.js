import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";


const EMAILJS_USER_ID = "smPtgwNqJ2RuoZHEH";

const trackFailedLogin = (req, userid) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("ip address :", ip);
    const q = "INSERT INTO failed_login_attempts (admin_name, ip_address) VALUES (?, ?)";
    db.query(q, [userid, ip], (err, data) => {
        if (err) {
            console.error("Error tracking failed login:", err);
        }
    });
};


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '21eg505804@anurag.edu.in', 
        pass: 'anurag12345' 
    }
});

export const register = (req, res) => {
    const q = "SELECT * FROM login WHERE userid=?";
    
    db.query(q, [req.body.userid], (err, data) => {
        if (err) return res.status(500).json(err);

        if (data.length) return res.status(409).json("User already exists!");

       
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const q = "INSERT INTO login(`userid`,`password`,`email`,`usernamefull`,`userdob`,`useredu`,`useradd`) VALUES (?, ?, ?,?,?,?,?)";
        const values = [
            req.body.userid,
            hashedPassword,
            req.body.email,
            req.body.usernamefull,
            req.body.userdob,
            req.body.useredu,
            req.body.useradd

        ];

        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        });
    });
};

export const checkAdminLogin = (req, res) => {
    const q = "SELECT * FROM adminlogin WHERE admin_name = ?";
   
    db.query(q, [req.body.userid], (err, data) => {
        
        if (err) {
            console.error("Error querying admin database:", err);
            return res.status(500).json(err);
        }
        
        console.log("Retrieved admin data:", data);

        if (data.length === 0) {
            console.log("Admin not found");
           
            trackFailedLogin(req, req.body.userid);
           
            login(req, res);
        } else {
            
            const uhashedPasswordFromDB = data[0].admin_password;
            console.log("password data:", uhashedPasswordFromDB);

          
            const checkPassword = bcrypt.compareSync(req.body.password, uhashedPasswordFromDB);
            if (!checkPassword) {
                console.log("Wrong admin password");
               
                trackFailedLogin(req, req.body.userid);
                return res.status(400).json("Wrong hello password");
            }
            console.log("Successful admin login");
            return res.status(201).json("Successful login admin");
        }
    });

    
    const adminEmail = "hemanthkumar12062000@gmail.com"; 
    const threshold = 3; 

    const qCount = "SELECT COUNT(*) AS attempts FROM failed_login_attempts WHERE admin_name = ?";
    db.query(qCount, [req.body.userid], (err, data) => {
        if (err) {
            console.error("Error querying failed login attempts:", err);
            return res.status(500).json(err);
        }

        const attempts = data[0].attempts;
        if (attempts > threshold) { 
            const subject = "Suspicious Login Activity";
            const message = `Multiple failed login attempts detected for user . Please investigate.`;
            
            transporter.sendMail({
                from: 'your-email@gmail.com',
                to: adminEmail,
                subject: subject,
                text: message
            }, (error, info) => {
                if (error) {
                    console.error("Error sending email notification:", error);
                    return res.status(403).json("Failed to send email notification");
                } else {
                    console.log("Email notification sent successfully:", info.response);
                    return res.status(405).json(" sent email notification");
                }
            });
        }
    });
};


export const login = (req, res) => {
    const q = "SELECT * FROM login WHERE userid = ?";
    db.query(q, [req.body.userid], (err, data) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.status(500).json(err);
        }
        
        console.log("Retrieved data:", data);

        if (data.length === 0)  {
            console.log("User not found");
            return res.status(404).json("User not found");
        }
      
       
        const hashedPasswordFromDB = data[0].password;

      
        const checkPassword = bcrypt.compareSync(req.body.password, hashedPasswordFromDB);
        if (!checkPassword) {
            console.log("Wrong password");
            return res.status(400).json("Wrong password");
        }
        console.log("Successful login");
        return res.status(200).json("Successful login user");
    });
};

export default { login, checkAdminLogin };


































// import { db } from "../connect.js";
// import bcrypt from "bcryptjs";

// export const register = (req, res) => {
//     const username = req.body.userid;
//     const password = req.body.password;

//     // SQL injection vulnerability: directly concatenating user input into SQL query
//     const q = `INSERT INTO login(userid, password) VALUES ('${userid}', '${password}')`;

//     db.query(q, (err, data) => {
//         if (err) return res.status(500).json(err);
//         return res.status(200).json("User has been created");
//     });
// };

// export const login = (req, res) => {
//     const userid = req.body.userid;
//     const password = req.body.password;

//     // SQL injection vulnerability: directly concatenating user input into SQL query
//     const q = `SELECT * FROM login WHERE userid='${userid}' AND password='${password}'`;

//     db.query(q, (err, data) => {
//         if (err) {
//             console.error("Error querying database:", err);
//             return res.status(500).json(err);
//         }

//         if (data.length === 0) {
//             console.log("User not found");
//             return res.status(404).json("User not found");
//         }

//         console.log("Successful login");
//         return res.status(201).json("Successful login");
//     });
// };
