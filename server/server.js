const admin = require('firebase-admin');
const { initializeApp } = require('firebase/app')
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth')
const credentials = require("./itis-5166-final-project-firebase-adminsdk-t1wv7-2f84aaf574.json");
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const randomColor = require('randomcolor');
const app = express();
const port = 3000;

app.use(cors());

const firebaseConfig = {
    apiKey: "AIzaSyA54eWMz_RrPoxEOvUz-F_if1Hg_OoKvTs",
    authDomain: "itis-5166-final-project.firebaseapp.com",
    projectId: "itis-5166-final-project",
    storageBucket: "itis-5166-final-project.appspot.com",
    messagingSenderId: "645044054192",
    appId: "1:645044054192:web:26cd005054be8e06b77375",
    measurementId: "G-Z84GJWP2C5"
  };

initializeApp(firebaseConfig);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(credentials)
    });
}

const db = admin.firestore();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.options('*', cors());

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/api/budget/fetch', async (req, res) => {
    try {
            // Extract JWT Token from request
        const { token } = req.body;

        // Define Data Structures for All 3 Charts
        const pieData = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: []
            }]
        };

        const lineData = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                    fill: false,
                    borderColor: '#3cba9f',
                    label: 'Money Spent'
                },
                {
                    data: [],
                    fill: false,
                    borderColor: '#3bd3e',
                    label: 'Budget Goal'
                }
            ]
        };

        const barData = {
            labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            datasets: []
        }

        // Get Reference to Budget Document
        const usersDofRef = db.collection('users').doc(token);

        // Get Budget Document
        const usersDoc = await usersDofRef.get();
        // Get Snapshot of Categories
        const categoriesSnapshot = await usersDofRef.collection('categories').get();
        // Get Snapshot of All Expenses
        const expensesSnapshot = await usersDofRef.collection('expenses').get();  

        // Fill Pie Chart Data and Add Category Datasets to Bar Chart
        categoriesSnapshot.forEach((doc) => {
            const categoryData = doc.data();
            pieData.labels.push(categoryData.name);
            pieData.datasets[0].data.push(categoryData.price);
            pieData.datasets[0].backgroundColor.push(randomColor({ luminosity: 'light', format: 'rgba', alpha: 0.8 }));

            const barCategory = {
                label: '',
                backgroundColor: randomColor({ luminosity: 'light', format: 'rgba', alpha: 0.8 }),
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] 
            }

            barCategory.label = categoryData.name;
            barData.datasets.push(barCategory)
        });

        // Add Budget Goal to Line Chart Data
        const budgetTotal = usersDoc.data().total;
        for (const [i, month] of lineData.labels.entries()) {
            lineData.datasets[1].data.push(budgetTotal);
        }

        // Fill Line Chart Data
        expensesSnapshot.forEach((expense) => {
            const expenseData = expense.data();
            for (const [i, month] of lineData.labels.entries()) {
                if (month === expenseData.month) {
                    lineData.datasets[0].data[i] += expenseData.amount;
                    for(const category of barData.datasets) {
                        if (expenseData.category === category.label) {
                            category.data[i] += expenseData.amount;
                        }
                    }
                }
            }
        });

        res.json({
            pieData: pieData,
            lineData: lineData,
            barData: barData
        });
    }
    catch {
        console.log("Error");
    }
    
});

app.post('/api/budget/fetch/all', async (req, res) => {
    try {
        const { token } = req.body;

        const budgetData = {
            total: 0,
            categories: []
        }
    
        const usersDofRef = db.collection('users').doc(token);
        const usersDoc = await usersDofRef.get();
        const categoriesSnapshot = await usersDofRef.collection('categories').get();
    
        budgetData.total = usersDoc.data().total;
    
        categoriesSnapshot.forEach((doc) => {
            const categoryData = doc.data();
            const category = {
                name: '',
                price: 0
            }
            category.name = categoryData.name;
            category.price = categoryData.price;
            budgetData.categories.push(category);
        });
    
        console.log(budgetData)
    
        res.json(budgetData);    
    }
    catch {
        console.log("Error")
    }
});

app.post('/api/budget/update', async (req, res) => {
    const { token, updatedBudget } = req.body;

    const userDocRef = db.collection('users').doc(token)
    const newTotal = updatedBudget.total;
    const newCategories = updatedBudget.categories;

    userDocRef.update({
        total: newTotal
    })
    .then(() => {
        console.log("Updated Successfully")
    })
    .catch((error) => {
        console.error("Error updating document: ", error)
    })

    newCategories.forEach((category) => {
        userDocRef.collection('categories').add({
            name: category.name,
            price: category.price
        })

    })
    
});

app.post('/api/budget/add', (req, res) => {

    try {
        const { label, data, backgroundColor } = req.body;
        mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
        let newData = new budgetModel({ label, data, backgroundColor });
        budgetModel.insertMany(newData)
            .then((data) => {
                console.log(data);
                res.json({addedData: data});
                mongoose.connection.close();
            })
            .catch((connectionError) => {
                console.log(connectionError);
            });
    }
    catch (RequestError) {
        console.log(RequestError);
    }

});

app.post('/api/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await admin.auth().createUser({
            email,
            password
        });
        const uid = user.uid;
        console.log(uid)
        admin.auth().createCustomToken(uid)
            .then((token) => {
                console.log(token)
                db.collection('users').doc(token).set({
                    total: 0
                })

                res.json({ 
                    success: true,
                    err: null,
                    token: token 
                });
            });
    }
    catch (error) {
        console.log(error);
    }
})


app.post('/api/login', (req, res) => {
    try {
        const { email, password } = req.body;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;
                admin.auth().createCustomToken(uid)
                        .then((token) => {
                            res.status(200);
                            res.json({ 
                                success: true,
                                err: null,
                                token: token 
                            });
                        });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`API served at https://monkfish-app-3ps63.ondigitalocean.app`);
});