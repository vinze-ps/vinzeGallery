/* vinzeGallery */
/* created by Patryk Surmacz */
/* github.com/vinze-ps */

// const vinzeGallery = {
//   init: function (properties_ = {}) {
//     timeoutCustom("set", "vg-slider-load", 1, () => {
//       //set default properties
//       const defaultProperties = {
//           mobileWidthBreakpoint: 500,
//           gallery: {
//             data: `data-vinze-gallery`,
//             smoothLoad: true,
//             smoothLoadSpeed: 50,
//             photosContainerData: `data-vinze-photo-container`,
//             photosData: `data-vinze-photo`,
//             photosTransitionDuration: 300,
//             photosEasing: "easeOutSine",
//             photosGap: false,
//             photosHover: "zoomIn",
//             layout: {
//               xl: false,
//               lg: 3,
//               md: 4,
//               sm: false,
//               xs: 6,
//             },
//           },
//           slider: {
//             data: `data-vinze-slider`,
//             transitionDuration: 300,
//             navButtons: "desktop",
//             escButton: true,
//             navTouch: true,
//             closeViaDrag: true,
//             mouseWheel: "zoom",
//             photosIndicator: "desktop",
//             photosEasing: "easeOutSine",
//             photosGap: 15,
//             photosTransitionDuration: 300,
//             zoomTransitionDuration: 200,
//             zoomMaxScale: 3,
//             zoomSpeed: 0.25,
//             loop: true,
//             draggingXBreakpoint: 15,
//             draggingYBreakpoint: 15,
//           },
//         },
//         easings = {
//           linear: "cubic-bezier(0, 0, 1, 1)",
//           ease: "cubic-bezier(0.25, 0.1, 0.25, 1)",
//           easeIn: "cubic-bezier(0.42, 0, 1, 1)",
//           easeOut: "cubic-bezier(0, 0, 0.58, 1)",
//           easeInOut: "cubic-bezier(0.42, 0, 0.58, 1)",
//           easeInQuad: "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
//           easeInCubic: "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
//           easeInQuart: "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
//           easeInQuint: "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
//           easeInSine: "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
//           easeInExpo: "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
//           easeInCirc: "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
//           easeInBack: "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
//           easeOutQuad: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
//           easeOutCubic: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
//           easeOutQuart: "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
//           easeOutQuint: "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
//           easeOutSine: "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
//           easeOutExpo: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
//           easeOutCirc: "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
//           easeOutBack: "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
//           easeInOutQuad: "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
//           easeInOutCubic: "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
//           easeInOutQuart: "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
//           easeInOutQuint: "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
//           easeInOutSine: "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
//           easeInOutExpo: "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
//           easeInOutCirc: "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
//           easeInOutBack: "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
//         };
//       let properties = objectAssign(Object.create({}), JSON.parse(JSON.stringify(defaultProperties)), properties_);

//       //gallery class
//       class Gallery {
//         constructor(index_) {
//           this.galleryId = index_;
//           this.selector = `[${properties.gallery.data}]:eq(${this.galleryId})`;
//           this.photosSelector = `${this.selector} [${properties.gallery.photosData}]`;
//           this.photosContainerSelector = `${this.selector} [${properties.gallery.photosContainerData}]`;
//         }
//         loadPhotos() {
//           //transition duration
//           u(this.photosSelector).css({
//             transition: `transform ${properties.gallery.photosTransitionDuration}ms`,
//           });

//           for (let i = 0; i <= u(this.photosSelector).length - 1; i++) {
//             //transition easing
//             if (easings[properties.gallery.photosEasing] !== undefined)
//               u(`${this.photosSelector}`).css({
//                 transitionTimingFunction: `${easings[properties.gallery.photosEasing]}`,
//               });
//             else
//               u(`${this.photosSelector}`).css({
//                 transitionTimingFunction: `${easings["ease"]}`,
//               });

//             //gap between photos in gallery
//             if (properties.gallery.photosGap != false) {
//               let newMargin = "";
//               let newPadding = "";

//               switch (typeof properties.gallery.photosGap) {
//                 case "number":
//                   newMargin = `${properties.gallery.photosGap}px 0`;
//                   newPadding = `0 ${properties.gallery.photosGap}px`;
//                   break;
//                 case "string":
//                   newMargin = `${properties.gallery.photosGap} 0`;
//                   newPadding = `0 ${properties.gallery.photosGap}`;
//                   break;
//                 default:
//                   return;
//               }

//               //set new gap value
//               u(`${this.photosContainerSelector}`).css({
//                 margin: newMargin,
//               });
//               u(`${this.photosContainerSelector}`).css({
//                 padding: newPadding,
//               });
//             }

//             if (u(this.photosSelector).eq(i).el[0].parentElement.getAttribute(properties.gallery.data) === null) {
//               //hover effect
//               // if (
//               //   properties.gallery.photosHover &&
//               //   u(this.photosSelector)
//               //     .eq(i)
//               //     .el[0].parentElement.getAttribute(
//               //       properties.gallery.photosContainerData
//               //     ) !== null
//               // ) {
//               //   u(this.photosSelector)
//               //     .eq(i)
//               //     .addClass(properties.gallery.photosHover);
//               // }

//               //hidden overflow for photo container
//               u(this.photosSelector).eq(i).el[0].parentElement.style.overflow = "hidden";
//             }

//             //default alt attr
//             if (!u(this.photosSelector).eq(i).attr("alt")) u(this.photosSelector).eq(i).attr("alt", " ");

//             //open slider event
//             u(this.photosSelector)
//               .eq(i)
//               .on("click", () => {
//                 if (slider !== null) slider.close();
//                 slider = new Slider();
//                 slider.open(i, this.galleryId);
//               });

//             //load
//             if (properties.gallery.smoothLoad) {
//               //set transition duration
//               u(this.photosSelector)
//                 .eq(i)
//                 .css({
//                   transition: `all ${properties.gallery.photosTransitionDuration}ms`,
//                 });

