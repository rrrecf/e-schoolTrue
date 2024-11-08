import GradeView from "@/views/file/GradeView.vue";
import ClassRoomView from "@/views/file/ClassRoomView.vue";
import CourseView from "@/views/file/CourseView.vue";

export const fileRoutes = [
    {
        path : '/grade' ,
        name : "Niveau scolaire" ,
        component : GradeView
    },
    {
        path : '/classroom' ,
        name : "Salles de classe" ,
        component : ClassRoomView
    },
    {
        path : '/course' ,
        name : "Matières" ,
        component : CourseView
    }
]