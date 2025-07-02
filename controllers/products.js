const { Product, Supplier, User } = require('../Models')
const { Category, SubCategory } = require('../Models')


// CREATING NEW PRODUCT
const createProduct = async (req, res) => {
    try {
        const {name, selling_price, cost_price, key_features, status, quantity_available,
        min_balance, sku, ean, tags, pictures, options, category, supplier } = req.body

        const entered_by = req.user._id

        const product = await Product.create({ name, selling_price, cost_price, key_features,
        status, quantity_available, min_balance, sku, ean, tags, pictures, options, category,
        supplier, entered_by })

        res.status(201).json(product)

    } catch (error) {
    res.status(400).json({ error: error.message })
    }
}


// GETTING PRODUCT DETAILS
const getProductDetails = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findById(productId)
            .populate('category', 'name')
            .populate('supplier', 'name')
            .populate('entered_by', 'username name email')  

        if (!product) {
            return res.status(404).json({ status: 'Not Found', message: 'Product not found' })
        }
        res.status(200).json(product)

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', message: 'An error has occurred while fetching product details' })
    }
}


// GETTING ALL PRODUCTS
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category', 'name')
            .populate('supplier', 'name')
            .populate('entered_by', 'username name email')

        res.status(200).json(products)

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', message: 'An error has occurred while fetching products' })
    }
}


// GETTING PRODUCTS BY CATEGORY
const getProductsByCategory = async (req, res) => {
    try {
        const categoryId = req.params.id
        const products = await Product.find({ category: categoryId })
            .populate('category', 'name')
            .populate('supplier', 'name')
            .populate('entered_by', 'username name email')          

        if (products.length === 0) {
            return res.status(404).json({ status: 'Not Found', message: 'No products found for this category' })
        }
        res.status(200).json(products)  

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', message: 'An error has occurred while fetching products by category' })
    }
}


// GETTING PRODUCTS BY TAGS
const getProductsByTags = async (req, res) => {
    try {
        const { tags } = req.body
        const products = await Product.find({ tags: { $in: tags } })
            .populate('category', 'name')
            .populate('supplier', 'name')
            .populate('entered_by', 'username name email')

        if (products.length === 0) {
            return res.status(404).json({ status: 'Not Found', message: 'No products found for these tags' })
        }
        res.status(200).json(products)

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', message: 'An error has occurred while fetching products by tags' })
    }
}


// GETTING PRODUCTS BY STATUS
const getProductsByStatus = async (req, res) => {
    try {
        const { status } = req.body
        const products = await Product.find({ status })
            .populate('category', 'name')
            .populate('supplier', 'name')
            .populate('entered_by', 'username name email')

        if (products.length === 0) {
            return res.status(404).json({ status: 'Not Found', message: `No products found with status ${status}` })
        }
        res.status(200).json(products)

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', message: 'An error has occurred while fetching products by status' })
    }
}


// GETTING PRODUCTS NEWLY ADDED
const getNewlyAddedProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10 // Default to 10 products
        const products = await Product.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('category supplier entered_by')
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


// DELETING PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Product.findByIdAndDelete(productId)

        if (!product) {
            return res.status(404).json({ status: 'Not Found', message: 'Product not found' })
        }
        res.status(200).json({ status: 'Success', message: 'Product deleted successfully' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', message: 'An error has occurred while deleting product' })
    }
}

// MODIFYING PRODUCT TAGS


// MODIFYING PRODUCT STATUS


// MODIFYING PRODUCT OPTIONS

module.exports = { 
    createProduct,
    getProductDetails,
    getAllProducts,
    getProductsByCategory,
    getProductsByTags,
    getProductsByStatus,
    getNewlyAddedProducts,
}
