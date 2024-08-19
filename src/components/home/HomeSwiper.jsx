'use client'
import React, { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import Image from "next/image"
import { Button } from "@mui/material"
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md"
import "keen-slider/keen-slider.min.css"
import "@/styles/Home/HomeSwiper.css"


const defaultSources = [
    '/img/home-main/firstImage.jpg',
    '/img/home-main/secondImage.jpg',
    '/img/home-main/thirdImage.jpg',
];

function Arrow(props) {
    const disabled = !!props.disabled
    return (
        <Button
            sx={{ zIndex: 1000 }}
            onClick={props.onClick}
            className={`arrow ${props.left ? "arrow--left" : "arrow--right"} ${disabled}`}
            disabled={disabled}
        >
            {!!props.left && (
                <MdOutlineKeyboardArrowLeft className={`text-6xl ${disabled ? 'arrow--disabled' : 'text-blue-500'}`} />
            )}
            {!!props.right && (
                <MdOutlineKeyboardArrowRight className={`text-6xl ${disabled ? 'arrow--disabled' : 'text-blue-500'}`} />
            )}
        </Button>
    )
}


export default function HomeSwiper({ sources }) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [sliderRef, instanceRef] = useKeenSlider(
        {
            initial: 0,
            slideChanged(slider) {
                setCurrentSlide(slider.track.details.rel)
            },
            created() {
                setLoaded(true)
            },
            loop: true,
        },
        [
            (slider) => {
                let timeout
                let mouseOver = false
                function clearNextTimeout() {
                    clearTimeout(timeout)
                }
                function nextTimeout() {
                    clearTimeout(timeout)
                    if (mouseOver) return
                    timeout = setTimeout(() => {
                        slider.next()
                    }, 2000)
                }
                slider.on("created", () => {
                    slider.container.addEventListener("mouseover", () => {
                        mouseOver = true
                        clearNextTimeout()
                    })
                    slider.container.addEventListener("mouseout", () => {
                        mouseOver = false
                        nextTimeout()
                    })
                    nextTimeout()
                })
                slider.on("dragStarted", clearNextTimeout)
                slider.on("animationEnded", nextTimeout)
                slider.on("updated", nextTimeout)
            },
        ]
    )

    const items = sources || defaultSources

    return (
        <>
            <div className="navigation-wrapper">
                {loaded && instanceRef.current && (
                    <Arrow
                        right={true}
                        onClick={(e) =>
                            e.stopPropagation() || instanceRef.current?.next()
                        }
                        disabled={
                            currentSlide ===
                            instanceRef.current.track.details.slides.length - 1
                        }
                    />
                )}
                <div ref={sliderRef} className="keen-slider">
                    {
                        items.map((item, i) => (
                            <div className="keen-slider__slide" key={i}>
                                <Image
                                    src={item}
                                    blurDataURL={'img/wait.png'}
                                    placeholder='blur'
                                    width={2500}
                                    height={1400}
                                    alt="Picture of the university"
                                />
                            </div>
                        ))
                    }
                </div>
                {loaded && instanceRef.current && (
                    <Arrow
                        left={true}
                        onClick={(e) =>
                            e.stopPropagation() || instanceRef.current?.prev()
                        }
                        disabled={currentSlide === 0}
                    />
                )}
            </div>
            {loaded && instanceRef.current && (
                <div className="dots" dir="ltr">
                    {[
                        ...Array(instanceRef.current.track.details.slides.length).keys(),
                    ].map((idx) => {
                        return (
                            <button
                                key={idx}
                                onClick={() => {
                                    instanceRef.current?.moveToIdx(idx)
                                }}
                                className={"dot" + (currentSlide === idx ? " active" : "")}
                            ></button>
                        )
                    })}
                </div>
            )}
        </>
    )
}