// router.use(express.urlencoded({ extended: true }));
const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("connect to db"))
  .catch((err) => console.log("can't connect to db", err));
const courseSchema = new mongoose.Schema({
  name:{type:String,required:true,lowercase:true,trim:true} ,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price:Number,
//   price:{type:Number,required:function(){return this.isPublished}}

});
const Course = mongoose.model("Course", courseSchema)
validateCourse = (course) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      author: Joi.string().alphanum().min(3).max(30).required(),
      tags: Joi.array().items(Joi.string()),
      isPublished: Joi.boolean(),
      //price is required if isPublished is true
      //i can do it in mongoose as i commented in it but
      // i do that to show that the price is required in response
      price: Joi.when('isPublished', {
        is:true,
        then: Joi.number()
        .required()
    })         
    });
    let result = schema.validate(course);
    return result;
  };
exports.Course=Course;
exports.validate=validateCourse;

