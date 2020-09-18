import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from './Header'
import './airline.css'

const Airline = (props) => {
  const [airline,
    setAirline] = useState({})
  const [review,
    setReview] = useState({})
  const [loaded,
    setLoaded] = useState(false)

  useEffect(() => {
    const slug = props.match.params.slug;
    const url = `/api/v1/airlines/${slug}`;
    axios
      .get(url)
      .then(resp => {
        setAirline(resp.data)
        setLoaded(true)
        console.log(resp.data);
        console.log(airline);
      })
      .catch(data => console.log('Error', data))
  }, []);

  return (
    <div className='wrapper'>
      <div className='column'>
        <div className='main'>
          {loaded && <Header data={airline.data.attributes} reviews={airline.included}/>}
          <div className='reviews'></div>
        </div>
      </div>
      <div className='column'>
        <div className='review-form'>Review form goes here</div>
      </div>
    </div>
  )
}

export default Airline