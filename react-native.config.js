module.exports = {
    dependencies: {
      '@bam.tech/react-native-batch': {
        platforms: {
          android: {
            packageInstance: 'new RNBatchPackage(this.getApplication())',
          },
        },
      },
    },
  };