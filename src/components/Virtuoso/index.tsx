import config, { IVirtuosoProps } from './Virtuoso.config';
import { T4DComponent, useEnhancedEditor } from '@ws-ui/webform-editor';
import Build from './Virtuoso.build';
import Render from './Virtuoso.render';

const Virtuoso: T4DComponent<IVirtuosoProps> = (props) => {
  const { enabled } = useEnhancedEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return enabled ? <Build {...props} /> : <Render {...props} />;
};

Virtuoso.craft = config.craft;
Virtuoso.info = config.info;
Virtuoso.defaultProps = config.defaultProps;

export default Virtuoso;
