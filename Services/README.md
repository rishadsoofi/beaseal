# RoboSource Services Code Repository

Execute the following commands (within the current folder) -

- To format (All function files)
```shell
$ js-beautify functions/**/*.js -r
```
- Quality scans
```shell
$ jshint functions/**/*.js
```
- To execute test cases
```shell
$ ./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha
```
- To deploy
```shell
$ serverless deploy
```
- View logs
```shell
$ serverless logs -f <function-name>
```
