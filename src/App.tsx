import { Card, Text } from "./components";
import { SquamaApp } from "./components/SquamaApp/SquamaApp";
import { useSquamaContext } from "./components/SquamaContext/SquamaContext";

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
    const squamaContext = useSquamaContext();

    return (
        <div
            style={{
                width: "100%",
                height: "100lvh",
                padding: "1rem",
                backgroundColor: squamaContext.getCurrentTheme().app.background,
                color: squamaContext.getCurrentTheme().app.text,
            }}
        >
            <Card variant="outlined" elevation={2}>
                <Text typeScale="heading.1">Component in App</Text>
                <Text typeScale="heading.2" style={{ marginBottom: "1rem" }}>
                    This is a card component.
                </Text>
                <Text typeScale="heading.3" style={{ marginBottom: "1rem" }}>
                    Hello! I'm Hiroki Nakatani
                </Text>
                <div style={{ marginBottom: "1rem" }}>
                    <div>
                        Current theme: {squamaContext.getCurrentThemeKey()}
                    </div>
                    {squamaContext.getThemeKeys().map((themeKey) => (
                        <div key={themeKey}>
                            {themeKey}:{" "}
                            {
                                <button
                                    onClick={(e) => {
                                        squamaContext.updateCurrentTheme(
                                            themeKey,
                                        );
                                    }}
                                >
                                    change this
                                </button>
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
            </Card>
        </div>
    );
};

export default App;
