import { FastifyInstance } from "fastify";
import { createUserController } from "../controllers/users/createUserController";
import { validateLoginController } from "../controllers/users/validateLoginController";
import { createTeacherController } from "../controllers/teachers/createTeacherController";
import { getTeacherController } from "../controllers/teachers/getTeacherController";
import { deleteTeacherController } from "../controllers/teachers/deleteTeacherController";
import { updateTeacherController } from "../controllers/teachers/updateTeacherController";
import { createStudentController } from "../controllers/students/createStudentController";

export async function routes(fastify: FastifyInstance) {
  fastify.post("/createUser", createUserController);
  fastify.post("/validateLogin", validateLoginController);
  fastify.post("/createTeacher", createTeacherController);
  fastify.get("/getAllTeachers", getTeacherController);
  fastify.delete("/deleteTeacher", deleteTeacherController);
  fastify.put("/updateTeacher/:teacherId", updateTeacherController);
  fastify.post("/createStudent", createStudentController);
}
