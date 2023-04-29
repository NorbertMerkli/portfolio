import * as fs from "fs";
import { execSync } from "child_process";

const gitResponse: string = execSync("git status --porcelain", {
  encoding: "utf8",
});

const changedFiles: string[] = gitResponse.split("\n");

const prefixLibrary: { [key: string]: string } = {
  "scripts/": "scripts",
};

const prefixesToApply = new Array<string>();

let isRootChanged = false;

for (const filePath of changedFiles) {
  for (const path of Object.keys(prefixLibrary)) {
    if (filePath.includes(path)) {
      if (!prefixesToApply.includes(prefixLibrary[path])) {
        prefixesToApply.push(prefixLibrary[path]);
        break;
      }
    }

    isRootChanged = true;
  }
}

const originalCommitMessage: string = fs.readFileSync(".git/COMMIT_EDITMSG", {
  encoding: "utf8",
});

const prefixedCommitMessage: string =
  (isRootChanged ? "[root]" : "") +
  prefixesToApply
    .map((prefix) => `[${prefix}]`)
    .sort()
    .join("") +
  " " +
  originalCommitMessage;

fs.writeFileSync(".git/COMMIT_EDITMSG", prefixedCommitMessage);