//               timeoutCustom("set", "vg-gallery-photos-load", i * properties.gallery.smoothLoadSpeed, () => {
//                 u(this.photosSelector).eq(i).addClass("loaded");
//               });
//             } else u(this.photosSelector).eq(i).addClass("loaded");
//           }
//         }
//         setAttribute(name_, condition_, val1_, val2_) {
//           if (condition_ && val1_) u(this.selector).attr(name_, val1_);
//           else if (!condition_ && val2_) u(this.selector).attr(name_, val2_);
//         }
//         setLayout() {
//           if (properties.gallery.layout) {
//             u(this.selector).addClass("row");
//             for (let i = 0; i <= u(this.photosContainerSelector).length - 1; i++) {
//               let classes = u(this.photosContainerSelector).eq(i).hasClass();
//               for (let j = classes.length - 1; j >= 0; j--) {
//                 if (classes[j].search("col-") === -1) classes.splice(j, 1);
//               }
//               for (let breakpoint in properties.gallery.layout) {
//                 let add = true;
//                 for (let j = classes.length - 1; j >= 0; j--) {
//                   if (classes[j].search(breakpoint) !== -1) add = false;
//                   if (breakpoint === "xs") {
//                     if (classes[j].search("sm") === -1 && classes[j].search("md") === -1 && classes[j].search("lg") === -1 && classes[j].search("xl") === -1)
//                       add = false;
//                   }
//                 }

//                 if (add && typeof properties.gallery.layout[breakpoint] === "number") {
//                   u(this.photosContainerSelector)
//                     .eq(i)
//                     .addClass(`col${breakpoint.toString() !== "xs" ? "-" + breakpoint.toString() : ""}-${properties.gallery.layout[breakpoint]}`);
//                 }
//               }
//             }
//           }
//         }
//       }
//       //slider class
//       class Slider {
//         constructor() {
//           this.state = {
//             changing: false,
//             zoom: false,
//             touching: false,
//             draggingY: false,
//             draggingX: false,
//             previousTranslateX: 0,
//             previousTranslateY: 0,
//             translateX: 0,
//             translateY: 0,
//             scale: 1,
//             startDirectionDraggingY: false,
//             previousDoubleTouchDistance: 0,
//             startInsideTop: true,
//             startInsideRight: true,
//             startInsideBottom: true,
//             startInsideLeft: true,
//           };
//         }
//         setDefaultProperties() {
//           this.properties = Object.assign({}, properties.slider);

//           //max slider move duration
//           if (this.properties.photosTransitionDuration > 600) this.properties.photosTransitionDuration = 600;
//           if (this.properties.transitionDuration > 600) this.properties.transitionDuration = 600;
//           if (this.properties.photosGap > 300) this.properties.photosGap = 300;
//           if (this.properties.zoomTransitionDuration > 600) this.properties.zoomTransitionDuration = 600;
//           if (this.properties.zoomSpeed < 0.1) this.properties.zoomSpeed = 0.1;

//           //mobile / desktop
//           let mcd = u(window).width() <= properties.mobileWidthBreakpoint,
//             mcu = u(window).width() > properties.mobileWidthBreakpoint,
//             pi = this.properties.photosIndicator,
//             nb = this.properties.navButtons,
//             nt = this.properties.navTouch,
//             eb = this.properties.escButton,
//             cvd = this.properties.closeViaDrag,
//             l = this.properties.loop;
//           if (typeof pi !== "boolean") {
//             (pi === "mobile" && mcd) || (pi === "desktop" && mcu) ? (this.properties.photosIndicator = true) : (this.properties.photosIndicator = false);
//           }
//           if (typeof nb !== "boolean") {
//             (nb === "mobile" && mcd) || (nb === "desktop" && mcu) ? (this.properties.navButtons = true) : (this.properties.navButtons = false);
//           }
//           if (typeof nt !== "boolean") {
//             (nt === "mobile" && mcd) || (nt === "desktop" && mcu) ? (this.properties.navTouch = true) : (this.properties.navTouch = false);
//           }
//           if (typeof eb !== "boolean") {
//             (eb === "mobile" && mcd) || (eb === "desktop" && mcu) ? (this.properties.escButton = true) : (this.properties.escButton = false);
//           }
//           if (typeof cvd !== "boolean") {
//             (cvd === "mobile" && mcd) || (cvd === "desktop" && mcu) ? (this.properties.closeViaDrag = true) : (this.properties.closeViaDrag = false);
//           }
//           if (typeof l !== "boolean") {
//             (l === "mobile" && mcd) || (l === "desktop" && mcu) ? (this.properties.loop = true) : (this.properties.loop = false);
//           }
//         }
//         generatePhotos() {
//           //get sources
//           //eslint-disable-next-line
//           let src = new Array();
//           for (let i = 0; i <= u(this.galleryPhotos).length - 1; i++) {
//             typeof u(this.galleryPhotos + `:eq(${i})`).attr("data-vinze-slider-src") !== "string"
//               ? src.push(u(this.galleryPhotos + `:eq(${i})`).attr("src"))
//               : src.push(u(this.galleryPhotos + `:eq(${i})`).attr("data-vinze-slider-src"));
//           }

//           for (let i = 0; i <= src.length - 1; i++) {
//             u(this.selector).append(
//               `<div ${properties.gallery.photosData}=${i} class="${i === this.galleryPhotoId ? `active` : ``}"><div data-vinze-photo-cover></div><img src="${
//                 src[i]
//               }" alt=" " draggable="false" /></div>`
//             );

//             //touch events
//             if (this.properties.navTouch) {
//               u(this.photoSelector(i)).on("dblclick", (e) => {
//                 if (!this.state.changing) this.zoom(i).once();
//                 e.preventDefault();
//               });
//               let tapped = false;

//               u(`${this.photoSelector(i)}`)
//                 .on("mousedown touchstart", (e) => {
//                   if (e.touches !== undefined) {
//                     if (tapped === false) {
//                       tapped = i;
//                       timeoutCustom("set", "vg-double-tap", 300, () => {
//                         tapped = false;
//                       });
//                     } else if (tapped === i && e.touches[1] === undefined) {
//                       timeoutCustom("clear", "vg-double-tap");
//                       tapped = false;
//                       if (!this.state.changing) this.zoom(i).once();
//                     }
//                   }
//                   if (!this.state.changing) this.touch().start(i, e);
//                   e.preventDefault();
//                 })
//                 .addClass("touchable");
//               u(window).on("mouseup touchend", () => {
//                 this.touch().end();
//               });
//             }

