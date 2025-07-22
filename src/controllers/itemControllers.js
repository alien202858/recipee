const Item = require("../model/ItemModel");

const getAllItems = async (req, res) => {
        const results = await Item.find().sort({ createAt: -1 });
        res.status(200).json(results);
};

const getSearchedItems = async (req, res) => {
    const{q} = req.query;
    try{
        let items;
        if(q){
            items = await Item.find({name:{$regex:q,$options:'i'}});
        }
        res.status(200).json(items);
    }
    catch(error){
        console.error('Error searching items:', error);
        res.status(500).json({message:"Server Error"});
    }
};

const getSingleItem = async (req, res) => {
    const {id} = req.params;
    try{
        const item = await Item.findById(id);
        res.json(item);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
}

module.exports = {
    getAllItems,
    getSearchedItems,
    getSingleItem
};