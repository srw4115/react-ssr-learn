export default [
  {
    path: "/",
    exact: true,
    import: () => import("./pages/Home"),
  },
  {
    path: "/detail",
    import: () => import("./pages/detail"),
  },
];
