import React from "react";
import {cn} from "@/lib/utils";

interface AudioProps {
    src: string
    type?: string
    size?: { width?: number, height?: number }
    autoPlay?: boolean
    loop?: boolean
    muted?: boolean
    controls?: boolean
    id?: string
    className?: string
}

const Audio = React.forwardRef<HTMLAudioElement, AudioProps>(({
                                                                  src,
                                                                  type,
                                                                  size,
                                                                  autoPlay,
                                                                  muted,
                                                                  loop,
                                                                  controls, className,id
                                                              }, ref) => {

    const audio = React.useRef<HTMLAudioElement>(null)

    React.useImperativeHandle(ref, () => audio.current as HTMLAudioElement)

    React.useEffect(() => {
        if (!autoPlay) return
        if (audio.current && audio.current.readyState >= 2 && audio.current.paused) {
            window.addEventListener("mousemove", () => {
                audio.current?.play()
                window?.removeEventListener("mousemove", () => { })
            })
        }
    }, [autoPlay])


    return (
        <div
            className={cn("relative bg-black rounded-md flex items-center justify-center", className)}
            style={{ maxWidth: size?.width, maxHeight: size?.height, overflow: "hidden" }}
        >
            <audio
                ref={audio}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                className="object-cover"
                controls={controls}
                id={id}
            >
                <source src={src} type={type} />
            </audio>

        </div>
    )
});

Audio.displayName = "Audio"



export { Audio }
