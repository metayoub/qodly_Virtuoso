import {
  EComponentKind,
  getDataTransferSourceID,
  IExostiveElementProps,
  isAttributePayload,
  isDatasourcePayload,
  T4DComponentConfig,
} from '@ws-ui/webform-editor';
import { Settings } from '@ws-ui/webform-editor';
import { MdViewDay } from 'react-icons/md';
import {
  isArrayDatasource,
  isEntityDatasource,
  isEntitySelectionDatasource,
  isObjectDatasource,
  isRelatedEntitiesAttribute,
  isRelatedEntityAttribute,
} from '@ws-ui/shared';

import VirtuosoSettings, { BasicSettings } from './Virtuoso.settings';

export default {
  craft: {
    displayName: 'Virtuoso',
    kind: EComponentKind.BASIC,
    props: {
      iterable: true,
      classNames: [],
      events: [],
    },
    related: {
      settings: Settings(VirtuosoSettings, BasicSettings),
    },
  },
  info: {
    settings: VirtuosoSettings,
    displayName: 'Virtuoso',
    exposed: true,
    icon: MdViewDay,
    sanityCheck: {
      keys: [
        { name: 'datasource', require: true, isDatasource: true },
        { name: 'currentElement', require: false, isDatasource: true },
      ],
    },
    requiredFields: {
      keys: ['datasource'],
      all: false,
    },
    events: [
      {
        label: 'On Click',
        value: 'onclick',
      },
      {
        label: 'On Select',
        value: 'onselect',
      },
      {
        label: 'On MouseEnter',
        value: 'onmouseenter',
      },
      {
        label: 'On MouseLeave',
        value: 'onmouseleave',
      },
      {
        label: 'On KeyDown',
        value: 'onkeydown',
      },
      {
        label: 'On KeyUp',
        value: 'onkeyup',
      },
    ],
    datasources: {
      declarations: [{ key: 'datasource', iterable: true }, { key: 'currentElement' }],
      set: (nodeId, _query, payload) => {
        const new_props: Partial<IExostiveElementProps> = {};
        payload.forEach((item) => {
          if (isDatasourcePayload(item)) {
            if (isEntitySelectionDatasource(item.source) || isArrayDatasource(item.source)) {
              new_props.datasource = getDataTransferSourceID(item);
            }
            if (isEntityDatasource(item.source) || isObjectDatasource(item.source)) {
              new_props.currentElement = getDataTransferSourceID(item);
            }
          } else if (isAttributePayload(item)) {
            if (isRelatedEntitiesAttribute(item.attribute)) {
              new_props.datasource = getDataTransferSourceID(item);
            } else if (isRelatedEntityAttribute(item.attribute)) {
              new_props.currentElement = getDataTransferSourceID(item);
            }
          }
        });
        return {
          [nodeId]: new_props,
        };
      },
    },
  },
  defaultProps: {
    accordionMode: false,
    iterable: true,
    classNames: [],
    style: {
      height: `400px`,
      width: `100%`,
    },
  },
} as T4DComponentConfig<IVirtuosoProps>;

export interface IVirtuosoProps extends webforms.ComponentProps {
  accordionMode?: boolean;
}
