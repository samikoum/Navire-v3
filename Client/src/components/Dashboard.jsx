import React, { useState, useEffect, useContext } from 'react'
import Context from '../context/Context'
import axios from 'axios'
import NavAddEmploye from './navBar/NavAddEmploye';
import HeaderRight from './includes/HeaderRight';
import Fade from 'react-reveal/Fade';

import PeopleIcon from '@mui/icons-material/People';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

import {
    AreaChart,
    Area,
} from "recharts";

import { BarChart, Bar } from "recharts";
import { PieChart, Pie, Cell } from "recharts";


import './dashboard.css'
// test Recharts js Circle
const COLORS = ["blue", "yellow", "green"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index
}: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// end Recharts js Circle
function Dashboard() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);

    // useState
    const [countAlger, setCountAlger] = useState(null)
    const [countOran, setCountOran] = useState(null)
    const [countBejaia, setCountBejaia] = useState(null)
    const [data, setData] = useState([])
    const [circleData, setCircleData] = useState([])

    // useEffect
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/dashboard`).then((response) => {
            setCountAlger(response.data[0][0].countA)
            setCountOran(response.data[1][0].countO)
            setCountBejaia(response.data[2][0].countB)
        }).catch((error) => {
            console.log(error)
        })
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
        document.title = "Dashboard"
    }, [])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}/test`).then((response) => {
            console.log(response.data)
            setData(response.data[0])
            setCircleData(response.data[1])
        }).catch((error) => {
            console.log(error)
        })
    }, [])



    return (
        <>
            <div className="roww" ref={roww} >
                <section className="coll-1" ref={coll__1}>
                    <NavAddEmploye current="Dashboard" />
                </section>
                <section className="coll-2 " ref={coll__2}>
                    <HeaderRight />
                    <div className="coll-2-container coll-2-container-dashboard" >
                        <div className="dash-flex-container">
                            <Fade left >
                                <div className="dash-box-1">
                                    <div className="dash-flex-left">
                                        <PeopleIcon className="i-mui" />
                                    </div>
                                    <div className="dash-flex-right">
                                        <h1>{countAlger}</h1>
                                        <h3>Alger</h3>
                                    </div>
                                </div>
                            </Fade>
                            <Fade top>
                                <div className="dash-box-1 dash-box-2">
                                    <div className="dash-flex-left">
                                        <PeopleIcon className="i-mui" />
                                    </div>
                                    <div className="dash-flex-right">
                                        <h1>{countOran}</h1>
                                        <h3>Oran</h3>
                                    </div>
                                </div>
                            </Fade>
                            <Fade right >
                                <div className="dash-box-1 dash-box-3">
                                    <div className="dash-flex-left">
                                        <PeopleIcon className="i-mui" />
                                    </div>
                                    <div className="dash-flex-right">
                                        <h1>{countBejaia}</h1>
                                        <h3>Bejaia</h3>
                                    </div>
                                </div>
                            </Fade>
                        </div>

                        {/* Recharts  */}
                        <Fade cascade>
                            <div className="recharts">
                                <div className="recharts__1">
                                    <div className="graph graph-1">
                                        <AreaChart
                                            width={500}
                                            height={350}
                                            data={data}
                                            margin={{
                                                top: 0,
                                                right: 0,
                                                left: 0,
                                                bottom: 0
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" />
                                            <YAxis />
                                            <Tooltip />
                                            <Area type="basis" dataKey="countA" stroke="blue" fill="blue" name="Alger" />
                                            <Area type="basis" dataKey="countB" stroke="yellow" fill="yellow" name="Bejaia" />
                                            <Area type="basis" dataKey="countO" stroke="green" fill="green" name="Oran" />
                                        </AreaChart>
                                    </div>
                                    <div className="graph graph-2">
                                        <LineChart
                                            width={500}
                                            height={350}
                                            data={data}
                                            margin={{
                                                top: 5,
                                                right: 0,
                                                left: 0,
                                                bottom: 0
                                            }}

                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" />
                                            {/* label={{ value: 'Years', offset: '-10', position: 'insideBottomRight' }} */}
                                            <YAxis label={{ value: 'Number of Employes', angle: -90, offset: '10', position: 'insideLeft' }} />
                                            {/* label={{ value: 'Number of Vues', angle: -90, offset: '-5', position: 'insideLeft' }} */}
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="countA"
                                                stroke="blue"
                                                activeDot={{ r: 8 }}
                                                name="Erenav Alger"

                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="countB"
                                                stroke="yellow"
                                                activeDot={{ r: 8 }}
                                                name="Erenav Bejaia"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="countO"
                                                stroke="green"
                                                activeDot={{ r: 8 }}
                                                name="Erenav Oran"
                                            />

                                        </LineChart>
                                    </div>
                                </div>
                                <div className="recharts__1">
                                    <div className="graph graph-3 graph-1">
                                        <BarChart
                                            width={500}
                                            height={350}
                                            data={data}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="year" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="countA" fill="blue" name="Erenav Alger" />
                                            <Bar dataKey="countB" fill="yellow" name="Erenav Bejaia" />
                                            <Bar dataKey="countO" fill="green" name="Erenav Oran" />
                                        </BarChart>
                                    </div>
                                    <div className="graph graph-4 graph-2">
                                        <PieChart
                                            width={500}
                                            height={350}>
                                            {/* <Pie
                                                dataKey="countA"
                                                valueKey="countA"
                                                isAnimationActive={false}
                                                data={data}
                                                cx={250}
                                                cy={180}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                label
                                            /> */}
                                            <Pie
                                                data={circleData}
                                                cx={250}
                                                cy={180}
                                                labelLine={false}
                                                label={renderCustomizedLabel}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="count"

                                            >
                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </div>
                                </div>
                            </div>
                        </Fade>
                        {/* end Recharts */}
                    </div>
                </section>
            </div >
        </>
    )
}

export default Dashboard
