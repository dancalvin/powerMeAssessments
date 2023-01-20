import {FC, useEffect, useState} from "react";
import calculatorStyles from '../../../shared/styles/index.module.scss';
import VitalityStats from "../components/VitalityStats/index.components";
import styles from "../../../shared/styles/index.module.scss";
import {IVitalityScoreData} from "../interfaces/vitalityScoreData.interface";
import VitalityScoreHistoryItem from "../components/VitalityScoreHistoryItem";
import VitalityScoreDeleteModal from "../components/VitalityScoreDeleteModal";
import {getPatient} from "../../../shared/services/lifeOmic/patient";
import {notification} from "antd";
import {ILifeOmicPatient} from "../../../shared/services/lifeOmic/interfaces/LifeOmicPatient.interface";
import {GetMeasurements} from "../../../shared/services/doTerra";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ApplicationAuth} from "../../../shared/services/doTerra";
//@ts-ignore
import Loading from 'react-fullscreen-loading';
import CreateEditVitalityItemModal from "../components/CreateEditVitalityItemModal";
import ShareHistoryItem from "../components/ShareHistoryItem";

const History: FC<any> = () => {
  const [history, setHistory] = useState<IVitalityScoreData[]>([]);
  const [itemToDelete, setItemToDelete] = useState<IVitalityScoreData | undefined>(undefined);
  const [itemToShow, setItemToShow] = useState<IVitalityScoreData | undefined>(undefined);
  const [showCreateOrUpdate, setShowCreateOrUpdate] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [patient, setPatient] = useState<ILifeOmicPatient | undefined>(undefined);
  const handleOnDelete = (wasDeleted?: boolean) => {
    if (wasDeleted && itemToDelete) {
      const index = history.findIndex(item => item.id === itemToDelete.id);
      if (index > -1) {
        const copy = [...history];
        copy.splice(index, 1);
        setHistory(copy);
      }
      notification.success({message: 'The historical item was deleted successfully'});
    }
    setItemToDelete(undefined);
  }

  const handleOnItemSaved = (item: IVitalityScoreData) => {
    setShowCreateOrUpdate(false);
    setItemToShow(undefined);
    setHistory([item, ...history]);
    notification.success({message: 'Historical data added successfully!'})
  }

  const handleOnItemUpdated = (item: IVitalityScoreData) => {
    const copy = [...history];
    const index = copy.findIndex(h => h.id === item.id);
    if (index > -1) {
      copy[index] = item;
      setHistory(copy);
    }
    setShowCreateOrUpdate(false);
    setItemToShow(undefined);
    notification.success({message: 'Historical data updated successfully!'})
  }

  useEffect(() => {
    getPatient()
      .then(setPatient)
      .catch(error => {
        notification.open({
          message: 'Error',
          description: error || 'Error getting the patient',
          type: 'error'
        });
      })
  }, []);

  useEffect(() => {
    if (patient) {
      setLoading(true)
      ApplicationAuth().then(loginResponse => {
        return GetMeasurements({patientId: patient.id}, loginResponse.accessToken)
      })
        .then(res => {
          setHistory(res);
          setLoading(false)
        })
        .catch(error => {
          toast(error || 'Error getting the historical data');
          setLoading(false);
        })
    }
  }, [patient])

  return (
    <div className={styles['steps']}>
      <ToastContainer/>
      <Loading loading={loading} background={"rgba(0,0,0,0.3)"} loaderColor="#F2644E"/>
      <div className={`${calculatorStyles['auto__container']}`}>
        <div className={`container mt-0 w-full max-w-none sm:mb-8 sm:px-6`}>
          <div className="bg-primary sm:bg-transparent">
            <h1 className="mb-[60px] max-sm:mb-0 max-sm:!py-8 max-sm:text-white">
              Vitality History
            </h1>
          </div>
          <VitalityStats history={history} onAddHistoricalDataPressed={() => setShowCreateOrUpdate(true)}/>
          <div className="max-sm:px-[16px]">
            {history.map((item) => (
              <VitalityScoreHistoryItem vitalityScoreData={item}
                                        showShare={() => {
                                          setItemToShow(item);
                                          setShowShare(true);
                                        }}
                                        key={item.id}
                                        onDeletePressed={setItemToDelete}
                                        onShowDetail={(item) => {
                                          setItemToShow(item);
                                          setShowCreateOrUpdate(true);
                                        }}/>
            ))}
          </div>
        </div>
      </div>
      {
        itemToDelete && <VitalityScoreDeleteModal item={itemToDelete} onClose={handleOnDelete}/>
      }
      {
        showCreateOrUpdate && <CreateEditVitalityItemModal
          onItemSaved={handleOnItemSaved}
          onItemUpdated={handleOnItemUpdated}
          patient={patient}
          onClose={() => {
            setShowCreateOrUpdate(false);
            setItemToShow(undefined);
          }} item={itemToShow}/>
      }
      {
        (showShare && itemToShow) &&
        <ShareHistoryItem item={itemToShow} onClose={() => {
          setItemToShow(undefined);
          setShowShare(false);
        }}/>
      }
    </div>
  )
}

export default History;
