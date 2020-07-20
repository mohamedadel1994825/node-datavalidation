const express = require("express");
const router = express.Router();
router.use(express.json());
const { Course, validate } = require("../models/course");
createCourse = async (body) => {
  const course = new Course({
    name: body.name,
    author: body.author,
    tags: body.tags,
    isPublished: body.isPublished,
    price: body.price,
  });
  try {
    const result = await course.save();
    console.log("result failure", result);
    return result;
  } catch (error) {
    console.log("error====", error.message);
  }
};
getCourses = async () => {
  const courses = await Course.find({ author: "mosh", isPublished: false })
    .limit(10)
    .sort("author")
    .select("name author");
  console.log("courses:====", courses);
};
updateCourse = async (id) => {
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "memo2",
        isPublished: false,
      },
    },
    { new: true }
  );
  console.log("updated course", course);
  return course;
};
removeCourse = async (id) => {
  const course = await Course.findByIdAndRemove(id);
  let { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  console.log("req", req);
  if (!course) {
    res.status(404).send("course with the given id not found");
    return;
  }
  res.send(course);
  console.log("updated course", course);
};
router.get("/", async (req, res) => {
  let courses = await Course.find();
  console.log("req", req);
  if (!courses) {
    res.status(404).send("courses not found");
    return;
  }
  res.send(courses);
});
router.put("/:id", async (req, res) => {
  let course = await updateCourse(req.params.id);
  let { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  console.log("req", req);
  if (!course) {
    res.status(404).send("course with the given id not found");
    return;
  }
  res.send(course);
});
router.post("/", async (req, res) => {
  let course = await createCourse(req.body);
  let { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.message);
    return;
  }
  console.log("req", req);
  if (!course) {
    res.status(404).send("course with the given id not found");
    return;
  }
  console.log("req", course);
  res.send(course);
});

module.exports = router;
