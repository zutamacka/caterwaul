const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/Home.vue"), name: "Home" },
      {
        path: "/about",
        component: () => import("src/pages/About.vue"),
        name: "About"
      },
      {
        path: "/login",
        component: () => import("src/pages/Login.vue"),
        name: "Login"
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
