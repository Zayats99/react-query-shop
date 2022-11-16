# Getting Started 

### Add environment variables

```sh
REACT_APP_UPLOAD_PRESET=[your upload preset]
REACT_APP_CLOUDINARY_UPLOAD_NAME=[your cloud name]
```
### Install all dev
```
npm install
```
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Commit workflow

### General commit patern

```sh
type(scope?): description
```

- ```type ``` - Possible values are feat | fix | style | chore | ci.
 - ```scope ``` - Any scope to which type applies, usually we either omit scope or use the component name / part of the app name.
 - ``` description  ``` - Description of changes, needs to start with lowercase character to pass 

Example: 
```sh
feat(UploadWidget): created a widget for uploading images to Cloudinary
```
### Supported types:
- ```feat``` - a new feature
  ```feat(scope): description or feat: description```

- ```fix``` - a bug fix
  ```fix(scope): description or fix: description```

 - ```style``` - changes only styles 
    ```style(scope): description or style: description```

- ```chore``` - other changes that don't modify src
 ```chore(scope): description or chore: description```

- ```ci``` - changes to CI configuration files and scripts
  ```ci(scope): description or ci: description```

