import React, { useRef, useState } from "react";
import {
    ComponentSize,
    getPixelFromComponentSize,
    squamaComponentClass,
    SquamaComponentProps,
} from "../../api";
import { buildClassName, Modify } from "../../utils";

import styles from "./DateSelect.module.css";
import { Button } from "../Button/Button";
import { Slider, SliderItem, SliderRef } from "../Slider/Slider";
import { IconButton } from "../IconButton/IconButton";

type DateSelectProps = Modify<
    SquamaComponentProps,
    {
        size?: ComponentSize;

        initial?: {
            year: number;
            month: number;
            date?: number;
        };
    }
>;

const MonthContainer = (p: {
    year: number;
    month: number;
    size: ComponentSize;
    onDateClick: (date: { year: number; month: number }) => void;
}) => {
    const { year, month, size, onDateClick } = p;

    const height = getPixelFromComponentSize(size);

    const cssVars = {
        "--s-date-select-item--height": height,
    } as React.CSSProperties;

    return (
        <div className={styles.MonthContainer} style={cssVars}>
            <div className={styles.dateContainer}>
                {[...Array(35)].map((_, i) => (
                    <DateSelectItem
                        key={i}
                        date={i}
                        size={size}
                        onClick={() => onDateClick({ year, month })}
                    />
                ))}
            </div>
        </div>
    );
};

type YearMonth = {
    year: number;
    month: number;
};

const isSameYearMonth = (a: YearMonth, b: YearMonth) => {
    return a.year === b.year && a.month === b.month;
};

export const DateSelect = (p: DateSelectProps) => {
    const {
        size = "m",

        initial = (() => {
            const now = new Date();
            return {
                year: now.getFullYear(),
                month: now.getMonth(),
            };
        })(),
        ...rest
    } = p;

    const [monthes, setMonthes] = useState<YearMonth[]>([
        {
            year: 2024,
            month: 1,
        },
        {
            year: 2024,
            month: 2,
        },
    ]);

    const [current, setCurrent] = useState<YearMonth>(monthes[0]);

    const sliderRef = useRef<SliderRef>(null);

    const onGoNext = (current: YearMonth) => {
        if (isSameYearMonth(current, monthes[monthes.length - 1])) {
            setMonthes((prev) => [
                ...prev.slice(1, prev.length - 1),
                { year: current.year, month: current.month + 1 },
                { year: current.year, month: current.month + 2 },
            ]);
        }
    };
    const onGoPrev = (current: YearMonth) => {
        if (isSameYearMonth(current, monthes[0])) {
            setMonthes((prev) => [
                { year: current.year, month: current.month - 2 },
                { year: current.year, month: current.month - 1 },
                ...prev.slice(0, prev.length - 1),
            ]);
        }
    };

    return (
        <div
            {...rest}
            className={buildClassName(squamaComponentClass, styles.DateSelect)}
        >
            <div className={styles.monthTitleContainer}>
                <Button variant="text">{current.year}</Button>
                {" / "}
                <Button variant="text">{current.month}</Button>
            </div>
            <div>
                <Slider
                    onSlide={(index, prevIndex) => {
                        setCurrent(monthes[index]);

                        if (index > prevIndex) {
                            onGoNext(monthes[index]);
                        } else {
                            onGoPrev(monthes[index]);
                        }
                    }}
                    showPaginations={false}
                    showPagingButton={false}
                    ref={sliderRef}
                >
                    {monthes.map((month, i) => {
                        return (
                            <SliderItem
                                key={`${month.year}-${month.month}-${i}`}
                                data-year-month={`${month.year}-${month.month}`}
                            >
                                <MonthContainer
                                    year={month.year}
                                    month={month.month}
                                    size={size}
                                    onDateClick={(date) => {
                                        setMonthes([...monthes, date]);
                                    }}
                                />
                            </SliderItem>
                        );
                    })}
                </Slider>
            </div>
            <div className={styles.pagerButtonsContainer}>
                <IconButton
                    icon="chevron.left"
                    variant="text"
                    onClick={() => {
                        if (sliderRef.current) {
                            const controller = sliderRef.current.controller;
                            controller.slidePrev();
                        }
                    }}
                />
                <IconButton
                    icon="chevron.right"
                    variant="text"
                    onClick={() => {
                        if (sliderRef.current) {
                            const controller = sliderRef.current.controller;
                            controller.slideNext();
                        }
                    }}
                />
            </div>
        </div>
    );
};

type DateSelectItemProps = Modify<
    SquamaComponentProps,
    {
        date: number;
        size?: ComponentSize;
        onClick: React.MouseEventHandler;
    }
>;

export const DateSelectItem = (p: DateSelectItemProps) => {
    const { date, size = "m", onClick, ...rest } = p;

    const height = getPixelFromComponentSize(size);

    const cssVars = {
        "--s-date-select-item--height": height,
    } as React.CSSProperties;

    return (
        <div
            {...rest}
            className={buildClassName(
                squamaComponentClass,
                styles.DateSelectItem,
            )}
            style={{
                ...cssVars,
                ...rest.style,
            }}
        >
            <Button
                variant="text"
                onClick={onClick}
                className={styles.itemButton}
            >
                {date}
            </Button>
        </div>
    );
};
