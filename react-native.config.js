module.exports = {
    dependencies: {
      '@batch.com/react-native-plugin': {
        platforms: {
          android: {
            packageInstance: 'new RNBatchPackage(this.getApplication())',
          },
        },
      },
    },
  };