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



// GETTING SUPPLIERS BY PRODUCTS




// UPDATING SUPPLIER DETAILS




// DELETING SUPPLIER