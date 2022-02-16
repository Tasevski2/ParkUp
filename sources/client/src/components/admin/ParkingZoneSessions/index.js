import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Wrapper,
  Title,
  SessionsWrapper,
  StatsWrapper,
  Stats,
  KeyValueWrapper,
  StatsKey,
  StatsValue,
  SearchField,
  SearchIcon,
} from './styles';
import SessionCard from './SessionCard';
import { sessionStatus } from '../../../config/enums';
import useGetSessions from '../../../hooks/useGetSessions';
import AbsoluteLoader from '../../Loaders/AbsoluteLoader';

import useActivateSession from '../../../hooks/useActivateSession';

const sortSessions = (a, b) => {
  // first - yellow/idle, second - red/finished, third - green/active
  switch (a.status) {
    case sessionStatus.active:
      switch (b.status) {
        case sessionStatus.active:
          return -1;
        case sessionStatus.over:
        case sessionStatus.idle:
          return 1;
        default:
          return 1;
      }
    case sessionStatus.over:
      switch (b.status) {
        case sessionStatus.active:
        case sessionStatus.over:
          return -1;
        case sessionStatus.idle:
          return 1;
        default:
          return 1;
      }
    case sessionStatus.idle:
      switch (b.status) {
        case sessionStatus.active:
        case sessionStatus.over:
        case sessionStatus.idle:
          return -1;
        default:
          return 1;
      }
    default:
      return -1;
  }
};

const ParkingZoneSessions = ({ zone }) => {
  const { isLoading: isLoadingActivateSession, activateSession } =
    useActivateSession();
  const { data: sessions, isLoading: isLoadingSessions, setData: setSessions } = useGetSessions(zone.pzId); 
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({
    activeSessions: 0,
    idleSessions: 0,
    overSessions: 0,
  });

  const setSessionsStats = () => {
    let aS = 0;
    let iS = 0;
    let oS = 0;
    sessions.forEach((s) => {
        switch (s.status) {
            case sessionStatus.active:
                aS += 1;
                break;
            case sessionStatus.idle:
                iS += 1;
                break;
            case sessionStatus.over:
                oS += 1;
                break;
            default:
                break;
        }
    });
    setStats({
      activeSessions: aS,
      idleSessions: iS,
      overSessions: oS,
    });
  };

  const onActivateSession = ({ updatedSession  }) => {
    const updatedSessions = sessions.filter(
        (s) => s.pssId !== updatedSession.pssId
    );
    setSessions([...updatedSessions, updatedSession]);  
  };

  const handleActivateSession = ({ pssId, parkingSpaceName }) => {
    activateSession({ pssId, parkingSpaceName, onActivateSession });
  };

  const onDeleteSession = ({ pssId }) => {
    setSessions((prevState) => prevState.filter((s) => s.pssId !== pssId));
  };

  const freeParkingSpaces = useMemo(() => {
    if(!zone) return 0;
    return zone.parkingSpaces.length - stats.activeSessions
  }, [zone?.parkingSpaces, stats])

  useEffect(() => {
    setSessionsStats();
  }, [sessions]);

  return (
      <Wrapper>
          <Title>ОТВОРЕНИ ПАРКИНГ СЕСИИ</Title>
          <StatsWrapper>
              <Stats>
                  {/* PARKING SPACES STATS*/}
                  <KeyValueWrapper>
                      <StatsKey>Вкупно паркинг места:</StatsKey>
                      <StatsValue>{zone.parkingSpaces.length}</StatsValue>
                  </KeyValueWrapper>
                  <KeyValueWrapper>
                      <StatsKey>Слободни паркинг места:</StatsKey>
                      <StatsValue>{freeParkingSpaces}</StatsValue>
                  </KeyValueWrapper>
                  <KeyValueWrapper>
                      <StatsKey>Зафатени паркинг места:</StatsKey>
                      <StatsValue>
                          {zone.parkingSpaces.length - freeParkingSpaces}
                      </StatsValue>
                  </KeyValueWrapper>
              </Stats>
              {/* SESSIONS STATS*/}
              <Stats>
                  <KeyValueWrapper>
                      <StatsKey>Активни паркинг сесии:</StatsKey>
                      <StatsValue>{stats.activeSessions}</StatsValue>
                  </KeyValueWrapper>
                  <KeyValueWrapper>
                      <StatsKey>Завршени паркинг сесии:</StatsKey>
                      <StatsValue>{stats.overSessions}</StatsValue>
                  </KeyValueWrapper>
                  <KeyValueWrapper>
                      <StatsKey>Неактивни паркинг сесии:</StatsKey>
                      <StatsValue>{stats.idleSessions}</StatsValue>
                  </KeyValueWrapper>
              </Stats>
          </StatsWrapper>
          <SearchField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                  startAdornment: <SearchIcon />,
              }}
          />
          <SessionsWrapper>
              {isLoadingSessions ? (
                  <AbsoluteLoader
                      containerStyle={{
                          width: '150px',
                          height: '150px',
                          margin: 'auto',
                          marginTop: '50px',
                      }}
                  />
              ) : (
                  <>
                      {sessions
                          .filter((session) =>
                              session.plate.plate
                                  .concat(
                                      ` ${session.parkingSpace?.psName ?? ''}`
                                  )
                                  .toLowerCase()
                                  .includes(search.trim().toLowerCase())
                          )
                          .sort(sortSessions)
                          .map((session) => (
                              <SessionCard
                                  key={session.pssId}
                                  {...session}
                                  handleActivateSession={handleActivateSession}
                                  isLoadingActivateSession={
                                      isLoadingActivateSession
                                  }
                                  onDeleteSession={onDeleteSession}
                              />
                          ))}
                  </>
              )}
          </SessionsWrapper>
      </Wrapper>
  );
};

export default ParkingZoneSessions;
