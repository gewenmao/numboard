## Install

模拟数字键盘

```sh
npm install react-numboard --save
```

## Example

```jsx
import NumBoard from 'react-numboard';

const NumInput = NumBoard.create('input');
const Count = (props) => (<NumInput {...props} />)
```

```jsx
import { Input } from 'antd';
import NumBoard from 'react-numboard';

const NumInput = NumBoard.create(Input);
const Count = (props) => (<NumInput {...props} />)
```

## Demo

[react numboard demo](https://gewenmao.github.io/react-numboard/)

## Change
