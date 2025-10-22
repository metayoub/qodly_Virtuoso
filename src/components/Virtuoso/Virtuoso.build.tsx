import {
  IteratorProvider,
  selectResolver,
  useDatasourceSub,
  useEnhancedEditor,
  useEnhancedNode,
} from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC } from 'react';

import { IVirtuosoProps } from './Virtuoso.config';
import { Virtuoso as Virt } from 'react-virtuoso';
import { Element } from '@ws-ui/craftjs-core';
import { BsFillInfoCircleFill } from 'react-icons/bs';

const Virtuoso: FC<IVirtuosoProps> = ({
  accordionMode = false,
  style,
  datasource,
  className,
  classNames = [],
}) => {
  const {
    connectors: { connect },
  } = useEnhancedNode((node) => ({
    linkedNodes: node.data.linkedNodes,
    dom: node.dom,
  }));

  const { resolver } = useEnhancedEditor(selectResolver);

  useDatasourceSub();

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      {datasource ? (
        <Virt
          totalCount={10}
          fixedItemHeight={100}
          itemContent={(index) => (
            <div className="item m-1">
              {index === 0 ? (
                <IteratorProvider>
                  <Element
                    id="element"
                    style={{
                      width: 'auto',
                      hieght: '100px',
                    }}
                    role="element"
                    is={resolver.StyleBox}
                    deletable={false}
                    canvas
                  />
                  {accordionMode && (
                    <div>
                      <p className="p-2">Use This to build Details for Accordion Mode</p>
                      <Element
                        id={'element-body'}
                        role="element-content"
                        is={resolver.StyleBox}
                        deletable={false}
                        canvas
                      />
                    </div>
                  )}
                </IteratorProvider>
              ) : null}
            </div>
          )}
        />
      ) : (
        <div className="flex h-full flex-col items-center justify-center rounded-lg border bg-purple-400 py-4 text-white">
          <BsFillInfoCircleFill className="mb-1 h-8 w-8" />
          <p>Please attach a datasource</p>
        </div>
      )}
    </div>
  );
};

export default Virtuoso;
