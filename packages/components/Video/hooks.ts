import { Ref, ref, watch } from "vue";

export function useVolumne(videoRef: Ref<HTMLVideoElement | undefined>) {
  const videoVolume = ref<number>(0.8);
  let cache = 0.5;

  watch(videoVolume, (cur) => {
    (<HTMLVideoElement>videoRef.value).volume = cur;
  });


  const toggleVideoVolumne = () => {
    if (videoVolume.value === 0) {
      videoVolume.value = cache;
    } else {
      cache = videoVolume.value;
      videoVolume.value = 0;
    }
  };

  return {
    videoVolume,
    toggleVideoVolumne,
  };
}

export function useTimeLine(videoRef: Ref<HTMLVideoElement | undefined>) {
  const mouseMoveOffset = ref<number>(0);
  const playPercent = ref<number>(0);

  const timeMouseChangeHandle = (e: MouseEvent) => {
    mouseMoveOffset.value =
      (e.offsetX / (e.target as Element).clientWidth) * 100;
  };

  const timelineMouseOutHandle = (e: MouseEvent) => {
    mouseMoveOffset.value = 0;
  };

  const setPlayPercent = (proportion: number) => {
    console.log(proportion);
    const video = videoRef.value as HTMLVideoElement;
    (videoRef.value as HTMLVideoElement).currentTime = video.duration * proportion;
  };
  const playPercentChange = () => {
    playPercent.value =
      ((videoRef.value as HTMLVideoElement).currentTime /
        (videoRef.value as HTMLVideoElement).duration) *
      100;
  };

  const timelineMouseDownHandle = (e: MouseEvent) => {
    const proportion = e.offsetX / (e.target as Element).clientWidth;
    playPercent.value = proportion * 100;
    setPlayPercent(proportion);
  };

  return {
    mouseMoveOffset,
    playPercent,
    setPlayPercent,
    timeMouseChangeHandle,
    timelineMouseOutHandle,
    timelineMouseDownHandle,
    playPercentChange,
  };
}

export function usePlay(videoRef: Ref<HTMLVideoElement | undefined>) {
  const videoPlayStatus = ref<boolean>(false);

  const toggleVideoPlay = () => {
    if (videoPlayStatus.value) {
      videoPlayStatus.value = false;
      videoRef.value?.pause();
    } else {
      videoPlayStatus.value = true;
      videoRef.value?.play();
    }
  };

  const setPlayStatus = (value: boolean) => {
    videoPlayStatus.value = value;
  };

  return {
    videoPlayStatus,
    setPlayStatus,
    toggleVideoPlay,
  };
}
