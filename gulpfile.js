const { src, dest, parallel, series } = require("gulp");
const rename = require("gulp-rename");
const path = require("path");
const changeCase = require("change-case");
const prettier = require("gulp-prettier");
const modifyFile = require("gulp-modify-file");
const del = require("del");
const { readdir } = require("fs").promises;

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = path.resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  // return files.flat();
  return files
    .flat()
    .filter((f) => !f.includes("index.") && !f.includes(".DS_Store"));
}

class IconTask {
  constructor(path) {
    this.path = path;
  }
  path;

  createIcons = () => {
    return src(`${this.path}/**/*.svg`)
      .pipe(
        rename((p) => ({
          dirname: p.dirname,
          basename: changeCase.paramCase(p.basename),
          extname: ".tsx",
        }))
      )
      .pipe(
        modifyFile((content, p, file) => {
          const fileName = path.parse(p).name;
          const iconName = changeCase.pascalCase(fileName);
          return `
          import { SvgIcon, SvgIconProps } from "@mui/material";

          export default function ${iconName}Icon(props: SvgIconProps) {
            return (
              <SvgIcon {...props}>
                ${content.replace(/<svg[^<>]+>|<\/svg>/g, "")}
              </SvgIcon>
            );
          }
        `;
        })
      )
      .pipe(prettier())
      .pipe(dest(this.path + "/", {}));
  };
  importIcons = async () => {
    let paths = await getFiles(this.path);
    paths = paths.map((p) => p.split(this.path).reverse()[0]);

    // fs.readdir(this.path, (_, files) => {
    //   paths = files.filter((f) => f.endsWith(".tsx") && f !== "index.tsx");
    // });

    return src(`${this.path}/index.tsx`)
      .pipe(
        modifyFile(() => {
          return paths
            .map((p) => {
              const { name, ext } = path.parse(p);
              // const name = p.replace(".tsx", "");
              return `export { default as ${changeCase.pascalCase(
                name
              )}Icon } from ".${p.replace(ext, "")}";`;
            })
            .join("");
        })
      )
      .pipe(prettier())
      .pipe(dest(this.path));
    // return src(`${this.path}/index.tsx`)
    //   .pipe(
    //     modifyFile(() => {
    //       return paths
    //         .map((p) => {
    //           const name = p.replace(".tsx", "");
    //           return `export { default as ${changeCase.pascalCase(
    //             name
    //           )}Icon } from "./${name}";`;
    //         })
    //         .join("");
    //     })
    //   )
    //   .pipe(prettier())
    //   .pipe(dest(this.path));
  };
  clearIcons = () => {
    return del([`${this.path}/**/*.svg`]);
  };
}
const customIcon = new IconTask("core/components/common/custom-icon");
const remixIcon = new IconTask("core/components/common/remixicons");

const icons = series(
  customIcon.createIcons,
  customIcon.importIcons,
  customIcon.clearIcons
);
const remixIcons = series(
  remixIcon.createIcons,
  remixIcon.importIcons,
  remixIcon.clearIcons
);
module.exports.icons = icons;
module.exports.remixIcons = remixIcons;
module.exports.default = parallel(icons, remixIcons);
