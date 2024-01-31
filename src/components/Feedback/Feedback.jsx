import { useCallback, useState } from "react";
import styles from "./Feedback.module.css";
import FeedbackOptions from "./FeedbackOptions";
import FeedbackStatistics from "./FeedbackStatistics";
import FeedbackSectionTitle from "./FeedbackSection/FeedbackSectionTitle";
import Notification from "./Notification/Notification";

const feedbackOptions = ['good', 'neutral', 'bad'];

const Feedback = () => {
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    });

    const countTotalFeedback = () => {
            const {good, neutral, bad} = feedback;
            const total = good + neutral + bad;
            return total;
        };
        
        const countPositiveFeedbackPercentage = () => {
            const total = countTotalFeedback();
            if(!total) {
                return 0;
            }
            const value = feedback.good;
            return Number(((value / total) * 100).toFixed(2));
        };
        
        const addRate = useCallback((keyName) => {
            setFeedback(prevFeedback => ({
                ...prevFeedback,
                [keyName]: prevFeedback[keyName] + 1
            }))
        }, []);

    const total = countTotalFeedback();
    const goodPercentage = countPositiveFeedbackPercentage();
    const goodRate = feedback.good;
    const neutralRate = feedback.neutral;
    const badRate = feedback.bad;
   
    return (
        <div className={styles.wrap}>
            
            <FeedbackSectionTitle title = "Please leave your feedback">
            <FeedbackOptions options = {feedbackOptions} addRate = {addRate} />
            </FeedbackSectionTitle>
            {total ? (
                <FeedbackSectionTitle title="Statistics">
                    <FeedbackStatistics total={total} goodPercentage={goodPercentage} good={goodRate} neutral={neutralRate} bad={badRate} />
                </FeedbackSectionTitle>
            ) : (
                <Notification message="There is no feedback"/>
            )}
        </div>
    )
}

export default Feedback;