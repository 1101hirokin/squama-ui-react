import { SquamaApp } from "./components/SquamaApp/SquamaApp";
import { useSquamaContext } from "./components/SquamaContext/SquamaContext";

const App = () => {
    return (
        <>
            <SquamaApp>
                <div>Hello Squama UI!</div>
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
                height: "100%",
                backgroundColor: squamaContext.getCurrentTheme().app.background,
                color: squamaContext.getCurrentTheme().app.text,
            }}
        >
            <h1>Component in App</h1>
            <div>
                Current theme:
                {squamaContext.getCurrentThemeKey()}
            </div>
            {squamaContext.getThemeKeys().map((themeKey) => (
                <div key={themeKey}>
                    {themeKey}:
                    <button
                        onClick={(e) => {
                            squamaContext.updateCurrentTheme(themeKey);
                        }}
                    >
                        change this
                    </button>
                </div>
            ))}
        </div>
    );
};

export default App;
