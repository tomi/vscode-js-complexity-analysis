## JavaScript Complexity Analysis for Visual Studio Code
Uses [ESComplex] to produce a complexity analysis report for a JavaScript project or file. The following [metrics] can calculated:

* Lines of code
* Number of parameters
* Cyclomatic complexity
* Cyclomatic complexity density
* Halstead metrics


## Installation
* Install Visual Studio Code 0.10 or later.
* In the command palette (`Ctrl-Shift-P` or `Cmd-Shift-P` or `F1`) select `Install Extension` and choose `JS Complexity Analysis Report`.


## Usage

### Project analysis

Produces a per function complexity analysis report of all `.js` files in the project. `node_modules` folder is always ignored. Open command palette `F1` and search for `Project complexity analysis`.

By default project's `search.exclude` configuration is used for excluding files, but included files can be configured using include and exclude glob patterns. Select `Code` --> `Preferences` --> `User Settings` or `Workspace Settings`. For example:

```javascript
"complexityAnalysis.exclude": {
    "**/bower_components/**": true
},

"complexityAnalysis.include": {
    "**/app/**": true
}
```

### File analysis

Produces a per function complexity analysis report of currently open file. Open command palette `F1` and search for `File complexity analysis`.

![GIF](images/cmd.gif)

By default the following metrics are shown:
* Number of parameters
* Cyclomatic complexity
* Logical lines of code

Select `Code` --> `Preferences` --> `User Settings` or `Workspace Settings`. Supported metrics are:
* cyclomatic: Cyclomatic complexity
* cyclomaticDensity: Cyclomatic density
* physicalLOC: Physical lines of code
* logicalLOC: Logical lines of code
* params: Number of parameters
* halsteadDifficulty: Halstead difficulty
* halsteadVolume: Halstead volume
* halsteadEffort: Halstead effort

For example:

```javascript
"complexityAnalysis.metrics": [
    "cyclomatic",
    "cyclomaticDensity",
    "physicalLOC",
    "logicalLOC",
    "params",
    "halsteadDifficulty",
    "halsteadVolume",
    "halsteadEffort",
]
````

## Bugs
Report them [here](https://github.com/tomi/vscode-js-complexity-analysis/issues).


## Licence
[MIT](https://github.com/tomi/vscode-js-complexity-analysis)

[ESComplex]: https://github.com/jared-stilwell/escomplex
[metrics]: https://github.com/jared-stilwell/escomplex#metrics
