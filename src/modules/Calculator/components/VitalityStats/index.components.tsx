import {FC, useEffect, useMemo, useState} from "react";
import sub from "date-fns/sub";
import add from "date-fns/add";
import {format} from "date-fns";
import HistoryTab from "./tab.component";
import VitalityHistoryGraph from "./vitalityHistoryGraph.component";
import {IVitalityScoreData} from "../../interfaces/vitalityScoreData.interface";
import {DateTime} from "luxon";

enum TIME_RANGE {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  YEAR = 'YEAR'
}

interface IProps {
  history: IVitalityScoreData[];
  onAddHistoricalDataPressed: () => void;
}

const VitalityStats: FC<IProps> = (props) => {
  const {history, onAddHistoricalDataPressed} = props;
  const [historyForDisplay, setHistoryForDisplay] = useState<IVitalityScoreData[]>([]);
  const [tab, setTab] = useState<'PROGRESS' | 'GOALS'>('PROGRESS');
  const [dateRange, setDateRange] = useState<{ start: Date, end: Date }>({
    start: DateTime.now().startOf('month').toJSDate(),
    end: DateTime.now().endOf('month').toJSDate()
  });
  const [selectedTimeRange, setSelectedTimeRange] = useState<TIME_RANGE | undefined>(TIME_RANGE.MONTH);

  const timeRanges: TIME_RANGE[] = useMemo(() => {
    return [TIME_RANGE.DAY, TIME_RANGE.WEEK, TIME_RANGE.MONTH, TIME_RANGE.YEAR];
  }, []);

  // this function will subtract the years/months, weeks, days based upon your selected time range
  const previousOrNext = (next?: boolean) => {
    let
      updatedStartDate: Date,
      updatedEndDate: Date;
    switch (selectedTimeRange) {
      case TIME_RANGE.YEAR:
        updatedStartDate = next ? add(dateRange.start, {
          years: 1,
        }) : sub(dateRange.start, {
          years: 1,
        });
        updatedEndDate = next ? add(dateRange.end, {
          years: 1,
        }) : sub(dateRange.end, {
          years: 1,
        });
        break;
      case TIME_RANGE.MONTH:
        updatedStartDate = next ? add(dateRange.start, {
          months: 1,
        }) : sub(dateRange.start, {
          months: 1,
        });
        updatedEndDate = next ? add(dateRange.end, {
          months: 1,
        }) : sub(dateRange.end, {
          months: 1,
        });
        break;
      case TIME_RANGE.WEEK:
        updatedStartDate = next ? add(dateRange.start, {weeks: 1}) : sub(dateRange.start, {
          weeks: 1,
        });
        updatedEndDate = next ? add(dateRange.end, {
          weeks: 1,
        }) : sub(dateRange.end, {
          weeks: 1,
        });
        break;
      case TIME_RANGE.DAY:
        updatedStartDate = next ? add(dateRange.start, {
          days: 1,
        }) : sub(dateRange.start, {
          days: 1,
        });
        updatedEndDate = next ? add(dateRange.end, {
          days: 1,
        }) : sub(dateRange.end, {
          days: 1,
        });
        break;
      default:
        updatedStartDate = DateTime.now().toJSDate();
        updatedEndDate = DateTime.now().toJSDate();
        break;
    }
    setDateRange({start: updatedStartDate, end: updatedEndDate});
  };

  const formatDate = (date: Date): string => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
  }

  const selectDateRangeFunc = (selectedRange: TIME_RANGE) => {
    setSelectedTimeRange(selectedRange);
    let endDate: Date, startDate: Date;
    switch (selectedRange) {
      case TIME_RANGE.YEAR:
        startDate = DateTime.now().startOf('year').toJSDate();
        endDate = DateTime.now().endOf('year').toJSDate();
        break;
      case TIME_RANGE.MONTH:
        startDate = DateTime.now().startOf('month').toJSDate();
        endDate = DateTime.now().endOf('month').toJSDate();
        break;
      case TIME_RANGE.WEEK:
        startDate = DateTime.now().startOf('week').toJSDate();
        endDate = DateTime.now().endOf('week').toJSDate();
        break;
      case TIME_RANGE.DAY:
        startDate = DateTime.now().toJSDate();
        endDate = DateTime.now().toJSDate();
        break;
    }
    setDateRange({start: startDate, end: endDate});
  };

  useEffect(() => {
    if (dateRange && history?.length > 0) {
      const startDateTime = DateTime.fromJSDate(dateRange.start);
      const endDateTime = DateTime.fromJSDate(dateRange.end);
      const res = history.filter((h) => {
        if (!h.date) {
          return false;
        }
        const dateTime = DateTime.fromISO(h.date);
        return dateTime >= startDateTime && dateTime <= endDateTime;
      })
      setHistoryForDisplay([...res]);
    }
  }, [dateRange, history]);


  return (
    <div className="bg-secondary sm:border-[1px]">
      <div className="flex w-full max-w-none flex-row flex-nowrap">
        <HistoryTab title={'Vitality Progress'} id={'PROGRESS'} tabSelected={setTab} selected={tab === 'PROGRESS'}/>
        <HistoryTab title={'Vitality Goals'} id={'GOALS'} tabSelected={setTab} selected={tab === 'GOALS'}/>
      </div>
      <div className="py-8 px-4 sm:px-12 sm:py-10">
        <div className="flex flex-row flex-nowrap justify-between gap-2 sm:gap-5">
          {timeRanges.map((tRange, index) => (
            <div
              key={index}
              className={`px:3 ms:px-8 grow cursor-pointer rounded-full border-[1px] py-2 text-center text-xs uppercase md:text-base ${
                tRange === selectedTimeRange
                  ? "bg-black text-secondary"
                  : "bg-secondary"
              }`}
              onClick={() => selectDateRangeFunc(tRange)}
            >
              <span>{tRange}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex h-16 cursor-pointer flex-row flex-nowrap items-center justify-between sm:mt-9">
          <div className="w-[12px] sm:w-[22px]" onClick={() => previousOrNext(false)}>
            <svg
              width="100%"
              height="42"
              viewBox="0 0 22 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 1.31011L1.00003 21.3L21 41.3101"
                stroke="black"
                strokeMiterlimit={10}
              />
            </svg>
          </div>
          <div className="cursor-pointer font-montserrat text-sm font-light text-black sm:text-base sm:font-bold">
            {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
          </div>
          <div className="w-[12px] sm:w-[22px]" onClick={() => previousOrNext(true)}>
            <svg
              width="100%"
              height="42"
              viewBox="0 0 22 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 41.31L21 21.3202L1 1.31006"
                stroke="black"
                strokeMiterlimit={'10'}
              />
            </svg>
          </div>
        </div>
        <div className="mt-5">
          {tab === "PROGRESS" ? (
            <div className="flex flex-row gap-4">
              <div className="w-[40px] sm:w-[80px]">
                <svg
                  width="100%"
                  height="21"
                  viewBox="0 0 80 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    y1="9.31006"
                    x2="80"
                    y2="9.31006"
                    stroke="#6D7B9B"
                    strokeWidth={2}
                  />
                  <circle cx="40" cy="10.3101" r="10" fill="#6D7B9B"/>
                </svg>
              </div>
              <div>
                <p className="font-montserrat text-base leading-5 text-primary">
                  Vitality Score
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-row gap-4">
              <div className="w-[40px] sm:w-[80px]">
                <svg
                  width="100%"
                  height="21"
                  viewBox="0 0 80 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    y1="9.31006"
                    x2="80"
                    y2="9.31006"
                    stroke="#6D7B9B"
                    strokeWidth={2}
                  />
                  <circle cx="40" cy="10.3101" r="10" fill="#7D9D92"/>
                </svg>
              </div>
              <div>
                <p className="font-montserrat text-xs leading-5 text-primary sm:text-base">
                  Vitality Score Goals
                </p>
              </div>

              <div className="w-[40px] sm:w-[80px]">
                <svg
                  width="100%"
                  height="21"
                  viewBox="0 0 80 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    y1="9.31006"
                    x2="80"
                    y2="9.31006"
                    stroke="#F7A08C"
                    strokeWidth={2}
                  />
                  <circle cx="40" cy="10.3101" r="10" fill="#F7A08C"/>
                </svg>
              </div>
              <div>
                <p className="font-montserrat text-xs leading-5 text-primary sm:text-base">
                  Metabolic Age Goals
                </p>
              </div>
            </div>
          )}

          <div className="mt-10">
            <div>
              {tab === "PROGRESS" ? (
                <VitalityHistoryGraph
                  lineData={historyForDisplay}
                  line1Color="#6D7B9B"
                  line1DataKey="score"
                  yLabel={"Score"}
                />
              ) : (
                <VitalityHistoryGraph
                  lineData={historyForDisplay}
                  line1Color="#7D9D92"
                  line2Color="#F7A08C"
                  line1DataKey="metabolicAge"
                  line2DataKey="age"
                  yLabel={"GOAL"}
                />
              )}
            </div>
          </div>
        </div>
        <div className="mt-5 text-center font-montserrat text-xl leading-6 text-black underline">
          <p
            className="cursor-pointer"
            onClick={onAddHistoricalDataPressed}
          >
            Add historical data
          </p>
        </div>
      </div>
    </div>
  )
}

export default VitalityStats;
