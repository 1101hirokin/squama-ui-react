import "swiper/css";
import "swiper/css/pagination";

import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import { squamaComponentClass, SquamaComponentProps } from "../../api";
import { buildClassName, Modify } from "../../utils";

import styles from "./Slider.module.css";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { IconButton } from "../IconButton/IconButton";
import { useSquamaContext } from "../SquamaContext/SquamaContext";
import { Autoplay } from "swiper/modules";

type SliderController = {
    slideNext: () => void;
    slidePrev: () => void;
    slideTo: (index: number) => void;
    getSlideCount: () => number;
    getCurrentIndex: () => number;
};

export type SliderRef = {
    controller: SliderController;
};

type SliderPaginationProps = Modify<
    SquamaComponentProps,
    {
        isActive: boolean;
        onClick?: React.MouseEventHandler;
        color?: string;
        inactiveColor?: string;
    }
>;

export const SliderPagination = (p: SliderPaginationProps) => {
    const {
        isActive,
        onClick,
        color = "#000",
        inactiveColor = "var(--s-app--color--gray-200)",
        ...rest
    } = p;

    const cssVars = {
        "--s-slider-pagination--color": color,
        "--s-slider-pagination--color--inactive": inactiveColor,
    } as React.CSSProperties;

    return (
        <button
            {...rest}
            className={buildClassName(
                styles.SliderPagination,
                squamaComponentClass,
                !isActive && styles.inactive,
            )}
            style={{
                ...rest.style,
                ...cssVars,
            }}
            onClick={onClick}
        />
    );
};

type SliderProps = Modify<
    {
        id?: string;
        className?: string;
        style?: React.CSSProperties;
    },
    {
        initialIndex?: number;
        children: React.ReactNode;

        onSlide?: (currentIndex: number, prevIndex: number) => void;
        gap?: number;
        slidesPerView?: number;
        loop?: boolean;
        autoplay?: boolean | { delay: number };
        showPagingButton?: boolean;
        pagingButtonColor?: string;
        showPaginations?:
            | boolean
            | "bottom.center"
            | "bottom.right"
            | "bottom.left";
        paginationColor?: string;
        paginationInactiveColor?: string;
    }
>;

