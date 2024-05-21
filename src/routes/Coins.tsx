import styled from 'styled-components';
import {Link} from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchCoins } from '../api';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modeAtom } from '../atoms';

import {BsFillSunFill, BsFillMoonFill} from 'react-icons/bs';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.mainTxtColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color:${(props) => props.theme.accentColor};
    /* margin-left: auto; */
    font-weight: bold;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`; 

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

const ThemeWrapper = styled.div`
    cursor: pointer;
    width: 32px;
    margin-left: 20px;
`;

const StyledBsFillMoonFill = styled(BsFillMoonFill)`
  width: 30px;
  height: 30px;
`;

const StyledBsFillSunFill = styled(BsFillSunFill)`
  width: 30px;
  height: 30px;
`;

interface ICoin {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string
}

// interface ICoinsProps {
// }

function Coins() {

    const {isLoading, data} = useQuery<ICoin[]>("allCoins", fetchCoins)
    
    const mode = useRecoilValue(modeAtom);
    const setModeAtom = useSetRecoilState(modeAtom);
    const handleModeAtom = () => setModeAtom((current) => !current);

    return (
        <Container>
            <Header>
                <Title>Cyptos Top 100</Title>
                <ThemeWrapper onClick={handleModeAtom}>
                {mode ? <StyledBsFillSunFill color = "white"/> : <StyledBsFillMoonFill color = "black"/>}
                </ThemeWrapper>
            </Header>
            {isLoading ? 
                <Loader>Loading ... </Loader>
                : 
                <CoinList>
                {data?.slice(0,100).map(coin => (
                    <Coin key={coin.id}>
                        <Link to={{
                            pathname: `/${coin.id}`,
                            state: { name: coin.name },
                        }}>
                            <Img 
                                src={`https://static.coinpaprika.com/coin/${coin.id}/logo.png`}
                                // {`https://cryptoicon-api.pages.dev/api/icon/${coin.symbol.toLowerCase()}`}
                            />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                ))}
                </CoinList>
            }
        </Container>
    );
}

export default Coins;