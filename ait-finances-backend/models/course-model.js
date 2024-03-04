const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StudentModel = new Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  isFeePaid: {
    type: Boolean,
    required: true
  },
  feeAmount: {
    type: Number,
    required: true
  }
});

const _GroupModel = new Schema({
  title: {
    type: String,
    required: true
  },
  students: [StudentModel]
});

const _CourseModel = new Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  groups: [_GroupModel]
});

const CourseModel = mongoose.model("Course", _CourseModel);
const GroupModel = mongoose.model("Group", _GroupModel);

module.exports = {
  GroupModel,
  CourseModel
};
