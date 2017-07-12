# React generate

To keep the consistency in React projects, use this library to auto-generate code that was agreed and tested by the [CornerJob](https://github.com/cornerjob) tech team, this will speed up our performance as developers and also keep the code efficient and intuitive.


## What we use?

We are using the following libraries in our React project. If your project uses these libraries then `react-generate` is for you.

* [immutable](https://github.com/facebook/immutable-js/)
* [redux-immutable](https://github.com/gajus/redux-immutable)
* [reselect](https://github.com/reactjs/reselect)
* [enzyme](https://github.com/airbnb/enzyme)
* [jest](https://github.com/facebook/jest)
* [styled-components](https://github.com/styled-components/styled-components)

## Getting Started

Install `react-generate` using `npm`:

```
npm install --save-dev react-generate
```


Let's get started by configuring your `package.json`, you have to add a script to your `package.json` so we can use it after.In this case, we will add the `generate` script


```
// package.json
{
  "scripts": {
    "generate": "reactgen" // reactgen is the binary that this library uses!
  }
}
```


Now we need some parameters to make this library work:

* **srcPath** *(required)*: the path to the main source, we also need the `container` and `component` directories within it.
* **testFileExtension** *(optional)*: The sub-extension for the test files that we are going to generate


To set these parameters you need to use the `package.json`, add the `reactGenerate` object to set the parameters:

```
// package.json
{
  "reactGenerate": {
    "srcPath": "./src",
    "testFileExtension": "test"
  }
}
```


Finally, your can run the generator:

```
npm run generate -- [options]
```

Below, we have an example of the `[options]` you can pass to the `reactgen` command

```
  Options:

    -d, --domains    Generates a domain
    -t, --container  Generates a container
    -p, --component  Generates a component
    -h, --help       output usage information
```
