import {DataSource} from "typeorm";
import {User} from "./backend/entities/auth.ts";
import {StudentEntity} from "./backend/entities/students.ts";
import {FileEntity} from "./backend/entities/file.ts";
import {AbsenceEntity} from "./backend/entities/absence.ts";
import {PaymentEntity} from "./backend/entities/payment.ts";
import {BranchEntity, ClassRoomEntity, GradeEntity} from "#electron/backend/entities/grade.ts";
import {app} from "electron";
import {CourseEntity, ObservationEntity} from "#electron/backend/entities/course.ts";
import path from 'path';


export class AppDataSource {
    private static instance: DataSource;
    private constructor() {}
    static getInstance(): DataSource {
        if (!AppDataSource.instance) {
            const dbPath = path.join(app.getPath('userData'), 'database.db');
            
         
            AppDataSource.instance = new DataSource({
                type: "better-sqlite3",
                synchronize: true,
                database: dbPath,
                logging: true,
                entities: [User, FileEntity, StudentEntity, GradeEntity , ClassRoomEntity , BranchEntity , CourseEntity , ObservationEntity, AbsenceEntity, PaymentEntity],
                subscribers: [],
                migrations: [],
            });
        }
        return AppDataSource.instance;
    }

    static async initialize(): Promise<DataSource> {
        const instance = AppDataSource.getInstance();
        if (!instance.isInitialized) {
            await instance.initialize();
            console.log("Base de données initialisée avec succès.");
        }
        return instance;
    }
}