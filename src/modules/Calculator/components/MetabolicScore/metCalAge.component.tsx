import {FC, useMemo} from "react";
import {IVitalityScoreData} from "../../interfaces/vitalityScoreData.interface";
import moduleStyles from './metabolicScore.module.scss';

interface IProps {
  values: IVitalityScoreData;
  metabolicAge?: number;
}

const MetCalAge: FC<IProps> = (props) => {

  const {values, metabolicAge} = props;

  const immutableValues = useMemo(() => {
    const twoPi = 3.1415926535 * 2;
    return {
      outerCircumference: 180 * twoPi,
      innerCircumference: 135 * twoPi
    }
  }, []);

  const innerDash = useMemo(() => {
    if (immutableValues.innerCircumference && values.age) {
      return immutableValues.innerCircumference * ((100 - values.age) / 100)
    }
    return 0;
  }, [immutableValues.innerCircumference, values.age])

  const outerDash = useMemo(() => {
    if (immutableValues.outerCircumference && metabolicAge) {
      return immutableValues.outerCircumference * ((100 - metabolicAge) / 100);
    }
    return 0;
  }, [immutableValues.outerCircumference, metabolicAge])

  return (
    <div className={moduleStyles['circleDisplay']}>

      <div className={moduleStyles['partOne']}>
        <svg className={`${moduleStyles['svg-pi']} ${moduleStyles['svg-pi-outer']}`}>
          <circle
            fill={'transparent'}
            stroke={`rgb(22, 22, 22)`} strokeWidth={1} cx={200} cy={200} r={180}/>
          <circle
            strokeWidth={16}
            strokeDashoffset={`${outerDash}px`}
            strokeDasharray={`${immutableValues.outerCircumference}px`}
            stroke={'#545A88'}
            fill={'transparent'}
            strokeLinecap={"butt"}
            cx={200} cy={200} r={180}/>
        </svg>
      </div>

      <div className={moduleStyles['partTwo']}>
        <svg className={`${moduleStyles['svg-pi']} ${moduleStyles['svg-pi-inner']}`}>
          <circle stroke={`rgb(22, 22, 22)`} strokeWidth={1} cx={200} cy={200} r={135} fill={'transparent'}/>
          <circle strokeLinecap={"butt"} fill={'transparent'} strokeWidth={16} cx={200} cy={200} r={135}
                  strokeDashoffset={`${innerDash}px`}
                  strokeDasharray={`${immutableValues.innerCircumference}px`}
                  stroke={'#7C5D7A'}
          />
        </svg>
      </div>

      <div className={moduleStyles['partThree']}>
        <span>{metabolicAge}/{values.age}</span>
      </div>

    </div>
  )
}

export default MetCalAge;
