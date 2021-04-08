## Vinze Gallery
Easy and simple-use Javascript photos gallery slider.

I'm not proffesional developer and that isn't even close perfect, but I belive it can be useful for someone. It's just a project for extend my knowledge in javascript.

![vinzeGallery1](https://user-images.githubusercontent.com/81425879/113610545-91575500-964d-11eb-961e-f8bfc1aa698a.png)

## What this exactly is?
Mainly this is a full page slider that can be attached to your images on the website. You can create any structure of gallery you like, stylize it and put up few **data-** attributes, and that's it, the slider should work.

## Main features:
* simple initialize and use,
* many posibilities of customization and settings,
* fully responsive,
* unlimited instances of galleries on the page,
* buttons / touch & drag / zoom & move / scroll support in the slider,
* optional default layout for galleries (requires bootstrap)

## How to initialize it?
First of all attach *css* and *js* files in the **`<head></head>`** mark.

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


Then at the end of **`<body></body>`** mark add javascript code:

```html
<script>
  vinzeGallery.init();
</script>
```


## Create instance of the gallery
After initialization you can create instance of gallery (or galleries, they're automatically detecting).

1. Add `data-vinze-gallery` attribute to the wrapper of the gallery.

```html
<div data-vinze-gallery>
</div>
```

Multiple instances, just like that:

```html
<div data-vinze-gallery>
</div>
<div data-vinze-gallery>
</div>
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

Default layout you can change in javascript (look below).


## Sources of photos

The slider uses `src` attribute in default to render photos, but if you would like have separate sources for thumbnails and for the slider you can use `data-vinze-slider-src`.

```html
<img data-vinze-photo src="my-photo-thumbnail.jpg" data-vinze-slider-src="my-photo.jpg" />
```


## Settings and customization

In default:

```javascript
vinzeGallery.init({
  mobileWidthBreakpoint: 500,
  gallery: {
    smoothLoad: true,
    smoothLoadSpeed: 50,
    photosTransitionDuration: 300,
    layout: {
      xl: false,
      lg: 3,
      md: 4,
      sm: false,
      xs: 6,
    },
  },
  slider: {
    transitionDuration: 300,
    navButtons: "desktop",
    escButton: true,
    navTouch: true,
    closeViaDrag: true,
    mouseWheel: "zoom",
    photosIndicator: "desktop",
    photosEasing: "easeOutSine",
    photosGap: 15,
    photosTransitionDuration: 300,
    zoomTransitionDuration: 200,
    zoomMaxScale: 3,
    zoomSpeed: 0.25,
    loop: true,
    draggingXBreakpoint: 15,
    draggingYBreakpoint: 15,
  },
});
```

mobileWidthBreakpoint (number):
The width of the window you want to treat as a mobile breakpoint (You can just leave it as default 500 px).

gallery (object):
There you can pass values about all your galleries.

gallery -> smoothLoad (boolean):
false - gallery loads instantly.
true - gallery loads smoothly.

gallery -> smoothLoadSpeed (number):
The load interval between each of gallery photos.

gallery -> photosTransitionDuration (number):
The transition duration of gallery photos.

gallery -> layout (object):
Layout sizes value.

gallery -> layout -> xl (number):
