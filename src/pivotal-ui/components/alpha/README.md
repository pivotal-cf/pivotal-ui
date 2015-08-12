```html
<UI.Autocomplete onInitializeItems={function(cb){cb(['foo', 'food', 'bar'])}}
    onPick={function(item){ alert('You selected ' + item.value) }}/>
```