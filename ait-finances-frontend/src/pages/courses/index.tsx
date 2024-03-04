import { Course, CourseType } from "@api/courses";
import Api from "@api/index";
import { useCallback, useEffect, useMemo, useState } from "react";
// components
import { CourseSection, CourseTabButtons } from "../../components/courses";

const COURSE_TAB_STORAGE_KEY = "last-tab-type";

export default function Courses() {
  const [currentTab, setCurrentTab] = useState<CourseType>(
    (sessionStorage.getItem(COURSE_TAB_STORAGE_KEY) as CourseType) ?? "WD"
  );
  const [courses, setCourses] = useState<Course[]>([]);

  const getCourses = useCallback(async () => {
    try {
      const { data } = await Api.courses.getAll();
      if (data) {
        setCourses(data);
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }, []);

  const handleTabChange = useCallback((courseType: CourseType) => {
    setCurrentTab(courseType);
    sessionStorage.setItem(COURSE_TAB_STORAGE_KEY, courseType);
  }, []);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  const { WD_course, PM_course, SMM_course, GD_course } = useMemo(() => {
    const WD_course = courses.find(course => course.type === "WD");
    const PM_course = courses.find(course => course.type === "PM");
    const SMM_course = courses.find(course => course.type === "SMM");
    const GD_course = courses.find(course => course.type === "GD");

    return { WD_course, PM_course, SMM_course, GD_course };
  }, [courses]);

  return (
    <div className="flex flex-col space-y-3">
      <CourseTabButtons courses={courses} activeTab={currentTab} handleTabClick={handleTabChange} />
      <div className="pt-8">
        {(() => {
          switch (currentTab) {
            case "WD":
              return <CourseSection title="Web development" course={WD_course} />;
            case "GD":
              return <CourseSection title="Graphic design" course={PM_course} />;
            case "SMM":
              return <CourseSection title="SMM" course={SMM_course} />;
            case "PM":
              return <CourseSection title="Project management" course={GD_course} />;
          }
        })()}
      </div>
    </div>
  );
}
