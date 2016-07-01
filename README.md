# fuu

Fuu is a simple module made for learning purposes, 
please do not expect something fancy.

## Installation

```bash
npm install fuu
```

## Usage

Fuu is built to use with express framework, first you have to initialize the
custom errors and use the prebuilt handlers.

The field `message` and `status` are not required, ou can either pass an array
or just a single error.

```js
var express = require('express');
var fuu = require('fuu');

fuu.add([
    { code: 1, message: 'Custom error', status: 500 },
    { code: 2, message: 'Auth error', status: 401 }    
]);

fuu.add({ code: 3, message: 'Nothing was found on database', status: 404 })

if(app.get('env') === 'development')
    app.use(fuu.handlers.expressDev);

app.use(fuu.handlers.expressProd);

```

Error example

You can send the default error together, fuu will get the error by its
`code` and set the `message` and `status` if defined, if not, will
fallback to the default ones.

```js
app.get('/', function(req, res, next){
    getSomethingFromDb(function(err, data) {
        if(err)
            next({ code 1: , error:  err });
        else if(data.length == 0)
            next({ code: 3 });
        else
            res.send(data):
    });
};
```