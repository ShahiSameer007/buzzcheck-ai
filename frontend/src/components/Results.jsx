import TrustCard from "./TrustCard";
import SummaryCard from "./SummaryCard";

function Results({ result, onBack }) {

    return (

        <section className="results-page">

            <div className="results-container">

                <TrustCard score={result.trust_score} />

                <div className="dashboard-grid">

                    <SummaryCard summary={result.summary} />

                    <div className="dashboard-card">
                        <h3>🎭 Sensationalism</h3>

                        <p>
                            Overall: {result.sensationalism.overall}%
                        </p>

                        <p>
                            Emotional: {result.sensationalism.emotional_language}%
                        </p>

                        <p>
                            Clickbait: {result.sensationalism.clickbait}%
                        </p>

                    </div>

                    <div className="dashboard-card">

                        <h3>📌 Claims</h3>

                        <ul>

                            {result.claims.map((claim, index) => (

                                <li key={index}>{claim}</li>

                            ))}

                        </ul>

                    </div>

                    <div className="dashboard-card">

                        <h3>⚠️ Manipulation</h3>

                        <ul>

                            {result.manipulation_indicators.map((item, index) => (

                                <li key={index}>{item}</li>

                            ))}

                        </ul>

                    </div>

                    <div className="dashboard-card full-width">

                        <h3>🤖 AI Verdict</h3>

                        <p>{result.verdict}</p>

                    </div>

                </div>

                <button
                    className="primary-btn"
                    onClick={onBack}
                >
                    Analyze Another
                </button>

            </div>

        </section>

    );

}

export default Results;