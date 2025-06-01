import { getCourses, getUserProgress } from "@/config/queries";

import { List } from "./List";

const CoursesPage = async () => {
  const coursesdata = getCourses();
  const userProgress = getUserProgress();

  const [ courses, userProgressData] = await Promise.all([coursesdata, userProgress]);

  return (
    <div className="h-full max-w-[921px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">Courses</h1>

      <List courses={courses} activeCourseId={userProgressData?.activeCourseId} />
    </div>
  );
};
export default CoursesPage;
