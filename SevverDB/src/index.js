const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");
const multer = require("multer");
const { upLoadeIMG , upLoadeVideo } = require("./filesupload");


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Sign-up
app.post('/api/signup', (req, res) => {
    const { username, email, password } = req.body;
    if (!username ||  !email || !password ) {
        res.send("All fields are required");
        return;
    }
    db.query('SELECT * FROM User WHERE email = ?', [email], (selectErr, selectResult) => {
        
        if (selectErr) {
            console.log(selectErr);
            res.send("Internal Server Error");
            return;
        }
        if (selectResult.length > 0) {
            res.send("Email already exists");
            return;
        }
        db.query('INSERT INTO User (name, email, password,role) VALUES (?,?,?,"user")', [username, email, password], (insertErr, insertResult) => {
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
app.post('/api/signin', (req, res) => {
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
app.post('/api/changepassword', (req, res) => {
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
app.post('/addproduct', upload.array('url', 5),async(req, res) => {
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);
    const { name,  price, release_date, description, publisher_name, developer_name, category_name, facebook, youtube, X, instagram} = req.body;
    
    if (!name || !price ||!release_date ||!description ||!publisher_name ||!developer_name ||!category_name ||!facebook ||!youtube ||!X || !instagram) {
        res.send("All fields are required");
        return;
    }
    try {
        
        // Upload images to Supabase storage
        const dataFile = req.files;

        const url = await Promise.all(
        (dataFile).map(async (file) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          const url = await upLoadeIMG(file.buffer);
          return url;
        } else if (file.mimetype === "application/pdf") {
          const url = await upLoadePDF(file.buffer);
          return url;
        } else if (file.mimetype === "video/mp4") {
          const url = await upLoadeVideo(file.buffer);
          return url;
        }}))

        const Urls = await Promise.all(url);
        const image_link1 = Urls[1];
        const image_link2 = Urls[2];
        const image_link3 = Urls[3];
        const image_link4 = Urls[4];
        const image_link5 = Urls[5];
        const videoUrl = await upLoadeVideo(req.files[0].buffer);
    //add publisher, developer, category
    db.query('select name from Publisher where name = ?',[publisher_name] ,(err, result)=>{
        if (err) {
            
            console.log(err);
            res.send("Internal Server Error");
            return;
        }
        if (result.length > 0) {
            db.query('SELECT publisher_Id AS PublisherId FROM Publisher where name = ? ',[publisher_name], (err, rows) => {
                if (err) {
                    
                    console.log(err);
                    res.send("Internal Server Error");
                    return;
                }
            
                const PublisherId = rows[0].PublisherId;
                db.query('INSERT INTO Product (name, price, video_link, release_date, description, publisher_id, image_link1, image_link2, image_link3, image_link4, image_link5) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [name,  price, release_date, videoUrl, description, PublisherId, image_link1, image_link2, image_link3, image_link4, image_link5], (err, result) => {
                    if (err) {
                        
                        console.log(err);
                        res.send("Internal Server Error");
                        return;
                    }
                    console.log("addProduct");
                    
                });
    
            })
            
            }
            
        else {
            db.query('INSERT INTO Publisher (name) VALUES (?)', [publisher_name], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("Internal Server Error");
                    return;
                }  
            });
            db.query('SELECT MAX(publisher_Id) AS lastPublisherId FROM Publisher', (err, rows) => {
                if (err) {
                    console.log(err);
                    res.send("Internal Server Error");
                    return;
                }
            
                const lastPublisherId = rows[0].lastPublisherId;
                console.log(lastPublisherId);
                db.query('INSERT INTO Product (name,  price, release_date, video_link, description, publisher_id, image_link1, image_link2, image_link3, image_link4, image_link5) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [name,  price, release_date, video_link, description, lastPublisherId, image_link1, image_link2, image_link3, image_link4, image_link5], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.send("Internal Server Error");
                        return;
                    }
                    console.log("addProduct"); 
                    
                })
            })
        } 
        
    })
    
    db.query("select name from developer where name = ?",[developer_name],(err, result) => {
        if (err) {
            console.log(err);
            res.send("Internal Server Error");
            return;
        }
        if (result.length>0) {
                return;
        } 
        else{
            db.query('INSERT INTO Developer (name,facebook,instagram,X,youtube) VALUES (?,?,?,?,?)', [developer_name,facebook,instagram,X,youtube], (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("Internal Server Error");
                
                }
        
            })
            db.query("select Developer_Id as dev_id from developer where name = ?",[developer_name],(err, result) => {
                if (err) {
                    console.log(err);
                    res.send("Internal Server Error");
                    return;
                } 
                const Developer_Id = result[0].dev_id;
                db.query("select MAX(Product_Id) as lastPID from product",(err, result)=>{
                    if (err) {
                        console.log(err);
                        res.send("Internal Server Error");
                        return;
                    }
                    const lastPID=result[0].lastPID
                    db.query('INSERT INTO dev_product (Developer_Id,Product_Id) VALUES (?,?)', [Developer_Id,lastPID], (err, result) => {
                        if (err) {
                            console.log(err);
                            res.send("Internal Server Error");
                            return;
                        }
                        res.send("added")
                    })
                })
        
            })  
        } 
    })
    
    
    db.query("select Category_Id from category where name =?",[category_name],(err, result)=>{
        if (err){
            console.log(err);
            res.send("Internal Server Error");
            return;
        }
        const Category_Id=result[0].Category_Id
        db.query("SELECT MAX(Product_Id) as PID FROM product",(err, result)=>{
            if (err) {
                console.log(err);
                res.send("Internal Server Error");
                return;
            }
            const Product_Id=parseInt(result[0].PID)
            if (!isNaN(Product_Id)) {
                // Conversion to integer was successful
                const Product_Id = parsedProductId + 1;
                db.query('INSERT INTO product_cate (Product_Id,Category_Id) VALUES (?,?)', [Product_Id,Category_Id], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.send("Internal Server Error");
                        return;
                    }
                    res.send("added")
                })
                // Continue with the rest of your code
            }
            else {
                const Product_Id =1;
                db.query('INSERT INTO product_cate (Product_Id,Category_Id) VALUES (?,?)', [Product_Id,Category_Id], (err, result) => {
                    if (err) {
                        console.log(err);
                        res.send("Internal Server Error");
                        return;
                    }
                    res.send("added")
                })
            }
            
            
        })

    })
}catch (error) {
        console.error(error);
        res.status(500).send("Error uploading images or video");
    }
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