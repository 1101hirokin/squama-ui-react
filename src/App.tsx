import { useRef, useState } from "react";
import {
    Alert,
    Avatar,
    AvatarGroup,
    Badge,
    Button,
    Card,
    ContextMenu,
    DateSelect,
    Icon,
    IconButton,
    Slider,
    SliderItem,
    SliderRef,
    Text,
    TextArea,
    TextInput,
    Tooltip,
    useSquamaContext,
} from "./components";
import { SquamaApp } from "./components/SquamaApp/SquamaApp";

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

    const onContextMenuItemClick = (id: string) => {
        console.log(`Clicked: ${id}`);
    };

    const sliderRef = useRef<SliderRef>(null);

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
                        <Avatar src="/vite.svg" />
                        <Avatar
                            src="/vite.svg"
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
                        <Avatar src="/vite.svg" />
                        <Avatar
                            src="/vite.svg"
                            href="https://google.com"
                            target="_blank"
                        />
                    </AvatarGroup>
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <ContextMenu
                            menuItems={[
                                {
                                    id: "1",
                                    label: "Menu item 1",
                                    onClick: (_, item) => {
                                        onContextMenuItemClick(item.id || "");
                                    },
                                },
                                {
                                    id: "2",
                                    label: "Menu item 2 >",
                                    onClick: (_, item) => {
                                        onContextMenuItemClick(item.id || "");
                                    },
                                    subItems: [
                                        {
                                            id: "2-1",
                                            label: "Sub item 1 >",
                                            subItems: [
                                                {
                                                    id: "2-1-1",
                                                    label: "Sub item 1",
                                                },
                                                {
                                                    id: "2-1-2",
                                                    label: "Sub item 2 >",
                                                    subItems: [
                                                        {
                                                            id: "2-1-2-1",
                                                            label: "Sub item 1",
                                                        },
                                                        {
                                                            id: "2-1-2-2",
                                                            label: "Sub item 2",
                                                        },
                                                    ],
                                                },
                                                {
                                                    id: "2-1-3",
                                                    label: "Sub item 3",
                                                },
                                                {
                                                    id: "2-1-4",
                                                    label: "Sub item 4",
                                                },
                                            ],
                                        },
                                        { id: "2-2", label: "Sub item 2" },
                                        { id: "2-3", label: "Sub item 3" },
                                        { id: "2-4", label: "Sub item 4" },
                                    ],
                                },
                                {
                                    id: "3",
                                    label: "Go to Google",
                                    href: "https://google.com",
                                    target: "_blank",
                                    leading: (
                                        <div
                                            style={{
                                                display: "flex",
                                                padding: "0 8px",
                                                height: "100%",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Icon name="link" size="1rem" />
                                        </div>
                                    ),
                                },
                            ]}
                            renderNode={(props) => (
                                <Card
                                    variant="outlined"
                                    style={{
                                        display: "flex",
                                        width: "90%",
                                        height: 100,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor:
                                            "var(--s-app--color--gray--100)",
                                        color: "var(--s-app--color--gray--300)",
                                    }}
                                    {...props}
                                >
                                    Right click to open context menu.
                                </Card>
                            )}
                        />
                    </div>
                </div>

                <div
                    style={{ marginBottom: "var(--s-app--spacer--2x, .4rem)" }}
                >
                    <div
                        style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            fontSize: "var(--s-typography--font-size--5)",
                        }}
                    >
                        <Tooltip
                            content="lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil harum accusantium suscipit tempora voluptatibus recusandae aspernatur nobis, hic quam neque fuga eos nemo laborum id error, blanditiis commodi laudantium consequatur!"
                            position="bottom"
                            renderNode={(props) => (
                                <Card
                                    variant="outlined"
                                    style={{
                                        display: "flex",
                                        width: "80%",
                                        height: 44,
                                        maxWidth: 300,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        backgroundColor:
                                            "var(--s-app--color--gray--100)",
                                        color: "var(--s-app--color--gray--300)",
                                        textAlign: "center",
                                    }}
                                    {...props}
                                >
                                    Hover me!
                                    <br />
                                    (Tooltip will be shown)
                                </Card>
                            )}
                        />
                    </div>
                </div>
                <div
                    style={{
                        marginBottom: "var(--s-app--spacer--2x, .4rem)",
                        display: "grid",
                        gridAutoFlow: "row",
                        gap: "var(--s-app--spacer--1x, .2rem)",
                    }}
                >
                    <Alert type="success">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Eum tempora dolorem, modi neque aspernatur atque
                        asperiores ab, excepturi ducimus odio quidem suscipit
                        totam libero at adipisci a saepe eligendi sequi!
                    </Alert>
                    <Alert type="info">
                        あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
                    </Alert>
                    <Alert type="warning">
                        またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
                    </Alert>
                    <Alert type="error">
                        素早い茶色の狐はのろまな犬を飛び越える。The quick brown
                        fox jumps over the lazy dog.
                    </Alert>
                </div>

                <div
                    style={{ marginBottom: "var(--s-app--spacer--2x, .4rem)" }}
                >
                    <div
                        style={{
                            marginBottom: "var(--s-app--spacer--1x, .2rem)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "var(--s-app--spacer--1x, .2rem)",
                        }}
                    >
                        <Badge></Badge>
                        <Badge>12+</Badge>
                        <Badge color="#0050ff">999</Badge>
                    </div>
                    <div
                        style={{
                            marginBottom: "var(--s-app--spacer--1x, .2rem)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "var(--s-app--spacer--1x, .2rem)",
                        }}
                    >
                        <Badge color="#1b1b22" size="m" shape="square"></Badge>
                        <Badge color="#1b1b22" size="m" shape="square">
                            12+
                        </Badge>
                        <Badge color="#1b1b22" size="m" shape="square">
                            999
                        </Badge>
                    </div>
                    <div
                        style={{
                            marginBottom: "var(--s-app--spacer--1x, .2rem)",
                            display: "flex",
                            alignItems: "flex-start",
                            gap: "var(--s-app--spacer--1x, .2rem)",
                        }}
                    >
                        <Badge color="#1b1b22" size="l" shape="rounded"></Badge>
                        <Badge color="#1b1b22" size="l" shape="rounded">
                            12+
                        </Badge>
                        <Badge color="#1b1b22" size="l" shape="rounded">
                            999
                        </Badge>
                    </div>
                </div>

                <div
                    style={{
                        marginBottom: "var(--s-app--spacer--2x, .4rem)",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            maxWidth: 400,
                            margin: "0 auto",
                        }}
                    >
                        <Slider
                            ref={sliderRef}
                            onSlide={(current, prev) => {
                                console.log(`Slide: ${prev} -> ${current}`);
                            }}
                            initialIndex={1}
                            slidesPerView={1}
                            showPagingButton={true}
                            pagingButtonColor={theme.system}
                            showPaginations="bottom.center"
                            paginationColor={theme.system}
                            paginationInactiveColor={
                                theme.component?.border || "#ccc"
                            }
                            loop={true}
                            centered={true}
                            gap={0}
                            autoplay={false}
                        >
                            <SliderItem style={{}}>
                                <div
                                    style={{
                                        ...{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "white",
                                            width: "100%",
                                            aspectRatio: "16/9",
                                        },
                                    }}
                                >
                                    Slide 1
                                </div>
                            </SliderItem>
                            <SliderItem>
                                <div
                                    style={{
                                        ...{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "thistle",
                                            width: "100%",
                                            aspectRatio: "16/9",
                                        },
                                    }}
                                >
                                    Slide 2
                                </div>
                            </SliderItem>
                            <SliderItem>
                                <div
                                    style={{
                                        ...{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "cadetblue",
                                            width: "100%",
                                            aspectRatio: "16/9",
                                        },
                                    }}
                                >
                                    Slide 3
                                </div>
                            </SliderItem>
                            <SliderItem>
                                <div
                                    style={{
                                        ...{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundColor: "salmon",
                                            width: "100%",
                                            aspectRatio: "16/9",
                                        },
                                    }}
                                >
                                    Slide 4
                                </div>
                            </SliderItem>
                        </Slider>
                    </div>
                    <Button
                        size="s"
                        onClick={() => {
                            if (sliderRef.current) {
                                const controller = sliderRef.current.controller;
                                controller.slidePrev();
                            }
                        }}
                        variant="text"
                    >
                        Go Prev
                    </Button>
                    <Button
                        size="s"
                        onClick={() => {
                            if (sliderRef.current) {
                                const controller = sliderRef.current.controller;
                                controller.slideNext();
                            }
                        }}
                        variant="text"
                    >
                        Go Next
                    </Button>
                    <Button
                        size="s"
                        onClick={() => {
                            if (sliderRef.current) {
                                const controller = sliderRef.current.controller;

                                controller.slideTo(
                                    controller.getSlideCount() - 1,
                                );
                            }
                        }}
                        variant="text"
                    >
                        Go Last
                    </Button>
                </div>

                <div
                    style={{
                        marginBottom: "var(--s-app--spacer--2x, .4rem)",
                    }}
                >
                    <DateSelect />
                </div>

                <div style={{ height: 300 }} />
            </Card>
        </div>
    );
};

export default App;