//             //scroll zoom event
//             if (this.properties.mouseWheel === "zoom") {
//               u(this.photoSelector(i)).on("mousewheel", (e) => {
//                 if (!this.state.changing)
//                   if (e.wheelDelta / 120 > 0) {
//                     this.zoom(i).scroll("zoom");
//                   } else {
//                     this.zoom(i).scroll("unzoom");
//                   }
//               });
//             }
//           }

//           //amount of photos
//           this.photosLength = u(this.photosSelector).length;

//           //loop condition
//           this.loop = this.properties.loop && u(this.photosSelector).length > 2;

//           //add previous and next classes
//           if (u(this.photoSelector(this.galleryPhotoId - 1)).length > 0) u(this.photoSelector(this.galleryPhotoId - 1)).addClass("previous");
//           else if (this.loop && this.galleryPhotoId !== this.photosLength - 1) u(this.photoSelector(this.photosLength - 1)).addClass("previous");

//           if (u(this.photoSelector(this.galleryPhotoId + 1)).length > 0) u(this.photoSelector(this.galleryPhotoId + 1)).addClass("next");
//           else if (this.loop && this.galleryPhotoId !== 0) u(this.photoSelector(0)).addClass("next");

//           //set transition duration
//           u(
//             `${this.photosSelector}.previous, ${this.photosSelector}.active, ${this.photosSelector}.next, ${this.photosSelector}.previous > img, ${this.photosSelector}.active > img, ${this.photosSelector}.next > img`
//           ).css({
//             transitionDuration: `${this.properties.photosTransitionDuration}ms`,
//           });

//           //set transition easing
//           if (easings[this.properties.photosEasing] !== undefined)
//             u(`${this.photosSelector}, ${this.photosSelector} > img`).css({
//               transitionTimingFunction: `${easings[this.properties.photosEasing]}`,
//             });
//           else
//             u(`${this.photosSelector}, ${this.photosSelector} > img`).css({
//               transitionTimingFunction: `${easings["ease"]}`,
//             });
//         }
//         photo(id_ = undefined) {
//           let el = id_ === undefined ? u(`${this.photosSelector}.active > img`) : u(`${this.photoSelector(id_)} > img`);

//           return {
//             setTransform: (p_ = [undefined]) => {
//               if (id_ === "number") id_ = [id_];

//               for (let i = 0; i <= id_.length - 1; i++) {
//                 if (u(this.photoSelector(id_[i])).length === 0) continue;

//                 const s = {
//                   scale: this.state.scale,
//                   translateX: this.state.translateX,
//                   translateY: this.state.translateY,
//                 };

//                 const state = Object.assign({}, s, p_[i]);

//                 let h = -1;
//                 id_ === false || id_ === undefined || id_[i] === false || id_[i] === undefined
//                   ? (h = u(`${this.photosSelector} > img`))
//                   : (h = u(`${this.photoSelector(id_[i])} > img`));

//                 let newTransform = [
//                   p_[i] !== undefined && p_[i].scale !== undefined ? state.scale : s.scale,
//                   p_[i] !== undefined && p_[i].translateX !== undefined ? state.translateX : s.translateX,
//                   p_[i] !== undefined && p_[i].translateY !== undefined ? state.translateY : s.translateY,
//                 ];

//                 //apply new transform
//                 h.css({
//                   transform: `scale(${newTransform[0]}) translateX(${newTransform[1]}px) translateY(${newTransform[2]}px)`,
//                 });

//                 if (u(`${this.photoSelector(id_[i])}`).hasClass("active")) {
//                   if (p_[i] !== undefined && p_[i].scale !== undefined) this.state.scale = state.scale;
//                   if (p_[i] !== undefined && p_[i].translateX !== undefined) this.state.translateX = state.translateX;
//                   if (p_[i] !== undefined && p_[i].translateY !== undefined) this.state.translateY = state.translateY;
//                 }
//               }
//             },
//             minScale: () => {
//               let ww = u(window).width(),
//                 wh = u(window).height(),
//                 tw = el.outerWidth(),
//                 th = el.outerHeight();

//               return wh - th > ww - tw ? wh / th + (wh / th) * 0.01 : ww / tw + (ww / tw) * 0.01;
//             },
//             insideWindow: (corner_, retrunedVal_ = false) => {
//               let val = 0;
//               switch (corner_) {
//                 case "left":
//                   val = el.position().left / this.state.scale;
//                   return retrunedVal_ ? val : val > 0;
//                 case "right":
//                   val = el.position().left + el.outerWidth() * this.state.scale;
//                   return retrunedVal_ ? val - u(window).width() : val < u(window).width();
//                 case "top":
//                   val = el.position().top / this.state.scale;
//                   return retrunedVal_ ? val : val > 0;
//                 case "bottom":
//                   val = el.position().top + el.outerHeight() * this.state.scale;
//                   return retrunedVal_ ? val - u(window).height() : val < u(window).height();
//                 default:
//                   return undefined;
//               }
//             },
//             fixPosition: () => {
//               //conditions when image is inside the window
//               let leftCon = this.photo([id_]).insideWindow("left"),
//                 rightCon = this.photo([id_]).insideWindow("right"),
//                 topCon = this.photo([id_]).insideWindow("top"),
//                 bottomCon = this.photo([id_]).insideWindow("bottom");

//               if ((leftCon || rightCon) && u(`${this.photoSelector(id_)} > img`).outerWidth() * this.state.scale >= u(window).width()) {
//                 let insideDistanceX = u(`${this.photoSelector(id_)} > img`).position().left / this.state.scale;

//                 if (rightCon) {
//                   insideDistanceX += u(`${this.photoSelector(id_)} > img`).outerWidth() - u(window).width() / this.state.scale;
//                 }

