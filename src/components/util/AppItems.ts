interface MenuItem {
  id: string;
  title: string;
  icon: string;
  route?: string;
  description?: string;
  subItems?: MenuItem[];
}

export const AppItems: MenuItem[] = [
    {
        id:"submenu-1",
        title: "Gestion des Elèves",
        icon: "mdi:account-school",
        subItems:[
            {
                id: "submenu-1-1",
                title: "Nouvelle Inscription",
                icon: "mdi:account-plus",
                route: "/student/add",
                subItems:[]
            },
            {
                id: "submenu-1-2",
                title: "Elèves",
                icon: "mdi:account-group",
                route: "/student",
                subItems:[]
            },
        ]
    },
    {
        id:"submenu-2",
        title: "Gestion des Professeurs",
        icon: "mdi:human-male-board",
        subItems:[
            {
                id: "submenu-2-1",
                title: "Nouvelle Inscription",
                icon: "mdi:account-plus",
                route: "/professor/add",
            },
            {
                id: "submenu-2-2",
                title: "Liste des Professeurs",
                icon: "mdi:account-tie",
                route: "/professor",
            }
        ]
    },
    {
        id: "submenu-3",
        title: "Gestion des Paiements",
        icon: "mdi:cash-register",
        subItems: [
            {
                id: "submenu-3-1",
                title: "Paiements Professeurs",
                icon: "mdi:cash-multiple",
                route: "/payment/professors",
                description: "Gérer les salaires et primes des enseignants"
            },
            {
                id: "submenu-3-2",
                title: "Paiements Élèves",
                icon: "mdi:cash",
                route: "/payment/students",
                description: "Gérer les frais de scolarité et autres paiements"
            },
            {
                id: "submenu-3-3",
                title: "Paiements Personnel",
                icon: "mdi:cash-fast",
                route: "/payment/staff",
            }
        ]
    },
    {
        id: "submenu-4",
        title: "Gestion des Plannings",
        icon: "fluent-emoji:calendar",
        subItems: [
            {
                id: "submenu-4-1",
                title: "Planning Élèves",
                icon: "fluent-emoji:spiral-calendar",
                subItems: [
                    {
                        id: "submenu-4-1-1",
                        title: "Absences",
                        icon: "fluent-emoji:cross-mark",
                        route: "/planning/students/absences",
                    },
                    {
                        id: "submenu-4-1-2",
                        title: "Planning Devoirs",
                        icon: "fluent-emoji:memo",
                        route: "/planning/students/homework",
                    },
                    {
                        id: "submenu-4-1-3",
                        title: "Congés",
                        icon: "fluent-emoji:beach-with-umbrella",
                        route: "/planning/students/vacation",
                    }
                ]
            },
            {
                id: "submenu-4-2",
                title: "Planning Professeurs",
                icon: "fluent-emoji:teacher",
                subItems: [
                    {
                        id: "submenu-4-2-1",
                        title: "Absences",
                        icon: "fluent-emoji:cross-mark",
                        route: "/planning/professors/absences",
                    },
                    {
                        id: "submenu-4-2-2",
                        title: "Congés",
                        icon: "fluent-emoji:beach-with-umbrella",
                        route: "/planning/professors/vacation",
                    }
                ]
            }
        ]
    },
    {
        id: "submenu-5",
        title: "Outils",
        icon: "fluent-emoji:hammer-and-wrench",
        subItems: [
            {
                id: "submenu-5-1",
                title: "Génération Bulletin",
                icon: "fluent-emoji:page-with-curl",
                subItems: [
                    {
                        id: "submenu-5-1-1",
                        title: "Bulletin de Paie",
                        icon: "fluent-emoji:money-bag",
                        route: "/tools/generation/payroll-slip",
                    },
                    {
                        id: "submenu-5-1-2",
                        title: "Bulletin Scolaire",
                        icon: "fluent-emoji:graduation-cap",
                        route: "/tools/generation/school-report",
                    }
                ]
            },
            {
                id: "submenu-5-2",
                title: "Génération Carte d'Identité",
                icon: "fluent-emoji:identification-card",
                route: "/tools/generate-id",
            },
            {
                id: "submenu-5-3",
                title: "Messagerie Automatique",
                icon: "fluent-emoji:incoming-envelope",
                route: "/tools/automatic-messaging",
            }
        ]
    },
    {
        id: "submenu-6",
        title: "Fichier",
        icon: "fluent-emoji:file-folder",
        subItems: [
            {
                id: "submenu-6-1",
                title: "Info école",
                icon: "fluent-emoji:school",
                route: "/info-school",
            },
            {
                id: "submenu-6-2",
                title: "Niveau scolaire",
                icon: "fluent-emoji:star",
                route: "/grade",
            },
            {
                id: "submenu-6-3",
                title: "Salles de classe",
                icon: "fluent-emoji:school",
                route: "/classroom",
            },
            {
                id: "submenu-6-4",
                title: "Matières",
                icon: "fluent-emoji:open-book",
                route: "/course",
            },
            {
                id: "submenu-6-5",
                title: "Configuration des notes",
                icon: "fluent-emoji:pencil",
                route: "/school-notes",
            },
            {
                id: "submenu-6-6",
                title: "Configuration des paiements",
                icon: "fluent-emoji:coin",
                route: "/payment-config",
            },
            {
                id: "submenu-6-7",
                title: "Répartition année scolaire",
                icon: "fluent-emoji:calendar",
                route: "/school-repartition",
            },
        ]
        
    }
]