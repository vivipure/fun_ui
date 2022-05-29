<template>
    <div ref="videoContainerRef" :class="containerCls">
        <div class="video-control-container">
            <div class="time-line-container" @mousemove="timeMouseChangeHandle" @mouseover="timeMouseChangeHandle"
                @mouseout="timelineMouseOutHandle" @mousedown="timelineMouseDownHandle">
                <div class="time-line" :style="`--percent:${playPercent}%;--moveover: ${mouseMoveOffset}%;`"></div>
                <div class="time-circle" @mousedown.stop="circleMousedown" :style="timeLineCircleStyle"></div>
            </div>
            <div class="controls">
                <div class="left">
                    <!-- play -->
                    <div @click="toggleVideoPlay">
                        <svg v-if="videoPlayStatus" class="pause-icon icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M14,19H18V5H14M6,19H10V5H6V19Z" />
                        </svg>
                        <svg v-else class="play-icon icon" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M8,5.14V19.14L19,12.14L8,5.14Z" />
                        </svg>
                    </div>

                    <div class="volume-container" @click="toggleVideoVolumne">
                        <svg v-if="videoVolume > 0.5" class="volume-high-icon icon" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                        </svg>
                        <svg v-else-if="videoVolume == 0" class="volume-muted-icon icon" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M12,4L9.91,6.09L12,8.18M4.27,3L3,4.27L7.73,9H3V15H7L12,20V13.27L16.25,17.53C15.58,18.04 14.83,18.46 14,18.7V20.77C15.38,20.45 16.63,19.82 17.68,18.96L19.73,21L21,19.73L12,10.73M19,12C19,12.94 18.8,13.82 18.46,14.64L19.97,16.15C20.62,14.91 21,13.5 21,12C21,7.72 18,4.14 14,3.23V5.29C16.89,6.15 19,8.83 19,12M16.5,12C16.5,10.23 15.5,8.71 14,7.97V10.18L16.45,12.63C16.5,12.43 16.5,12.21 16.5,12Z" />
                        </svg>
                        <svg v-else class="volume-low-icon icon" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M5,9V15H9L14,20V4L9,9M18.5,12C18.5,10.23 17.5,8.71 16,7.97V16C17.5,15.29 18.5,13.76 18.5,12Z" />
                        </svg>
                        <input class="volume-slider" :style="`--percent:${videoVolume * 100}%;`"
                            :data-percent="videoVolume" @click.stop v-model="videoVolume" type="range" min="0" max="1"
                            step="0.1" />
                    </div>
                </div>

                <div class="control-right">
                    <div style="transform: scale(0.95);" @click="togglePictureInPicture">
                        <svg class="icon" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zm-10-7h9v6h-9z" />
                        </svg>
                    </div>

                    <div @click="toggleTheaterMode">
                        <svg v-if="viewmode === ViewMode.theater" class="wide icon" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z" />
                        </svg>
                        <svg v-else class="tall icon" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z" />
                        </svg>
                    </div>

                    <div @click="toggleFullscreenMode">
                        <svg v-if="viewmode !== ViewMode.fullscreen" class="open icon" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                        </svg>
                        <svg v-else class="close icon" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <video @timeupdate="playPercentChange" @click="toggleVideoPlay" @playing="setPlayStatus(true)"
            @pause="setPlayStatus(false)" @ended="setPlayStatus(false)" ref="videoRef" :src="props.src"></video>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, } from "vue";
import { useTimeLine, useVolumne, usePlay, } from "./hooks";

defineOptions({
    name: "FunVideo",
});

interface PropsInterface {
    src: string
}
const props = withDefaults(defineProps<PropsInterface>(), {
    src: 'https://www.runoob.com/try/demo_source/movie.mp4'
})

enum ViewMode {
    theater = "theater",
    fullscreen = "fullscreen",
    normal = "normal",
    pictureInPicture = "pictureInPicture",
}
const videoContainerRef = ref<Element>();
const videoRef = ref<HTMLVideoElement>();
const viewmode = ref<ViewMode>(ViewMode.normal);

const { videoVolume, toggleVideoVolumne } = useVolumne(videoRef);
const { mouseMoveOffset, playPercent, timeMouseChangeHandle, timelineMouseOutHandle, timelineMouseDownHandle, setPlayPercent, playPercentChange } = useTimeLine(videoRef)
const { videoPlayStatus, setPlayStatus, toggleVideoPlay } = usePlay(videoRef)


const containerCls = computed(() => {
    return ["fun-video", viewmode.value, videoPlayStatus.value ? 'play' : 'pause'];
});
const timeLineCircleStyle = computed(() => {
    return {
        left: playPercent.value + '%',
    }
})

