import React, { useEffect, useContext } from 'react'
import Context from '../context/Context'
import NavAddEmploye from './navBar/NavAddEmploye';
import HeaderRight from './includes/HeaderRight';

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
import { PieChart, Pie, } from "recharts";


import './dashboard.css'
function Dashboard() {
    const { roww, coll__1, coll__2, handleClickMenu, iconMenu } = useContext(Context);

    // useEffect
    useEffect(() => {
        if (roww.current !== null) {
            if (roww.current.offsetHeight < window.innerHeight) {
                roww.current.style.height = '100vh'
            }
        }
        document.title = "Dashboard"
    }, [])

    const data = [
        { name: '2015', fv: 5000, iv: 1000, tv: 40000 },
        { name: '2016', fv: 7000, iv: 2000, tv: 9000 },
        { name: '2017', fv: 10000, iv: 4000, tv: 5000 },
        { name: '2018', fv: 15000, iv: 7000, tv: 1000 },
        { name: '2019', fv: 20000, iv: 10000, tv: 100 },
    ]

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
                            <div className="dash-box-1">
                                <div className="dash-flex-left">
                                    <PeopleIcon className="i-mui" />
                                </div>
                                <div className="dash-flex-right">
                                    <h1>300</h1>
                                    <h3>Alger</h3>
                                </div>
                            </div>
                            <div className="dash-box-1 dash-box-2">
                                <div className="dash-flex-left">
                                    <PeopleIcon className="i-mui" />
                                </div>
                                <div className="dash-flex-right">
                                    <h1>150</h1>
                                    <h3>Oran</h3>
                                </div>
                            </div>
                            <div className="dash-box-1 dash-box-3">
                                <div className="dash-flex-left">
                                    <PeopleIcon className="i-mui" />
                                </div>
                                <div className="dash-flex-right">
                                    <h1>90</h1>
                                    <h3>Bejaia</h3>
                                </div>
                            </div>
                        </div>
                        {/* Recharts  */}
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
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area type="basis" dataKey="fv" stroke="blue" fill="blue" name="facebook" />
                                        <Area type="basis" dataKey="iv" stroke="red" fill="red" name="instagram" />
                                        <Area type="basis" dataKey="tv" stroke="black" fill="black" name="tiktok" />
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
                                        <XAxis dataKey="name" />
                                        {/* label={{ value: 'Years', offset: '-10', position: 'insideBottomRight' }} */}
                                        <YAxis />
                                        {/* label={{ value: 'Number of Vues', angle: -90, offset: '-5', position: 'insideLeft' }} */}
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="fv"
                                            stroke="blue"
                                            activeDot={{ r: 8 }}
                                            name="facebook"

                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="iv"
                                            stroke="red"
                                            activeDot={{ r: 8 }}
                                            name="instagram"
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="tv"
                                            stroke="black"
                                            activeDot={{ r: 8 }}
                                            name="tiktok"
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
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="fv" fill="blue" name="facebook" />
                                        <Bar dataKey="iv" fill="red" name="instagram" />
                                        <Bar dataKey="tv" fill="black" name="tiktok" />
                                    </BarChart>
                                </div>
                                <div className="graph graph-4 graph-2">
                                    <PieChart
                                        width={500}
                                        height={350}>
                                        <Pie
                                            dataKey="fv"
                                            valueKey="facebook"
                                            isAnimationActive={false}
                                            data={data}
                                            cx={250}
                                            cy={180}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            label
                                        />
                                        <Tooltip />
                                    </PieChart>
                                </div>
                            </div>
                        </div>
                        {/* end Recharts */}
                    </div>
                </section>
            </div >
        </>
    )
}

export default Dashboard
