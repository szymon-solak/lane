const pipe = (...functions) => input =>
  functions
    .reduce(
      (chain, fn) => chain.then(fn),
      Promise.resolve(input)
    )

export default pipe
