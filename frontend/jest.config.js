module.exports = {
    // Otras configuraciones de Jest...
    moduleNameMapper: {
      '\\.(json)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['jest-canvas-mock'],
    transformIgnorePatterns: [
        '/node_modules/(?!lottie-web)',
      ],
  };
  