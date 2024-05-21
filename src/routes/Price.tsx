import styled from 'styled-components';

const MaxContainer = styled.div`
  display: grid;
  justify-items: center;  
`;

const MaxBox = styled.div`
  background-color: ${(props) => props.theme.divColor};
  padding: 10px;
  border-radius: 15px;
  width: 100%;
  margin-bottom: 20px;
`;

const MaxStyle = styled.span`
  font-size: 14px;
  display: grid;
  justify-content: center;
  text-align: left;
  color: ${(props) => props.theme.grayText};
  font-weight: 600;
`;

const BoxContainter = styled.div`
  display: grid;
  justify-items: center;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);  
  margin-block-end: 10%;
`;


const Box = styled.div`
  background-color: ${(props) => props.theme.divColor};
  padding: 20px;
  border-radius: 15px;
  width: 100%;
`;

const PercentBox = styled.div<{ percent: number | undefined }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${(props) =>
    props.percent
      ? props.percent > 0
        ? "#4880EE"
        : props.percent < 0
        ? "#DA5157" 
        : "#000"
      : "none"};
`;

const Time = styled.span`
  font-size: 13px;
  display: block;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 10px;
  color: ${(props) => props.theme.grayText};
  font-weight: 600;
`;

const Percent = styled.span`
  font-size: 35px;
  font-weight: 600;
`;

interface PricePros {
    coinId: string;
    usdInfo?: USDInfo;
}

interface USDInfo {
    "price": number;
    "volume_24h": number;
    "volume_24h_change_24h": number;
    "market_cap": number;
    "market_cap_change_24h": number;
    "percent_change_15m": number;
    "percent_change_30m": number;
    "percent_change_1h": number;
    "percent_change_6h": number;
    "percent_change_12h": number;
    "percent_change_24h": number;
    "percent_change_7d": number;
    "percent_change_30d": number;
    "percent_change_1y": number;
    "ath_price": number;
    "ath_date": string;
    "percent_from_price_ath": number;
}



function Price({coinId, usdInfo}:PricePros){

    const percentList = [
        {text: "30분", value: usdInfo?.percent_change_30m},
        {text: "1시간", value: usdInfo?.percent_change_1h},
        {text: "24시간", value: usdInfo?.percent_change_24h},
        {text: "7일", value: usdInfo?.percent_change_7d},
        {text: "30일", value: usdInfo?.percent_change_30d},
        {text: "1년", value: usdInfo?.percent_change_1y},
    ];

    return (
        <div>
            <MaxContainer>
                <MaxBox>
                  <MaxStyle>최고가: {usdInfo?.ath_price?.toFixed(3)}  ({usdInfo?.ath_date?.slice(0,10)})</MaxStyle>
                  <MaxStyle>최고가와 현재 시세의 차이</MaxStyle>
                  <PercentBox percent={usdInfo?.percent_from_price_ath}>
                    <Percent>
                      {usdInfo?.percent_from_price_ath && usdInfo?.percent_from_price_ath > 0 
                      ? `To the moon!`
                      : `${usdInfo?.percent_from_price_ath}%`}
                    </Percent>
                  </PercentBox>
                </MaxBox>
              </MaxContainer>
              <BoxContainter>{
              percentList.map( (item) => (
                <Box key ={item.text}>
                  <Time> {item.text}전과 현재 시세 차이</Time>
                  <PercentBox percent={item.value}>
                    <Percent>
                      {item.value && item.value > 0 
                      ? `+${item.value}%`
                      : `${item.value}%`}
                    </Percent>
                  </PercentBox> 
                </Box>
              ))}
              </BoxContainter>
        </div>
    );
}

export default Price;