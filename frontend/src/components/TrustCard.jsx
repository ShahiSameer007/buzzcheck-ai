import CountUp from "react-countup";

function TrustCard({ score }) {

    let status = "";
    let color = "";

    if (score >= 80) {
        status = "High Credibility";
        color = "#22c55e";
    }
    else if (score >= 60) {
        status = "Moderate Credibility";
        color = "#f59e0b";
    }
    else {
        status = "Low Credibility";
        color = "#ef4444";
    }

    return (

        <div className="trust-card">

            <p className="trust-title">
                TRUST SCORE
            </p>
{/* 
            <h1 style={{ color }}>

                <CountUp
                    end={score}
                    duration={2.2}
                />

            </h1> */}
            <h1 style={{ color }}>
                {score}
            </h1>
            
            <p
                className="trust-status"
                style={{ color }}
            >
                {status}
            </p>

        </div>

    );

}

export default TrustCard;