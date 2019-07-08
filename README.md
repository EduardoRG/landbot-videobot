# Landbot Typed
Landbot widget with keyboard typing emulation.

## Usage
1. Create your chatbot.
2. Get its share url, example:
```
"https://yexir.com/u/H-2779-Y6QL25RV7OR1T8GH/index.html"
```
3. Replace the extension of the share url, `.html` changes to `.json`.
4. Insert this snippet wherever you want into your website:
```html
<div id="LandbotTyped"></div>
<script src="https://static.landbot.io/landbot-widgets/landbot-typed/main.js"></script>
<script>
  new Landbot.Typed({
    // configUrl is the URL we got from the bot and changed the extension.
    configUrl: 'https://yexir.com/u/H-2779-Y6QL25RV7OR1T8GH/index.json',
    container: '#LandbotTyped',
  });
</script>
```

## Extra customization
```html
<div id="LandbotTyped"></div>
<script src="https://static.landbot.io/landbot-widgets/landbot-typed/main.js"></script>
<script>
  new Landbot.Typed({
    // configUrl is the URL we got from the bot and changed the extension.
    configUrl: 'https://yexir.com/u/H-2779-Y6QL25RV7OR1T8GH/index.json',
    container: '#LandbotTyped',
    // primary color for inputs (text and buttons).
    primary: '#ffc631',
    // secondary color for the pre-loader.
    secondary: '#009879',
    // background (self-explanatory)
    background: '#0f1720',
    // text
    text: 'white',
    // font (Google fonts)
    font: 'Montserrat',
  });
</script>
```