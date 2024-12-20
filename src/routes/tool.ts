export const toolRoutes = [
    {
      path: "/tools/automatic-messaging",
      name: "WhatsappMassMessage",
      component: () => import("@/views/message/WhatsappMassMessageView.vue"),
    },
    {
      path: "/tools/generate-id",
      name: "StudentCard",
      component: () => import("@/views/tools/StudentCardView.vue"),
    }
  ]; 