# str2Xml

Pass in a string and convert it to 'xml'

## API

### Return

| argument          | Instructions                  | type          |
| ------------- | --------------------- | ------------- |
| `HTMLElement` | 返回一个`HTMLElement` | `HTMLElement` |

### Options

| argument   | Instructions                               | type                     | Default value  |
| ------ | ---------------------------------- | ------------------------ | ------ |
| xmlStr | Incoming parameter                         | `string`                 | null     |
| format | Set the format to be converted. The default is' text/xml '|' DOMParserSupportedType ' | null     |

## Example

For example, when doing icon library, we need to dynamically import all the 'ICONS' in the directory. In this case, strings are imported, but strings cannot be added to 'xml'.
So we need to convert the string to 'xml', and then we can add it to 'xml'.

```js
import { str2Xml } from 'ranuts';

// import 'assets/*.svg'
const svg = `<svg t="1667483498347" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8544" width="200" height="200"><path d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" p-id="8545"></path></svg>`;

const icon = str2Xml(svg, 'image/svg+xml');

document.body.appendChild(icon);
```
