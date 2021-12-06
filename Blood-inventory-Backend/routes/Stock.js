const express = require('express');
const { check, validationResult } = require('express-validator');
const { findOneAndUpdate } = require('../models/Stock');

const Stock_city = require('../models/Stock');

const router = express.Router();


const validateStock = [
  check('city_name')
    .exists()
    .withMessage('City name is required')
    .isIn(['Marseille', 'Paris', 'Dijon', 'Nice', 'Lille'])
    .withMessage(
      'City name should be one of the following cities: Marseille, Paris, Dijon, Nice, Lille'
    ),

  check('blood_stock.*.category_name')
    .exists()
    .withMessage('Blood category name is required')
    .isIn(['A', 'B', 'AB', 'O'])
    .withMessage(
      'Category name should be one of the following: A, B, AB or O'
    ),

    check('blood_stock.*.sub_category.*.name')
    .exists()
    .withMessage('Blood category name is required')
    .isIn(['Plus', 'Moins'])
    .withMessage(
      'Category name should be one of the following: Plus or Moins'
    ),

];


router.post('/stocksAdd', validateStock,async(req,res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).send({ errors: errors.array() });
  }
  const stock_city = new Stock_city({
    city_name: req.body.city_name,
    blood_stock: req.body.blood_stock,

  })
  // defining our variables: our Category and SubCategory: 
  const ourCategory = req.body.blood_stock[0];
  const ourSubcategory = req.body.blood_stock[0].sub_category[0];

  const city = await Stock_city.findOne({
    city_name:req.body.city_name
  });

  if(!city){
    return stock_city.save().then((result) => res.send(result));
  }
  else{
    const blood_stock_city = city.blood_stock;
    const category = blood_stock_city.find( ({category_name}) => category_name === ourCategory.category_name );
    
    const index = blood_stock_city.indexOf(category);
     

    // if the category doesn't exist -1, push to the array. 
    if(index==-1){

      let new_Category = await Stock_city.updateOne({city_name:req.body.city_name},{$addToSet:{blood_stock:ourCategory}});
            return res.status(200).send({ success: true, message: "Stock Added Successfully"});

    }
    // if the category already exist: index > 0
    
    else{

      // loop through the subCategory array to check if our passed subCategory exist: 
      const subCategory = category.sub_category.find( ({name}) => name === ourSubcategory.name);
      const subIndex = category.sub_category.indexOf(subCategory);
      console.log(subIndex);
      if(subIndex==-1){
        let sub_add = await Stock_city.updateMany(
        {city_name:req.body.city_name,'blood_stock.category_name':category.category_name},
        {$inc: {'blood_stock.$.stock':ourSubcategory.stock},$addToSet:{'blood_stock.$.sub_category':ourSubcategory} }
        );
        return res.status(200).send({ success: true, message: "Stock Added Successfully"});
      }

      // if the subcategory exist: 
      else{
        let Sub_category_Addition = await Stock_city.findOneAndUpdate(
          {
            city_name: req.body.city_name,
            blood_stock: { "$elemMatch" : {"category_name" :ourCategory.category_name} }
          },

          {
            $inc: { "blood_stock.$.sub_category.$[elem].stock":ourSubcategory.stock, "blood_stock.$.stock":ourSubcategory.stock}
          },
          {
            arrayFilters : [ { "elem.name":ourSubcategory.name} ]
          }

        );
        return res.status(200).send({ success: true, message: "Stock Added Successfully"});

          
      }


    }

    
  }




});


// /api/stocks

router.get('/Stocks', (req, res) => {
  Stock_city.find()
    .then((Stocks) => {
      res.send(Stocks);
    })
    .catch((err) => console.log(err));
});

router.delete('/Stocks', (req, res) => {
  Stock_city.deleteMany()
    .then((Stocks) => {
      res.send(Stocks);
    })
    .catch((err) => console.log(err));
});


router.post('/TransferStock', async(req,res) => {

  const city_src = req.body.src;
  const city_dest = req.body.dest;
  const category_name = req.body.category_name;
  const subcategory_name = req.body.subcategory_name;
  const stock_to_transfer = req.body.stock;

  // if the city doesn't exist.
  const city = await Stock_city.findOne({ city_name: city_src })
  if (!city) return res.status(404).send({ success: false, message: 'Source City doesnt existe' }) // if the city doesn't exists  

  // if the source city exist: 

  const find_category = city.blood_stock.find(blood_stock => blood_stock.category_name === category_name && blood_stock.stock >= stock_to_transfer);
  
  if (!find_category) return res.status(404).send({ success: false, message: "The Stock of this Category doesn't allow to make a Transfer" })

  // if the category exist and it's stock is > than stock to transfer: 

  const find_subcategory = find_category.sub_category.find( sub => sub.name === subcategory_name && sub.stock >= stock_to_transfer);
  
  if (!find_subcategory) return res.status(404).send({ success: false, message: "The Stock of this Sub-Category doesn't allow to make a Transfer" })
  
  
  //If All is Ok: category and subcategory exist and their stock allow to do the transfer then : 

  let stock_src = find_subcategory.stock - stock_to_transfer;
  let stock_category =find_category.stock - stock_to_transfer;
  const update_Stock_src = await Stock_city.findOneAndUpdate(
    {"city_name":city_src,"blood_stock.category_name":category_name},
    {$set: { "blood_stock.$.sub_category.$[elem].stock":stock_src,"blood_stock.$.stock":stock_category}},
    { arrayFilters: [ { "elem.name": subcategory_name}]}
  );

  // The city destination 

  //first if it's doesn't exist: 

  const city_dest_find = await Stock_city.findOne({ city_name: city_dest });

  const stock_dest_city = new Stock_city({
    city_name: city_dest,
    blood_stock:[{"category_name":category_name,"stock":stock_to_transfer,sub_category:[{"name":subcategory_name,"stock":stock_to_transfer}]}]
  })

  if(!city_dest_find){

    await stock_dest_city.save();
    return res.status(200).send({ success: true, message: "Stock has been Transfered Succefully"})

  }
  // if the city destination exist:
  else{
    
    const find_category_dest = await Stock_city.findOne({
      city_name:city_dest,
      'blood_stock.category_name':category_name
    });
    // if the category doesn't exist add it to the array!
    if(!find_category_dest){
      const result =await Stock_city.findOneAndUpdate(
        {city_name: city_dest},
        {$addToSet: {"blood_stock":stock_dest_city.blood_stock}}
      );
      return res.status(200).send({ success: true, message: "Stock has been Transfered Succefully"})
    }
    // if the category already exist
    else{
      await Stock_city.findOneAndUpdate(
        {"city_name":city_dest,"blood_stock.category_name":category_name},
        {$inc: {"blood_stock.$.stock":stock_to_transfer,"blood_stock.$.sub_category.$[elem].stock":stock_to_transfer}}
        ,{ arrayFilters: [ { "elem.name": subcategory_name}]}
        )
        return res.status(200).send({ success: true, message: "Stock has been Transfered Succefully"})
    }
  }


})
module.exports = router;
