# Reconciler

React under the hood uses a much more refined version of the reconciler that I designed here. DOM operations are expensive that is where reconciler comes and decreases the number of operations that we need to perform on the DOM with the concepts such as Virtual DOM, batching, etc.

This is a rough implementation of how react does it.
