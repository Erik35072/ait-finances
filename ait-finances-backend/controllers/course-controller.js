const { CourseModel } = require("../models/course-model");
const mongoose = require("mongoose");

// utils
const { error, success } = require("../utils/responses");

async function getCourses(_, res) {
  const courses = await CourseModel.find({}).sort({ createdAt: -1 });
  success(res, { data: courses });
}

async function getCourse(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return error(res, { message: "No such course", code: 404 });

  const course = await CourseModel.findById({ _id: id });

  if (!course) return error(res, { message: "No such course", code: 404 });

  success(res, { data: course });
}

async function addCourse(req, res) {
  const { title, type, date } = req.body;

  try {
    const course = await CourseModel.create({ title, type, date });
    success(res, { data: course, code: 201 });
  } catch (error) {
    error(res, { message: error.message, code: 400 });
  }
}

async function removeCourse(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return error(res, { message: "No such course", code: 404 });

  const course = await CourseModel.findByIdAndDelete({ _id: id });

  if (!course) return error(res, { message: "No such course", code: 400 });

  success(res, { data: course });
}

async function updateCourse(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return error(res, { message: "No such course", code: 404 });

  const course = await CourseModel.findByIdAndUpdate({ _id: id }, { ...req.body });

  if (!course) return error(res, { message: "No such course", code: 400 });

  success(res, { data: course });
}

module.exports = {
  getCourses,
  getCourse,
  removeCourse,
  updateCourse,
  addCourse
};
