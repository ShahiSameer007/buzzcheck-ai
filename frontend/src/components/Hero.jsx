import { useState } from "react";
import { FaArrowRight, FaImage } from "react-icons/fa";
import Results from "./Results";
import { analyzeNews } from "../services/api";
import LoadingPanel from "./LoadingPanel";

function Hero() {

    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnalyze = async () => {

        if (!text.trim()) {
            alert("Please enter some text.");
            return;
        }

        try {

            setLoading(true);

            const startTime = Date.now();

            const response = await analyzeNews(text);

            const elapsed = Date.now() - startTime;

            const minimumLoadingTime = 4500;

            if (elapsed < minimumLoadingTime) {

                await new Promise(resolve =>
                    setTimeout(resolve, minimumLoadingTime - elapsed)
                );

            }

            // setResult(response);
            console.log(response);

            setResult(response);

        } catch (error) {

            console.error(error);

            alert("Something went wrong while analyzing.");

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <LoadingPanel />;
    }

    if (result) {
        return (
            <Results
                result={result}
                onBack={() => {
                    setResult(null);
                    setText("");
                }}
            />
        );
    }

    return (
        <section className="hero">

            <div className="hero-content">

                <span className="badge">
                    🚀 AI Powered News Credibility Analyzer
                </span>

                <h1>
                    BuzzCheck <span>AI</span>
                </h1>

                <p>
                    Analyze news articles, tweets, WhatsApp forwards and social
                    media posts before you believe or share them.
                </p>

                <textarea
                    placeholder="Paste a news article, tweet or post here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />

                <div className="button-group">

                    <button className="secondary-btn">
                        <FaImage />
                        Upload Screenshot
                    </button>

                    <button
                        className="primary-btn"
                        onClick={handleAnalyze}
                    >
                        Analyze
                        <FaArrowRight />
                    </button>

                </div>

        </div>

        <footer className="footer">
            Powered by <strong>Gemini 2.5 Flash</strong> • BuzzCheck AI v1.0
        </footer>

        </section>
    );
}

export default Hero;