export const Slider = forwardRef<SliderRef, SliderProps>((p, ref) => {
    const {
        initialIndex,
        children,

        onSlide,
        gap = 0,
        slidesPerView = 1,
        loop = false,
        autoplay,
        showPagingButton = true,
        pagingButtonColor = "#000",
        showPaginations = "bottom.left",
        paginationColor = "#000",
        paginationInactiveColor = "#ccc",
        ...rest
    } = p;

    const swiperRef = useRef<{
        swiper: SwiperClass;
    }>(null);

    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    const [hasPrev, setHasPrev] = useState(false);
    const [hasNext, setHasNext] = useState(false);

    useEffect(() => {
        if (swiperRef.current) {
            const swiper = swiperRef.current.swiper;
            setHasPrev(!swiper.isBeginning);
            setHasNext(!swiper.isEnd);
        }
    }, [swiperRef.current]);

    useImperativeHandle(ref, () => ({
        controller: {
            slideNext: () => {
                if (swiperRef.current) {
                    const swiper = swiperRef.current.swiper;
                    swiper.slideNext();
                }
            },
            slidePrev: () => {
                if (swiperRef.current) {
                    const swiper = swiperRef.current.swiper;
                    swiper.slidePrev();
                }
            },
            slideTo: (index: number) => {
                if (swiperRef.current) {
                    const swiper = swiperRef.current.swiper;
                    swiper.slideTo(index);
                }
            },
            getSlideCount: () => {
                if (swiperRef.current) {
                    const swiper = swiperRef.current.swiper;
                    return swiper.slides.length;
                }
                return 0;
            },
            getCurrentIndex: () => {
                if (swiperRef.current) {
                    const swiper = swiperRef.current.swiper;
                    return swiper.activeIndex;
                }
                return 0;
            },
        },
    }));

    return (
        <div
            {...rest}
            className={buildClassName(
                styles.SliderContainer,
                squamaComponentClass,
            )}
        >
            <div className={styles.mainLayer}>
                <Swiper
                    {...rest}
                    ref={swiperRef}
                    initialSlide={initialIndex}
                    className={buildClassName(styles.Slider, rest.className)}
                    style={{
                        ...rest.style,
                    }}
                    onSlideChange={(swiper) => {
                        onSlide?.(swiper.activeIndex, swiper.previousIndex);
                        setHasPrev(!swiper.isBeginning);
                        setHasNext(!swiper.isEnd);
                    }}
                    spaceBetween={gap}
                    slidesPerView={slidesPerView}
                    loop={loop}
                    modules={[Autoplay]}
                    autoplay={autoplay}
                >
                    {children}
                </Swiper>
            </div>
            <div className={styles.overlayLayer}>
                {showPagingButton && (
                    <>
                        <div className={styles.prevButtonContainer}>
                            <IconButton
                                icon="chevron.left"
                                variant="text"
                                shape={theme.shape}
                                className={styles.prevButton}
                                color={pagingButtonColor}
                                onClick={() => {
                                    if (swiperRef.current) {
                                        const swiper = swiperRef.current.swiper;
                                        swiper.slidePrev();
                                    }
                                }}
                                disabled={!hasPrev}
                            />
                        </div>

                        <div className={styles.nextButtonContainer}>
                            <IconButton
                                icon="chevron.right"
                                variant="text"
                                shape={theme.shape}
                                className={styles.nextButton}
                                color={pagingButtonColor}
                                onClick={() => {
                                    if (swiperRef.current) {
                                        const swiper = swiperRef.current.swiper;
                                        swiper.slideNext();
                                    }
                                }}
                                disabled={!hasNext}
                            />
                        </div>
                    </>
                )}

                {showPaginations !== false && (
                    <div
                        className={buildClassName(
                            styles.paginationContainer,
                            (showPaginations === true ||
                                showPaginations === "bottom.left") &&
                                styles.bottomLeft,
                            showPaginations === "bottom.center" &&
                                styles.bottomCenter,
                            showPaginations === "bottom.right" &&
                                styles.bottomRight,
                        )}
                    >
                        {Array.from({
                            length: (() => {
                                if (swiperRef.current) {
                                    const swiper = swiperRef.current.swiper;
                                    return swiper.slides.length;
                                }
                                return 0;
                            })(),
                        }).map((_, i) => (
                            <SliderPagination
                                key={i}
                                isActive={(() => {
                                    if (swiperRef.current) {
                                        const swiper = swiperRef.current.swiper;
                                        return swiper.activeIndex === i;
                                    }
                                    return false;
                                })()}
                                onClick={() => {
                                    if (swiperRef.current) {
                                        const swiper = swiperRef.current.swiper;
                                        swiper.slideTo(i);
                                    }
                                }}
                                color={paginationColor}
                                inactiveColor={paginationInactiveColor}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});

type SliderItemProps = Modify<
    SquamaComponentProps,
    {
        children: React.ReactNode | ((isActive: boolean) => React.ReactNode);
    }
>;

export const SliderItem = (p: SliderItemProps) => {
    const { children, ...rest } = p;

    return (
        <SwiperSlide
            {...rest}
            className={buildClassName(
                squamaComponentClass,
                styles.SliderItem,
                rest.className,
            )}
            style={{
                ...rest.style,
            }}
        >
            {({ isActive }) => {
                return typeof children === "function"
                    ? children(isActive)
                    : children;
            }}
        </SwiperSlide>
    );
};

// SwiperのdisplayNameを設定することで、swiper-wrapper下にSwiperSlideがレンダリングされる。
// Hint: https://github.com/nolimits4web/swiper/issues/4413#issuecomment-1021387492
SliderItem.displayName = "SwiperSlide";
