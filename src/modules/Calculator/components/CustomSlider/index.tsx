import {FC, useMemo} from "react";
import styles from './customSlider.module.scss'
import {IRangeSliderConfig} from "./RageSliderConfig";

interface IProps {
  value: number;
  onValueChanged: (value: number) => void;
  rangeSliderConfig: IRangeSliderConfig;
  applySecondary?: boolean;
  applyStylesForIdealVScore?: boolean;
  stepAmount?: string;
}

const CustomSlider: FC<IProps> = (props) => {
  const {onValueChanged, value, rangeSliderConfig, applySecondary, stepAmount, applyStylesForIdealVScore} = props;
  const style = useMemo(() => {
    if (value && rangeSliderConfig) {
      return (value - rangeSliderConfig.min) * (100 / (rangeSliderConfig.max - rangeSliderConfig.min));
    }
    return 0;
  }, [value, rangeSliderConfig])
  return (
    <div
      className={`${styles[rangeSliderConfig.clName]}
      ${applyStylesForIdealVScore && styles['new']} 
      ${(rangeSliderConfig.secondaryClName && applySecondary) && styles[rangeSliderConfig.secondaryClName]}`}>
      <input
        type={'range'}
        min={rangeSliderConfig.min}
        max={rangeSliderConfig.max}
        value={value}
        step={stepAmount || 1}
        onChange={ev => onValueChanged(parseFloat(ev.target.value))}
        className={styles['rangeSlider__input']}
      />
      <span className={styles['rangeSlider-min']}>{rangeSliderConfig.min}</span>
      <span className={styles['rangeSlider-max']}>{rangeSliderConfig.max}</span>
      <span className={styles['rangeSlider__optimal']}>{rangeSliderConfig.text}</span>
      <span
        className={styles['rangeSlider__value']}
        style={{left: style + "%", transform: `translateX(-${style}%)`}}
      >
        {value}
      </span>
    </div>
  )
}

export default CustomSlider;
