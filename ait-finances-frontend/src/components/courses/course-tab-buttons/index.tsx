import { Course, CourseType } from "@api/courses";

interface Props {
  courses: Course[];
  activeTab: CourseType;
  handleTabClick: (courseType: CourseType) => void;
}

const placeholder: Course[] = [
  { _id: "1", title: "...", type: "X" },
  { _id: "2", title: "...", type: "X" },
  { _id: "3", title: "...", type: "X" }
];

const CourseTabButtons = ({ courses = [], activeTab, handleTabClick }: Props) => {
  return (
    <div className="flex space-x-2">
      {(courses.length ? courses : placeholder).map(({ _id, title, type }) => (
        <button
          key={`course-tab-button-${_id}`}
          className={`py-2 px-4 rounded-md transition-all duration-300 ${
            activeTab === type ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
          }`}
          onClick={() => handleTabClick(type)}
        >
          {title}
        </button>
      ))}
    </div>
  );
};

export default CourseTabButtons;
