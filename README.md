# Overview

Iterate on data for smarter designs by using the custom component **"Virtuoso"**. This component enables iteration over a Qodly Source to display dynamic Stylebox components with various heights depending on the content of each virtualizer's item.

## Virtualizer

- **Vertical Virtualizer:**

![Vertical Virtualizer](public/image-1.png)

## Properties

| Name                  | Attribute       | Type     | Default | Description                                                                                                          |
| --------------------- | --------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| enable Accordion Mode | `accordionMode` | checkbox | false   | Enables or disables the accordion behavior for the component. When enabled, only one item can be expanded at a time. |

## Data Access

| Name             | Type             | Required | Description                                                                                                                |
| ---------------- | ---------------- | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| Qodly Source     | Entity Selection | Yes      | Specifies the selection of entities to be displayed as data in the component                                               |
| Selected Element | Entity           | No       | Each item of the virtualizer is featured by this property once it's selected                                               |
| Iterate With     | string           | No       | Determines the entity used for iteration within the virtualizer component. By default, the value of the iterator is: $This |
| Server Side      | string           | No       | Includes a reference that users can use for executing server-side actions related to it                                    |

## Custom CSS

To eliminate the default purple background of the element that is selected, you can write the following CSS style and attach it to the virtualizer:

```css
self .item.selected {
  background-color: transparent;
}

self .item.item-odd {
  background-color: #e4e4e7;
}

self .item.item-even {
  background-color: #33bae7;
}
```