//                 let breakpoint = u(window).width() / 5 <= 150 ? u(window).width() / 5 : 150;

//                 if (insideDistanceX > breakpoint && this.state.startInsideLeft > -10) {
//                   this.change(id_).backward();
//                 } else if (insideDistanceX < breakpoint * -1 && this.state.startInsideRight < 10) {
//                   this.change(id_).forward();
//                 }

//                 if (!this.state.changing)
//                   this.photo([id_]).setTransform([
//                     {
//                       translateX: this.state.translateX - insideDistanceX,
//                     },
//                   ]);
//               } else if ((leftCon || rightCon) && !(u(`${this.photoSelector(id_)} > img`).outerWidth() * this.state.scale >= u(window).width())) {
//                 if (!this.state.changing)
//                   this.photo([id_]).setTransform([
//                     {
//                       translateX: 0,
//                     },
//                   ]);
//               }

//               if ((topCon || bottomCon) && u(`${this.photoSelector(id_)} > img`).outerHeight() * this.state.scale >= u(window).height()) {
//                 let insideDistanceY = u(`${this.photoSelector(id_)} > img`).position().top / this.state.scale;

//                 if (bottomCon) {
//                   insideDistanceY += u(`${this.photoSelector(id_)} > img`).outerHeight() - u(window).height() / this.state.scale;
//                 }

//                 if (!this.state.changing)
//                   this.photo([id_]).setTransform([
//                     {
//                       translateY: this.state.translateY - insideDistanceY,
//                     },
//                   ]);
//               } else if ((topCon || bottomCon) && !(u(`${this.photoSelector(id_)} > img`).outerHeight() * this.state.scale >= u(window).height())) {
//                 if (!this.state.changing)
//                   this.photo([id_]).setTransform([
//                     {
//                       translateY: 0,
//                     },
//                   ]);
//               }
//             },
//           };
//         }
//         open(photoId_, galleryId_) {
//           //set default properties
//           this.setDefaultProperties();

//           //set gallery handlers
//           this.galleryId = galleryId_;
//           this.galleryPhotoId = photoId_;
//           this.galleryPhotos = `[${properties.gallery.data}]:eq(${this.galleryId}) [${properties.gallery.photosData}]`;

//           //set slider handlers
//           this.selector = `[${this.properties.data}]`;
//           this.photoSelector = (id) => {
//             return `[${this.properties.data}] [${properties.gallery.photosData}="${id}"]`;
//           };
//           this.photosSelector = `[${this.properties.data}] [${properties.gallery.photosData}]`;

//           //generate slider
//           u(`body`).prepend(
//             `<div ${this.properties.data}>${
//               this.properties.escButton === true ? `<button class="close" title="close(esc)"><div class="bar"></div><div class="bar"></div></button>` : ``
//             }${this.properties.navButtons === true ? `<button class="backward" title="previous"></button><button class="forward" title="next"></button>` : ``}${
//               this.properties.photosIndicator === true
//                 ? `<div data-vinze-photo-indicator>` + (this.galleryPhotoId + 1) + ` of ` + u(this.galleryPhotos).length + `</div>`
//                 : ``
//             }</div></div>`
//           );

//           //add slider blur
//           u(this.selector).addClass("blur");

//           //set slider transition
//           u(this.selector).css({
//             transitionDuration: `${this.properties.transitionDuration}ms`,
//           });

//           //generate photos in slider
//           this.generatePhotos();

//           //hide nav buttons
//           if (!this.loop) {
//             if (u(this.photoSelector(this.galleryPhotoId + 1)).length === 0) u(`button.forward`).addClass("disable");
//             else u(`button.forward`).removeClass("disable");
//             if (u(this.photoSelector(this.galleryPhotoId - 1)).length === 0) u(`button.backward`).addClass("disable");
//             else u(`button.backward`).removeClass("disable");
//           }

//           //on slider nav buttons events
//           if (this.properties.navButtons === true) {
//             u(`${this.selector} > button.forward`).on("click", () => {
//               if (!this.state.changing) this.change().forward();
//             });
//             u(`${this.selector} > button.backward`).on("click", () => {
//               if (!this.state.changing) this.change().backward();
//             });
//           }
//           //scroll nav events
//           if (this.properties.mouseWheel === "navigation") {
//             u(this.selector).on("mousewheel", (e) => {
//               if (e.wheelDelta / 120 > 0) {
//                 if (!this.state.changing) this.change().forward();
//               } else {
//                 if (!this.state.changing) this.change().backward();
//               }
//             });
//           }

//           //on close slider events
//           if (this.properties.escButton === true)
//             u(`${this.selector} > button.close`).on("click", () => {
//               this.close();
//             });

//           document.onkeydown = (evt) => {
//             evt = evt || window.event;
//             var isEscape = false;
//             if ("key" in evt) {
//               isEscape = evt.key === "Escape" || evt.key === "Esc";
//             } else {
//               isEscape = evt.keyCode === 27;
//             }
//             if (isEscape) {
//               this.close();
//             }
//           };

//           //load slider
//           timeoutCustom("set", "vg-slider-load", 1, () => {
//             u(`body`).addClass("overflow-hidden");
//             u(this.selector).addClass("active");
//           });

//           //on resizing window reload slider
//           this.currentWindowWidth = u(window).width();
//           u(window).on("resize", () => {
//             const changed = () => {
//               this.currentWindowWidth = u(window).width();
//               this.setDefaultProperties();
//               this.close();
//               timeoutCustom("clear", "vg-slider-reload");
//               timeoutCustom("set", "vg-slider-reload", this.properties.transitionDuration, () => {
//                 this.open(this.galleryPhotoId, this.galleryId);
//               });
//             };
//             if (this.currentWindowWidth >= properties.mobileWidthBreakpoint) {
//               //desktop
//               if (u(window).width() <= properties.mobileWidthBreakpoint) changed();
//             } else {
//               //mobile
//               if (u(window).width() >= properties.mobileWidthBreakpoint) changed();
//             }
//           });
//         }
//         close() {
//           //off resize event
//           u(window).off("resize");

