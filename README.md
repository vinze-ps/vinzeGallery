## Vinze Gallery

Easy and simple-use Javascript photos gallery slider.

In future updates are possible.

![vinzeGallery1](https://user-images.githubusercontent.com/81425879/113610545-91575500-964d-11eb-961e-f8bfc1aa698a.png)

## What this exactly is?

Basicly this is a simple-use gallery & slider script.

In a short - All you can do is attach neccessary scripts, style sheets and put up few **data-** attributes.
Nothing stands in the way of customize what and how you want.

## Main features:

- Simple initialize and use,
- Many posibilities of customization and settings,
- Fully responsive,
- Unlimited instances of galleries on the page,
- Navigation buttons & exit button / Photos indicator / Touch & drag support / Zoom & move,
- Optional default layout for galleries (but requires the bootstrap).

## Instalation

npm:
`npm install git+https://github.com/vinze-ps/vinzeGallery.git`

First of all attach _css_ and _js_ files in the **`<head></head>`** mark.

```css
<link rel="stylesheet" href="vinzeGallery.css" type="text/css" />
<!-- Gallery always requires the Vinze Utilities script, which you can find on my GitHub profile -->
<script src="vinzeUtilities.js" type="text/javascript"></script>
<script src="vinzeGallery.js" type="text/javascript"></script>
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

// The first parameter is a name of a specific gallery in the **data-vinze-gallery="NAME"** attribute.
// The first parameter can have also a null / undefined value, then after all galleries with the **data-vinze-gallery** attribute will be initialize.

const gallery = VinzeGallery();
VinzeGallery.init();

// You can pass optional settings as object (the default values are shown).

const gallery = VinzeGallery(null, {
  // Accepts: a number, The width of the window you want to treat as a mobile breakpoint (in px).
  mobileBreakpoint: 500,
  
  // Accepts: object, Settings that apply to galleries of the instance.
  gallery: {
    // Accepts: a boolean, If true, photos in galleries loads smoothly, false - loads instantly.
    smoothLoad: true,
    
    // Accepts: a number, The load interval between each of gallery photos (in ms).
    smoothLoadTick: 200,
    
    // Accepts: a number, The transition duration of a galleries photos (in ms).
    photosTransitionDuration: 200,
    
    // Accepts: null | number, Padding, margin between photos in the instance galleries.
    photosGap: null,
    
    // Accepts: an object | null, Default layout in different sizes (requires bootstrap and appropriate structure, look at "how to use it?" at the 2 point)).
    // If null, nothing will happen
    layout: {
      //Accepts: null | number, if not null, adds col-xl-.. classes.
      xl: null,
      
      //Accepts: null | number, if not null, adds col-lg-.. classes.
      lg: null,
      
      //Accepts: null | number, if not null, adds col-md-.. classes.
      md: null,
      
      //Accepts: null | number, if not null, adds col-sm-.. classes.
      sm: null,
      
      //Accepts: null | number, if not null, adds col-.. classes.
      xs: null,
    },
  },
  
  // Accepts: an object, Settings that apply to the slider.
  slider: {
    // Accepts: a number, The transition duration of the slider (but not photos in the slider) (in ms).
    transitionDuration: 200,
    
    // Accepts: a boolean | "desktop" | "mobile", When navigiation buttons should be appeared.
    navButtons: "desktop",
    
    // Accepts: a boolean | "desktop" | "mobile", When close button should be appeared.
    escButton: true,
    
    // Accepts: a boolean| "desktop" | "mobile", When touch navigiation should be enabled.
    navTouch: true,
    
    // Accepts: a boolean | "desktop" | "mobile", When touch navigiation should be enabled.
    closeViaDrag: true,
    
    // DOESN'T WORK YET.
    // Accepts: a boolean | "zoom" | "navigation", Whether and what mouse wheel should does.
    mouseWheel: "zoom",
    
    // Accepts: a boolean | "desktop" | "mobile", When photos indicator should be appeared.
    photosIndicator: "desktop",
    
    // Accepts: One of a predefined string name (look below at easing functions), The transition easing photos.
    photosEasing: "easeOutSine",
    
    // Accepts: a number, The gap between photos (in px).
    photosGap: 15,
    
    // Accepts: a number, The transition duration in the slider photos (in ms).
    photosTransitionDuration: 200,
    
    // Accepts: a number, The transition duration of zoom in the slider photos (in ms).
    zoomTransitionDuration: 200,
    
    // Accepts: a number, Max a photo zoom.
    zoomMaxScale: 3,
    
    // Accepts: a number, The zoom speed.
    zoomSpeed: 0.25,
    
    // Accepts: a boolean, if true loop in enabled.
    loop: true,
  },
});
VinzeGallery.init();
```

## How to use it?

1. Add the `data-vinze-gallery` attribute to the wrapper of the gallery.

```html
<div data-vinze-gallery></div>
```

You can also create multiple instances everywhere you want:

```html
<div data-vinze-gallery></div>
<section>
  <div data-vinze-gallery="OPTIONAL_NAME"></div>
</section>
```

2. Inside of the parent you can create a structure you like, but each **`<img />`** must have the `data-vinze-photo` attribute and parent with the `data-vinze-photo-container` attribute (NOTE: container of a photo does not have to be an immediate parent, it can be higher up in the structure).

For ex.:

```html
<div data-vinze-gallery>
  <div class="some-div">
    <div class="another-one">
      <!-- Image container. -->
      <div data-vinze-photo-container>
        <!-- img with the data-vinze-photo attribute. -->
        <img data-vinze-photo src="my-photo.jpg" />
      </div>
    </div>
  </div>
  <div class="some-div">
    <!-- Image container. -->
    <div data-vinze-photo-container>
      <div class="another-one">
        <!-- img with the data-vinze-photo attribute. -->
        <img data-vinze-photo src="my-photo-2.jpg" />
      </div>
    </div>
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
