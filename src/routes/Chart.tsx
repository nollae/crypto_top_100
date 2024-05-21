import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import styled from 'styled-components';
import { MdOutlineCandlestickChart, MdOutlineShowChart } from "react-icons/md";
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { modeAtom } from '../atoms';

const ChartButtons = styled.div`
  margin-left: 14px;
  display: flex;
  flex-direction: row;
  gap: 6px;
`;

const Button = styled.button<{$isActive:boolean}>`
  color: ${(props) => props.$isActive ? props.theme.bgColor : props.theme.focusColor};
  border: none;
  /* border: 2px solid ${(props) => props.$isActive ? props.theme.accentColor : props.theme.focusColor}; */
  border-radius: 0.4rem;
  background-color: ${(props) => props.$isActive ? props.theme.accentColor : props.theme.boxColor};
  padding: 8px;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    /* border: 2px solid ${(props) => props.theme.accentColor}; */
    color: ${(props) => props.theme.bgColor};
    cursor: pointer;
  }
`;


interface CharProps {
    coinId: string;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

function LineChart({data}:{data?: IHistorical[]}){

    const mode = useRecoilValue(modeAtom);

    return (
        <ApexChart
            type="line"
            series={[
                {
                    name: "Price",
                    data: data?.map((price) => parseFloat(price.close)) ?? [],
                },
            ]}
            options={{
                theme: {
                    mode: mode ? "dark" : "light" ,
                },
                chart: {
                    height: 300,
                    width: 500,
                    toolbar: {
                        show: false
                    },
                    background: "transparent",
                },
                grid: {
                    show: false
                },
                stroke: {
                    curve: "smooth",
                    width: 4,
                },
                yaxis: {
                    show: false,
                },
                xaxis: {
                    labels: {
                        show: false,
                        datetimeFormatter: {month: "mmm yy"} 
                    },
                    axisTicks: {
                        show: false
                    },
                    axisBorder: {
                        show: false
                    },
                    type: "datetime",
                    categories: data?.map((price) => new Date(price.time_close * 1000).toUTCString()),
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        gradientToColors: ["#0be881"],
                        stops: [0, 100]
                    }
                },
                colors: ["#0fbcf9"],
                tooltip: {
                    y: {
                        formatter: (value) => `$${value.toFixed(2)}`
                    }
                }
            }}
        />
    );
}

function CandlestickChart({data}: {data?: IHistorical[]}){

    const mode = useRecoilValue(modeAtom);

    return (
        <ApexChart 
            type="candlestick"
            series={[
                {
                    name: "Price",
                    data: data?.map((price) => {
                        const date = new Date(price.time_open * 1000);
                        const month = (date.getMonth() + 1).toString().padStart(2, "0");
                        const day = date.getDate().toString().padStart(2, "0");

                        const open = parseFloat(price.open), high = parseFloat(price.high),
                              low = parseFloat(price.low), close = parseFloat(price.close);
                      return {
                        x: `${month}-${day}`,
                        y: [open, high , low , close],
                      };
                    }) ?? [],
                },
            ]}
            options={{
                theme: {mode: mode ? "dark" : "light"},
                chart: {
                    height: 800,
                    width: 800,
                    toolbar: {
                      show: false,
                    },
                    background: "transparent",
                },
                yaxis: {
                    show: false,
                },
                xaxis: {
                    type: "category",
                    labels: {
                        show: true,
                        formatter: (value) => {
                            return value;
                        },
                    },
                },
                fill: {
                    type: "solid",
                },
                plotOptions: {
                    candlestick: {
                        wick: {
                        useFillColor: true,
                        },
                        colors: {
                        upward: "#0fbcf9",
                        downward: "#ff2222",
                        },
                    },
                },
                tooltip: {
                    enabled: true
                }
            }}
            
        />
    );
}

function Chart({coinId}:CharProps){

    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], 
        () => fetchCoinHistory(coinId), 
        {
            refetchInterval: 10000,
        }
    );
    
    const [chartType, setChartType] = useState("line");

    const handleChartType = (type:string) => {
        setChartType(type);
    }



    return (
        <div>
            <ChartButtons>
                <Button $isActive={chartType === "line"} onClick={() => handleChartType("line")}>
                    <MdOutlineShowChart size={20} />
                </Button>
                <Button $isActive={chartType === "candle"} onClick={() => handleChartType("candle")}>
                    <MdOutlineCandlestickChart size={20} />
                </Button>
            </ChartButtons>
            {isLoading ? 
                "Loading chart..." 
                : !data ? ("No Data") : 
                (chartType === "line") ?  
                    <LineChart data={data} />
                    :
                    <CandlestickChart data={data} />
            }
        </div>
    );
}

export default Chart;