//           //off touch events
//           if (this.properties.navTouch) {
//             u(this.photosSelector).off("mousedown touchstart dblclick");
//             u(window).off("mouseup touchend touchmove mousemove");
//           }

//           //off slider nav buttons events
//           if (this.properties.navButtons === true) {
//             u(`${this.selector} > button.forward, ${this.selector} > button.backward`).off("click");
//           }

//           //off close slider events
//           document.onkeydown = null;
//           if (this.properties.escButton === true) u(`${this.selector} > button.close`).off("click");

//           //off scroll events
//           if (this.properties.mouseWheel) {
//             u(this.selector).off("mousewheel");
//             u(this.photosSelector).off("mousewheel");
//           }

//           //remove active classes
//           u(this.selector).removeClass("active");
//           timeoutCustom("set", "vg-slider-load", this.properties.transitionDuration, () => {
//             u(`body`).removeClass("overflow-hidden");
//             u(this.selector).remove();
//           });

//           //remove slider instance
//           slider = null;
//         }
//         change(id_) {
//           id_ = parseInt(id_, 10) || parseInt(u(`${this.photosSelector}.active`).attr(`${properties.gallery.photosData}`), 10);

//           let nextId = 0;

//           const changing = (id_, nextId_, direction_) => {
//             if (u(this.photoSelector(nextId_)).length > 0) {
//               //set off state zoom
//               this.state.zoom = false;

//               //reset previous translates
//               this.state.previousTranslateX = 0;
//               this.state.previousTranslateY = 0;

//               //changing state
//               this.state.changing = true;
//               timeoutCustom("set", "vg-slide-changing", this.properties.photosTransitionDuration, () => {
//                 this.state.changing = false;
//                 //set default transition
//                 u(
//                   `${this.photosSelector}.previous, ${this.photosSelector}.active, ${this.photosSelector}.next, ${this.photosSelector}.previous > img, ${this.photosSelector}.active > img, ${this.photosSelector}.next > img`
//                 ).css({
//                   transitionDuration: `${this.properties.photosTransitionDuration}ms`,
//                 });
//               });

//               //set transition duration
//               u(
//                 `${this.photosSelector}.previous, ${this.photosSelector}.active, ${this.photosSelector}.next, ${this.photosSelector}.previous > img, ${this.photosSelector}.active > img, ${this.photosSelector}.next > img`
//               ).css({
//                 transitionDuration: `${this.properties.photosTransitionDuration}ms`,
//               });

//               if (direction_ === "forward") {
//                 u(`${this.photosSelector}.previous`).css({
//                   transitionDuration: `0ms`,
//                 });

//                 u(this.photoSelector(id_)).addClass("previous").removeClass("active");
//                 u(this.photoSelector(nextId_)).addClass("active").removeClass("next");

//                 //next photo
//                 if (u(this.photoSelector(id_ - 1)).length > 0) {
//                   u(this.photoSelector(id_ - 1)).removeClass("previous");
//                 } else {
//                   u(this.photoSelector(this.photosLength - 1)).removeClass("previous");
//                 }
//                 if (u(this.photoSelector(nextId_ + 1)).length > 0) {
//                   u(this.photoSelector(nextId_ + 1)).addClass("next");
//                 } else {
//                   if (this.loop) {
//                     u(this.photoSelector(0)).addClass("next");
//                   }
//                 }

//                 u(`${this.photosSelector}.next > img`).css({
//                   transitionDuration: `0ms`,
//                 });
//               }

//               if (direction_ === "backward") {
//                 u(`${this.photosSelector}.next`).css({
//                   transitionDuration: `0ms`,
//                 });

//                 u(this.photoSelector(id_)).addClass("next").removeClass("active");
//                 u(this.photoSelector(nextId_)).addClass("active").removeClass("previous");

//                 //prev photo
//                 if (u(this.photoSelector(id_ + 1)).length > 0) {
//                   u(this.photoSelector(id_ + 1)).removeClass("next");
//                 } else {
//                   u(this.photoSelector(0)).removeClass("next");
//                 }
//                 if (u(this.photoSelector(nextId_ - 1)).length > 0) {
//                   u(this.photoSelector(nextId_ - 1)).addClass("previous");
//                 } else {
//                   if (this.loop) {
//                     u(this.photoSelector(this.photosLength - 1)).addClass("previous");
//                   }
//                 }

//                 u(`${this.photosSelector}.previous > img`).css({
//                   transitionDuration: `0ms`,
//                 });
//               }

//               //apply transform X (0 + gap)
//               this.photo([
//                 u(`${this.photosSelector}.active`).attr(properties.gallery.photosData),
//                 u(`${this.photosSelector}.previous`).attr(properties.gallery.photosData),
//                 u(`${this.photosSelector}.next`).attr(properties.gallery.photosData),
//               ]).setTransform([
//                 { translateX: 0, translateY: 0, scale: 1 },
//                 {
//                   translateX: this.properties.photosGap * -1,
//                   translateY: 0,
//                   scale: 1,
//                 },
//                 {
//                   translateX: this.properties.photosGap,
//                   translateY: 0,
//                   scale: 1,
//                 },
//               ]);

//               //slider photos indicator
//               if (this.properties.photosIndicator === true)
//                 u(`${this.selector} [data-vinze-photo-indicator]`).html(
//                   `${parseInt(u(`${this.photosSelector}.active`).attr(`${properties.gallery.photosData}`), 10) + 1} of ${this.photosLength}`
//                 );
//             }
//           };

//           return {
//             forward: () => {
//               nextId = id_ + 1;
//               if (this.loop && nextId > this.photosLength - 1) {
//                 nextId = 0;
//               } else if (!this.loop && nextId >= this.photosLength - 1) {
//                 u(`button.forward`).addClass("disable");
//                 if (this.photosLength - 1 > 0) u(`button.backward`).removeClass("disable");
//               } else {
//                 u(`button.backward`).removeClass("disable");
//               }

