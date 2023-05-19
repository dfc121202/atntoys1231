const express = require('express')
const { insertToDB, getAll, deleteObject, getDocumentById, updateDocument } = require('./databaseHandler')
const app = express()

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
    var result = await getAll("Products")
    res.render('home', { products: result })
})

app.get('/add', async (req, res) => {
    res.render('add');
})

app.get('/index', async (req, res) => {
    var result = await getAll("Products")
    res.render('index', { products: result });
})

app.post('/insert', async (req, res) => {

    const name = req.body.txtName
    const price = req.body.txtPrice
    const url = req.body.txtURL;

    if (url.length == 0) {
        var result = await getAll("Products")
        res.render('add', { products: result, picError: 'Phai nhap Picture!' })
    } else {
        //xay dung doi tuong insert
        const obj = { name: name, price: price, pic: url}
        //goi ham de insert vao DB
        await insertToDB(obj, "Products")
        res.redirect('/')
    }
})

app.post('/update', async (req, res) => {

    const id = req.body.txtId
    const name = req.body.txtName
    const price = req.body.txtPrice
    const url = req.body.txtURL;

    let updateValues = { $set: { name: name, price: price, pic: url} };

    await updateDocument(id, updateValues, "Products")
    res.redirect('/')
})

app.get('/edit/:id', async (req, res) => {
    const idValue = req.params.id
    const productToEdit = await getDocumentById(idValue, "Products")
    res.render("edit", { product: productToEdit })
})



app.get('/delete/:id', async (req, res) => {
    const idValue = req.params.id
    await deleteObject(idValue, "Products")
    res.redirect('/')
})


const PORT = process.env.PORT || 5000
app.listen(PORT)
console.log('Server is running!')