const circleMousedown = (e: MouseEvent) => {
    const { pageX } = e
    const dom = e.target as HTMLDivElement
    const offsetLeft = dom.offsetLeft
    const parentWidth = (dom.parentElement as HTMLDivElement).clientWidth

    const moveFn = (e: MouseEvent) => {
        const { pageX: currentX, } = e
        const gapX = currentX - pageX

        let totalOffset = (offsetLeft + gapX)

        const maxOffset = parentWidth - dom.clientWidth / 2
        const minOffSet = - dom.clientWidth / 2

        if (totalOffset >= maxOffset) {
            totalOffset = maxOffset
        } else if (totalOffset <= minOffSet) {
            totalOffset = minOffSet
        }
        console.log(offsetLeft + gapX, maxOffset)

        playPercent.value = totalOffset / parentWidth * 100

    }
    const cancelFn = () => {
        setPlayPercent(playPercent.value / 100)
        document.removeEventListener('mousemove', moveFn)
        document.removeEventListener('mouseup', cancelFn)
    }

    document.addEventListener('mousemove', moveFn)
    document.addEventListener('mouseup', cancelFn)
}
const togglePictureInPicture = () => {
    if (viewmode.value === ViewMode.pictureInPicture) {
        document.exitPictureInPicture();
        viewmode.value = ViewMode.normal;
    } else {
        videoRef.value?.requestPictureInPicture();
        viewmode.value = ViewMode.pictureInPicture;
    }
};
const toggleFullscreenMode = () => {
    if (document.fullscreenElement == null) {
        videoContainerRef.value?.requestFullscreen();
        viewmode.value = ViewMode.fullscreen;
    } else {
        document.exitFullscreen();
        viewmode.value = ViewMode.normal;
    }
};
const toggleTheaterMode = () => {
    viewmode.value =
        viewmode.value != ViewMode.theater ? ViewMode.theater : ViewMode.normal;
};
const fullscreenchangehandle = () => {
    if (document.fullscreenElement == null) {
        viewmode.value = ViewMode.normal;
    }
}
onMounted(() => {
    document.addEventListener("fullscreenchange", fullscreenchangehandle);
});
onBeforeUnmount(() => {
    document.removeEventListener("fullscreenchange", fullscreenchangehandle)
})
</script>

<style lang="scss" >
.fun-video {
    width: 90%;
    background: #000;
    max-width: 1200px;
    position: relative;

    &.pause {
        video-control-container {
            display: block;
        }
    }

    video {
        width: 100%;
    }

    &:hover {
        .video-control-container {
            display: block;
        }
    }

    .video-control-container {
        display: none;
        display: block;
        background: #11111154;

        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        z-index: 100;
    }

    &.theater {
        max-width: initial;
        width: 100%;
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;

        video {
            height: 100%;
            width: auto;
        }
    }

    &.fullscreen {
        width: 100vw;
        height: 100vh;
    }
}

.time-line-container {
    height: 10px;
    display: flex;
    align-items: center;

    .time-line {
        width: 100%;
        background: rgba(255, 255, 255, 0.2);
        cursor: pointer;
        height: 5px;
        position: relative;

        &::before {
            content: "";
            width: var(--percent);
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: red;
            z-index: 2;
        }

        &::after {
            content: "";
            width: var(--moveover);
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;

            background: #fff;
        }
    }

    .time-circle {
        position: absolute;
        width: 1em;
        height: 1em;
        z-index: 1;
        border-radius: 50%;
        background: #fff;
    }
}

.controls {
    color: #fff;
    display: flex;
    justify-content: space-between;

    .left {
        display: flex;
        align-items: center;
        flex: 1;
    }

    .control-right {
        flex-shrink: 0;
        display: flex;
    }
}

.icon {
    width: 48px;
    padding: 0 2px;
}

.volume-container {
    display: flex;
    align-items: center;

    .volume-slider {
        // display: none;
        cursor: pointer;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: var(--percent);
            height: 100%;
            border-radius: inherit;
            background: #fff;
            border-radius: 10px;
        }
    }

    /********** Range Input Styles **********/
    /*Range Reset*/
    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: pointer;
        width: 120px;
    }

    /* Removes default focus */
    input[type="range"]:focus {
        outline: none;
    }

    /***** Chrome, Safari, Opera and Edge Chromium styles *****/
    /* slider track */
    input[type="range"]::-webkit-slider-runnable-track {
        background-color: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        height: 10px;
    }

    /* slider thumb */
    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        /* Override default look */
        appearance: none;
        margin-top: -5px;
        /* Centers thumb on the track */
        /*custom styles*/
        background-color: #fff;
        height: 20px;
        width: 20px;
        border-radius: 50%;
    }

    /******** Firefox styles ********/
    /* slider track */
    input[type="range"]::-moz-range-track {
        background-color: #fff;
        border-radius: 0.5rem;
        height: 0.5rem;
    }

    &:hover .volume-slider {
        // display: block;
    }
}
</style>
