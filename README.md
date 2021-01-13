# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## GET STARTED
Clone the repo from github and extract the files to your preferred working directory for which you have rights to.
You'll need to open at least 2 commandline windows to be able to use application.

Navigate to the project directory via the commandline.


## INSTALLING DEPENDENCIES
## Available Scripts

In the project directory, you can run:

### 'yarn install`

Will install all the dependencies for the client application.

## server-side  dependencies:
While in the project directory,

`cd server`

and ### `npm install` 

to install the dependencies for the json-server(mock server), essentially just `cors`

## RUNNING THE UI CLIENT
### `yarn start`

Runs the client app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

 ut The page will reload if you make edits.\
You will also see any lint errors in the console.

## RUNNING THE MOCK SERVER

In the project's directory:

### `cd server`

and then run ### `npm start`

This will start the mock json-server at ### `http://localhost:5000`

### MOCK SERVER API

Given the base URL `http://localhost:5000`, the mock server has the following endpoints:

`/candidates`-->fetchs all the candidates
`/candidates/:id`--fetches the candidate with `:id`
`/resumes` -->fetches all the resumes/CVs
`/resumes/:id`-->fetches the resume with `:id`
`/resumes/:id?_embed=comment` or `/resumes/:id/comments` fetches the comments for the resume with id `:id`.
`/resumes/:id/comments/:commentId` fetches the comment with id `:commentId` for resume with id `:id`.
`/jobs` fetches all jobs
`/jobs/:id` fetches job with id `:id`
`/applications/:id` fetches application with id `:id`
`/sample_resumes/resume_name` fetches resume named `resume_name` for the purposes of this demo, they are `resume1`,
                              `resume2` and `resume3`.

Note that since applications and jobs are outside of the scope of this tech assessment, they have been put there as placeholders and don't have Client side supporting UI.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## ADDITIONAL LIBRARIES USED

I don't believe in re-inventing the wheel I don't need to. As it stands, the React developer community has a vast 
of resources in the form of ready to use components or components that can be quickly customized. This allows for
rapid prototyping. Instead of wasting hours trying to say implement a calendar or a dropdown, the first thing a
developer should do is get online and see what he/she can use to save time. There is also the added advantage that,
if a component is widely used in the community, it has become well-tested(battle tested) as a result, so it's much
more reliable.

This is a small list of libraries I used with a brief explanation why:

1. fast-deep-equal-->allows deep comparison between two objects. React uses referential comparison or shallow
   comparison during the diffing, in some cases you want to compare the entire object to make components render
   correctly.
2. react-select: An easy to use if not elegant DropDownList component from the community. It's widely used and
   well tested.
3. Bootstrap: From Twitter, is a vast trove of CSS to enable easy and consistent styling between different browsers
   and different formats. It's also not that hard to augment via style or JSS (styled-component or emotion). It provides
   a very good starting point for your components.
4. react-pdf: This is an excellent pdf-viewer built ontop of PDF.js the most reliable PDF library in the javascript
   ecosystem. This one allows use of service workers to enable the pdf to be loaded on a separate thread hence keeping
   the screen responsive while the document draws. It has excellent support for annotations and pagination.
5. axios: is one of the most popular REST API libraries that can be used on both the front-end and the back-end.
   It's extremely easy to use and robust.

## ON REDUX

Due to the limited scope of this demo, I didn't find any justifiable reason to use a state container like redux. The main component PbpApp.jsx manages its own state locally and acts as the container component for all the others with the
exception  of CandidateList.jsx and ResumeViewer.jsx which have local ephemeral state, for the sake of efficiency, it would be better to load the entire remote state
tree appertaining to each candidate and store it in the redux store(i.e. a candidate, along with resume, and comments). That would most definitely make it perform faster and we can have a less chatty interface.

## ON REACT Hooks

The stateful components(those that extend React.Component) could have easily been done with React Hooks(useEffect and
useState) this was just a question of what I started out with.


## POSSIBLE IMPROVEMENTS OF THE DEMO

There are a few improvements that could be made, this is in regard to the Client application not
the server for the current server is nothing but a mock:

1. Unit testing using 'react-testing-library'. The best way to develop components is to
   write the tests first and build them from there. This library makes it exceedingly simple to do some
   because it allows the developer to write the tests from the perspective of a user.
2. A much most consistent look and feel especially one that allows devices with different screen sizes.
3. For a larger application, I prefer to separate container components from the presentation components. I like 
   having  many simple functional/presentation components and a few container/stateful components. Any side-effects
   would be done via a dedicated client side service layer in the form of redux-thunks or redux-sagas. Components would not call the REST API functions directly,
   they'd be invoked via the redux-thunks or redux-sagas and local state updated. The container components would then be
   connected to the redux-state container via connect(from 'react-redux' or via useDispatch and useSelector 'reselect' library could be used in conjunction with 'fast-deep-equal' to query state).  
   
   Over and above using thunks for side-effects
   I also like to use an additional layer of indirection via custom hooks. Each custom hook would encapsulate a given state an side-effect e.g. useLocalStorage is a hook to make it easy to use localStorage for storing say the JWT token(though cookies are much safer this). This is because there are already very
   many, very well tested hooks out there in the community that provide a high starting point for most of the functionality required in an app. I find that about 80% of the app is common house-keeping work and about 20% is the unique,
   competitive advantage stuff. What I prefer at the beginning of a project is to do the 80% in about 20% of the time,so that I am left with more time to tackle the unique stuff, more time to experiment and test it.
4. Provide CRUD UIs for jobs, applications, questions etc This administrative work could easily be managed by 
   leveraging a component like 'react-admin' to do the dashboard quickly.
5.  Authentication and authorization. Especially usingg Bearer token stored in the cookie(not in the redux state object).
    On the server side all it requires is implementation of authentication middleware and authorization middleware functions. An axios client would be created and the cookie set within it(or the header should the JWT be preferred to be sent via the header).
6. String constants e.g. URLs would be stored in 'env' and a config object used to load them. Alternatively, they
   can be stored in the form of  const BASE_URL='http://localhost:5000' etc, so that if the URL changes it won't
   affect the code much.
7. Use a more eloborate way to handle form local state and form field validation. In my case, I prefer to use `formik`
   form local state management and `yup` for field validation, they work very well together.
