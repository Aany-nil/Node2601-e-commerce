const categorySchema = require("../models/categorySchema");

const createCategory = async (req, res) => {
    const {title} = req.body;
    console.log(createCategory);

    try {
        if(!title?.trim()) {
        return res.status(400).send({ message: "category title is required" });
        }
        
        const category = await categorySchema.create({ title });

      res.status(200).send({ message: "Category created successfully" });

    } catch (error) {
     console.log(error);
     res.status(500).send({ message: "Internal server error" });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await categorySchema.find({});
        res.status(200).send(categories);
    } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" }); 
    }
};


module.exports = { createCategory, getAllCategories }