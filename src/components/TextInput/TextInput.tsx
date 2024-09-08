"use client";
import React, { forwardRef } from "react";
import {
    Colors,
    ComponentSize,
    getBorderRadiusByShape,
    getPixelFromComponentSize,
    Shape,
    squamaComponentClass,
    SquamaComponentProps,
} from "../../api";
import { buildClassName, Modify } from "../../utils";
import { useSquamaContext } from "../SquamaContext/SquamaContext";
import styles from "./TextInput.module.css";
import { Text } from "../Text/Text";

type TextInputProps = Modify<
    SquamaComponentProps,
    {
        labelText?: string;
        shape?: Shape;
        height?: ComponentSize;

        leadingContents?: React.ReactNode;
        trailingContents?: React.ReactNode;

        inputId?: string;
        inputRef?: React.ForwardedRef<HTMLInputElement>;
        name?: string;
        placeholder?: React.ComponentProps<"input">["placeholder"];
        defaultValue?: React.ComponentProps<"input">["defaultValue"];
        value?: React.ComponentProps<"input">["value"];
        tabIndex?: React.ComponentProps<"input">["tabIndex"];
        onChange?: React.ComponentProps<"input">["onChange"];
        onFocus?: React.ComponentProps<"input">["onFocus"];
        onBlur?: React.ComponentProps<"input">["onBlur"];
        minLength?: React.ComponentProps<"input">["minLength"];
        maxLength?: React.ComponentProps<"input">["maxLength"];
        autoComplete?: React.ComponentProps<"input">["autoComplete"];
        pattern?: React.ComponentProps<"input">["pattern"];
        required?: React.ComponentProps<"input">["required"];
        requiredMessage?: string;
        inputMode?: React.ComponentProps<"input">["inputMode"];
        disabled?: boolean;
        readOnly?: boolean;
    }
>;

export const TextInput = forwardRef<HTMLDivElement, TextInputProps>(
    (props, ref) => {
        const {
            labelText,
            shape,
            height = "m",

            inputId,
            inputRef,
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
            pattern,
            required,
            requiredMessage = "*",
            inputMode,
            disabled,
            readOnly,

            leadingContents,
            trailingContents,

            ...rest
        } = props;

        const context = useSquamaContext();
        const theme = context.getCurrentTheme();

        const borderRadius = getBorderRadiusByShape(shape ?? theme.shape);
        const _height = getPixelFromComponentSize(height);

        const cssVars = {
            "--s-textinput--height": _height,

            "--s-textinput--border-radius": borderRadius,

            "--s-textinput--border-color": theme.component.border,

            "--s-textinput--text-color": theme.component.text ?? theme.app.text,
            "--s-textinput--text-color--disabled": theme.isLight
                ? Colors.gray[300]
                : Colors.gray[700],
            "--s-textinput--placeholder-color": Colors.gray[400],
            "--s-textinput--placeholder-color--disabled": theme.isLight
                ? Colors.gray[300]
                : Colors.gray[500],
            "--s-textinput--background-color":
                theme.component.background ?? theme.app.background,
            "--s-textinput--background-color--disabled": theme.isLight
                ? Colors.gray[100]
                : Colors.gray[900],
            "--s-textinput--required-message--color": theme.isLight
                ? Colors.red[500]
                : Colors.red[300],
        } as React.CSSProperties;

        return (
            <div
                {...rest}
                ref={ref}
                className={buildClassName(
                    styles.TextInput,
                    rest.className,
                    disabled && styles.disabled,
                    readOnly && styles.readOnly,
                    leadingContents && styles.hasLeading,
                    trailingContents && styles.hasTrailing,
                    squamaComponentClass,
                )}
                style={{
                    ...rest.style,
                    ...cssVars,
                }}
            >
                {labelText && (
                    <div className={styles.labelContainer}>
                        <label htmlFor={inputId}>
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
                <div className={styles.mainContentsContainer}>
                    <div className={styles.leadingContentsContainer}>
                        {leadingContents}
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            id={inputId}
                            ref={inputRef}
                            name={name}
                            className={styles.input}
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
                            pattern={pattern}
                            disabled={disabled}
                            readOnly={readOnly}
                            required={required}
                            inputMode={inputMode}
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