//               changing(id_, nextId, "forward");
//             },
//             backward: () => {
//               nextId = id_ - 1;
//               if (this.loop && nextId < 0) {
//                 nextId = this.photosLength - 1;
//               } else if (!this.loop && nextId - 1 < 0) {
//                 u(`button.backward`).addClass("disable");
//                 if (this.photosLength - 1 > 0) u(`button.forward`).removeClass("disable");
//               } else {
//                 u(`button.forward`).removeClass("disable");
//               }

//               changing(id_, nextId, "backward");
//             },
//           };
//         }
//         touch() {
//           return {
//             start: (id_, clickEvent_) => {
//               this.state.startInsideTop = this.photo([id_]).insideWindow("top", true);
//               this.state.startInsideRight = this.photo([id_]).insideWindow("right", true);
//               this.state.startInsideBottom = this.photo([id_]).insideWindow("bottom", true);
//               this.state.startInsideLeft = this.photo([id_]).insideWindow("left", true);
//               //set previous translates
//               this.state.previousTranslateX = this.state.translateX;
//               this.state.previousTranslateY = this.state.translateY;
//               //set touching state
//               this.state.touching = true;
//               //remove transition duration from slider
//               u(this.selector).css({
//                 transitionDuration: `0ms`,
//               });
//               //add touching class
//               u(this.photoSelector(id_)).addClass("touching");
//               //add move event
//               u(window).on("touchmove mousemove", (moveEvent_) => {
//                 this.drag().start(id_, clickEvent_, moveEvent_);
//               });
//               //disable buttons
//               u(`button.backward, button.forward`).css({
//                 pointerEvents: "none",
//               });
//             },
//             end: (id_ = undefined) => {
//               id_ = id_ || u(`${this.photosSelector}.active`).attr(properties.gallery.photosData);
//               this.state.touching = false;
//               //set default transition duration for slider
//               u(this.selector).css({
//                 transitionDuration: `${this.properties.transitionDuration}ms`,
//               });
//               //remove touching class
//               u(this.photosSelector).removeClass("touching");
//               //end dragging
//               this.drag().end(id_);
//               //remove move events
//               u(window).off("touchmove mousemove");
//               //active buttons
//               u(`button.backward, button.forward`).css({
//                 pointerEvents: "all",
//               });
//             },
//           };
//         }
//         drag() {
//           return {
//             start: (id_, clickEvent_, moveEvent_) => {
//               //add dragging class
//               u(`${this.photosSelector}`).addClass("dragging");

//               moveEvent_ = moveEvent_ || window.event;
//               let currentMousePos = { x: -1, y: -1 },
//                 startPointX = clickEvent_.clientX || clickEvent_.touches[0].clientX,
//                 startPointY = clickEvent_.clientY || clickEvent_.touches[0].clientY,
//                 newTranslateX = 0,
//                 newTranslateY = 0;

//               if (moveEvent_.touches === undefined) {
//                 currentMousePos.x = moveEvent_.clientX;
//                 currentMousePos.y = moveEvent_.clientY;
//               } else {
//                 currentMousePos.x = moveEvent_.touches[0].clientX;
//                 currentMousePos.y = moveEvent_.touches[0].clientY;
//               }

//               newTranslateX = currentMousePos.x - startPointX;
//               newTranslateY = currentMousePos.y - startPointY;

//               if (moveEvent_.touches && moveEvent_.touches[1]) {
//                 let startPointX2 = moveEvent_.touches[1].clientX,
//                   startPointY2 = moveEvent_.touches[1].clientY;

//                 let distance = Math.sqrt(Math.pow(startPointX2 - startPointX, 2) + Math.pow(startPointY2 - startPointY, 2));

//                 distance = Math.round(distance) / 10;
//                 //t
//                 //e
//                 //m
//                 //p
//                 this.properties.zoomSpeed = Math.pow(distance, 2) / 10000;

//                 //u(`[data-vinze-photo-indicator]`).html(distance);

//                 if (distance > this.state.previousDoubleTouchDistance) this.zoom(id_).scroll("zoom");
//                 else if (distance < this.state.previousDoubleTouchDistance) this.zoom(id_).scroll("unzoom");

//                 if (distance !== this.state.previousDoubleTouchDistance) this.state.previousDoubleTouchDistance = distance;
//               } else {
//                 //X axis
//                 if (this.state.draggingY === false) {
//                   if (!this.state.zoom) {
//                     if (Math.abs(newTranslateX) > this.properties.draggingXBreakpoint) this.state.draggingX = true;

//                     //apply new transform (for active photo)
//                     this.photo([id_]).setTransform([{ translateX: newTranslateX, translateY: 0 }]);
//                   }
//                 }

//                 //apply new transform (for prev and next)
//                 let leftCon = this.photo(id_).insideWindow("left"),
//                   rightCon = this.photo(id_).insideWindow("right");

//                 if ((!this.state.zoom && this.state.draggingY === false) || this.state.zoom) {
//                   if (newTranslateX <= 0 && rightCon) {
//                     if (this.state.startInsideRight < 10) {
//                       if (!this.loop || (this.loop && u(this.photoSelector(id_ + 1)).length > 0)) {
//                         this.photo([id_ + 1]).setTransform([
//                           {
//                             translateX: this.properties.photosGap + newTranslateX,
//                             translateY: 0,
//                             scale: 1,
//                           },
//                         ]);
//                       } else {
//                         this.photo([0]).setTransform([
//                           {
//                             translateX: this.properties.photosGap + newTranslateX,
//                             translateY: 0,
//                             scale: 1,
//                           },
//                         ]);
//                       }
//                     }
//                   } else if (newTranslateX > 0 && leftCon) {
//                     if (this.state.startInsideLeft > -10) {
//                       if (!this.loop || (this.loop && u(this.photoSelector(id_ - 1)).length > 0)) {
//                         this.photo([id_ - 1]).setTransform([
//                           {
//                             translateX: this.properties.photosGap * -1 + newTranslateX,
//                             translateY: 0,
//                             scale: 1,
//                           },
//                         ]);
//                       } else {
//                         this.photo([this.photosLength - 1]).setTransform([
//                           {
//                             translateX: this.properties.photosGap * -1 + newTranslateX,
//                             translateY: 0,
//                             scale: 1,
//                           },
//                         ]);
//                       }
//                     }
//                   }
//                 }

