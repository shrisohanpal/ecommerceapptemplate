import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        image: {
            type: String
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            }
        ]
    }, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

export default Category