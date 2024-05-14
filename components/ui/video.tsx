import React from "react";
import {cn} from "@/lib/utils";

interface VideoProps {
    src: string
    type?: string
    size?: { width?: number, height?: number }
    autoPlay?: boolean
    loop?: boolean
    muted?: boolean
    controls?: boolean
    className?: string
}

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(({
                                                                  src,
                                                                  type,
                                                                  size,
                                                                  autoPlay,
                                                                  muted,
                                                                  loop,
                                                                  controls, className
                                                              }, ref) => {

    const video = React.useRef<HTMLVideoElement>(null)

    React.useImperativeHandle(ref, () => video.current as HTMLVideoElement)

    React.useEffect(() => {
        if (!autoPlay) return
        if (video.current && video.current.readyState >= 2 && video.current.paused) {
            window.addEventListener("mousemove", () => {
                video.current?.play()
                window?.removeEventListener("mousemove", () => { })
            })
        }
    }, [autoPlay])


    return (
        <div
            className={cn("relative bg-black rounded-md flex items-center justify-center", className)}
            style={{ maxWidth: size?.width, maxHeight: size?.height, overflow: "hidden" }}
        >
            <video
                ref={video}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                className="object-cover"
                controls={controls}
            >
                <source src={src} type={type} />
            </video>

        </div>
    )
});

Video.displayName = "Video"



export { Video }
