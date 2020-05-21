import styled, { css } from 'styled-components'

const REA_RED = '#e4002b'

export const Border = styled.div`
  width: 53mm;
  height: 85mm;
  background: ${REA_RED};
  padding: 5px;
  border-radius: 5px;
  display: flex;
`

export const InnerCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #f7fafc;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const LangaugeBackground = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0;
  height: 0;
  border: 25px solid transparent;
  border-top-color: ${REA_RED};
  border-left-color: ${REA_RED};

  z-index: 10;
`

export const Langauge = styled(LangaugeBackground)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  background-image: url('${props => props.icon}');
  background-size: 40%;
  background-position: center;
  border: 2.5px solid white;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);

  z-index: 10;
`

export const Name = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  background-color: white;
  border-bottom: 2px solid ${REA_RED};
  font-size: 8px;
  font-weight: bold;
  text-align: center;
  margin: 0px;
  padding: 4px 2.5px 4px 50px;
  margin-left: 0;

  z-index: 9;
`

export const Image = styled.div`
  position: relative;
  width: 100%;
  height: 50%;
  border-bottom: 2px solid ${REA_RED};
  background-image: url('${props => props.img}');
  background-size: cover;
  background-position: center;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: white;
    border-right-color: white;
  }
`

export const Bg = styled.div`
  flex-grow: 1;
  width: 100%;
  background-image: url('/static/watercolor_red.jpg');
  background-size: cover;
  display: flex;
  flex-direction: column;
`

export const Title = styled.span`
  position: relative;
  height: 15px;
  color: white;
  background: ${REA_RED};
  padding-left: 5px;
  padding-right: 5px;
  font-size: 8px;
  margin-right: auto;
  display: inline-flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    left: 100%;
    border: 7.5px solid transparent;
    border-top-color: ${REA_RED};
    border-left-color: ${REA_RED};
  }
`

export const Stats = styled.div`
  width: 100%;
  padding: 5px;
  font-size: 10px;
  margin-top: 10px;
  display: grid;
  grid-column-gap: 8px;
  grid-row-gap: 10px;
  grid-template-columns: auto 1fr auto;
  align-items: center;
`

export const Stat = styled.span`
  font-weight: bold;
  text-align: right;

  &::after {
    content: "${props => props.points === 1 ? ' pt' : ' pts'}";
    font-size: 6px;
  }

  ${props => props.type === 'pos' && css`
    color: green;

    &::before {
      content: "+"
    }
  `}

  ${props => props.type === 'neg' && css`
    color: ${REA_RED};

    &::before {
      content: "-"
    }
  `}
`

export const StatText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`

export const StatSmol = styled.span`
  font-size: 6px;
  font-weight: bold;
  letter-spacing: 1px;
  margin-bottom: 2px;
  opacity: 0.65;
`

export const StatIcon = styled.div`
  justify-self: center;
`

export const DreamJob = styled.img`
  justify-self: center;
  width: 20px;
  color: crimson;
`

export const IDE = styled(StatIcon)`
  width: 20px;
  height: 20px;
  background-image: url('${props => props.icon}');
  background-size: cover;
  background-position: center;
`
