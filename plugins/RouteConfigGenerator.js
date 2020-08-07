const fs = require("fs");
const path = require("path");

class RouteConfigGenerator {
  constructor(config) {
    const routeConfig = config.routeConfig || "";
    const match = routeConfig.match(/(.+\/)(?:.+)/);
    const fileName = match
      ? config.routeConfig.replace(match[1], "")
      : "routes.config.js";
    const routeFolder = match ? match[1] : process.cwd();

    this.indexPage = config.indexPage;
    this.pagesFolder = config.pagesFolder;

    this.routeFolder = routeFolder;
    this.routeFileName = fileName;
  }

  apply(compiler) {
    const pagesFolder = this.pagesFolder;
    const indexPage = this.indexPage;
    const relativePath = path.relative(this.routeFolder, pagesFolder);
    const routeConfig = `${this.routeFolder}/${this.routeFileName}`;

    const createConfig = (name, path, exact) => {
      return `{ path: "/${exact ? "" : name}", ${
        exact ? "exact: true," : ""
      } import: () => import("${path}"), },\r`;
    };

    function getChangedFiles(compiler) {
      const { watchFileSystem } = compiler;
      const watcher = watchFileSystem.watcher || watchFileSystem.wfs.watcher;

      return Object.keys(watcher.mtimes);
    }

    const writeConfig = (file, creator) => {
      fs.readdir(pagesFolder, function (err, list) {
        let content = "export default [\r";

        list.forEach((file) => {
          const current = `${relativePath}/${file}`;
          const isIndexPage = file === indexPage;

          let str = creator(file, current, isIndexPage);
          content = content + str;
        });

        content += "]";

        fs.writeFile(file, content, () => {
          if (err) {
            console.log("generate dynamic routes config error");
            return console.error(err);
          }

          console.log("generate dynamic routes config success");
        });
      });
    };

    compiler.hooks.watchRun.tap("RouteConfigGenerator", (_compiler) => {
      const changedFile = getChangedFiles(_compiler) || [];

      if (changedFile.length && changedFile[0].match(this.routeFileName))
        return;

      writeConfig(routeConfig, createConfig);
    });
  }
}

module.exports = RouteConfigGenerator;
