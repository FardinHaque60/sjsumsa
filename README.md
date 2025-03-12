# sjsumsa
SJSU revamped MSA website. 
- old site: https://sjsumsa.org/
- old site source code: https://github.com/tifa2UP/sjsumsa.org

## visit
visit the prototype site at [`sjsumsa.vercel.app`](https://sjsumsa.vercel.app/)
- navigate to [`/readme`](https://sjsumsa.vercel.app/) to see all implemented features 

the real site will be deployed at [`sjsumsa.org`](https://sjsumsa.org/)

## running the app
- `cd frontend`
- `ng serve` (install angular command line tools if you havent already `npm install -g @angular/cli`)

## tech stack
built with angular and supabase

## devs see below
- read up on the stack we are using above, we can look to schedule a meeting sometime soon to discuss more about it.
- see [issues tab](https://github.com/FardinHaque60/sjsumsa/issues?q=is%3Aissue%20state%3Aopen) on github for to do items
    - check milestones to get ideas of features in each release
- branches are created for each issue/ feature
    - make sure to `git rebase master` when working on a feature to ensure it is up to date
- assign yourself to the feature you are working on so others are aware
- update the description by striking out parts as you complete them
- communicate in the comments what parts you are working on

## general todo
- ucsd msa example site: https://msaucsd.com/#
- need to find template for UI
- ask slack for emails to add to firebase 

## angular commands info

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