//                 if (!this.state.zoom) {
//                   if (
//                     ((Math.abs(newTranslateX) <= this.properties.draggingXBreakpoint && Math.abs(newTranslateY) >= this.properties.draggingYBreakpoint) ||
//                       this.state.draggingY === true) &&
//                     this.properties.closeViaDrag === true &&
//                     this.state.draggingX === false
//                   ) {
//                     this.state.draggingY = true;

//                     //dragging Y direction (for properly setting transform with gap)

//                     if (
//                       (newTranslateY <= 0 && this.state.startDirectionDraggingY !== "bottom") ||
//                       (newTranslateY > 0 && this.state.startDirectionDraggingY === "top")
//                     ) {
//                       newTranslateY += this.properties.draggingYBreakpoint;
//                       this.state.startDirectionDraggingY = "top";
//                     } else if (
//                       (newTranslateY > 0 && this.state.startDirectionDraggingY !== "top") ||
//                       (newTranslateY <= 0 && this.state.startDirectionDraggingY === "bottom")
//                     ) {
//                       newTranslateY -= this.properties.draggingYBreakpoint;
//                       this.state.startDirectionDraggingY = "bottom";
//                     }

//                     //set opacity
//                     let absNewTranslateY = Math.abs(newTranslateY) / 10;

//                     if (absNewTranslateY <= 99 && absNewTranslateY >= 10) {
//                       absNewTranslateY = absNewTranslateY.toString();
//                     } else if (absNewTranslateY < 10) {
//                       absNewTranslateY = "0" + absNewTranslateY.toString();
//                     } else {
//                       absNewTranslateY = "99";
//                     }

//                     absNewTranslateY = absNewTranslateY.replace(".", "");

//                     let closeVal = Math.round((1 - parseFloat("0." + absNewTranslateY)) * 10000) / 10000;

//                     //apply opacity / remove blur
//                     u(this.selector).css({ opacity: closeVal }).removeClass("blur");

//                     //apply new transform
//                     this.photo([id_]).setTransform([
//                       {
//                         translateX: newTranslateX,
//                         translateY: newTranslateY,
//                         scale: closeVal >= 0.5 ? closeVal : 0.5,
//                       },
//                     ]);
//                   }
//                 } else {
//                   //clear timeout fixing zoom position
//                   timeoutCustom("clear", "vg-fix-zoom-position");

//                   this.state.draggingX = true;
//                   this.state.draggingY = true;

//                   this.photo([id_]).setTransform([
//                     {
//                       translateX: newTranslateX / this.state.scale + this.state.previousTranslateX,
//                       translateY: newTranslateY / this.state.scale + this.state.previousTranslateY,
//                     },
//                   ]);
//                 }
//               }
//             },
//             end: (id_) => {
//               id_ = parseInt(id_, 10) || parseInt(u(`${this.photosSelector}.active`).attr(`${properties.gallery.photosData}`), 10);

//               u(this.photosSelector).removeClass("dragging");

//               this.state.startDirectionDraggingY = false;

//               let breakpointX = u(window).width() / 5 <= 150 ? u(window).width() / 5 : 150;
//               let breakpointY = u(window).width() / 5 <= 150 ? u(window).width() / 5 : 150;

//               if (!this.state.zoom) {
//                 if (!this.state.draggingY) {
//                   //change slide
//                   if (this.state.translateX > breakpointX && (this.loop || u(this.photoSelector(id_ - 1)).length > 0)) {
//                     this.state.previousTranslateX = this.state.translateX;
//                     this.change(id_).backward();
//                   } else if (this.state.translateX < -breakpointX && (this.loop || u(this.photoSelector(id_ + 1)).length > 0)) {
//                     this.state.previousTranslateX = this.state.translateX;
//                     this.change(id_).forward();
//                   } else {
//                     this.state.previousTranslateX = this.state.translateX;
//                     //set previous and next photos default transform
//                     let next = this.loop && u(this.photoSelector(id_ + 1)).length === 0 ? 0 : id_ + 1;

//                     let prev = this.loop && u(this.photoSelector(id_ - 1)).length === 0 ? this.photosLength - 1 : id_ - 1;

//                     if (this.state.translateX <= 0) {
//                       this.photo([next]).setTransform([{ translateX: this.properties.photosGap }]);
//                     } else {
//                       this.photo([prev]).setTransform([{ translateX: this.properties.photosGap * -1 }]);
//                     }
//                     //set current photos default transform
//                     this.photo([id_]).setTransform([{ translateX: 0 }]);
//                   }
//                 } else {
//                   if (this.state.translateY > breakpointY || this.state.translateY < -breakpointY) {
//                     u(this.selector).css({ opacity: 0 });
//                     //scale image for slider off
//                     this.photo([id_]).setTransform([{ scale: 0.5 }]);
//                     this.close();
//                   } else {
//                     this.state.previousTranslateY = this.state.translateY;
//                     //apply default opacity / add blur
//                     u(this.selector).css({ opacity: 1 }).addClass("blur");
//                     //set current photos default transform
//                     this.photo([id_]).setTransform([{ translateX: 0, translateY: 0, scale: 1 }]);
//                   }
//                 }
//               } else {
//                 if (this.state.draggingX || this.state.draggingY) {
//                   let leftCon = this.photo(id_).insideWindow("left"),
//                     rightCon = this.photo(id_).insideWindow("right");

//                   this.photo([id_]).fixPosition();

//                   let next = this.loop && u(this.photoSelector(id_ + 1)).length === 0 ? 0 : id_ + 1;

//                   let prev = this.loop && u(this.photoSelector(id_ - 1)).length === 0 ? this.photosLength - 1 : id_ - 1;

//                   if (!this.state.changing)
//                     if (rightCon) {
//                       this.photo([next]).setTransform([
//                         {
//                           translateX: this.properties.photosGap,
//                           translateY: 0,
//                           scale: 1,
//                         },
//                       ]);
//                     } else if (leftCon) {
//                       this.photo([prev]).setTransform([
//                         {
//                           translateX: this.properties.photosGap * -1,
//                           translateY: 0,
//                           scale: 1,
//                         },
//                       ]);
//                     }
//                 }
//               }

