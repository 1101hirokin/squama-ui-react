import React, { useRef, useState } from "react";
import {
    Avatar,
    AvatarGroup,
    Button,
    Card,
    Icon,
    IconButton,
    Text,
    TextArea,
    TextInput,
    useSquamaContext,
} from "./components";
import { SquamaApp } from "./components/SquamaApp/SquamaApp";
import { useFloatingContentContext } from "./api";

const App = () => {
    return (
        <>
            <SquamaApp>
                <ComponentInApp />
            </SquamaApp>
        </>
    );
};

const ComponentInApp = () => {
    const context = useSquamaContext();
    const theme = context.getCurrentTheme();

    const [isLoaderCheckerLoading, setIsLoaderCheckerLoading] = useState(true);

    const nameFieldRef = useRef<HTMLInputElement>(null);

    const floatingContentContext = useFloatingContentContext();

    const openModal = (e: React.MouseEvent) => {
        if (window === undefined) return;
        floatingContentContext.open({
            originPosition: {
                x: e.clientX + window.scrollX,
                y: e.clientY + window.scrollY,
            },
            positioningFn: (window, _, contentBoundingRect) => {
                const xPosition =
                    window.innerWidth / 2 -
                    contentBoundingRect.width / 2 +
                    window.scrollX;
                const yPosition =
                    window.innerHeight / 2 -
                    contentBoundingRect.height / 2 +
                    window.scrollY -
                    24;

                return { x: xPosition, y: yPosition };
            },
            overlay: (close) => (
                <button
                    style={
                        {
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                            outline: "none",
                            border: "none",
                            userSelect: "none",
                            WebkitUserSelect: "none",
                        } as React.CSSProperties
                    }
                    onClick={() => {
                        close();
                    }}
                ></button>
            ),
            content: (close) => (
                <Card
                    shape="rounded"
                    elevation={3}
                    style={{
                        width: "300px",
                        maxWidth: "100%",
                        padding: "12px 16px 16px 16px",
                        color: theme.app.text,
                    }}
                >
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <IconButton
                            icon="close"
                            size="s"
                            variant="text"
                            shape="circular"
                            color={theme.component.text || theme.app.text}
                            onClick={() => {
                                close();
                            }}
                        ></IconButton>
                    </div>
                    <Text typeScale="heading.2">Modal</Text>
                    <Text typeScale="body.1">This is a modal content.</Text>
                    <Button
                        color={theme.system}
                        block
                        style={{ marginTop: "1rem" }}
                        onClick={() => {
                            close();
                        }}
                        shape="rounded"
                        variant="text"
                    >
                        Close
                    </Button>
                </Card>
            ),
            preventScroll: true,
            closingWindowEvents: ["scroll"],
        });
    };

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100lvh",
                padding: "1rem",
                backgroundColor: theme.app.background,
                color: theme.app.text,
            }}
        >
            <Card
                variant="outlined"
                shape="rounded.l"
                elevation={2}
                style={{ padding: 16 }}
            >
                <div>
                    <Text typeScale="heading.1">Component in App</Text>
                    <Text
                        typeScale="heading.2"
                        style={{ marginBottom: "1rem" }}
                    >
                        This is a card component.
                    </Text>
                    <Text
                        typeScale="heading.3"
                        style={{ marginBottom: "1rem" }}
                    >
                        Hello! I'm Hiroki Nakatani
                    </Text>
                    <div style={{ marginBottom: "1rem" }}>
                        <div style={{ marginBottom: ".4rem" }}>
                            Current theme: {context.getCurrentThemeKey()}
                        </div>
                        {context.getThemeKeys().map((themeKey, i) => (
                            <div
                                key={themeKey}
                                style={{ marginBottom: ".4rem" }}
                            >
                                {themeKey}:{" "}
                                {
                                    <Button
                                        onClick={() => {
                                            context.updateCurrentTheme(
                                                themeKey,
                                            );
                                        }}
                                        color={
                                            i % 2 === 0 ? "#d9d9ed" : "#0050ff"
                                        }
                                        variant="filled"
                                        shape="rounded"
                                        disabled={
                                            themeKey ===
                                            context.getCurrentThemeKey()
                                        }
                                        elevation={2}
                                        size="s"
                                    >
                                        change this
                                    </Button>
                                }
                            </div>
                        ))}
                    </div>
                    <Text typeScale="body.1" style={{ marginBottom: "1rem" }}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Nihil harum accusantium suscipit tempora
                        voluptatibus recusandae aspernatur nobis, hic quam neque
                        fuga eos nemo laborum id error, blanditiis commodi
                        laudantium consequatur!
                    </Text>
                    <Text typeScale="body.2" style={{ marginBottom: "1rem" }}>
                        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
                        <br />
                        　またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
                    </Text>
                </div>

                <div>
                    <Button
                        color="#1b1b1b"
                        block
                        loading={isLoaderCheckerLoading}
                        elevation={1}
                        style={{ marginBottom: "1rem" }}
                        onClick={() => {
                            setIsLoaderCheckerLoading(true);
                        }}
                        onClickInLoading={() => {
                            setIsLoaderCheckerLoading(false);
                        }}
                    >
                        Check loader
                    </Button>
                    <Button
                        color="#1b1b1b"
                        block
                        elevation={1}
                        style={{ marginBottom: "1rem" }}
                        onClick={() => {
                            if (nameFieldRef.current) {
                                nameFieldRef.current.focus();
                            }
                        }}
                    >
                        Focus "Name" field.
                    </Button>
                    <Button
                        color="#ccccdf"
                        block
                        elevation={1}
                        style={{ marginBottom: "1rem" }}
                        href="https://google.com"
                        target="_blank"
                    >
                        Open Google
                    </Button>
                    <Button
                        color="#0050ff"
                        block
                        elevation={12}
                        style={{ marginBottom: "1rem" }}
                        onClick={(e) => {
                            openModal(e);
                        }}
                    >
                        Open Modal
                    </Button>
                </div>

                <div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();

                            const userNameInput = (e.target as HTMLFormElement)[
                                "user name"
                            ] as HTMLInputElement;

                            console.log(userNameInput.validity.patternMismatch);

                            alert(`Hello, ${userNameInput.value}!`);
                        }}
                    >
                        <TextInput
                            height="s"
                            inputRef={nameFieldRef}
                            name="user name"
                            required
                            labelText="Name"
                            pattern={/^[a-zA-Z]+$/.source}
                            onBlur={(e) => {
                                const input = e.target as HTMLInputElement;

                                const isValid = input.checkValidity();

                                if (!isValid) {
                                    if (input.validity.patternMismatch) {
                                        input.setCustomValidity(
                                            "Please enter only alphabets",
                                        );
                                    }
                                }
                            }}
                            placeholder="Enter your name"
                            leadingContents={
                                <div
                                    style={{
                                        display: "flex",
                                        height: "100%",
                                        padding: "0 .5rem",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}
                                >
                                    <Icon name="mail" />
                                </div>
                            }
                        />
                        <TextInput
                            name="disable example"
                            labelText="Disabled"
                            placeholder="I'm disabled"
                            defaultValue="I'm disabled"
                            disabled
                            leadingContents={
                                <div
                                    style={{
                                        display: "flex",
                                        height: "100%",
                                        padding: "0 .5rem",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}
                                >
                                    <Icon name="user" />
                                </div>
                            }
                        />
                        <TextArea
                            name="message"
                            labelText="Message"
                            placeholder="Enter your message"
                            required
                        />
                        <TextArea
                            name="I'm disabled"
                            labelText="I'm disabled"
                            placeholder="Enter your message"
                            required
                            leadingContents={
                                <div
                                    style={{
                                        display: "flex",
                                        height: "100%",
                                        padding: "0 .5rem",
                                        justifyContent: "center",
                                        alignContent: "center",
                                    }}
                                >
                                    <Icon name="user" />
                                </div>
                            }
                            disabled
                        />
                        <Button
                            color={theme.system}
                            block
                            size="s"
                            elevation={3}
                            style={{ margin: ".4rem 0 1rem 0" }}
                            type="submit"
                        >
                            submit
                        </Button>
                    </form>
                </div>

                <div
                    style={{ marginBottom: "var(--s-app--spacer--2x, .4rem)" }}
                >
                    <IconButton
                        icon="send"
                        size="m"
                        color="#1b1b1b"
                        style={{
                            marginRight: "var(--s-app--spacer--1x, .4rem)",
                        }}
                    ></IconButton>
                    <IconButton
                        icon="send"
                        size="m"
                        color="#dadada"
                        shape="circular"
                        href="https://google.com"
                        target="_blank"
                        style={{
                            marginRight: "var(--s-app--spacer--1x, .4rem)",
                        }}
                    ></IconButton>
                    <IconButton
                        icon="send"
                        shape="square"
                        size="m"
                        disabled
                    ></IconButton>
                </div>

                <div
                    style={{ marginBottom: "var(--s-app--spacer--2x, .4rem)" }}
                >
                    <AvatarGroup size="m">
                        <Avatar src="https://picsum.photos/seed/nakatani/200/400" />
                        <Avatar
                            src="https://picsum.photos/seed/hiroi/200/400"
                            href="https://google.com"
                            target="_blank"
                            size="s"
                        />
                        <Avatar>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "100%",
                                    fontSize: "1.2rem",
                                    backgroundColor:
                                        "var(--s-app--color--teal--600)",
                                    color: "var(--s-app--color--teal--50)",
                                }}
                            >
                                +3
                            </div>
                        </Avatar>
                    </AvatarGroup>
                    <AvatarGroup size="s" shape="rounded">
                        <Avatar src="https://picsum.photos/seed/nakatani/200/400" />
                        <Avatar
                            src="https://picsum.photos/seed/hiroi/200/400"
                            href="https://google.com"
                            target="_blank"
                        />
                    </AvatarGroup>
                </div>
            </Card>
        </div>
    );
};

export default App;
