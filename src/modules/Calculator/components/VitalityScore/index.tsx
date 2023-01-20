import {FC, useEffect, useMemo} from "react";
import styles from './vitalityScore.module.scss';
import PrimaryGraph from '../../../../assets/images/graph.png';
import SecondaryGraph from '../../../../assets/images/graph2.png';
import {PercentileMss} from "../../../../shared/helpers/percentile";

interface IProps {
  score: number;
  primary?: boolean;
  onScoreCalculated?: (score: number) => void;
  metabolicAge?: number;
}

const VitalityScoreComponent: FC<IProps> = (props) => {
  const {score, primary, onScoreCalculated, metabolicAge} = props;
  const percentile = useMemo(() => {
    if (score) {
      return PercentileMss(score);
    }
    return 0;
  }, [score]);

  const scoreStyle = useMemo(() => {
    if (percentile && percentile > 0) {
      return ((percentile - 100) * -1)
    }
    return 0
  }, [percentile]);

  const scoreHeight = useMemo(() => {
    if (scoreStyle >= 0 && scoreStyle <= 10) {
      return (scoreStyle * 2);
    } else if (scoreStyle > 10 && scoreStyle < 20) {
      return (scoreStyle * 2 + 5);
    } else if (scoreStyle >= 20 && scoreStyle < 25) {
      return (scoreStyle * 2 + 13);
    } else if (scoreStyle >= 25 && scoreStyle <= 40) {
      return (scoreStyle * 2 + 20);
    } else if (scoreStyle > 40 && scoreStyle <= 45) {
      return (scoreStyle * 2 + 15);
    } else if (scoreStyle > 45 && scoreStyle <= 47) {
      return (scoreStyle * 2 + 10);
    } else if (scoreStyle > 47 && scoreStyle <= 50) {
      return (scoreStyle * 2 + 7);
    } else if (scoreStyle > 50 && scoreStyle < 53) {
      return ((100 - scoreStyle) * 2 + 7);
    } else if (scoreStyle >= 53 && scoreStyle < 55) {
      return ((100 - scoreStyle) * 2 + 10);
    } else if (scoreStyle >= 55 && scoreStyle < 60) {
      return ((100 - scoreStyle) * 2 + 15);
    } else if (scoreStyle >= 60 && scoreStyle < 75) {
      return ((100 - scoreStyle) * 2 + 20);
    } else if (scoreStyle >= 75 && scoreStyle < 80) {
      return ((100 - scoreStyle) * 2 + 13);
    } else if (scoreStyle >= 80 && scoreStyle < 90) {
      return ((100 - scoreStyle) * 2 + 5);
    } else {
      return ((100 - scoreStyle) * 2);
    }
  }, [scoreStyle]);

  useEffect(() => {
    if (scoreStyle > 0 && onScoreCalculated) {
      onScoreCalculated(scoreStyle)
    }
  }, [scoreStyle, onScoreCalculated])


  return (
    <div className={`${styles['vitality']} ${!primary ? styles['new'] : ''}`}>
      {
        primary ?
          <div>
            <h2 className="text-center">Your Vitality Score Is:</h2>
            <h1 className={`${styles['big']}`}>{scoreStyle.toFixed()}</h1>
          </div>
          :
          <div className={styles['doterraRowNoSplit']}>
            <div>
              <h2 className="font-light !text-left">
                Your Vitality
                <br/>
                Score Could Be
              </h2>
              <h1
                className={`${styles['big']} text-left max-sm:!text-[40px] max-sm:!font-bold`}>{scoreStyle.toFixed()}</h1>
            </div>
            <div>
              <h2 className="font-light !text-right">
                Your Metabolic
                <br/>
                Age Could Be
              </h2>
              <h1
                className={`${styles['big']} text-right max-sm:!text-[40px] max-sm:!font-bold`}>{metabolicAge || 0}</h1>
            </div>
          </div>
      }

      <div className={styles['vitality__inner']}>
        <div className={styles['vitality__inner-image']}>
          <img src={primary ? PrimaryGraph : SecondaryGraph} alt="graph"/>
          <span
            className={styles['vitality__line']}
            style={{
              left: `${scoreStyle}%`,
              height: `${scoreHeight}%`,
            }}
          >
            <span
              className={styles['vitality__score']}
              style={{
                left: `${scoreStyle}%`,
              }}
            >
              <span>{scoreStyle.toFixed()}</span>
            </span>
          </span>
        </div>
        <span className={styles['vitality__rectangle']}></span>
        <span className={styles['vitality__min']}>1</span>
        <span className={styles['vitality__max']}>100</span>
      </div>
      <h3 className={`${styles['bold']} max-sm:text-[16px]`}>
        Your Vitality Score is better than {scoreStyle.toFixed(0)}% of your peers.
      </h3>
    </div>
  )
}

export default VitalityScoreComponent;
