const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

//Sign-up
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (!username ||  !email || !password ) {
        res.send("All fields are required");
        return;
    }

    // Check if the email already exists in the 'customer' table
    db.query('SELECT * FROM User WHERE email = ?', [email], (selectErr, selectResult) => {
        
        if (selectErr) {
            console.log(selectErr);
            res.send("Internal Server Error");
            return;
        }

        // If email already exists, send an error response
        if (selectResult.length > 0) {
            res.send("Email already exists");
            return;
        }

        // If email is unique, proceed with the signup
        db.query('INSERT INTO User (username, email, password,role) VALUES (?,?,?,"user")', [username, email, password], (insertErr, insertResult) => {
            if (insertErr) {
                console.log(insertErr);
                res.send("Internal Server Error");
                return;
            }
            console.log(insertResult);

            res.send("Sign-up successful");
        });
    });
});

//Sing-in
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.send("All fields are required");
        return;
    }
    db.query('SELECT * FROM User WHERE email = ? AND password = ?', [email, password], (err, result) => {
        if (err) {
            console.log(err);
            return;
        } 
        else if (result.length > 0) {
            console.log(result);
            res.send(result);
            return;
        }
        else {
            res.send("no user found");
            return;
        }
    })
})

//Change password
app.post('/changepassword', (req, res) => {
    const { email, newPassword } = req.body;
    // Check if email and new password are provided
    if (!email || !newPassword) {
        res.send("All fields are required");
        return;
    }
    // Update the password
    db.query('UPDATE User SET password = ? WHERE email = ?', [newPassword, email], (updateErr, updateResult) => {
        if (updateErr) {
        console.log(updateErr);
        res.status(500).send("Internal Server Error");
        return;
        }
        console.log(updateResult);
        res.send("Password changed successfully");
    });
});

//Add product
app.post('/addproduct',(req, res) => {
    const { name,  price, release_date, video_link, description, publisher_name, developer_name, category_name, image_link} = req.body;
    db.query('INSERT INTO Product (name,  price, release_date, video_link, description, publisher_name, developer_name, category_name) VALUES (?,?,?,?,?,?,?,?)', [name,  price, release_date, video_link, description], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Internal Server Error");
            return;
        }
        console.log(result);
        res.send("Product added successfully");
    });
    db.query('SELECT MAX(id) AS latest_id FROM product', (err, result) => {
        if (err) {
            console.error('Error executing the query: ' + err.stack);
            return;
        }
        //add image
        const product_id = result[0].latest_id;
        for (let i = 0; i < image_link.length; i++){
            db.query('INSERT INTO Image (product_id,image_link) VALUES (?,?)', [product_id,image_link[i]], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("Internal Server Error");
                    return;
                }
                console.log(result);
                res.send("Image added successfully");
            })
        }
    })
    //add publisher, developer, category
    db.query('INSERT INTO Publisher (name) VALUES (?)', [publisher_name], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Internal Server Error");
            return;
        }
        console.log(result);
        res.send("Publisher added successfully");
    })
    db.query('INSERT INTO Developer (name) VALUES (?)', [developer_name], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Internal Server Error");
            return;
        }
        console.log(result);
        res.send("Developer added successfully");
    })
    db.query('INSERT INTO Category (name) VALUES (?)', [category_name], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Internal Server Error");
            return;
        }
        console.log(result);
        res.send("Category added successfully");
    })
    
});

//Delete product
app.post('/deleteproduct',(req, res) => {
    const { product_id } = req.body;
    db.query('DELETE FROM Product WHERE id = ?', [product_id], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Internal Server Error");
            return;
        }
        console.log(result);
        res.send("Product deleted successfully");
    })
});

//Add tranproduct
app.post('/tranproduct', (req, res) => {
    const { transaction_id ,product_id} = req.body;
    for (let i = 0; i < product_id.length; i++) {
        db.query('INSERT INTO tranproduct (transaction_id, product_id) VALUES (?, ?)', [transaction_id, product_id[i]], (err, result) => {
            if (err) {
                console.log(err);
                res.send("Internal Server Error");
                return;
            }
            console.log(result);
        });
    }
    res.send("Tranproduct record successfully");
    
})

//Add cart
app.post('/cartadd', (req, res) => {
    const { user_id ,product_id} = req.body;
    for (let i = 0; i < product_id.length; i++) {
        db.query('INSERT INTO Cart (user_id, product_id) VALUES (?, ?)', [user_id, product_id[i]], (err, result) => {
            if (err) {
                console.log(err);
                res.send("Internal Server Error");
                return;
            }
            console.log(result);
        });
    }
    res.send("cart added successfully");
})

//Delete cart item
app.post('/cartdelete', (req, res) => {
    const { user_id ,product_id} = req.body;
    db.query('DELETE FROM Cart WHERE user_id = ? AND product_id = ?', [user_id, product_id], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Internal Server Error");
            return;
        }
        console.log(result);
        res.send("Cart deleted successfully");
    })
})

app.listen(3005, () => {
    console.log("Server is running on port 3001");
})