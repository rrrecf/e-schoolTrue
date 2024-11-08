import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, BeforeInsert, JoinColumn,  OneToMany } from "typeorm";
import { FileEntity } from "./file"; // Assurez-vous que le chemin d'importation est correct



@Entity('T_student')
export class StudentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "text" })
    firstname?: string;

    @Column({ type: "text" })
    lastname?: string;

    @Column({ type: "text" })
    matricule?: string;

    @Column({ type: "text" })
    fatherFirstname?: string;

    @Column({ type: "text" })
    fatherLastname?: string;

    @Column({ type: "text" })
    motherFirstname?: string;

    @Column({ type: "text" })
    motherLastname?: string;

    @CreateDateColumn()
    createdAt?: Date;

   // Relation avec FileEntity pour le document
   @OneToOne(() => FileEntity)
   @JoinColumn({ name: "documentId" })
   document?: FileEntity;

     // Relation avec FileEntity pour la photo
     @OneToOne(() => FileEntity, { nullable: true })
     @JoinColumn({ name: "photoId" })
     photo?: FileEntity;

    @Column({ type: "int", nullable: true })
    photoId?: number;

    @Column({ type: "date" })
    birthDay?: Date;

    @Column({ type: "text" })
    birthPlace?: string;

    @Column({ type: "text" })
    address?: string;

    @Column({ type: "text" })
    famillyPhone?: string;

    @Column({ type: "text" })
    personalPhone?: string;

    @Column({ type: "int", nullable: true })
    classId?: number | null;

    @BeforeInsert()
    generateMatricule() {
        const currentYear = new Date().getFullYear();
        const randomPart = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        this.matricule = `${currentYear}${randomPart}`;
    }

    @Column({ type: "text", nullable: true })
    sex?: 'male' | 'female';

    @Column({ type: "text", nullable: true })
    schoolYear?: string;

    // Nouveaux champs

    // Relation OneToMany avec FileEntity
    @OneToMany(() => FileEntity, file => file.student)
    documents?: FileEntity[];
}
