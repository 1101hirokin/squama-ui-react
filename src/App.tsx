import { Card } from "./components";
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
                <h1
                    style={{
                        margin: 0,
                        marginBottom: "1rem",
                    }}
                >
                    Component in App
                </h1>
                <div>Current theme: {squamaContext.getCurrentThemeKey()}</div>
                {squamaContext.getThemeKeys().map((themeKey) => (
                    <div key={themeKey}>
                        {themeKey}:{" "}
                        {
                            <button
                                onClick={(e) => {
                                    squamaContext.updateCurrentTheme(themeKey);
                                }}
                            >
                                change this
                            </button>
                        }
                    </div>
                ))}
            </Card>
        </div>
    );
};

export default App;