//               // --- //

//               this.state.draggingY = false;
//               this.state.draggingX = false;
//             },
//           };
//         }
//         zoom(id_) {
//           id_ = parseInt(id_, 10) || parseInt(u(`${this.photosSelector}.active`).attr(`${properties.gallery.photosData}`), 10);

//           //set transition duration for zooming
//           u(`${this.photosSelector}.active > img`).css({
//             transitionDuration: `${this.properties.zoomTransitionDuration}ms`,
//           });

//           //remove new transition duration
//           timeoutCustom("clear", "vg-slider-transition");
//           timeoutCustom("set", "vg-slider-transition", this.properties.zoomTransitionDuration, () => {
//             u(`${this.photosSelector}.active > img`).css({
//               transitionDuration: `${this.properties.photosTransitionDuration}ms`,
//             });
//           });

//           //set ease transition easing
//           if (this.state.zoom) {
//             u(`${this.photosSelector} > img`).css({
//               transitionTimingFunction: `${easings["ease"]}`,
//             });
//           } else {
//             if (easings[this.properties.photosEasing] !== undefined)
//               u(`${this.photosSelector} > img`).css({
//                 transitionTimingFunction: `${easings[this.properties.photosEasing]}`,
//               });
//             else
//               u(`${this.photosSelector} > img`).css({
//                 transitionTimingFunction: `${easings["ease"]}`,
//               });
//           }

//           if (this.state.zoom) {
//             if (this.properties.photoIndicator === true) u(`${this.selector} [data-vinze-photo-indicator]`).addClass("hide");
//           } else {
//             if (this.properties.photoIndicator === true) u(`${this.selector} [data-vinze-photo-indicator]`).removeClass("hide");
//           }

//           return {
//             once: () => {
//               if (this.state.zoom) {
//                 this.photo([id_]).setTransform([{ translateX: 0, translateY: 0, scale: 1 }]);
//               } else {
//                 this.photo([id_]).setTransform([
//                   {
//                     translateX: 0,
//                     translateY: 0,
//                     scale: this.photo([id_]).minScale(),
//                   },
//                 ]);
//               }

//               //change zoom state
//               this.state.zoom = !this.state.zoom;
//             },
//             scroll: (direction_) => {
//               switch (direction_) {
//                 case "zoom":
//                   if (this.state.scale + this.properties.zoomSpeed < this.photo([id_]).minScale()) {
//                     this.photo([id_]).setTransform([{ scale: this.photo([id_]).minScale() }]);
//                   } else {
//                     if (this.state.scale + this.properties.zoomSpeed < this.properties.zoomMaxScale * this.photo([id_]).minScale())
//                       this.photo([id_]).setTransform([
//                         {
//                           scale: this.state.scale + this.properties.zoomSpeed,
//                         },
//                       ]);
//                     else
//                       this.photo([id_]).setTransform([
//                         {
//                           scale: this.properties.zoomMaxScale * this.photo([id_]).minScale(),
//                         },
//                       ]);
//                   }
//                   this.state.zoom = true;
//                   break;
//                 case "unzoom":
//                   if (this.state.scale > 1) {
//                     this.photo([id_]).setTransform([
//                       {
//                         scale: this.state.scale - this.properties.zoomSpeed,
//                       },
//                     ]);
//                   } else {
//                     this.photo([id_]).setTransform([
//                       {
//                         scale: 1,
//                       },
//                     ]);
//                   }
//                   if (this.state.scale <= this.photo([id_]).minScale()) {
//                     timeoutCustom("clear", "vg-fix-zoom-position");

//                     this.state.previousTranslateX = 0;
//                     this.state.previousTranslateY = 0;
//                     this.photo([id_]).setTransform([
//                       {
//                         translateX: 0,
//                         translateY: 0,
//                       },
//                     ]);
//                   }
//                   if (this.state.scale < this.photo([id_]).minScale()) {
//                     timeoutCustom("clear", "vg-fix-zoom-position");

//                     this.photo([id_]).setTransform([
//                       {
//                         scale: 1,
//                       },
//                     ]);
//                     this.state.zoom = false;
//                   } else if (this.state.scale === this.photo([id_]).minScale()) {
//                     this.state.zoom = true;
//                   } else {
//                     this.state.zoom = true;

//                     timeoutCustom("clear", "vg-fix-zoom-position");
//                     if (this.state.zoom) {
//                       timeoutCustom("set", "vg-fix-zoom-position", this.properties.zoomTransitionDuration * 1.2, () => {
//                         this.photo([id_]).fixPosition();
//                       });
//                     }
//                   }
//                   break;
//                 default:
//                   return undefined;
//               }
//             },
//           };
//         }
//       }

//       //set empty galleries array and empty slider instance
//       const galleries = new Array();
//       let slider = null;

//       //loop through all galleries
//       for (let i = 0; i <= u(`[${properties.gallery.data}]`).length - 1; i++) {
//         //create new gallery
//         galleries[i] = new Gallery(i);
//         //set smooth load attribute to the gallery
//         // galleries[i].setAttribute(
//         //   `data-vinze-smooth-load`,
//         //   properties.gallery.smoothLoad,
//         //   true,
//         //   false
//         // );
//         //set layout
//         galleries[i].setLayout();
//         //load the gallery photos
//         galleries[i].loadPhotos();
//       }
//     });
//   },
// };

class Color {
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
}

const vinzeGallery = [
  new Color('brightred', '#E74C3C'),
  new Color('soothingpurple', '#9B59B6'),
  new Color('skyblue', '#5DADE2'),
  new Color('leafygreen', '#48C9B0'),
  new Color('sunkissedyellow', '#F4D03F'),
  new Color('groovygray', '#D7DBDD'),
];

exports.getRandomColor = () => {
  return vinzeGallery[Math.floor(Math.random() * vinzeGallery.length)];
}

exports.vinzeGallery = vinzeGallery;