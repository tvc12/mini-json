### ❤️mini-json

Mini tool for json parser with typescript

### 😍 Getting started

#### 🛠 Install

```bash
npm install mini-json
- or -
yarn add mini-json
```

#### ✈ Usage

+ Object to json:

```js
import MiniJson from 'mini-json';
const data = {
  success: true,
  data: {
    dayOfBirthday: '19/07/2020',
    name: 'mini-json'
  }
};
console.log(MiniJson.toJson(data));
/*
{
  "success": true,
  "data": {
    "day_of_birthday": "19/07/2020",
    "name": "mini-json"
  }
}
*/
```

+ Json to object:

```js
import MiniJson from 'mini-json';
const json = `{
  "success": true,
  "data": {
    "day_of_birthday": "19/07/2020",
    "name": "mini-json"
  }
}`;
console.log(MiniJson.fromJson(json));
/*
{
  success: true,
  data: {
    dayOfBirthday: '19/07/2020',
    name: 'mini-json'
  }
}
*/
```

#### Config

⚠ Default naming conventions of mini-json:

  + toJson: **camelCase** to **snakeCase**
  + fromJson: **snakeCase** to **camelCase**

🌍 Global config for naming conventions

```js

import MiniJson from 'mini-json';
import {camelCase, kebabCase} from 'lodash';

// json use camelCase
MiniJson.serializeKeysTo(camelCase);
// object use kebabCase
MiniJson.deserializeKeysFrom(kebabCase);
```
