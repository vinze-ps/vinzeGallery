/* vinzeGallery */
/* created by Patryk Surmacz */
/* github.com/vinze-ps */

(function (global, factory) {
    typeof exports === "object" && typeof module !== "undefined"
      ? (module.exports = factory())
      : typeof define === "function" && define.amd
      ? define(factory)
      : ((global = typeof globalThis !== "undefined" ? globalThis : global || self), (global.VinzeGallery = factory()));
  })(this, function () {
    ("use strict");

    var utils;
    
    (function() {
        try {
            utils = new Vinze();
        } catch {
            console.warn("%c Error: Cannot find Vinze Utilities, go to https://github.com/vinze-ps/vinzeUtilities and attach it before Vinze Gallery. ", 'background: #111; color: #9bd4fa');
        }
    })();

    const initialProperties = {
        mobileBreakpoint: 500,
        gallery: {
            smoothLoad: true,
            smoothLoadTick: 200,
            photosTransitionDuration: 200,
            photosEasing: utils.easings.easeOutSine,
            photosGap: 5,
            layout: null,
        },
        slider: {
            transitionDuration: 200,
            navButtons: "desktop",
            escButton: true,
            navTouch: true,
            closeViaDrag: true,
            photosIndicator: "desktop",
            photosGap: 15,
            photosEasing: utils.easings.easeInOutSine,
            mouseWheel: "zoom",
            photosTransitionDuration: 200,
            zoomTransitionDuration: 200,
            zoomMaxScale: 3,
            zoomSpeed: 0.25,
            loop: true,
            draggingXBreakpoint: 15,
            draggingYBreakpoint: 15,
        },
    };

    class VGGallery {
        constructor(element, properties) {
            this.galleryElement = element;
            this.properties = properties.gallery;
            this.sliderProperties = properties;
            // Load the gallery.
            if (this.galleryElement)
                this.load();
        }
        load() {
            let photosContainerNodeList = this.galleryElement.querySelectorAll("[data-vinze-photo-container]");
            photosContainerNodeList.forEach((container, index) => {
                let photo = container.querySelectorAll("[data-vinze-photo]")[0];
                // Transitions.
                photo.style.transitionProperty = "transform, opacity";
                photo.style.transitionDuration = `${this.properties.photosTransitionDuration}ms`;
                photo.style.transitionTimingFunction = utils.easings[(this.properties.photosEasing ? this.properties.photosEasing : "ease")];
                // Set the gap between photos.
                if (this.properties.photosGap) {
                    photo.style.margin = this.properties.photosGap + "px 0 0 0";
                    photo.style.padding = "0 0 0 " + this.properties.photosGap + "px";
                }
                // Default alt attribute.
                if (!photo.getAttribute("alt"))
                    photo.setAttribute("alt", "Gallery photo");
                // Events.
                photo.addEventListener("click", () => {
                    this.openSlider(index);
                });
                // Add loaded class.
                if (!this.properties.smoothLoad)
                    photo.classList.add("loaded");
                else
                    utils.timeout("set", "vinze-gallery-load", (index + 1) * this.properties.smoothLoadTick, () => {
                        photo.classList.add("loaded");
                    });
                this.galleryElement.setAttribute("data-vinze-gallery-loaded", "true");
            });
            // Set the layout.
            this.setLayout();
        }
        setLayout() {
            if (this.properties.layout !== null) {
                utils.select(this.galleryElement).addClass("row");
                this.galleryElement.querySelectorAll("[data-vinze-photo-container]").forEach((container) => {
                    let containerClasses = container.classList.value.split(" ");
                    containerClasses.forEach((className, index) => {
                        if (className.search("col-") === -1)
                            containerClasses.splice(index, 1);
                    });
                    for (let breakpoint in this.properties.layout) {
                        let add = true;
                        containerClasses.forEach((className) => {
                            if (className.search(breakpoint) !== -1)
                                add = false;
                            if (breakpoint === "xs") {
                                if (className.search("sm") === -1 && className.search("md") === -1 && className.search("lg") === -1 && className.search("xl") === -1)
                                    add = false;
                            }
                        });
                        if (add && typeof this.properties.layout[breakpoint] === "number")
                            container.classList.add(`col${(breakpoint.toString() !== "xs"
                                ? "-" + breakpoint.toString()
                                : "")}-${this.properties.layout[breakpoint]}`);
                    }
                });
            }
        }
        openSlider(imageIndex) {
            let slider = new VGSlider(this.galleryElement, this.sliderProperties, imageIndex);
        }
    }

    class VGSlider {
        constructor(galleryElement, properties, initialImageIndex) {
            this.currentPhotoIndex = initialImageIndex;
            this.galleryElement = galleryElement;
            this.sliderElement = null;
            this.state = {
                changing: false,
                zoom: false,
                touching: false,
                draggingY: false,
                draggingX: false,
                previousTranslateX: 0,
                previousTranslateY: 0,
                translateX: 0,
                translateY: 0,
                scale: 1,
                startDirectionDraggingY: null,
                previousDoubleTouchDistance: 0,
                startInsideTop: 0,
                startInsideRight: 0,
                startInsideBottom: 0,
                startInsideLeft: 0,
            };
            this.properties = properties.slider;
            this.properties.loop = this.properties.loop && this.galleryElement.querySelectorAll("[data-vinze-photo]").length > 2;
            this.mobileBreakpoint = properties.mobileBreakpoint;
            this.currentContext = undefined;
            // Initialize.
            this.init();
        }
        /**
         * Initialization.
         */
        init() {
            // Generate the slider.
            this.generate();
            // Generate photos.
            this.photos().generate();
            // Show the slider with a little delay.
            utils.timeout("set", "vinze-gallery-slider-show", 100, () => {
                this.show();
            });
        }
        /**
         * Generates the slider.
         */
        generate() {
            let bodyElement = document.querySelector("body");
            if (!bodyElement)
                return;
            let photosElement = this.galleryElement.querySelectorAll("[data-vinze-photo]");
            // Generate the slider element.
            utils.select(bodyElement).prepend(`
                <div data-vinze-slider class="blur">
                    <button class="close" title="Close (ESC)"><div class="bar"></div><div class="bar"></div></button>
                    <button class="backward" title="Previous (←)"></button><button class="forward" title="Next (→)"></button>
                    <div data-vinze-photo-indicator>
                        ${this.currentPhotoIndex + 1} 
                        of 
                        ${photosElement.length}
                    </div>
                </div>
            `);
            this.sliderElement = document.querySelector("[data-vinze-slider]");
        }
        /**
         * Shows the slider.
         */
        show() {
            // Set the slider transition property style.
            this.sliderElement.style.transitionDuration = this.properties.transitionDuration + "ms";
            document.querySelector("body").classList.add("overflow-hidden");
            this.sliderElement.classList.add("active");
            this.updateContext();
        }
        /**
         * Updates properties on change mobile / desktop view.
         */
        updateContext() {
            let _currentContext = utils.select(window).width() <= this.mobileBreakpoint ? "mobile" : "desktop";
            if (this.currentContext !== _currentContext)
                this.currentContext = _currentContext;
            else
                return;
            // Nav buttons.
            if (this.properties.navButtons === false ||
                this.properties.navButtons === "desktop" && _currentContext === "mobile" ||
                this.properties.navButtons === "mobile" && _currentContext === "desktop") {
                this.sliderElement.querySelector("button.backward").classList.add("hidden");
                this.sliderElement.querySelector("button.forward").classList.add("hidden");
            }
            else {
                this.sliderElement.querySelector("button.backward").classList.remove("hidden");
                this.sliderElement.querySelector("button.forward").classList.remove("hidden");
            }
            // Escape button.
            if (this.properties.escButton === false ||
                this.properties.escButton === "desktop" && _currentContext === "mobile" ||
                this.properties.escButton === "mobile" && _currentContext === "desktop") {
                this.sliderElement.querySelector("button.close").classList.add("hidden");
            }
            else {
                this.sliderElement.querySelector("button.close").classList.remove("hidden");
            }
            // Photos indicator.
            if (this.properties.photosIndicator === false ||
                this.properties.photosIndicator === "desktop" && _currentContext === "mobile" ||
                this.properties.photosIndicator === "mobile" && _currentContext === "desktop") {
                this.sliderElement.querySelector("[data-vinze-photo-indicator]").classList.add("hidden");
            }
            else {
                this.sliderElement.querySelector("[data-vinze-photo-indicator]").classList.remove("hidden");
            }
            // Reload events.
            this.events().remove();
            this.events().add();
        }
        /**
         * Hides the slider and removes it.
         */
        close() {
            let bodyElement = document.querySelector("body");
            bodyElement.classList.remove("overflow-hidden");
            this.sliderElement.classList.remove("active");
            utils.timeout("set", "vinze-gallery-slider-remove", this.properties.transitionDuration, () => {
                this.sliderElement.remove();
                console.log(utils.events);
                this.events().remove();
                console.log(utils.events);
            });
        }
        /**
         * Collection of methods related with events.
         */
        events() {
            return {
                /**
                 * Adds events to the slider, photos etc.
                 */
                add: () => {
                    // Close the slider with the close button.
                    utils.select(this.sliderElement.querySelector("button.close"))
                        .on("click", () => this.close(), null, "vinze-gallery-slider-close-button");
                    utils.select(document).on("keydown", (event) => {
                        event = event || window.event;
                        let isEscape = false;
                        let isArrowLeft = false;
                        let isArrowRight = false;
                        if ("key" in event) {
                            isEscape = event.key === "Escape" || event.key === "Esc";
                            isArrowLeft = event.key === "ArrowLeft";
                            isArrowRight = event.key === "ArrowRight";
                        }
                        else {
                            isEscape = event.keyCode === 27;
                            isArrowLeft = event.keyCode === 37;
                            isArrowRight = event.keyCode === 39;
                        }
                        // Close the slider on esc key.
                        if (isEscape)
                            this.close();
                        // Change to the previous photo.
                        if (isArrowLeft)
                            this.actions().change().backward();
                        // Change to the next photo.
                        if (isArrowRight)
                            this.actions().change().forward();
                    }, null, "vinze-gallery-slider-keydown");
                    // Navigation buttons events.
                    utils.select(this.sliderElement.querySelector("button.backward"))
                        .on("click", () => this.actions().change().backward(), null, "vinze-gallery-slider-backward-button");
                    utils.select(this.sliderElement.querySelector("button.forward"))
                        .on("click", () => this.actions().change().forward(), null, "vinze-gallery-slider-forward-button");
                    // Photos events.
                    // Scroll zoom.
                    if (this.properties.mouseWheel === "zoom") {
                        this.photos().get().photo().forEach((photo) => {
                            utils.select(photo).on("mousewheel", (event) => {
                                utils.throttle("vinze-gallery-slider-mousewheel-throttle", 25, () => {
                                    if (!this.state.changing)
                                        if (event.wheelDelta / 120 > 0) {
                                            this.actions().zoom().in();
                                        }
                                        else {
                                            this.actions().zoom().out();
                                        }
                                });
                            });
                        });
                    }
                    else if (this.properties.mouseWheel === "navigation") {
                        this.photos().get().photo().forEach((photo) => {
                            utils.select(photo).on("mousewheel", (event) => {
                                if (event.wheelDelta / 120 > 0) {
                                    this.actions().change().forward();
                                }
                                else {
                                    this.actions().change().backward();
                                }
                            });
                        });
                    }
                    this.photos().get().photo().forEach((photo) => {
                        let tapped = false;
                        utils.select(photo)
                            .on("dblclick", (event) => {
                            if (!this.state.changing) {
                                // Zoom on double click.
                                if (!this.state.zoom)
                                    this.actions().zoom().in();
                                else
                                    this.actions().zoom().out(true);
                            }
                            event.preventDefault();
                        })
                            .on("mousedown touchstart", (event) => {
                            if (event.touches !== undefined) {
                                if (tapped === false) {
                                    utils.timeout("set", "vinze-gallery-slider-double-tap", 300, () => {
                                        tapped = false;
                                    });
                                    tapped = true;
                                }
                                else if (tapped === true && event.touches[1] === undefined) {
                                    utils.timeout("clear", "vinze-gallery-slider-double-tap");
                                    tapped = false;
                                    if (!this.state.zoom)
                                        this.actions().zoom().in();
                                    else
                                        this.actions().zoom().out(true);
                                }
                            }
                            if (!this.state.changing && (this.properties.navTouch === true || this.properties.navTouch === this.currentContext))
                                this.actions().touch().start(event);
                            event.preventDefault();
                        });
                    });
                    utils.select(window).on("mouseup touchend", () => {
                        this.actions().touch().stop();
                    }, null, "vinze-gallery-slider-mouseup-touchend");
                    utils.select(window).on("resize", () => {
                        this.updateContext();
                    }, null, "vinze-gallery-slider-resize");
                },
                /**
                 * Removes events from window, document etc.
                 */
                remove: () => {
                    utils.select(this.sliderElement.querySelector("button.backward")).off(null, null, null, "vinze-gallery-slider-backward-button");
                    utils.select(this.sliderElement.querySelector("button.forward")).off(null, null, null, "vinze-gallery-slider-forward-button");
                    utils.select(this.sliderElement.querySelector("button.close")).off(null, null, null, "vinze-gallery-slider-close-button");
                    utils.select(document).off(null, null, null, "vinze-gallery-slider-keydown");
                    utils.select(window).off(null, null, null, "vinze-gallery-slider-mouseup-touchend");
                    utils.select(window).off(null, null, null, "vinze-gallery-slider-resize");
                    this.photos().get().photo().forEach((photo) => {
                        utils.select(photo).off("mousewheel dblclick mousedown touchstart");
                    });
                }
            };
        }
        /**
         * Collection of methods related with photos.
         */
        photos() {
            return {
                /**
                 * Generates photos in the slider.
                 */
                generate: () => {
                    this.galleryElement.querySelectorAll("[data-vinze-photo]").forEach((galleryPhoto, index) => {
                        var _a;
                        let src = (_a = galleryPhoto.getAttribute("data-vinze-slider-src")) !== null && _a !== void 0 ? _a : galleryPhoto.getAttribute("src");
                        if (src === null)
                            return;
                        utils.select(this.sliderElement).append(`
                            <div data-vinze-photo="${index}" class="touchable">
                                <div data-vinze-photo-cover></div>
                                <img data-vinze-photo-src="${src}" alt="Slider photo" draggable="false" />
                            </div>
                        `);
                        let photo = this.sliderElement.querySelector(`[data-vinze-photo="${index}"]`);
                        let photoImg = photo.querySelector(`img`);
                        // Transitions.
                        photo.style.transitionDuration = this.properties.photosTransitionDuration + "ms";
                        photo.style.transitionTimingFunction = utils.easings[this.properties.photosEasing];
                        photoImg.style.transitionDuration = this.properties.photosTransitionDuration + "ms";
                        photoImg.style.transitionTimingFunction = utils.easings[this.properties.photosEasing];
                    });
                    // Update position classes.
                    this.photos().updatePositionClasses();
                    // Load photos.
                    this.photos().load();
                    // Update transforms.
                    this.photos().setTransform(this.photos().get().previousPhotoIndex, {
                        translateX: this.properties.photosGap * -1,
                        translateY: 0,
                        scale: 1,
                    });
                    this.photos().setTransform(this.photos().get().nextPhotoIndex, {
                        translateX: this.properties.photosGap,
                        translateY: 0,
                        scale: 1,
                    });
                },
                /**
                 * Returns methods and properties which helps with handle photos, gets them indexes etc.
                 */
                get: () => {
                    let photo = (index = null, lastIndex = null) => {
                        if ((index !== null && lastIndex === null) || (index === null && lastIndex === null) || (index === null && lastIndex !== null))
                            return this.sliderElement.querySelectorAll(`[data-vinze-photo${(index === null ? "" : `="${index}"`)}]`);
                        else if (index !== null && lastIndex !== null) {
                            let selector = "";
                            for (let i = index; i <= lastIndex; i++) {
                                selector += `[data-vinze-photo="${i}"]`;
                                if (i !== lastIndex)
                                    selector += ", ";
                            }
                            return this.sliderElement.querySelectorAll(selector);
                        }
                    };
                    let photoImg = (index = null) => this.sliderElement.querySelectorAll(`[data-vinze-photo${(index === null ? "" : `="${index}"`)}]` + " > img");
                    // Photo indexes.
                    let lastPhotoIndex = photo().length - 1;
                    let previousPhotoIndex = null;
                    let nextPhotoIndex = null;
                    if (this.currentPhotoIndex === 0) {
                        if (this.properties.loop) {
                            previousPhotoIndex = lastPhotoIndex;
                            nextPhotoIndex = this.currentPhotoIndex + 1;
                        }
                    }
                    else if (this.currentPhotoIndex === lastPhotoIndex) {
                        if (this.properties.loop) {
                            previousPhotoIndex = this.currentPhotoIndex - 1;
                            nextPhotoIndex = 0;
                        }
                    }
                    else {
                        previousPhotoIndex = this.currentPhotoIndex - 1;
                        nextPhotoIndex = this.currentPhotoIndex + 1;
                    }
                    return {
                        photo,
                        photoImg,
                        lastPhotoIndex,
                        previousPhotoIndex,
                        nextPhotoIndex,
                    };
                },
                /**
                 * Loads the necessary photos.
                 */
                load: () => {
                    this.photos().get().photoImg().forEach((img, index) => {
                        let photo = this.photos().get().photo(index)[0];
                        if (img.getAttribute("src") === null &&
                            (photo.classList.contains("previous") ||
                                photo.classList.contains("active") ||
                                photo.classList.contains("next")))
                            img.setAttribute("src", img.getAttribute("data-vinze-photo-src"));
                    });
                },
                /**
                 * Updates classes responsible for the location of photos.
                 */
                updatePositionClasses: (previousIndex = null) => {
                    if (previousIndex !== null)
                        this.photos().get().photo(previousIndex)[0].classList.remove("active");
                    this.photos().get().photo(this.currentPhotoIndex)[0].classList.add("active");
                    this.photos().get().photo(0, this.photos().get().lastPhotoIndex).forEach((photo) => {
                        photo.classList.remove("next");
                        photo.classList.remove("previous");
                    });
                    // Current is the first photo.
                    if (this.currentPhotoIndex === 0) {
                        this.photos().get().photo(this.currentPhotoIndex + 1)[0].classList.add("next");
                        this.photos().get().photo(this.photos().get().lastPhotoIndex)[0].classList.add("previous");
                        // Current is the last photo.
                    }
                    else if (this.currentPhotoIndex === this.photos().get().lastPhotoIndex) {
                        this.photos().get().photo(this.currentPhotoIndex - 1)[0].classList.add("previous");
                        this.photos().get().photo(0)[0].classList.add("next");
                        // Current is some middle photo.
                    }
                    else {
                        this.photos().get().photo(this.currentPhotoIndex + 1)[0].classList.add("next");
                        this.photos().get().photo(this.currentPhotoIndex - 1)[0].classList.add("previous");
                    }
                },
                /**
                 * Set default transforms for prev, curr and next photos.
                 */
                setDefaultTransforms: () => {
                    this.photos().setTransform(this.photos().get().previousPhotoIndex, {
                        translateX: this.properties.photosGap * -1,
                        translateY: 0,
                        scale: 1,
                    });
                    this.photos().setTransform(this.photos().get().nextPhotoIndex, {
                        translateX: this.properties.photosGap,
                        translateY: 0,
                        scale: 1,
                    });
                    this.photos().setTransform(this.currentPhotoIndex, {
                        translateX: 0,
                        translateY: 0,
                        scale: 1,
                    });
                },
                /**
                 * Sets the current photo to the crop only if it is outside the window area;
                 */
                fixPosition: () => {
                    let insideWindowTop = this.photos().insideWindow(this.currentPhotoIndex, "top").isInside, insideWindowRight = this.photos().insideWindow(this.currentPhotoIndex, "right").isInside, insideWindowBottom = this.photos().insideWindow(this.currentPhotoIndex, "bottom").isInside, insideWindowLeft = this.photos().insideWindow(this.currentPhotoIndex, "left").isInside;
                    let photoImg = this.photos().get().photoImg(this.currentPhotoIndex)[0];
                    // Left & right side.
                    if ((insideWindowLeft || insideWindowRight) &&
                        utils.select(photoImg).outerWidth() * this.state.scale >= utils.select(window).width()) {
                        let insideDistanceX = utils.select(photoImg).position().left / this.state.scale;
                        let breakpoint = utils.select(window).width() / 5 <= 150 ? utils.select(window).width() / 5 : 150;
                        if (insideWindowRight)
                            insideDistanceX += utils.select(photoImg).outerWidth() - utils.select(window).width() / this.state.scale;
                        // Change image.
                        if (insideDistanceX > breakpoint && this.state.startInsideLeft > -10)
                            this.actions().change().backward();
                        else if (insideDistanceX < breakpoint * -1 && this.state.startInsideRight < 10)
                            this.actions().change().forward();
                        if (!this.state.changing)
                            this.photos().setTransform(this.currentPhotoIndex, {
                                translateX: this.state.translateX - insideDistanceX,
                                translateY: undefined,
                                scale: undefined,
                            });
                    }
                    else if ((insideWindowLeft || insideWindowRight) &&
                        utils.select(photoImg).outerWidth() * this.state.scale < utils.select(window).width()) {
                        if (!this.state.changing)
                            this.photos().setTransform(this.currentPhotoIndex, {
                                translateX: 0,
                                translateY: undefined,
                                scale: undefined,
                            });
                    }
                    // Top & bottom side.
                    if ((insideWindowTop || insideWindowBottom) &&
                        utils.select(photoImg).outerHeight() * this.state.scale >= utils.select(window).height()) {
                        let insideDistanceY = utils.select(photoImg).position().top / this.state.scale;
                        if (insideWindowBottom)
                            insideDistanceY += utils.select(photoImg).outerHeight() - utils.select(window).height() / this.state.scale;
                        if (!this.state.changing)
                            this.photos().setTransform(this.currentPhotoIndex, {
                                translateX: undefined,
                                translateY: this.state.translateY - insideDistanceY,
                                scale: undefined,
                            });
                    }
                    else if ((insideWindowTop || insideWindowBottom) &&
                        utils.select(photoImg).outerHeight() * this.state.scale < utils.select(window).height()) {
                        if (!this.state.changing)
                            this.photos().setTransform(this.currentPhotoIndex, {
                                translateX: undefined,
                                translateY: 0,
                                scale: undefined,
                            });
                    }
                },
                /**
                 * Checks if specific photo is inside the window.
                 * @param index Index of a photo.
                 * @param side "top" | "right" | "bottom" | "left".
                 * @returns Object contains props: isInside (boolean) - true if photo is inside window, value (number) - distance from the side in px.
                 */
                insideWindow: (index, side = undefined) => {
                    let returnValue = {
                        isInside: null,
                        value: 0,
                    };
                    if (index === null)
                        return returnValue;
                    let uPhoto = utils.select(this.photos().get().photoImg(index)[0]);
                    let uWindow = utils.select(window);
                    switch (side) {
                        case "top":
                            returnValue.value = uPhoto.position().top / this.state.scale;
                            returnValue.isInside = returnValue.value > 0;
                            break;
                        case "right":
                            returnValue.value = uPhoto.position().left + uPhoto.outerWidth() * this.state.scale;
                            returnValue.isInside = returnValue.value < uWindow.width();
                            returnValue.value -= uWindow.width();
                            break;
                        case "bottom":
                            returnValue.value = uPhoto.position().top + uPhoto.outerHeight() * this.state.scale;
                            returnValue.isInside = returnValue.value < uWindow.height();
                            returnValue.value -= uWindow.height();
                            break;
                        case "left":
                            returnValue.value = uPhoto.position().left / this.state.scale;
                            returnValue.isInside = returnValue.value > 0;
                    }
                    return returnValue;
                },
                /**
                 * Calculates and returns minimum photo scale while zoomed.
                 * @returns Minimum scale as number.
                 */
                getMinimumZoomScale: () => {
                    let windowWidth = utils.select(window).width(), windowHeight = utils.select(window).height(), currentPhotoWidth = utils.select(this.photos().get().photoImg(this.currentPhotoIndex)[0]).outerWidth(), currentPhotoHeight = utils.select(this.photos().get().photoImg(this.currentPhotoIndex)[0]).outerHeight();
                    return windowHeight - currentPhotoHeight > windowWidth - currentPhotoWidth
                        ? windowHeight / currentPhotoHeight + (windowHeight / currentPhotoHeight) * 0.01
                        : windowWidth / currentPhotoWidth + (windowWidth / currentPhotoWidth) * 0.01;
                },
                /**
                 *
                 * @param index Index of a photo.
                 * @param properties Object contains props: scale (number | undefined), translateX (number | undefined), translateY (number | undefined).
                 */
                setTransform: (index, properties) => {
                    if (index === null)
                        return;
                    const _properties = {
                        scale: properties.scale !== undefined ? properties.scale : this.state.scale,
                        translateX: properties.translateX !== undefined ? properties.translateX : this.state.translateX,
                        translateY: properties.translateY !== undefined ? properties.translateY : this.state.translateY,
                    };
                    const _setTransform = (_index) => {
                        this.photos().get().photoImg(_index)[0].style.transform =
                            `scale(${_properties.scale}) translateX(${_properties.translateX}px) translateY(${_properties.translateY}px)`;
                        // Update the state.
                        if (_index === this.currentPhotoIndex) {
                            this.state.scale = _properties.scale;
                            this.state.translateX = _properties.translateX;
                            this.state.translateY = _properties.translateY;
                        }
                    };
                    if (index === "all") {
                        for (let i = 0; i <= this.photos().get().lastPhotoIndex; i++)
                            _setTransform(i);
                    }
                    else {
                        _setTransform(index);
                    }
                },
            };
        }
        /**
         * Collection of methods to interaction with photos.
         */
        actions() {
            return {
                change: () => {
                    let _previousIndex = this.currentPhotoIndex;
                    const _change = () => {
                        // Set the changing state to true.
                        this.state.changing = true;
                        // Reset the previous translates.
                        this.state.previousTranslateX = 0;
                        this.state.previousTranslateY = 0;
                        // Unzoom.
                        // TODO
                        // this.actions().zoom().out(true);
                        this.state.zoom = false;
                        this.photos().setDefaultTransforms();
                        if (this.state.zoom && (this.properties.photosIndicator === true || this.properties.photosIndicator === this.currentContext))
                            utils.select(this.sliderElement.querySelector(`[data-vinze-photo-indicator]`)).addClass("hidden");
                        else if (!this.state.zoom && (this.properties.photosIndicator === true || this.properties.photosIndicator === this.currentContext))
                            utils.select(this.sliderElement.querySelector(`[data-vinze-photo-indicator]`)).removeClass("hidden");
                        // Photos indicator.
                        this.sliderElement.querySelector("[data-vinze-photo-indicator]").innerHTML = `${this.currentPhotoIndex + 1} of ${this.photos().get().photo().length}`;
                        // Change the transitions of all photos without that currently changing.
                        this.photos().get().photo().forEach((photo) => photo.style.transitionDuration = "0ms");
                        this.photos().get().photoImg().forEach((img) => img.style.transitionDuration = "0ms");
                        this.photos().get().photo(_previousIndex)[0].style.transitionDuration = this.properties.photosTransitionDuration + "ms";
                        this.photos().get().photo(this.currentPhotoIndex)[0].style.transitionDuration = this.properties.photosTransitionDuration + "ms";
                        this.photos().get().photoImg(_previousIndex)[0].style.transitionDuration = this.properties.photosTransitionDuration + "ms";
                        this.photos().get().photoImg(this.currentPhotoIndex)[0].style.transitionDuration = this.properties.photosTransitionDuration + "ms";
                        // Update position classes.
                        this.photos().updatePositionClasses(_previousIndex);
                        // Load photos.
                        this.photos().load();
                        utils.timeout("set", "vinze-gallery-slider-change", this.properties.photosTransitionDuration, () => {
                            // Set the changing state to false after change.
                            this.state.changing = false;
                            // Set the default photos transition duration.
                            this.photos().get().photo().forEach((photo) => photo.style.transitionDuration = this.properties.photosTransitionDuration + "ms");
                            this.photos().get().photoImg().forEach((img) => img.style.transitionDuration = this.properties.photosTransitionDuration + "ms");
                        });
                    };
                    return {
                        backward: () => {
                            if (this.state.changing || this.state.draggingX || this.state.draggingY)
                                return;
                            // Change index of the current image.
                            this.currentPhotoIndex =
                                this.properties.loop
                                    ? this.currentPhotoIndex - 1 < 0
                                        ? this.photos().get().lastPhotoIndex
                                        : this.currentPhotoIndex - 1
                                    : this.currentPhotoIndex - 1 < 0
                                        ? this.currentPhotoIndex
                                        : this.currentPhotoIndex - 1;
                            // Navigation buttons diable classes.
                            if (!this.properties.loop && this.currentPhotoIndex === 0)
                                this.sliderElement.querySelector("button.backward").classList.add("disable");
                            else {
                                this.sliderElement.querySelector("button.backward").classList.remove("disable");
                                this.sliderElement.querySelector("button.forward").classList.remove("disable");
                            }
                            _change();
                        },
                        forward: () => {
                            if (this.state.changing || this.state.draggingX || this.state.draggingY)
                                return;
                            // Change index of the current image.
                            this.currentPhotoIndex =
                                this.properties.loop
                                    ? this.currentPhotoIndex + 1 > this.photos().get().lastPhotoIndex
                                        ? 0
                                        : this.currentPhotoIndex + 1
                                    : this.currentPhotoIndex + 1 > this.photos().get().lastPhotoIndex
                                        ? this.currentPhotoIndex
                                        : this.currentPhotoIndex + 1;
                            // Navigation buttons diable classes.
                            if (!this.properties.loop && this.currentPhotoIndex === this.photos().get().lastPhotoIndex)
                                this.sliderElement.querySelector("button.forward").classList.add("disable");
                            else {
                                this.sliderElement.querySelector("button.forward").classList.remove("disable");
                                this.sliderElement.querySelector("button.backward").classList.remove("disable");
                            }
                            _change();
                        },
                    };
                },
                move: () => {
                    return {
                        start: (clickEvent, moveEvent) => {
                            // Add the dragging class.
                            this.photos().get().photo().forEach((photo) => {
                                photo.classList.add("dragging");
                            });
                            moveEvent = moveEvent || window.event;
                            let currentMousePosition = {
                                x: moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX,
                                y: moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY,
                            }, startPointX = clickEvent.clientX || clickEvent.touches[0].clientX, startPointY = clickEvent.clientY || clickEvent.touches[0].clientY, newTranslateX = currentMousePosition.x - startPointX, newTranslateY = currentMousePosition.y - startPointY;
                            // Double fingers.
                            if (moveEvent.touches && moveEvent.touches[1]) {
                                let startPointX_2 = moveEvent.touches[1].clientX, startPointY_2 = moveEvent.touches[1].clientY, distance = Math.sqrt(Math.pow(startPointX_2 - startPointX, 2) + Math.pow(startPointY_2 - startPointY, 2));
                                // TODO
                                distance = Math.round(distance) / 10;
                                this.properties.zoomSpeed = Math.pow(distance, 2) / 10000;
                                if (distance > this.state.previousDoubleTouchDistance)
                                    this.actions().zoom().in();
                                else if (distance < this.state.previousDoubleTouchDistance)
                                    this.actions().zoom().out();
                                // Set the previous distance.
                                if (distance !== this.state.previousDoubleTouchDistance)
                                    this.state.previousDoubleTouchDistance = distance;
                            }
                            else {
                                // X axis.
                                if (!this.state.draggingY && !this.state.zoom) {
                                    if (Math.abs(newTranslateX) > this.properties.draggingXBreakpoint)
                                        this.state.draggingX = true;
                                    this.photos().setTransform(this.currentPhotoIndex, {
                                        translateX: newTranslateX,
                                        translateY: 0,
                                        scale: undefined,
                                    });
                                }
                                let insideWindowLeft = this.photos().insideWindow(this.currentPhotoIndex, "left").isInside, insideWindowRight = this.photos().insideWindow(this.currentPhotoIndex, "right").isInside;
                                if ((!this.state.zoom && !this.state.draggingY) || this.state.zoom) {
                                    if (newTranslateX <= 0 && insideWindowRight) {
                                        if (this.state.startInsideRight < 10)
                                            this.photos().setTransform(this.photos().get().nextPhotoIndex, {
                                                translateX: this.properties.photosGap + newTranslateX,
                                                translateY: 0,
                                                scale: 1,
                                            });
                                    }
                                    else if (newTranslateX > 0 && insideWindowLeft) {
                                        if (this.state.startInsideLeft > -10)
                                            this.photos().setTransform(this.photos().get().previousPhotoIndex, {
                                                translateX: this.properties.photosGap * -1 + newTranslateX,
                                                translateY: 0,
                                                scale: 1,
                                            });
                                    }
                                }
                                if (!this.state.zoom) {
                                    if (((Math.abs(newTranslateX) <= this.properties.draggingXBreakpoint && Math.abs(newTranslateY) >= this.properties.draggingYBreakpoint) ||
                                        this.state.draggingY === true) &&
                                        (this.properties.closeViaDrag === true || this.properties.closeViaDrag === this.currentContext) &&
                                        this.state.draggingX === false) {
                                        // Change the dragging Y state.
                                        this.state.draggingY = true;
                                        if ((newTranslateY <= 0 && this.state.startDirectionDraggingY !== "bottom") ||
                                            (newTranslateY > 0 && this.state.startDirectionDraggingY === "top")) {
                                            newTranslateY += this.properties.draggingYBreakpoint;
                                            this.state.startDirectionDraggingY = "top";
                                        }
                                        else if ((newTranslateY > 0 && this.state.startDirectionDraggingY !== "top") ||
                                            (newTranslateY <= 0 && this.state.startDirectionDraggingY === "bottom")) {
                                            newTranslateY -= this.properties.draggingYBreakpoint;
                                            this.state.startDirectionDraggingY = "bottom";
                                        }
                                        // Calculate the opacity.
                                        let absNewTranslateY = Math.abs(newTranslateY);
                                        let closeVal = Math.round((1 - parseFloat("0." +
                                            ((absNewTranslateY / 10) < 10
                                                ? "0" + (absNewTranslateY / 10).toString().replace(".", "")
                                                : (absNewTranslateY / 10).toString().replace(".", "")))) * 10000) / 10000;
                                        // Set the opacity + remove blur.
                                        utils.select(this.sliderElement)
                                            .removeClass("blur")
                                            .elements[0].style.opacity = closeVal;
                                        // Set the new transform.
                                        this.photos().setTransform(this.currentPhotoIndex, {
                                            translateX: newTranslateX,
                                            translateY: newTranslateY,
                                            scale: closeVal >= 0.5 ? closeVal : 0.5,
                                        });
                                    }
                                }
                                else {
                                    utils.timeout("clear", "vinze-gallery-slider-zoom-position");
                                    this.state.draggingX = true;
                                    this.state.draggingY = true;
                                    this.photos().setTransform(this.currentPhotoIndex, {
                                        translateX: newTranslateX / this.state.scale + this.state.previousTranslateX,
                                        translateY: newTranslateY / this.state.scale + this.state.previousTranslateY,
                                        scale: undefined,
                                    });
                                }
                            }
                        },
                        stop: () => {
                            let _previousStateDraggingY = this.state.draggingY;
                            let _previousStateDraggingX = this.state.draggingX;
                            // Update dragging states.
                            this.state.draggingX = false;
                            this.state.draggingY = false;
                            // Remove the dragging class.
                            this.photos().get().photo().forEach((photo) => {
                                photo.classList.remove("dragging");
                            });
                            this.state.startDirectionDraggingY = null;
                            let breakpoint = utils.select(window).width() / 5 <= 150 ? utils.select(window).width() / 5 : 150;
                            if (!this.state.zoom) {
                                if (!_previousStateDraggingY) {
                                    this.state.previousTranslateX = this.state.translateX;
                                    // Change to previous photo.
                                    if (this.state.translateX > breakpoint) {
                                        this.actions().change().backward();
                                        // Change to next photo.
                                    }
                                    else if (this.state.translateX < -breakpoint) {
                                        this.actions().change().forward();
                                    }
                                    this.photos().setDefaultTransforms();
                                }
                                else {
                                    if (this.state.translateY > breakpoint || this.state.translateY < -breakpoint) {
                                        // Set opacity to 0.
                                        utils.select(this.sliderElement).elements[0].style.opacity = 0;
                                        this.photos().setTransform(this.currentPhotoIndex, {
                                            translateX: undefined,
                                            translateY: undefined,
                                            scale: 0.5,
                                        });
                                        // Close the slider.
                                        this.close();
                                    }
                                    else {
                                        this.state.previousTranslateY = this.state.translateY;
                                        // Set default opacity + add blur.
                                        utils.select(this.sliderElement)
                                            .addClass("blur")
                                            .elements[0].style.opacity = 1;
                                        // Set default transforms.
                                        this.photos().setDefaultTransforms();
                                    }
                                }
                            }
                            else {
                                this.photos().fixPosition();
                                let insideWindowRight = this.photos().insideWindow(this.currentPhotoIndex, "right").isInside, insideWindowLeft = this.photos().insideWindow(this.currentPhotoIndex, "left").isInside;
                                if (!this.state.changing)
                                    if (insideWindowRight) {
                                        this.photos().setTransform(this.photos().get().nextPhotoIndex, {
                                            translateX: this.properties.photosGap,
                                            translateY: 0,
                                            scale: 1,
                                        });
                                    }
                                    else if (insideWindowLeft) {
                                        this.photos().setTransform(this.photos().get().previousPhotoIndex, {
                                            translateX: this.properties.photosGap,
                                            translateY: 0,
                                            scale: 1,
                                        });
                                    }
                            }
                        },
                    };
                },
                touch: () => {
                    return {
                        start: (clickEvent) => {
                            this.state.startInsideTop = this.photos().insideWindow(this.currentPhotoIndex, "top").value;
                            this.state.startInsideRight = this.photos().insideWindow(this.currentPhotoIndex, "right").value;
                            this.state.startInsideBottom = this.photos().insideWindow(this.currentPhotoIndex, "bottom").value;
                            this.state.startInsideLeft = this.photos().insideWindow(this.currentPhotoIndex, "left").value;
                            // Update previous translate.
                            this.state.previousTranslateX = this.state.translateX;
                            this.state.previousTranslateY = this.state.translateY;
                            // The touching state to true.
                            this.state.touching = true;
                            // Off the transition for the slider.
                            this.sliderElement.style.transitionDuration = "0ms";
                            // Add the touching class to the current photo.
                            this.photos().get().photo(this.currentPhotoIndex)[0].classList.add("touching");
                            // Add the move event.
                            utils.select(window).on("touchmove mousemove", (moveEvent) => {
                                // Start moving.
                                this.actions().move().start(clickEvent, moveEvent);
                            }, null, "vinze-gallery-slider-moving");
                            // Disable navigation buttons.
                            this.sliderElement.querySelectorAll(`button.backward, button.forward`).forEach((button) => {
                                button.style.pointerEvents = "none";
                            });
                        },
                        stop: () => {
                            // The touching state to false.
                            this.state.touching = false;
                            // Set the default transition for the slider.
                            this.sliderElement.style.transitionDuration = this.properties.transitionDuration + "ms";
                            // Remove the touching class from the current photo.
                            this.photos().get().photo(this.currentPhotoIndex)[0].classList.remove("touching");
                            // Stop moving.
                            this.actions().move().stop();
                            // Remove the move event.
                            utils.select(window).off(null, null, null, "vinze-gallery-slider-moving");
                            // Enable navigation buttons.
                            this.sliderElement.querySelectorAll(`button.backward, button.forward`).forEach((button) => {
                                button.style.pointerEvents = "all";
                            });
                        }
                    };
                },
                zoom: () => {
                    // Set the transition duration for zooming.
                    this.photos().get().photoImg(this.currentPhotoIndex)[0].style.transitionDuration = this.properties.zoomTransitionDuration + "ms";
                    // Set the transition timing function.
                    if (this.state.zoom) {
                        this.photos().get().photoImg(this.currentPhotoIndex)[0].style.transitionTimingFunction = utils.easings.ease;
                    }
                    else {
                        if (utils.easings[this.properties.photosEasing] !== undefined)
                            this.photos().get().photoImg(this.currentPhotoIndex)[0].style.transitionTimingFunction = utils.easings[this.properties.photosEasing];
                        else
                            this.photos().get().photoImg(this.currentPhotoIndex)[0].style.transitionTimingFunction = utils.easings.ease;
                    }
                    utils.timeout("clear", "vinze-gallery-slider-zoom");
                    utils.timeout("set", "vinze-gallery-slider-zoom", this.properties.zoomTransitionDuration, () => {
                        // Set the default transition duration.
                        this.photos().get().photoImg(this.currentPhotoIndex)[0].style.transitionDuration = this.properties.photosTransitionDuration + "ms";
                        // Set the default transition timing function.
                        this.photos().get().photoImg(this.currentPhotoIndex)[0].style.transitionTimingFunction = utils.easings[this.properties.photosEasing];
                    });
                    return {
                        in: () => {
                            this.state.zoom = true;
                            if (this.state.scale + this.properties.zoomSpeed < this.photos().getMinimumZoomScale()) {
                                this.photos().setTransform(this.currentPhotoIndex, {
                                    translateX: undefined,
                                    translateY: undefined,
                                    scale: this.photos().getMinimumZoomScale(),
                                });
                            }
                            else {
                                if (this.state.scale + this.properties.zoomSpeed < this.properties.zoomMaxScale * this.photos().getMinimumZoomScale())
                                    this.photos().setTransform(this.currentPhotoIndex, {
                                        translateX: undefined,
                                        translateY: undefined,
                                        scale: this.state.scale + this.properties.zoomSpeed,
                                    });
                                else
                                    this.photos().setTransform(this.currentPhotoIndex, {
                                        translateX: undefined,
                                        translateY: undefined,
                                        scale: this.properties.zoomMaxScale * this.photos().getMinimumZoomScale(),
                                    });
                            }
                            if (this.properties.photosIndicator === true || this.properties.photosIndicator === this.currentContext)
                                utils.select(this.sliderElement.querySelector(`[data-vinze-photo-indicator]`)).addClass("hidden");
                        },
                        out: (once = false) => {
                            if (this.state.scale > 1) {
                                this.photos().setTransform(this.currentPhotoIndex, {
                                    translateX: undefined,
                                    translateY: undefined,
                                    scale: !once ? this.state.scale - this.properties.zoomSpeed : 1,
                                });
                            }
                            else {
                                this.photos().setTransform(this.currentPhotoIndex, {
                                    translateX: undefined,
                                    translateY: undefined,
                                    scale: 1,
                                });
                            }
                            if (this.state.scale <= this.photos().getMinimumZoomScale()) {
                                utils.timeout("clear", "vinze-gallery-slider-zoom-position");
                                this.state.previousTranslateX = 0;
                                this.state.previousTranslateY = 0;
                                this.photos().setDefaultTransforms();
                            }
                            if (this.state.scale < this.photos().getMinimumZoomScale()) {
                                this.state.zoom = false;
                                this.photos().setDefaultTransforms();
                            }
                            else if (this.state.scale === this.photos().getMinimumZoomScale()) {
                                this.state.zoom = true;
                            }
                            else {
                                this.state.zoom = true;
                                utils.timeout("clear", "vinze-gallery-slider-zoom-position");
                                utils.timeout("set", "vinze-gallery-slider-zoom-position", this.properties.zoomTransitionDuration * 1.2, () => {
                                    this.photos().fixPosition();
                                });
                            }
                            // Photos indicator.
                            if (!this.state.zoom && (this.properties.photosIndicator === true || this.properties.photosIndicator === this.currentContext))
                                utils.select(this.sliderElement.querySelector(`[data-vinze-photo-indicator]`)).removeClass("hidden");
                        },
                    };
                },
            };
        }
    }

    const VG = (function () {
        class VG {
            constructor(name = null, properties = {}) {
                this.name = name;
                this.properties = utils.objectAssign(Object.create({}), JSON.parse(JSON.stringify(initialProperties)), properties);
            }
            init() {
                let gallery;
                // Specific gallery.
                if (this.name) {
                    let element = document.querySelectorAll(`[data-vinze-gallery` + (this.name ? `="${this.name}"]` : "]"));
                    if (element.length === 0)
                        return;
                    // Return if gallery has been already loaded.
                    if (element[0].getAttribute("data-vinze-gallery-loaded") === "true")
                        return;
                    gallery = new VGGallery(element[0], this.properties);
                    // All galleries found by data attribute name.
                }
                else {
                    document.querySelectorAll("[data-vinze-gallery]").forEach((element) => {
                        let htmlElement = element;
                        if (htmlElement.getAttribute("data-vinze-gallery-loaded") === "true")
                            return;
                        gallery = new VGGallery(htmlElement, this.properties);
                    });
                }
            }
        }
  
      return VG;
    })();
  
    return VG;
  });
  