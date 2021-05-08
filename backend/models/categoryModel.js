import mongoose from 'mongoose'

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        subCategorys: {
            type: [String],
            default: ['DSC1', 'DSC2']
        }
    }, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

export default Category