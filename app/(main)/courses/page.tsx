

import { getCourses } from "@/config/queries";

import { List } from "./List";

const CoursesPage = async ()=>{
    const data = await getCourses();

    return (
        <div className="h-full max-w-[921px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">Courses</h1>
            
         <List 
            courses={data}
            activeCourseId={2}
            
         />
         
        </div>
    )
}
export default CoursesPage;