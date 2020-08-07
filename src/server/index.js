import express from "express";
import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderToString } from "react-dom/server";

import routes from "../../routes";
import Header from "../components/Header";

const app = express();
const PORT = 3001;

app.use(express.static("public"));

app.get("*", (req, res) => {
  const context = {};

  const content = renderToString(
    <StaticRouter context={context} location={req.path}>
      <Header />
      {routes}
    </StaticRouter>
  );
  const html = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <title>test</title>
  </head>
  <body>
    <div id="root">${content}</div>
    <script src="/client.js"></script>
  </body>
</html>
`;
  res.send(html);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`run in http://localhost: ${PORT}`);
  }
});
