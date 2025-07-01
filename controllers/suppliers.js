const { Supplier } = require('../Models')

// CREATING NEW SUPPLIER
const createSupplier = async (req, res) => {
    try {
        const { name, address, phone, fax, email } = req.body
        const createdBy = req.user._id

        const newSupplier = await Supplier.create({ name, address, phone, fax, email,
            products: [], created_by: createdBy})

        res.status(201).json({ status: 'Successful', message: 'Supplier created successfully', supplier: newSupplier })

    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error creating supplier', error: error.message })
    }
}


// GETTING SUPPLIER DETAILS
const getSupplier = async (req, res) => {
    try {
        const supplierId = req.body

        const supplier = await Supplier.findById(supplierId)
        if (!supplier) {
            return res.status(404).json({ status: 'Not Found', message: 'Supplier not found', error: error.message })
        }

        res.json(supplier)

    } catch (error) {
        res.status(500).json({ status: 'Failure', message: 'Error updating supplier', error: error.message })
    }
}


// GETTING ALL SUPPLIERS
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find({}).populate('created_by', 'username name email')
        res.status(200).json(suppliers)
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', message: 'An error has occurred while fetching suppliers' })
    }
}


// GETTING SUPPLIERS BY PRODUCTS
const getSuppliersByProduct = async (req, res) => {
    try {
        const { productId } = req.body

        const suppliers = await Supplier.find({ 'products.productId': productId })
            .populate('created_by', 'username name email')

        if (suppliers.length === 0) {
            return res.status(404).json({ status: 'Not Found', message: 'No suppliers found for this product' })
        }

        res.status(200).json(suppliers)

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Error', message: 'An error has occurred while fetching suppliers by product' })
    }
}


// UPDATING SUPPLIER DETAILS
const updateSupplier = async (req, res) => {
    try {
        const { supplierId, name, address, phone, fax, email } = req.body

        const supplier = await Supplier.findById(supplierId)
        if (!supplier) {
            return res.status(404).json({ status: 'Not Found', message: 'Supplier not found' })
        }
        
        supplier.name = name
        supplier.address = address
        supplier.phone = phone      
        supplier.fax = fax
        supplier.email = email

        await supplier.save()
        res.status(200).json({ status: 'Successful', message: 'Supplier updated successfully', supplier })

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Failure', message: 'Error updating supplier', error: error.message })
    }
}


// DELETING SUPPLIER
const deleteSupplier = async (req, res) => {
    try {
        const { supplierId } = req.body

        const supplier = await Supplier.findByIdAndDelete(supplierId)
        if (!supplier) {
            return res.status(404).json({ status: 'Not Found', message: 'Supplier not found' })
        }

        res.status(200).json({ status: 'Successful', message: 'Supplier deleted successfully' })

    } catch (error) {
        console.error(error)
        res.status(500).json({ status: 'Failure', message: 'Error deleting supplier', error: error.message })
    }
}


module.exports = {
    createSupplier,
    getSupplier,
    getAllSuppliers,
    getSuppliersByProduct,
    updateSupplier,
    deleteSupplier
}