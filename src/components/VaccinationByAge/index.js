// Write your code here
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationDetails} = props

  return (
    <div className="vaccination-by-age-container">
      <h1 className="vaccination-by-age-heading">Vaccination by age</h1>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            cx="50%"
            cy="40%"
            data={vaccinationDetails}
            startAngle={0}
            endAngle={360}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#5a8dee" />
            <Cell name="45-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VaccinationByAge
