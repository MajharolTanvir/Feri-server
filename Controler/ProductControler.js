const ProductDB = require("../Model/productModel");
const cloudinary = require("cloudinary");

exports.uplodeProduct = async (req, res, next) => {
  // const pictureUplodeCloude =  cloudinary.v2.uploader.upload(req.body.images, {
  //       folder: "products",
  //       width: 150,
  //       crop: "scale",
  //     });

  const { name, description, price, category, Stock, user } = req.body;
  const proudcts = await ProductDB.create({
    name,
    description,
    price,
    category,
    Stock,
    images: {
      public_id: "xxx",
      url: "xxx",
    },
  });
  res.status(200).json({
    message: "Product Uplode SuccessFull",
    product: proudcts,
  });
};

exports.getAllProduct = async (req, res, next) => {
  const products = await ProductDB.find({});
  res.send({ success: true, products });
};

exports.updateProduct = async (req, res, next) => {
  let product = await ProductDB.findById(req.params.id);
  if (!product) {
    res.status(404).json({ success: false, message: "Product Not Found" });
  }
  product = await ProductDB.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
    message: "product update Success",
  });
};

exports.deleteProduct = async (req , res, next)=>{
      const product = await ProductDB.findById(req.params.id)
      if(!product){
            res.status(404).json({success: false , message: "Product Not fond"})
      }
      product.remove()
      res.json({success:true , message: "product delete succss"})
}

exports.getProductDetails = async (req , res, next)=>{
      
      const product = await ProductDB.findById(req.params.id)
      if(!product){
            res.status(404).json({success: false , message: "Product Not fond"})
      }
      else{
            res.json({success: true , product})

      }  

}

exports.addProductReview = async (req , res, next)=>{
      try{
            const product = await ProductDB.findById(req.params.id)
            console.log(product)
            if(!product){
                  res.status(404).json({success: false , message: "Product Not fond"})
            }
            const { rating, comment, user , time ,} = req.body;
            const review = {
              user: user,
              rating: Number(rating),
              comment,
              time
            };
            console.log(req.body);
            
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length;
            await product.save({ validateBeforeSave: false });
          res.status(200).json({
            success: true,
            message: "Review Added successFull"
          });
      }
      catch(e){
            console.log(e);
      }
     

}