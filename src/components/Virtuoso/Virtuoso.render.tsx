import {
  EntityActions,
  entitySubject,
  EntityProvider,
  selectResolver,
  useDataLoader,
  useDsChangeHandler,
  useEnhancedEditor,
  useEnhancedNode,
  useRenderer,
  useSources,
} from '@ws-ui/webform-editor';
import cn from 'classnames';
import { FC, useRef, useState } from 'react';
import { Virtuoso as Virt } from 'react-virtuoso';
import { IVirtuosoProps } from './Virtuoso.config';
import { Element } from '@ws-ui/craftjs-core';

const Virtuoso: FC<IVirtuosoProps> = ({
  accordionMode,
  iterator,
  style,
  className,
  classNames = [],
}) => {
  const { connect, emit } = useRenderer();
  const { id: nodeID } = useEnhancedNode();
  const [selected, setSelected] = useState(-1);
  const [scrollIndex, setScrollIndex] = useState(0);

  const [count, setCount] = useState(0);
  const {
    sources: { datasource: ds, currentElement: currentDs },
  } = useSources({ acceptIteratorSel: true });
  const { fetchIndex } = useDataLoader({
    source: ds,
  });

  const { resolver } = useEnhancedEditor(selectResolver);

  const virtuoso = useRef(null);

  const { updateCurrentDsValue } = useDsChangeHandler({
    source: ds,
    currentDs,
    selected,
    scrollIndex,
    setSelected,
    setScrollIndex,
    setCount,
    fetchIndex,
    onDsChange: ({ length, selected, scrollIndex }) => {
      console.log(
        'Datasource changed. New length:',
        length,
        'Selected index:',
        selected,
        'Scroll index:',
        scrollIndex,
      );
      if (selected >= 0) {
        updateCurrentDsValue({
          index: selected < length ? selected : 0,
          forceUpdate: true,
        });
      }
    },
    onCurrentDsChange: (selected) => {
      // scroll to the selected index
      if (virtuoso.current && selected >= 0) {
        // @ts-ignore
        virtuoso.current.scrollToIndex({
          index: selected,
          align: 'center',
          behavior: 'smooth',
        });
      }

      entitySubject.next({
        action: EntityActions.UPDATE,
        payload: {
          nodeID,
          index: selected,
        },
      });
    },
  });

  const handleClick = async (index: number) => {
    setSelected(index);
    await updateCurrentDsValue({ index });
    emit!('onselect');
  };

  return (
    <div ref={connect} style={style} className={cn(className, classNames)}>
      <Virt
        totalCount={count}
        fixedItemHeight={200}
        increaseViewportBy={200}
        ref={virtuoso}
        itemContent={(index) => {
          const isSelected = index === selected;
          return (
            <div
              className={cn({
                item: true,
                selected: isSelected,
                'bg-purple-200': isSelected,
                'item-odd': index % 2 === 0,
                'item-even': index % 2 === 1,
              })}
              onClick={() => handleClick(isSelected ? -1 : index)}
            >
              <EntityProvider
                index={index}
                selection={ds}
                current={currentDs?.id}
                iterator={iterator}
              >
                <Element
                  id="element"
                  style={{
                    minWidth: 'auto',
                    minHeight: '100px',
                  }}
                  role="element"
                  is={resolver.StyleBox}
                  canvas
                />
                {accordionMode && isSelected && (
                  <div>
                    <Element
                      id={'element-body'}
                      role="element-content"
                      is={resolver.StyleBox}
                      canvas
                    />
                  </div>
                )}
              </EntityProvider>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Virtuoso;
