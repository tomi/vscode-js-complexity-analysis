## JavaScript Complexity Analysis for Visual Studio Code
Produces a complexity analysis report for a JavaScript file. The report consists of metrics for the entire file and per function. The following [metrics] can calculated:

* Lines of code
* Number of parameters
* Cyclomatic complexity
* Cyclomatic complexity density
* Halstead metrics

Open command palette `F1` and search for `Complexity Analysis`.

Calculated metrics can be configured, but by default the following metrics are shown:
* Number of parameters
* Cyclomatic complexity
* Logical lines of code

![GIF](images/cmd.gif)


## Installation
* Install Visual Studio Code 0.10 or later.
* In the command palette (`Ctrl-Shift-P` or `Cmd-Shift-P` or `F1`) select `Install Extension` and choose `JS Complexity Analysis Report`.


## Configuration
Calculated metrics can be configured into preferences. Select `Code` --> `Preferences` --> `User Settings` or `Workspace Settings`. Supported metrics are:
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

[metrics]: https://github.com/jared-stilwell/escomplex#metrics
