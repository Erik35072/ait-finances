const { CourseModel, GroupModel } = require("../models/course-model");
const mongoose = require("mongoose");

// utils
const { error, success } = require("../utils/responses");
const { error_404 } = require("../providers/errors");

async function getGroups(req, res) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return error(res, error_404);

  const course = await CourseModel.findById(id);

  if (!course) return error(res, error_404);

  success(res, { data: { courseId: course.id, courseTitle: course.title, groups: course.groups } });
}

async function getGroup(req, res) {
  const { id, groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return error(res, error_404);
  if (!mongoose.Types.ObjectId.isValid(groupId)) return error(res, error_404);

  const course = await CourseModel.findById({ _id: id });
  const group = course.groups.find(group => group.id === groupId);

  if (!course) return error(res, error_404);
  if (!group) return error(res, error_404);

  let paidFeesTotal = 0;
  let notPaidFeesTotal = 0;
  let totalFees = 0;

  group.students.forEach(student => {
    if (student.isFeePaid) paidFeesTotal += student.feeAmount;
    else notPaidFeesTotal += student.feeAmount;

    totalFees += student.feeAmount;
  });

  success(res, {
    data: {
      ...group._doc,
      paidFeesTotal,
      notPaidFeesTotal,
      totalFees
    }
  });
}

async function addGroup(req, res) {
  const { id } = req.params;
  const { title, students } = req.body;

  try {
    const group = await GroupModel.create({ title, students });

    const course = await CourseModel.findById(id);
    await CourseModel.findByIdAndUpdate(id, { groups: [...course.groups, group] }, { new: true });
    success(res, { data: group, code: 201 });
  } catch (error) {
    error(res, { message: error.message, code: 400 });
  }
}

async function removeGroup(req, res) {
  const { id, groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return error(res, error_404);

  const course = await CourseModel.findByIdAndUpdate({ _id: id }, { $pull: { groups: { _id: groupId } } });

  if (!course) return error(res, { message: "No such course", code: 400 });

  success(res, { data: course.groups });
}

async function updateGroup(req, res) {
  const { id, groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return error(res, error_404);
  if (!mongoose.Types.ObjectId.isValid(groupId)) return error(res, error_404);

  const course = await CourseModel.findByIdAndUpdate(
    { _id: id },
    { $set: { "groups.$[element]": { ...req.body } } },
    { arrayFilters: [{ "element._id": groupId }], new: false }
  );

  if (!course) return error(res, { message: "No such course", code: 400 });

  success(res, { data: course });
}

module.exports = {
  getGroups,
  addGroup,
  removeGroup,
  updateGroup,
  getGroup
};
