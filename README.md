## Vinze Gallery

Easy and simple-use Javascript photos gallery slider.

I'm not proffesional developer and that isn't even close perfect, but I belive it can be useful for someone. It's just a project for extend my knowledge in javascript.

In future updates are possible.

![vinzeGallery1](https://user-images.githubusercontent.com/81425879/113610545-91575500-964d-11eb-961e-f8bfc1aa698a.png)

## What this exactly is?

Mainly this is a full page slider that can be attached to your images on the website.
You can create any structure of gallery you like and stylize it or use pre-defined attributes for simple gallery and then customize it.
Just put up few **data-** attributes, optional pass some settings, and that's it.

## Main features:

- simple initialize and use,
- many posibilities of customization and settings,
- fully responsive,
- unlimited instances of galleries on the page,
- buttons / touch & drag / zoom & move / scroll support in the slider,
- optional default layout for galleries (requires bootstrap)

## Instalation

First of all attach _css_ and _js_ files in the **`<head></head>`** mark.

```css
<link rel="stylesheet" href="vinzeGallery.min.css" type="text/css" />
<script src="vinzeGallery.min.js"></script>
```

You can also add bootstrap if you'd create gallery layout.

```css
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js"></script>
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
/>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"></script>
```

## Initialize vinzeGallery.

```javascript
vinzeGallery.init();

//You can pass optional settings as object (the default values are shown).
vinzeGallery.init({
  //Accepts: number, The width of the window you want to treat as a mobile breakpoint (in px).
  mobileWidthBreakpoint: 500,
  //Accepts: object, Settings that apply to all galleries.
  gallery: {
    //Accepts: boolean, If true galleries loads smoothly, false - loads instantly.
    smoothLoad: true,
    //Accepts: number, The load interval between each of gallery photos (in ms).
    smoothLoadSpeed: 50,
    //Accepts: number, The transition duration of galleries photos (in ms).
    photosTransitionDuration: 300,
    //Accepts: object, Default layout in different sizes (requires bootstrap and appropriate structure, look at "how to use it?" at 2.b)).
    layout: {
      //Accepts: false | number, if not false, adds col-xl-.. classes.
      xl: false,
      //Accepts: false | number, if not false, adds col-lg-.. classes.
      lg: 3,
      //Accepts: false | number, if not false, adds col-md-.. classes.
      md: 4,
      //Accepts: false | number, if not false, adds col-sm-.. classes.
      sm: false,
      //Accepts: false | number, if not false, adds col-.. classes.
      xs: 6,
    },
  },
  //Accepts: object, Settings that apply to the slider
  slider: {
    //Accepts: number, The transition duration of the slider (but not photos in the slider) (in ms).
    transitionDuration: 300,
    //Accepts: false | true | "desktop" | "mobile", When navigiation buttons should be appeared.
    navButtons: "desktop",
    //Accepts: false | true | "desktop" | "mobile", When close button should be appeared.
    escButton: true,
    //Accepts: false | true | "desktop" | "mobile", When touch navigiation should be enabled.
    navTouch: true,
    //Accepts: false | true | "desktop" | "mobile", When touch navigiation should be enabled.
    closeViaDrag: true,
    //Accepts: false | true | "zoom" | "navigation", Whether and what mouse wheel should does.
    mouseWheel: "zoom",
    //Accepts: false | true | "desktop" | "mobile", When photos indicator should be appeared.
    photosIndicator: "desktop",
    //Accepts: one of predefined name (look below at easing functions), The transition easing photos.
    photosEasing: "easeOutSine",
    //Accepts: number, The gap between photos (in px).
    photosGap: 15,
    //Accepts: number, The transition duration in the slider photos (in ms).
    photosTransitionDuration: 300,
    //Accepts: number, The transition duration of zoom in the slider photos (in ms).
    zoomTransitionDuration: 200,
    //Accepts: number, Max a photo zoom.
    zoomMaxScale: 3,
    //Accepts: number, The zoom speed.
    zoomSpeed: 0.25,
    //Accepts: false | true, if true loop in enabled.
    loop: true,
  },
});
```

## How to use it?

1. Add `data-vinze-gallery` attribute to the wrapper of the gallery.

```html
<div data-vinze-gallery></div>
```

You can also create multiple instances everywhere do you want:

```html
<div data-vinze-gallery></div>
<section>
  <div data-vinze-gallery></div>
</section>
```

2.a) Inside of the parent you can create a structure you like, just put `data-vinze-photo` to each **`<img />`** mark.

For ex.:

```html
<div data-vinze-gallery>
  <div class="some-div">
    <div class="another-one">
      <!-- just put data-vinze-photo to the img -->
      <img data-vinze-photo src="my-photo.jpg" />
    </div>
  </div>
  <div class="some-div">
    <div class="another-one">
      <!-- just put data-vinze-photo to the img -->
      <img data-vinze-photo src="my-photo-2.jpg" />
    </div>
  </div>
</div>
```

2.b) If you need basic layout **---(requires bootstrap)---** just create structure where parent of **`<img />`** has `data-vinze-photo-container`:

```html
<div data-vinze-gallery>
  <!-- parent has data-vinze-photo-container -->
  <div data-vinze-photo-container>
    <img data-vinze-photo src="my-photo.jpg" />
  </div>
  <!-- parent has data-vinze-photo-container -->
  <div data-vinze-photo-container>
    <img data-vinze-photo src="my-photo-2.jpg" />
  </div>
  <!-- parent has data-vinze-photo-container -->
  <div data-vinze-photo-container>
    <img data-vinze-photo src="my-photo-3.jpg" />
  </div>
</div>
```

If you'd like add custom bootstrap classes, just add them to `data-vinze-photo-container` elements, for ex.:

```html
<div data-vinze-gallery>
  <div data-vinze-photo-container>
    <img data-vinze-photo src="my-photo.jpg" />
  </div>
  <div data-vinze-photo-container class="col-md-4 col-xl-2">
    <img data-vinze-photo src="my-photo-2.jpg" />
  </div>
</div>
```

## Sources of photos.

The slider uses `src` attribute in default to render photos, but if you would like have separate sources for thumbnails and for the slider you can use `data-vinze-slider-src`.

```html
<img
  data-vinze-photo
  src="my-photo-thumbnail.jpg"
  data-vinze-slider-src="my-photo.jpg"
/>
```

## Easing functions.

- linear,
- ease,
- easeIn,
- easeOut,
- easeInOut,
- easeInQuad,
- easeInCubic,
- easeInQuart,
- easeInQuint,
- easeInSine,
- easeInExpo,
- easeInCirc,
- easeInBack,
- easeOutQuad,
- easeOutCubic,
- easeOutQuart,
- easeOutQuint,
- easeOutSine,
- easeOutExpo,
- easeOutCirc,
- easeOutBack,
- easeInOutQuad,
- easeInOutCubic,
- easeInOutQuart,
- easeInOutQuint,
- easeInOutSine,
- easeInOutExpo,
- easeInOutCirc,
- easeInOutBack,
