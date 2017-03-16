# painless-alarm-clock [![Build Status](https://travis-ci.org/jt3k/painless-alarm-clock.svg?branch=master)](https://travis-ci.org/jt3k/painless-alarm-clock)

> Alarm clock with fade-in function

> *It's currently not in a usable state.*

![illustration](https://rawgit.com/jt3k/painless-alarm-clock/master/illustration.svg)

## Install

```
$ npm install --save painless-alarm-clock
```


## Usage

```js
const painlessAlarmClock = require('painless-alarm-clock');

painlessAlarmClock('unicorns');
//=> 'unicorns & rainbows'
```


## API

### painlessAlarmClock(input, [options])

#### input

Type: `string`

Lorem ipsum.

#### options

##### foo

Type: `boolean`<br>
Default: `false`

Lorem ipsum.


## CLI

```
$ npm install --global painless-alarm-clock
```

```
$ painless-alarm-clock --help

  Usage
    painless-alarm-clock [input]

  Options
    --foo  Lorem ipsum. [Default: false]

  Examples
    $ painless-alarm-clock
    unicorns & rainbows
    $ painless-alarm-clock ponies
    ponies & rainbows
```


## License

MIT © [Andrey Gurtovoy](https://github.com/jt3k)
