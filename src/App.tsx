import { useRef, useState } from "react";
import {
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

    return (
        <div
            style={{
                width: "100%",
                minHeight: "100lvh",
                padding: "1rem",
                backgroundColor: context.getCurrentTheme().app.background,
                color: context.getCurrentTheme().app.text,
            }}
        >
            <Card variant="outlined" shape="rounded.l" elevation={2}>
                <Text typeScale="heading.1">Component in App</Text>
                <Text typeScale="heading.2" style={{ marginBottom: "1rem" }}>
                    This is a card component.
                </Text>
                <Text typeScale="heading.3" style={{ marginBottom: "1rem" }}>
                    Hello! I'm Hiroki Nakatani
                </Text>
                <div style={{ marginBottom: "1rem" }}>
                    <div style={{ marginBottom: ".4rem" }}>
                        Current theme: {context.getCurrentThemeKey()}
                    </div>
                    {context.getThemeKeys().map((themeKey, i) => (
                        <div key={themeKey} style={{ marginBottom: ".4rem" }}>
                            {themeKey}:{" "}
                            {
                                <Button
                                    onClick={() => {
                                        context.updateCurrentTheme(themeKey);
                                    }}
                                    color={i % 2 === 0 ? "#d9d9ed" : "#0050ff"}
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
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Nihil harum accusantium suscipit tempora voluptatibus
                    recusandae aspernatur nobis, hic quam neque fuga eos nemo
                    laborum id error, blanditiis commodi laudantium consequatur!
                </Text>
                <Text typeScale="body.2" style={{ marginBottom: "1rem" }}>
                    あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
                    <br />
                    　またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。
                </Text>
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
                    focus Name field.
                </Button>

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

                <div>
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
                        loading
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
            </Card>
        </div>
    );
};

export default App;
