# JS async comparisons

This repository has been started in response to a [simple post](https://github.com/DamonOehlman/damonoehlman.github.io/blob/master/posts/2013/2013-07-23-callbacks-vs-promises-vs-streams.md) comparing a few different async coding approaches available.

I've transferred those examples here along with others suggested in comments so people (including myself) can get some hands on experience with asynchronous coding with simple, but real examples.

Our list of examples at the moment are:

- [child directory reader](/child-dirs)

## Running an Example

To run an example, first install dependencies:

```
npm install
```

Then run the sample.  For example to run the `child-dirs` sample, `callbacks-using-async` variant run the following:

```
node child-dirs/callbacks-using-async
```

## Creating an Example

The idea of this repository, is to demonstrate / experiment with various approaches.  It is not to an attempt to criticize any approach but rather an attempt to better understand the strength and weaknesses of various approaches, and in which situations a particular approach works best.

For that to happen, pull requests are encouraged and where possible use the following guidelines:

- Can be run by running `node %sample%/%variant%` which means they are self contained in an `index.js` file within that directory.

- Generate a single line of output to `stdout` (I just use a `console.log` statement) when the results of the async operation have been determined.