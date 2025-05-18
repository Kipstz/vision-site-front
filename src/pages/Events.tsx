import { useContext, useEffect, useState } from "react";
import HeaderAndFooterLayout from "../layouts/HeaderAndFooterLayout";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { BiTime } from 'react-icons/bi'
import { api } from "../axios";
import { FlexColumn } from "../layouts/Flex";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import Logo from "../components/misc/Logo";
import StoreContext from "../StoreContext";
export const Events: React.FC = () => {
  const [events, setEvents] = useState([]);
  const [offset, setOffset] = useState(0);
  const {serverType, setServerType} = useContext(StoreContext);

  const firstDay = dayjs().add(offset, 'days').startOf('week')

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.post(`/event/get-by-date`, {
        after: dayjs().add(offset, 'days').startOf('week').format(),
        before: dayjs().add(offset, 'days').endOf('week').format(),
        type: serverType
      });
      setEvents(response.data?.data?.events ?? [])
    }
    fetchData().catch(() => {
      enqueueSnackbar('Une erreur est survenue pendant la récupération des events.')
    })
  }, [offset, serverType])

  return (
    <HeaderAndFooterLayout>
      <FlexColumn className="events">
        <div className="header__events">
          <div className="TitleContainer">
            <h1>EVENEMENTS</h1>
            <span>ANIMATIONS ET ACTIVITÉS DE LA SEMAINE</span>
          </div>


          <div className="date">
            <div onClick={() => setOffset(offset - 7)}>
              <ChevronLeftRoundedIcon />
            </div>
            <div className="format">{dayjs().add(offset, 'days').startOf('week').format('DD.MM')} - {dayjs().add(offset, 'days').endOf('week').format('DD.MM')}</div>
            <div onClick={() => setOffset(offset + 7)}>
              <ChevronRightRoundedIcon />
            </div>
          </div>

          <div className="TypeSelector">
            <div className={"El" + (serverType === 0 ? ' Selected' : '')} onClick={() => setServerType(0)}>WL</div>
            <div className={"El" + (serverType === 1 ? ' Selected' : '')} onClick={() => setServerType(1)}>FA</div>
          </div>
        </div>
        <div className="events__wrapper">
          {Array(7)
            .fill(1)
            .map((_event, index) => (
              <div className="event FadeIn">
                <div className="event__header" style={
                  events.filter(e => firstDay.add(index, 'days').isSame(e.date, 'day')).length > 0 ?
                    { backgroundImage: ('url(' + events.filter(e => firstDay.add(index, 'days').isSame(e.date, 'day'))?.[0]?.image + ')') } :
                    {}}>
                  <div className="header__date">
                    <span className="date__day">{firstDay.add(index, 'days').format('dddd')}</span>
                    <span className="date__number">{firstDay.add(index, 'days').format('DD')}</span>
                  </div>
                </div>
                <div className="event__items">
                  {
                    events.filter(e => firstDay.add(index, 'days').isSame(e.date, 'day')).map((e) => (
                      <div className="item">
                        <div className="item__left">
                          <h2 className="item__name">{e.title}</h2>
                          <span className="item__location">{e.place}</span>
                        </div>

                        <div className="item__right">
                          <div className="hour__wrapper">
                            <BiTime />
                            <span>{dayjs(e.date).format('HH:mm')}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  {
                    events.filter(e => firstDay.add(index, 'days').isSame(e.date, 'day')).length === 0 && <div className="placeholder">
                      Il n'y a aucun évènement de prévu ce jour.
                      <Logo />
                    </div>
                  }
                </div>
              </div>
            ))}
        </div>
      </FlexColumn>
    </HeaderAndFooterLayout>
  )
}
