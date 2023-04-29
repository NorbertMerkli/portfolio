# Full-stack web developer portfolio

This is the place where I store all of my portfolio projects. I've chosen a monorepo solution because it makes sharing custom packages, scripts, and configurations between the different projects easier.

## Repository internals

**Monorepo approach:** I use [Turborepo](https://turbo.build/repo) to handle the build and development pipeline of the projects. The different projects are organized into workspaces by their types.

The workspace layout is the following:

- **apps:** standalone frontend and/or backend applications
- **packages:** abstractions that are shared across multiple standalone projects
- **scripts:** custom scripts for development

**Package management:** [PNPM](https://pnpm.io/) manages the packages inside my workspaces. It has storage that contains shared packages. After installation, the packages are linked to specific projects. This strategy reduces the disk space requirements of the monorepo.

**Version control:** My obvious choice was [Git](https://git-scm.com/) and [GitHub](https://github.com/). I also use custom scripts to prefix my commits so they are more organized and can be filtered later. [Husky](https://typicode.github.io/husky/#/) makes it easy to integrate my scripts with git hooks so they run automatically on every commit.

```shell
# The current commit message format looks like this
[<project_name>] <commit_type>: <commit_message>

# Example commit message
[root][scripts] feat: autoprefix commit messages with folder names
```

The following commit types are used throughout the monorepo:

| Commit Type | Description                 |
| ----------- | --------------------------- |
| feat        | New feature implementation  |
| fix         | Bug fix                     |
| refactor    | Code refactoring            |
| docs        | Add or update documentation |
| style       | Add styling related changes |
