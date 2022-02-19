// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

import './index.css'

// const data = [
//   {
//     group_name: 'Group A',
//     boys: 200,
//     girls: 400,
//   },
//   {
//     group_name: 'Group B',
//     boys: 3000,
//     girls: 400,
//   },
//   {
//     group_name: 'Group C',
//     boys: 1000,
//     girls: 1500,
//   },
//   {
//     group_name: 'Group D',
//     boys: 700,
//     girls: 1200,
//   },
// ]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusConstants.initial, vaccinationDetailsList: []}
  //   DataFormatter = number => {
  //     if (number > 1000) {
  //       return `${(number / 1000).toString()}k`
  //     }
  //     return number.toString()
  //   }

  componentDidMount() {
    this.getCowinVaccinationData()
  }

  getCowinVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const lastSevenDaysVaccination = data.last_7_days_vaccination.map(
        eachItem => ({
          vaccineDate: eachItem.vaccine_date,
          dose1: eachItem.dose_1,
          dose2: eachItem.dose_2,
        }),
      )
      const vaccinationByAge = data.vaccination_by_age
      const vaccinationByGender = data.vaccination_by_gender
      const updatedData = [
        lastSevenDaysVaccination,
        vaccinationByAge,
        vaccinationByGender,
      ]
      //   console.log(updatedData)

      this.setState({
        apiStatus: apiStatusConstants.success,
        vaccinationDetailsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNavBar = () => (
    <nav className="navbar-container">
      <img
        className="website-logo"
        src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
        alt="website logo"
      />
      <h1 className="website-name">Co-WIN</h1>
    </nav>
  )

  renderSuccessView = () => {
    const {vaccinationDetailsList} = this.state

    return (
      <>
        <VaccinationCoverage vaccinationDetails={vaccinationDetailsList[0]} />
        <VaccinationByGender vaccinationDetails={vaccinationDetailsList[1]} />
        <VaccinationByAge vaccinationDetails={vaccinationDetailsList[2]} />
      </>
    )
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCowinFailureView = () => (
    <div>
      <img
        className="failure-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  renderCowinPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderCowinFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-container">
        <div className="responsive-container">
          {this.renderNavBar()}
          <h1 className="heading">CoWIN Vaccination in India</h1>
          <div className="app-card">{this.renderCowinPage()}</div>
        </div>
      </div>
    )
  }
}

export default CowinDashboard
