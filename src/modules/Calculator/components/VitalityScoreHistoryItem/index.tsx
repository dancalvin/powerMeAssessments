import {FC, useState} from "react";
import {useSwipeable} from "react-swipeable";
import {IVitalityScoreData} from "../../interfaces/vitalityScoreData.interface";
import {format} from "date-fns";
import MetabolicScoreGraphResponsive from "../MetabolicScore/metabolicScoreGraphResponsive";
import {DateTime} from "luxon";
import vitalityScore from "../VitalityScore";

interface IProps {
  vitalityScoreData: IVitalityScoreData;
  onDeletePressed: (item: IVitalityScoreData) => void;
  onShowDetail: (item: IVitalityScoreData) => void;
  showShare: () => void;
}

const VitalityScoreHistory: FC<IProps> = (props) => {

  const {vitalityScoreData, onDeletePressed, onShowDetail, showShare} = props;
  const [actionArea, setActionArea] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setActionArea(true);
    },
    onSwipedRight: () => {
      setActionArea(false);
    },
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });
  return (
    <div
      className="relative flex flex-row flex-nowrap border-b-[1px] sm:mt-16 sm:border-[1px] sm:border-l-[15px] sm:border-l-primary "
      {...handlers}
    >
      <div
        className={`flex grow flex-row flex-nowrap justify-between py-10 px-0 sm:px-6 sm:pl-6 md:pl-20`}
        onClick={() => setActionArea(false)}
      >
        <div className="w-full">
          <div>
            <span className="font-montserrat text-xl font-bold leading-6 text-black ">
                {vitalityScoreData.date && DateTime.fromISO(vitalityScoreData.date).toLocaleString(DateTime.DATE_FULL)}
              </span>

            <div className="flex flex-row flex-wrap ">
              <div className="mt-4 w-1/2 border-r-[1px] max-sm:pr-1">
                <p className="font-montserrat text-base leading-[20px] text-primary">
                  Your Metabolic Age
                </p>
                <p className="font-montserrat text-4xl leading-[49px] text-primary">
                  {vitalityScoreData.metabolicAge}
                </p>
              </div>

              <div className="mt-4 flex w-1/2 flex-col items-center pl-2">
                <div>
                  <p className="font-montserrat text-base leading-[20px] text-third">
                    Your Vitality Score
                  </p>
                  <p className="font-montserrat text-4xl leading-[49px] text-third">
                    {vitalityScoreData.score}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center sm:block">
            <button
              className="mt-10 mr-3 rounded-3xl bg-black py-3 px-10 text-center font-montserrat text-xl font-bold leading-[24px] text-secondary"
              onClick={() => onShowDetail(vitalityScoreData)}
            >
              See Full Results
            </button>
          </div>
        </div>

        <div className="relative hidden min-w-[200px] grow sm:block">
          <MetabolicScoreGraphResponsive metabolicAge={vitalityScoreData.metabolicAge}
                                         age={vitalityScoreData.score}/>

          <div className="absolute right-0 left-0 top-0 bottom-0 flex items-center justify-center">
            <p className="text-xl font-bold">
              <span className="text-primary">{vitalityScoreData.metabolicAge}</span>/
              <span className="text-third">{vitalityScoreData.score}</span>
            </p>
          </div>
        </div>
      </div>

      <div
        className="top-0 bottom-0 right-0 hidden max-w-[80px] grow flex-col justify-between p-5 sm:absolute sm:flex md:relative">
        <div
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1px]"
          onClick={() => onDeletePressed(vitalityScoreData)}
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

        <div
          className="flex h-8 w-8 cursor-pointer items-center justify-center"
          onClick={showShare}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.44721 14.1056C8.95324 13.8586 8.35256 14.0588 8.10557 14.5528C7.85858 15.0468 8.05881 15.6474 8.55279 15.8944L9.44721 14.1056ZM16.5528 19.8944C17.0468 20.1414 17.6474 19.9412 17.8944 19.4472C18.1414 18.9532 17.9412 18.3526 17.4472 18.1056L16.5528 19.8944ZM17.4472 7.89443C17.9412 7.64744 18.1414 7.04676 17.8944 6.55279C17.6474 6.05881 17.0468 5.85858 16.5528 6.10557L17.4472 7.89443ZM8.55279 10.1056C8.05881 10.3526 7.85858 10.9532 8.10557 11.4472C8.35256 11.9412 8.95324 12.1414 9.44721 11.8944L8.55279 10.1056ZM21 24C19.3431 24 18 22.6569 18 21H16C16 23.7614 18.2386 26 21 26V24ZM18 21C18 19.3431 19.3431 18 21 18V16C18.2386 16 16 18.2386 16 21H18ZM21 18C22.6569 18 24 19.3431 24 21H26C26 18.2386 23.7614 16 21 16V18ZM24 21C24 22.6569 22.6569 24 21 24V26C23.7614 26 26 23.7614 26 21H24ZM8.55279 15.8944L16.5528 19.8944L17.4472 18.1056L9.44721 14.1056L8.55279 15.8944ZM5 16C3.34315 16 2 14.6569 2 13H0C0 15.7614 2.23858 18 5 18V16ZM2 13C2 11.3431 3.34315 10 5 10V8C2.23858 8 0 10.2386 0 13H2ZM5 10C6.65685 10 8 11.3431 8 13H10C10 10.2386 7.76142 8 5 8V10ZM8 13C8 14.6569 6.65685 16 5 16V18C7.76142 18 10 15.7614 10 13H8ZM16.5528 6.10557L8.55279 10.1056L9.44721 11.8944L17.4472 7.89443L16.5528 6.10557ZM21 8C19.3431 8 18 6.65685 18 5H16C16 7.76142 18.2386 10 21 10V8ZM18 5C18 3.34315 19.3431 2 21 2V0C18.2386 0 16 2.23858 16 5H18ZM21 2C22.6569 2 24 3.34315 24 5H26C26 2.23858 23.7614 0 21 0V2ZM24 5C24 6.65685 22.6569 8 21 8V10C23.7614 10 26 7.76142 26 5H24Z"
              fill="black"
            />
          </svg>
        </div>
      </div>

      {actionArea ? (
        <div
          className={`flex min-h-full min-w-[80px] cursor-pointer items-center justify-center bg-[#F2644E] sm:hidden`}
          onClick={() => onDeletePressed(vitalityScoreData)}
        >
          <svg
            width="16"
            height="22"
            viewBox="0 0 16 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.8922 20.9999H2.82282L0.795898 5.70215H14.9191L12.8922 20.9999Z"
              stroke="#FAF4ED"
              strokeMiterlimit="10"
            />
            <path
              d="M5.34662 17.0033L4.51465 8.92822"
              stroke="#FAF4ED"
              strokeMiterlimit="10"
            />
            <path
              d="M7.85547 17.0033V8.92822"
              stroke="#FAF4ED"
              strokeMiterlimit="10"
            />
            <path
              d="M10.3672 17.0033L11.1992 8.92822"
              stroke="#FAF4ED"
              strokeMiterlimit="10"
            />
            <path
              d="M0 3.53662H15.7137"
              stroke="#FAF4ED"
              strokeMiterlimit="10"
            />
            <path
              d="M11.6097 3.53671L10.9817 1H4.72962L4.10156 3.53671"
              stroke="#FAF4ED"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      ) : (
        <div
          className="absolute top-0 bottom-0 right-0 flex cursor-pointer flex-col justify-between p-5 sm:hidden"
          onClick={() => setActionArea(true)}
        >
          <svg
            width="24"
            height="23"
            viewBox="0 0 24 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 1L14.3591 10.0527V17.1228L9.6409 21V10.0527L2 1H22Z"
              stroke="black"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      )}

      {/*{showShare &&
        <GoalsToShare
          form={props.form}
          setShowShare={setShowShare}
        />}*/}
    </div>
  )
}

export default VitalityScoreHistory;
