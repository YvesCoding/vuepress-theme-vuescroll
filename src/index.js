let baseOptions = {
  ops: {
    bar: {
      background: '#3eaf7c'
    },
    rail: {
      gutterOfEnds: '60px'
    },
    scrollPanel: {
      scrollingX: false
    }
  }
};

export default baseOptions;

export function registry(ops = baseOptions.ops) {
  baseOptions.ops = ops;
}
