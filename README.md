# <img src="src/img/html.svg" width="30" style="margin-bottom:-5px"> Html Panel

to do

## Examples

Advanced example needs a web api datasource with the following global function :

```javascript
let result;
switch (options.hash['function']) {
    case "dateFormat":
        result = new Date(parseInt(text)).toISOString();
        break;
        default:
        const f = new Function('data', options.hash['function']);
        result = f(text);
    }

return result;
```