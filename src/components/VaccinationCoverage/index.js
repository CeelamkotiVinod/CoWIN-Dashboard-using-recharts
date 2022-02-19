// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {vaccinationDetails} = props
  //   console.log(vaccinationDetails)

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
      <ResponsiveContainer width="95%" height={500}>
        <BarChart data={vaccinationDetails} margin={({top: 5}, {left: 32})}>
          <XAxis
            dataKey="vaccineDate"
            tick={{
              stroke: '#6c757d',
              strokeWidth: 1,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: '#6c757d',
              strokeWidth: 0,
              fontSize: 15,
              fontFamily: 'Roboto',
            }}
          />
          <Legend
            wrapperStyle={{
              padding: 30,
              textAlign: 'center',
              fontFamily: 'Roboto',
            }}
          />
          <Bar
            dataKey="dose1"
            name="Dose 1"
            fill="#5a8dee"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="dose2"
            name="Dose 2"
            fill="#f54394"
            barSize="20%"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationCoverage
