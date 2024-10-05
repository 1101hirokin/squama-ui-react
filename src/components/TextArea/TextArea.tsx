"use client";
import React, { forwardRef, useMemo } from "react";
import {
    Colors,
    getBorderRadiusByShape,
    Shape,
    squamaComponentClass,
    SquamaComponentProps,
} from "../../api";
import { buildClassName, generateUUIDv4, Modify } from "../../utils";
import { useSquamaContext } from "../SquamaContext/SquamaContext";
import styles from "./TextArea.module.css";
import { Text } from "../Text/Text";

type TextAreaProps = Modify<
    SquamaComponentProps,
    {
        labelText?: string;
        shape?: Shape;

        leadingContents?: React.ReactNode;
        trailingContents?: React.ReactNode;

        textAreaHeight?: React.CSSProperties["height"];

        textareaId?: string;
        textareaRef?: React.ForwardedRef<HTMLTextAreaElement>;
        name?: string;
        placeholder?: React.ComponentProps<"textarea">["placeholder"];
        defaultValue?: React.ComponentProps<"textarea">["defaultValue"];
        value?: string;
        tabIndex?: React.ComponentProps<"textarea">["tabIndex"];
        onChange?: React.ComponentProps<"textarea">["onChange"];
        onFocus?: React.ComponentProps<"textarea">["onFocus"];
        onBlur?: React.ComponentProps<"textarea">["onBlur"];
        minLength?: React.ComponentProps<"textarea">["minLength"];
        maxLength?: React.ComponentProps<"textarea">["maxLength"];
        autoComplete?: React.ComponentProps<"textarea">["autoComplete"];
        required?: React.ComponentProps<"textarea">["required"];
        requiredMessage?: string;
        disabled?: boolean;
        readOnly?: boolean;
    }
>;

export const TextArea = forwardRef<HTMLDivElement, TextAreaProps>(
    (props, ref) => {
        const {
            labelText,
            shape,

            textAreaHeight = 120,

            textareaId,
            textareaRef,
            name,
            placeholder,
            defaultValue,
            value,
            tabIndex,
            onChange,
            onFocus,
            onBlur,
            minLength,
            maxLength,
            autoComplete,
            required,
            requiredMessage = "*",
            disabled,
            readOnly,

            leadingContents,
            trailingContents,
            ...rest
        } = props;

        const _textareaId = textareaId ?? generateUUIDv4();

        const context = useSquamaContext();
        const theme = context.getCurrentTheme();

        const borederRadius = getBorderRadiusByShape(shape ?? theme.shape);

        const cssVars = useMemo(() => {
            return {
                "--s-textarea--border-radius": borederRadius,

                "--s-textarea--border-color": theme.component.border,

                "--s-textarea--text-color":
                    theme.component.text ?? theme.app.text,
                "--s-textarea--text-color--disabled": theme.isLight
                    ? Colors.gray[300]
                    : Colors.gray[700],
                "--s-textarea--placeholder-color": Colors.gray[400],
                "--s-textarea--placeholder-color--disabled": theme.isLight
                    ? Colors.gray[300]
                    : Colors.gray[500],
                "--s-textarea--background-color":
                    theme.component.background ?? theme.app.background,
                "--s-textarea--background-color--disabled": theme.isLight
                    ? Colors.gray[100]
                    : Colors.gray[900],
                "--s-textarea--required-message--color": theme.isLight
                    ? Colors.red[500]
                    : Colors.red[300],
            } as React.CSSProperties;
        }, [borederRadius, theme]);

        return (
            <div
                {...rest}
                ref={ref}
                className={buildClassName(
                    styles.TextArea,
                    rest.className,
                    disabled && styles.disabled,
                    readOnly && styles.readOnly,
                    leadingContents && styles.hasLeading,
                    trailingContents && styles.hasTrailing,
                    squamaComponentClass,
                )}
                style={{
                    ...cssVars,
                    ...rest.style,
                }}
            >
                {labelText && (
                    <div className={styles.labelContainer}>
                        <label htmlFor={_textareaId}>
                            <Text element="span" typeScale="overline">
                                {labelText}
                                {required && (
                                    <span className={styles.requiredMessage}>
                                        {requiredMessage}
                                    </span>
                                )}
                            </Text>
                        </label>
                    </div>
                )}

                <div
                    className={styles.mainContentsContainer}
                    style={{
                        height: textAreaHeight,
                    }}
                >
                    <div className={styles.leadingContentsContainer}>
                        {leadingContents}
                    </div>
                    <div className={styles.textareaContainer}>
                        <textarea
                            id={_textareaId}
                            name={name}
                            ref={textareaRef}
                            placeholder={placeholder}
                            defaultValue={defaultValue}
                            value={value}
                            tabIndex={tabIndex}
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            minLength={minLength}
                            maxLength={maxLength}
                            autoComplete={autoComplete}
                            required={required}
                            disabled={disabled}
                            readOnly={readOnly}
                            className={styles.textarea}
                        />
                    </div>
                    <div className={styles.trailingContentsContainer}>
                        {trailingContents}
                    </div>
                </div>
            </div>
        );
    },
);
