import express from "express";
import React from "react";

import { renderToString } from "react-dom/server";
import Home from "../pages/Home";

const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  const html = renderToString(<Home />);

  res.send(html);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`run in http://localhost: ${PORT}`);
  }
});
