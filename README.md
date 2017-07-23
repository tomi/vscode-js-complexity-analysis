## JavaScript Complexity Analysis for Visual Studio Code

Uses [ESComplex] to produce a complexity analysis report for a JavaScript project or file. The following [metrics] can calculated:

* Lines of code
* Number of parameters
* Cyclomatic complexity
* Halstead metrics
* Maintainability


## Installation

* Install the latest Visual Studio Code.
* In the command palette (`Ctrl-Shift-P` or `Cmd-Shift-P` or `F1`) select `Install Extension` and choose `JS Complexity Analysis Report`.


## Usage

This extenson uses [typhonjs-escomplex](https://github.com/typhonjs-node-escomplex/typhonjs-escomplex) to analyse source files. Currently it utilizes babylon w/ all plugins enabled to analyse source code, so it should support most JS syntax.

### Project analysis

![GIF](images/cmd.gif)

Produces a per function complexity analysis report of all `.js` files in the project. Open command palette `F1` and search for `Project complexity analysis`.

By default uses project's `jsconfig.json` configuration for including and excluding files, but files can also be configured using include and exclude glob patterns. Select `Code` --> `Preferences` --> `User Settings` or `Workspace Settings`. For example:

```javascript
"complexityAnalysis.exclude": [
    "**/bower_components/**"
],

"complexityAnalysis.include": [
    "**/app/**/*.js"
]
```

### File analysis

Produces a per function complexity analysis report of currently open file. Open command palette `F1` and search for `File complexity analysis`.


## Change Log

[View](https://github.com/tomi/vscode-js-complexity-analysis/blob/master/CHANGELOG.md)


## Bugs

Report them [here](https://github.com/tomi/vscode-js-complexity-analysis/issues).


## Licence

[MIT](https://github.com/tomi/vscode-js-complexity-analysis)

[typhonjs-escomplex]: https://github.com/typhonjs-node-escomplex/typhonjs-escomplex

## Acknowledgements

This project is a grateful recipient of the [Futurice Open Source sponsorship program](http://futurice.com/blog/sponsoring-free-time-open-source-activities). ♥
