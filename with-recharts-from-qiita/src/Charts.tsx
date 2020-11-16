//import * as React from 'react';
import React, { useState, useEffect } from "react";

import { Theme, createStyles, makeStyles } from '@material-ui/core';

import {
  Paper,
  Typography,
  Grid,
  // CircularProgress
} from '@material-ui/core';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
} from 'recharts';

import { format, getUnixTime, parse } from 'date-fns'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    charts: {
      width: '100%',
      height: '300px',
    },
    card: {
      width: '100%',
      height: '300px',
    }
  }),
);

export type Contacts = {
  date: string,
  data: Array<any>
};
export type Querents = {
  date: string,
  data: Array<any>
};
export type Patients = {
  date: string,
  data: Array<any>
};
export type PatientsSummary = {
  date: string,
  data: Array<any>
};
export type DischargesSummary = {
  date: string,
  data: Array<any>
};
export type Inspections = {
  date: string,
  data: Array<any>
};
export type InspectionsSmmary = {
  date: string,
  data: {
    都内: Array<any>,
    その他: Array<any>
  },
  labels: Array<string>
};
export type MainSummary = {
  attr: string,
  value: number,
  children: Array<any>
};

export type ICovid19Data = {
  contacts: Contacts
  querents: Querents,
  patients: Patients,
  patients_summary: PatientsSummary,
  discharges_summary: DischargesSummary,
  inspections: Inspections,
  inspections_summary: InspectionsSmmary,
  lastUpdate: string,
  main_summary: MainSummary
};

type Props = {};

// FetchAPIでのデータ取得先
const url = "https://raw.githubusercontent.com/tokyo-metropolitan-gov/covid19/development/data/data.json"

const chart_margin = { top: 5, right: 50, left: 50, bottom: 25 };

/*
* Rechartsで可視化
*/
export const Charts = (props: Props) => {

  const [codiva_data, setData] = useState<ICovid19Data | undefined>();
  const [loading, setLoading] = useState(true);

  const classes = useStyles(props);

  // useEffect
  useEffect(() => {
    console.log('useEffect');

    let cleanedUp = false;

    const fetchData = async () => {
      const response = await fetch(url);
      const result: ICovid19Data = await response.json();

      if (!cleanedUp) { // unmount後にデータの読み込みが完了した場合はデータを設定しない
        // Objectをコピーする。 Object.assign でも良い。
        setData(prevState => {
          return { ...prevState, ...result };
        });

        setLoading(false);
      }
    };

    fetchData();

    return () => { cleanedUp = true; }; //　戻り値の関数がunmount時点で実行される

  }, [setData]);

  if (loading || codiva_data === undefined) {
    console.log("Loadingの表示");
    return (<div>loading ....</div>)

  } else {
    console.log("グラフの表示");

    const patients = codiva_data.patients_summary.data;
    for (var key in patients) {
      patients[key].date = getUnixTime(parse(patients[key].日付, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx", new Date())) * 1000;
    }

    const contacts = codiva_data.contacts.data;
    for (key in contacts) {
      contacts[key].date = getUnixTime(parse(contacts[key].date, 'yyyy-MM-dd', new Date())) * 1000;
    }

    const querents = codiva_data.querents.data;
    for (key in querents) {
      querents[key].date = getUnixTime(parse(querents[key].date, 'yyyy-MM-dd', new Date())) * 1000;
    }

    // const inspections = Array();
    const inspections = []
    for (key in codiva_data.inspections_summary.labels) {
      inspections.push({
        date: getUnixTime(parse(codiva_data.inspections_summary.labels[key], 'M/d', new Date())) * 1000,
        tokyo: codiva_data.inspections_summary.data.都内[key],
        other: codiva_data.inspections_summary.data.その他[key],
      })
    }

    return (
      <Grid container className={classes.root} spacing={3} justify="center" >
        <Grid item xs={6} >
          <Paper>
            <Typography variant="h5">陽性患者数</Typography>
            <div className={classes.charts}>
              {/* // 親要素でwidth,heightの指定が必要。 */}
              <ResponsiveContainer width="95%">
                <BarChart
                  // ResponsiveContainerを利用しない場合はwidth,heightを指定する
                  // width={600}  //グラフ全体の幅を指定
                  // height={280}  //グラフ全体の高さを指定          
                  data={patients} // 表示するデータ  
                  margin={chart_margin}>
                  <XAxis // X軸
                    dataKey="date" // X軸の基準となるデータ項目名
                    tickFormatter={(x) => format(x, 'M/d')} // X軸を YYYY/MM/DD 形式で表示します
                  />
                  <YAxis
                    domain={[0, 10]}
                    ticks={[0, 2, 4, 6, 8, 10]} // Y軸に表示する温度
                    unit="人" // Y軸の単位
                  />
                  <CartesianGrid // ガイド線の表示
                    stroke="#ccc"
                    strokeDasharray="3 3"
                  />
                  <ChartTooltip // ツールチップの表示
                    labelFormatter={(x) => format(x as number, 'M/d')} // ラベルの表示フォーマット（日付）
                  />
                  <Bar
                    name="陽性患者数"
                    dataKey="小計" // charts_data のキー
                    stroke="salmon" // 線の色
                    fill="salmon"
                    unit="人" //単位
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper>
            <Typography variant="h5">検査実施数</Typography>
            <div className={classes.charts}>
              <ResponsiveContainer width="95%">
                <BarChart data={inspections} margin={chart_margin}>
                  <XAxis dataKey="date" tickFormatter={(x) => format(x, 'M/d')} />
                  <YAxis domain={[0, 250]} ticks={[0, 50, 100, 150, 200, 250]} unit="人" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                  <ChartTooltip labelFormatter={(x) => format(x as number, 'M/d')} />
                  <Bar name="都内発生" dataKey="tokyo" stackId="a" stroke="salmon" fill="salmon" unit="人" />
                  <Bar name="その他" dataKey="other" stackId="a" stroke="#8884d8" fill="#8884d8" unit="人" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper>
            <Typography variant="h5">新型コロナコールセンター相談件数</Typography>
            <div className={classes.charts}>
              <ResponsiveContainer width="95%">
                <BarChart data={contacts} margin={chart_margin}>
                  <XAxis dataKey="date" tickFormatter={(x) => format(x, 'M/d')} />
                  <YAxis domain={[0, 700]} ticks={[0, 100, 200, 300, 400, 500, 600, 700]} unit="人" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                  <ChartTooltip labelFormatter={(x) => format(x as number, 'M/d')} />
                  <Bar name="相談件数" dataKey="小計" stroke="salmon" fill="salmon" unit="人" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper>
            <Typography variant="h5">新型コロナ受診相談窓口相談件数</Typography>
            <div className={classes.charts}>
              <ResponsiveContainer width="95%">
                <BarChart data={querents} margin={chart_margin}>
                  <XAxis dataKey="date" tickFormatter={(x) => format(x, 'M/d')} />
                  <YAxis domain={[0, 3000]} ticks={[0, 500, 1000, 1500, 2000, 2500, 3000]} unit="人" />
                  <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                  <ChartTooltip labelFormatter={(x) => format(x as number, 'M/d')} />
                  <Bar name="相談件数" dataKey="小計" stroke="salmon" fill="salmon" unit="人" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Paper>
        </Grid>
      </Grid>
    );
  }

}

export default Charts;