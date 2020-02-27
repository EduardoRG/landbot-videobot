# Landbot Videobot
Landbot widget with video player experience.

## Usage
1. Create your chatbot.
2. Get its share url, example:
```
"https://yexir.com/u/H-2779-Y6QL25RV7OR1T8GH/index.html"
```
3. Replace the extension of the share url, `.html` changes to `.json`.
4. Insert this snippet wherever you want into your website:
```html
<div id="LandbotVideobot"></div>
<script src="https://static.landbot.io/landbot-widgets/landbot-videobot/main.js"></script>
<script>
  new Landbot.Videobot({
    // configUrl is the URL we got from the bot and changed the extension.
    configUrl: 'https://yexir.com/u/H-2779-Y6QL25RV7OR1T8GH/index.json',
    container: '#LandbotVideobot',
    video: 'https://videosource',
  });
</script>
```

## Extra customization
```html
<div id="LandbotVideobot"></div>
<script src="https://static.landbot.io/landbot-widgets/landbot-videobot/main.js"></script>
<script>
  new Landbot.Videobot({
    // configUrl is the URL we got from the bot and changed the extension.
    configUrl: 'https://chats.yexir.com/u/H-4829-7531FQJ29N9MBUH4/index.json',
    container: '#LandbotVideobot',
    // video url
    video: 'https://videosource',
    // primary color for texts.
    primary: '#ffc631',
    // secondary color for the loader.
    secondary: '#009879',
    // font (Google fonts)
    font: 'Montserrat',
    // Debug shows video progress on top left corner.
    debug: true,
  });
</script>
```