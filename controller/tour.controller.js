const Tour = require("../model/Tour");
exports.getProduct = async (req, res) => {
  try {
    const query = {};
    if (req.query.field) {
      const fields = req.query.field.split(",").join(" ");
      query.field = fields;
    }
    if (req.query.sort) {
      const sort = req.query.sort.split(",").join(" ");
      query.sort = sort;
    }
    if (req.query.page) {
      const { page = 1, limit = 5 } = req.query;
      const skip = (page - 1) * parseInt(limit);
      query.skip = skip;
      query.limit = parseInt(limit);
    }
    const tour = await Tour.find({})
      .select(query.field)
      .sort(query.sort)
      .skip(query.skip)
      .limit(query.limit);

    // const totalProduct = await Tour.countDocuments({});
    // const pageCount = Math.ceil(totalProduct / query.limit);

    res.status(200).json({
      status: "success",
      message: "data get Successfully",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data fail to get",
      data: error.message,
    });
  }
};
exports.getProductById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const tour = await Tour.find({ _id: id });

    //viewCount Function Call
    findOneandUpdateOne(id);

    res.status(200).json({
      status: "success",
      message: "data get Successfully",
      data: tour,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data fail to get",
      data: error.message,
    });
  }
  next();
};

exports.createProduct = async (req, res, next) => {
  try {
    const tour = new Tour(req.body);

    const result = await tour.save();

    res.status(200).json({
      status: "success",
      message: "data inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data not inserted Successfully",
      data: error.message,
    });
  }
};

exports.updateController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Tour.updateOne(
      { _id: id },
      { $set: req.body },
      { runValidators: true }
    );
    //console.log(result);
    res.status(200).json({
      status: "success",
      message: "data inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data not update Successfully",
      data: error.message,
    });
  }
};

exports.getThreeCheapestTour = async (req, res, next) => {
  try {
    const result = await Tour.find({}).limit(3).sort({ price: 1 });
    res.status(200).json({
      status: "success",
      message: "data inserted Successfully",
      data: result,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      message: "data not update Successfully",
      data: error.message,
    });
  }
};

//finding viewCount
const findOneandUpdateOne = async (id) => {
  console.log(id);
  const result = await Tour.updateOne({ _id: id }, { $inc: { viewCount: 1 } });

  return;
};

exports.getThreeViewdTour = async (req, res, next) => {
  try {
    const result = await Tour.find({}).limit(3).sort({ viewCount: -1 });
    res.status(200).json({
      status: "success",
      message: "data inserted Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "data not update Successfully",
      data: error.message,
    });
  }
};
