import {IVitalityScoreData} from "../../interfaces/vitalityScoreData.interface";
import {FC, useEffect, useState} from "react";
import VitalityScoreComponent from "../VitalityScore";
import {toCentimeters, toKilograms} from "../../../../shared/helpers/transformValues";
import {BMIAdult, BMIZscore} from "../../../../shared/helpers/calculateBmi";
import {calculateMss, ICalculateMssParams, ICalculateMssResponse} from "../../../../shared/helpers/calculateMss";

interface IProps {
  item: IVitalityScoreData;
  onClose: () => void;
}

const ShareHistoryItem: FC<IProps> = (props) => {
  const {item, onClose} = props;
  const [score, setScore] = useState<number>(0);

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-10 m-7 max-[540px]:m-0 ">
      <div
        className="fixed top-0 left-0 bottom-0 right-0 -z-[1] flex items-center justify-center bg-black opacity-[0.65]"
        onClick={onClose}
      ></div>

      <div
        className="relative mx-auto flex h-full max-w-[900px] items-center justify-center overflow-auto bg-secondary py-10 px-20 max-[540px]:px-5">
        <div
          className="absolute top-5 right-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1px]"
          onClick={onClose}
        >
          <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8267 12.9723L7.20797 9.35357L3.67244 12.8891L0.989592 10.2063L4.52513 6.67072L0.927201 3.0728L3.46447 0.535534L7.06239 4.13346L10.5979 0.597925L13.2808 3.28077L9.74524 6.8163L13.364 10.435L10.8267 12.9723Z"
              fill="black"
            />
          </svg>
        </div>
        {
          <VitalityScoreComponent metabolicAge={item.metabolicAge} score={item.bmiz || 0}/>
        }
      </div>
    </div>
  )
}

export default ShareHistoryItem;
