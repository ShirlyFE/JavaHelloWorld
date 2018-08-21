import getEntry from './sections/entry';
import getPlugins from './sections/plugins';
import output from './sections/output';
import rules from './sections/rules';
import retriveModules from './modules';
import cleanOutput from './cleanOutput';

const composeConfig = ({ appEntries, jadeTemplatesInfo, MODULESMAP }) => {
  const env = process.env.NODE_ENV;
  const stats = !!process.env.STATS;
  let devtool = env === 'production' ? '' : 'inline-source-map';
  devtool = stats ? 'source-mape' : devtool;
  const watch = env === 'development' && !stats;
  const entry = getEntry(appEntries);
  const plugins = getPlugins(jadeTemplatesInfo, MODULESMAP);
  const config = {
    entry,
    output,
    module: {
      rules
    },
    plugins,
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: ['src', 'examples', 'node_modules']
    },
    resolveLoader: {
      modules: ['node_modules'],
      moduleExtensions: ['-loader']
    },
    devtool,
    watch
  };

  return config;
};

export default function getConfig() {
  return cleanOutput()
    .then(() => retriveModules())
    .then((modules) => {
      const webpackConfig = composeConfig(modules);
      return Promise.resolve(webpackConfig);
    });
}
